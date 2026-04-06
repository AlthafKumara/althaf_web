/**
 * @fileoverview Activity Repository — External API Data Access
 *
 * This is the **data access layer** for the Activity feature. It contains
 * all direct network calls to the GitHub and GitLab APIs. No UI or state
 * management logic belongs here.
 *
 * Responsibilities:
 * - Fetch raw events from GitHub REST API v3
 * - Fetch raw events from GitLab REST API v4
 * - Normalize both into the shared {@link CommitLog} model
 * - Aggregate and merge results for a given year
 *
 * This file runs **server-side only** because it accesses private tokens
 * via environment variables.
 *
 * @module features/activity/repositories/ActivityRepository
 */

import { CommitLog } from "../models/ActivityModel";
import {
  GITHUB_TOKEN,
  GITHUB_USERNAME,
  GITLAB_TOKEN,
  GITLAB_USER_ID,
} from "@/core/config/env";

// ---------------------------------------------------------------------------
// GitHub
// ---------------------------------------------------------------------------

/**
 * Fetches push-event commits from the GitHub Events API.
 *
 * Paginates up to 3 pages (max 300 events) and extracts individual commits
 * from `PushEvent` payloads, normalizing them into {@link CommitLog} objects.
 *
 * @param username - GitHub username to query events for.
 * @param token    - GitHub Personal Access Token for higher rate limits.
 * @returns Array of normalized commit logs from GitHub.
 *
 * @see https://docs.github.com/en/rest/activity/events
 */
export async function fetchGitHubActivity(
  username: string,
  token: string
): Promise<CommitLog[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  let page = 1;
  let allEvents: any[] = [];

  // Paginate up to 3 pages (100 events each = max 300 events)
  while (page <= 3) {
    const res = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100&page=${page}`,
      { headers }
    );

    if (!res.ok) break;

    const data = await res.json();
    if (data.length === 0) break;

    allEvents = [...allEvents, ...data];
    page++;
  }

  // Filter to only PushEvents and extract individual commits
  const pushEvents = allEvents.filter((e) => e.type === "PushEvent");

  return pushEvents.flatMap((event) =>
    (event.payload?.commits || []).map((commit: any) => ({
      source: "github" as const,
      repo: event.repo.name,
      message: commit.message,
      date: event.created_at,
      url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
    }))
  );
}

// ---------------------------------------------------------------------------
// GitLab
// ---------------------------------------------------------------------------

/**
 * Fetches push events from the GitLab Events API for a specific year.
 *
 * Uses the `after` and `before` query params to scope results to the
 * requested year. Returns an empty array on failure (graceful degradation).
 *
 * @param userId - Numeric GitLab user ID.
 * @param token  - GitLab Personal Access Token (scope: `read_api`).
 * @param year   - Calendar year to fetch events for.
 * @returns Array of normalized commit logs from GitLab.
 *
 * @see https://docs.gitlab.com/ee/api/events.html
 */
export async function fetchGitLabActivity(
  userId: string,
  token: string,
  year: number
): Promise<CommitLog[]> {
  try {
    const after = new Date(year, 0, 1).toISOString();
    const before = new Date(year, 11, 31, 23, 59, 59).toISOString();

    const response = await fetch(
      `https://gitlab.com/api/v4/users/${userId}/events?action=pushed&per_page=100&after=${after}&before=${before}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!response.ok) return [];

    const events = await response.json();
    const commits: CommitLog[] = [];

    for (const event of events) {
      if (event.push_data && event.push_data.commit_title) {
        commits.push({
          source: "gitlab",
          repo: event.project_id.toString(),
          message: event.push_data.commit_title,
          date: event.created_at,
          url: `https://gitlab.com/projects/${event.project_id}/commits/${event.push_data.commit_to}`,
        });
      }
    }

    return commits;
  } catch (err) {
    console.error("Error fetching GitLab activity:", err);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Aggregation
// ---------------------------------------------------------------------------

/**
 * Fetches and merges commit data from both GitHub and GitLab for a given year.
 *
 * Uses environment variables for authentication tokens. GitHub events are
 * fetched unconditionally; GitLab events are only fetched when both
 * `GITLAB_TOKEN` and `GITLAB_USER_ID` are configured.
 *
 * @param year - Calendar year to aggregate activity for.
 * @returns Merged array of commits, sorted newest-first.
 */
export async function getAggregatedActivityForYear(
  year: number
): Promise<CommitLog[]> {
  const [ghCommits, glCommits] = await Promise.all([
    fetchGitHubActivity(GITHUB_USERNAME, GITHUB_TOKEN),
    GITLAB_TOKEN && GITLAB_USER_ID
      ? fetchGitLabActivity(GITLAB_USER_ID, GITLAB_TOKEN, year)
      : Promise.resolve([]),
  ]);

  // Merge, filter to the requested year, and sort newest-first
  const allCommits = [...ghCommits, ...glCommits]
    .filter((c) => new Date(c.date).getFullYear() === year)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allCommits;
}

/**
 * Convenience wrapper — fetches aggregated activity for the current year.
 * Kept for backward compatibility with any modules that don't pass a year.
 */
export async function getAggregatedActivity(): Promise<CommitLog[]> {
  return getAggregatedActivityForYear(new Date().getFullYear());
}
