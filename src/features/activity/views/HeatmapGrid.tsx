/**
 * @fileoverview Contribution Heatmap Grid
 *
 * Renders a GitHub-style contribution heatmap for a full year. Each cell
 * represents a single day, colored by contribution intensity. High-activity
 * days (>7 contributions) pulse with a subtle animation.
 *
 * Tooltips appear on hover showing the exact date, total, and per-platform
 * breakdown.
 *
 * This is a presentational component — it receives pre-processed data
 * and handles only rendering logic.
 *
 * @module features/activity/views/HeatmapGrid
 */

import type { DayActivity } from "../models/ActivityModel";
import { format, parseISO, getDay } from "date-fns";
import { motion } from "framer-motion";

/** Props for the {@link HeatmapGrid} component. */
interface HeatmapGridProps {
  /** Array of daily activity counts for the year (from the controller). */
  data: DayActivity[];
}

/**
 * Returns a Tailwind background-color class based on the contribution count.
 *
 * @param count - Number of contributions for the day.
 * @returns Tailwind class string for the cell background.
 */
function getColorClass(count: number): string {
  if (count === 0) return "bg-[#121212]";
  if (count >= 1 && count <= 3) return "bg-yellow-400/10";
  if (count >= 4 && count <= 6) return "bg-yellow-400/50";
  return "bg-yellow-400";
}

/**
 * Renders a year-long contribution heatmap grid.
 *
 * Layout:
 * - Columns = weeks of the year
 * - Rows = days of the week (Sun–Sat)
 * - The first week is padded if the year doesn't start on Sunday
 *
 * @param props - See {@link HeatmapGridProps}.
 */
export function HeatmapGrid({ data }: HeatmapGridProps) {
  // Group daily data into weekly columns (7 days each)
  const weeks: (DayActivity | null)[][] = [];
  let currentWeek: (DayActivity | null)[] = [];

  if (data.length > 0) {
    const firstDayIndex = getDay(parseISO(data[0].date)); // 0 = Sunday

    // Pad the first week with nulls if the year doesn't start on Sunday
    for (let i = 0; i < firstDayIndex; i++) {
      currentWeek.push(null);
    }

    for (const day of data) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Pad the last week if incomplete
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }
  }

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-4">
      <div className="min-w-max flex gap-1">
        {weeks.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1">
            {week.map((day, dIdx) => {
              if (!day)
                return (
                  <div
                    key={`empty-${wIdx}-${dIdx}`}
                    className="w-3 h-3 md:w-4 md:h-4 bg-transparent rounded-sm"
                  />
                );

              const color = getColorClass(day.total);
              const isHighActivity = day.total > 7;

              return (
                <div key={day.date} className="relative group">
                  <motion.div
                    animate={isHighActivity ? { scale: [1, 1.1, 1] } : {}}
                    transition={
                      isHighActivity
                        ? {
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          }
                        : {}
                    }
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-sm border border-neutral-800/50 hover:border-text-primary transition-colors cursor-pointer ${color}`}
                  />

                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                    <div className="font-bold mb-1">
                      {format(parseISO(day.date), "MMM d, yyyy")}
                    </div>
                    <div>{day.total} contributions</div>
                    {(day.github > 0 || day.gitlab > 0) && (
                      <div className="text-text-secondary mt-1">
                        (GitHub: {day.github}, GitLab: {day.gitlab})
                      </div>
                    )}

                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between text-xs text-text-secondary">
        <a
          href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
          className="hover:text-primary transition-colors"
        >
          Learn how we count contributions
        </a>
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-[#121212] border border-neutral-800/50" />
          <div className="w-3 h-3 rounded-sm bg-yellow-400/10 border border-neutral-800/50" />
          <div className="w-3 h-3 rounded-sm bg-yellow-400/50 border border-neutral-800/50" />
          <div className="w-3 h-3 rounded-sm bg-yellow-400 border border-neutral-800/50" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
