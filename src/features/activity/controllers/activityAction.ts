/**
 * @fileoverview Activity Server Action (Controller Layer)
 *
 * This is the **controller** for the Activity feature on the server side.
 * It orchestrates the data flow between the Repository (raw API data)
 * and the View (React components) by:
 *
 * 1. Calling the repository to get raw commit data
 * 2. Aggregating commits into a daily heatmap grid
 * 3. Selecting the top N commits for the feed
 * 4. Returning a cleanly typed payload to the client
 *
 * This file uses the `"use server"` directive because it is invoked
 * from a client component (`ActivityDashboard`) via a Server Action call.
 *
 * @module features/activity/controllers/activityAction
 */

"use server";

import { getAggregatedActivityForYear } from "../repositories/ActivityRepository";
import type {
  DayActivity,
  ActivityDataPayload,
} from "../models/ActivityModel";

/**
 * Fetches and processes git activity data for a given calendar year.
 *
 * Processing Steps:
 * 1. Initialize a day-by-day map for every day of the requested year.
 * 2. Iterate over all commits and increment counters per platform.
 * 3. Sort the heatmap chronologically.
 * 4. Slice the top 5 most recent commits for the feed.
 *
 * @param year - The calendar year to fetch activity for (e.g. 2026).
 * @returns A payload containing the full heatmap array and top 5 commits.
 *
 * @example
 * ```ts
 * // Called from a client component via Server Action:
 * const data = await fetchActivityData(2026);
 * console.log(data.heatmap.length); // 365 or 366
 * ```
 */
export async function fetchActivityData(
  year: number
): Promise<ActivityDataPayload> {
  const allCommits = await getAggregatedActivityForYear(year);

  // -----------------------------------------------------------------------
  // 1. Heatmap Aggregation — build a day-by-day contribution map
  // -----------------------------------------------------------------------
  const map: Record<string, DayActivity> = {};

  // Initialize every day of the year with zero counts
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    map[dateStr] = { date: dateStr, total: 0, github: 0, gitlab: 0 };
  }

  // Populate with actual commit data
  for (const commit of allCommits) {
    const dateStr = new Date(commit.date).toISOString().split("T")[0];
    if (map[dateStr]) {
      map[dateStr].total += 1;
      if (commit.source === "github") map[dateStr].github += 1;
      else if (commit.source === "gitlab") map[dateStr].gitlab += 1;
    }
  }

  // Convert to sorted array
  const heatmap = Object.values(map).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  // -----------------------------------------------------------------------
  // 2. Top 5 Commits — already sorted newest-first by the repository
  // -----------------------------------------------------------------------
  const topCommits = allCommits.slice(0, 5);

  return {
    heatmap,
    topCommits,
  };
}
