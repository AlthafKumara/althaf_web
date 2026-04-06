/**
 * @fileoverview Activity Domain Models
 *
 * Defines the data shapes for the Activity feature. These interfaces are
 * used by every other layer in the feature (Repository, Controller, View)
 * to ensure type consistency across the entire data flow.
 *
 * Data Flow: Repository → Controller → View
 *            (all using these exact types)
 *
 * @module features/activity/models/ActivityModel
 */

// ---------------------------------------------------------------------------
// Core Entity
// ---------------------------------------------------------------------------

/**
 * Represents a single commit event from a git platform.
 *
 * This is the normalized shape that both GitHub and GitLab API responses
 * are mapped into by the {@link ActivityRepository}.
 */
export interface CommitLog {
  /** The platform this commit originated from. */
  source: "github" | "gitlab";
  /** Repository name (e.g. "user/repo" for GitHub, project ID for GitLab). */
  repo: string;
  /** The commit message text. */
  message: string;
  /** ISO 8601 date string of when the commit/event was created. */
  date: string;
  /** Direct URL to the commit on the respective platform. */
  url: string;
}

// ---------------------------------------------------------------------------
// Aggregated View Models
// ---------------------------------------------------------------------------

/**
 * Represents the contribution count for a single calendar day.
 * Used by the {@link HeatmapGrid} to render the contribution heatmap.
 */
export interface DayActivity {
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  /** Total contributions across all platforms. */
  total: number;
  /** Number of GitHub contributions for this day. */
  github: number;
  /** Number of GitLab contributions for this day. */
  gitlab: number;
}

/**
 * The complete payload returned by the activity server action.
 * Contains both the heatmap data and the top recent commits.
 */
export interface ActivityDataPayload {
  /** Array of daily activity counts for the full year (365/366 entries). */
  heatmap: DayActivity[];
  /** The N most recent commits, sorted newest first. */
  topCommits: CommitLog[];
}
