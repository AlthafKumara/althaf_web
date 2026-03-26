"use server";

import { getAggregatedActivityForYear, CommitLog } from "@/lib/git-service";

export interface DayActivity {
  date: string;
  total: number;
  github: number;
  gitlab: number;
}

export interface ActivityDataPayload {
  heatmap: DayActivity[];
  topCommits: CommitLog[];
}

export async function fetchActivityData(year: number): Promise<ActivityDataPayload> {
  const allCommits = await getAggregatedActivityForYear(year);

  // 1. Heatmap Aggregation
  const map: Record<string, DayActivity> = {};
  
  // Initialize grid for the year
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    map[dateStr] = { date: dateStr, total: 0, github: 0, gitlab: 0 };
  }

  // Populate data
  for (const commit of allCommits) {
    const dateStr = new Date(commit.date).toISOString().split('T')[0];
    if (map[dateStr]) {
      map[dateStr].total += 1;
      if (commit.source === 'github') map[dateStr].github += 1;
      else if (commit.source === 'gitlab') map[dateStr].gitlab += 1;
    }
  }

  // Convert to array sorted by date
  const heatmap = Object.values(map).sort((a, b) => a.date.localeCompare(b.date));

  // 2. Top 5 Commits
  const topCommits = allCommits.slice(0, 5);

  return {
    heatmap,
    topCommits,
  };
}
