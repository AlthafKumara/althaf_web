import { DayActivityModel } from "@/shared/models/activity.model";
import { format, parseISO, getDay } from "date-fns";
import { motion } from "framer-motion";

export function HeatmapGrid({ data }: { data: DayActivityModel[] }) {
  // Group by weeks
  const weeks: (DayActivityModel | null)[][] = [];
  let currentWeek: (DayActivityModel | null)[] = [];

  if (data.length > 0) {
    const firstDayIndex = getDay(parseISO(data[0].date)); // 0 = Sunday
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
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }
  }

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-[#121212]";
    if (count >= 1 && count <= 3) return "bg-yellow-400/10";
    if (count >= 4 && count <= 6) return "bg-yellow-400/50";
    return "bg-yellow-400";
  };

  return (
    <div className="w-full overflow-x-auto custom-scrollbar pb-4">
      <div className="min-w-max flex gap-1">
        {weeks.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1">
            {week.map((day, dIdx) => {
              if (!day) return <div key={`empty-${wIdx}-${dIdx}`} className="w-3 h-3 md:w-4 md:h-4 bg-transparent rounded-sm" />;

              const color = getColorClass(day.total);
              const isHighActivity = day.total > 7;

              return (
                <div key={day.date} className="relative group">
                  <motion.div
                    animate={isHighActivity ? { scale: [1, 1.1, 1] } : {}}
                    transition={isHighActivity ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-sm border border-neutral-800/50 hover:border-text-primary transition-colors cursor-pointer ${color}`}
                  />

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                    <div className="font-bold mb-1">{format(parseISO(day.date), 'MMM d, yyyy')}</div>
                    <div>{day.total} contributions</div>
                    {(day.github > 0 || day.gitlab > 0) && (
                      <div className="text-text-secondary mt-1">
                        (GitHub: {day.github}, GitLab: {day.gitlab})
                      </div>
                    )}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

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
