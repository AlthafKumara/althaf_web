import { getAggregatedActivityForYear } from '@/utils/services/git-service';
import { ActivityDataModel, DayActivityModel } from '@/shared/models/activity.model';

export const activityRepository = {
    async fetchActivityData(year: number): Promise<ActivityDataModel> {
        const allCommits = await getAggregatedActivityForYear(year);

        // Build heatmap grid for the full year
        const map: Record<string, DayActivityModel> = {};
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            map[dateStr] = { date: dateStr, total: 0, github: 0, gitlab: 0 };
        }

        for (const commit of allCommits) {
            const dateStr = new Date(commit.date).toISOString().split('T')[0];
            if (map[dateStr]) {
                map[dateStr].total += 1;
                if (commit.source === 'github') map[dateStr].github += 1;
                else if (commit.source === 'gitlab') map[dateStr].gitlab += 1;
            }
        }

        const heatmap = Object.values(map).sort((a, b) =>
            a.date.localeCompare(b.date)
        );
        const topCommits = allCommits.slice(0, 5);

        return { heatmap, topCommits };
    },
};
