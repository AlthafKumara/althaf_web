"use client";

import { useEffect, useState } from "react";
import { fetchActivityData, ActivityDataPayload } from "@/app/actions/activity";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO } from "date-fns";
import { GitCommit } from "lucide-react";
import { FaGithub, FaGitlab } from "react-icons/fa";
import { HeatmapGrid } from "./HeatmapGrid";

export default function ActivityDashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<ActivityDataPayload | null>(null);
  const [loading, setLoading] = useState(true);

  const years = [2026, 2025, 2024];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchActivityData(selectedYear).then((res) => {
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [selectedYear]);

  const totalContributions = data?.heatmap.reduce((acc, curr) => acc + curr.total, 0) || 0;

  return (
    <section id="activity" className="py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
            Live <span className="text-primary">Activity</span>
          </h2>
          <p className="mt-4 text-text-secondary">Recent contributions across GitHub and GitLab.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Heatmap Section */}
            <div className="bg-surface border border-neutral-800 rounded-2xl p-6 md:p-8 relative min-h-[250px]">
              <div className="mb-6 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-text-primary">
                    {totalContributions} contributions in {selectedYear}
                 </h3>
                 <span className="text-sm text-text-secondary">Contribution settings ▼</span>
              </div>
              
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-surface/50 rounded-2xl z-10">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : data ? (
                <motion.div
                  key={`heatmap-${selectedYear}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <HeatmapGrid data={data.heatmap} />
                </motion.div>
              ) : null}
            </div>

            {/* Commits Feed */}
            <div className="bg-surface border border-neutral-800 rounded-2xl p-6 md:p-8 min-h-[300px] relative">
              <h3 className="text-xl font-bold text-text-primary mb-6 border-b border-neutral-800 pb-4">Top 5 Recent Commits</h3>
              
              {loading ? (
                <div className="space-y-4 animate-pulse">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className="h-16 w-full bg-neutral-800/50 rounded-xl" />
                   ))}
                </div>
              ) : data?.topCommits.length === 0 ? (
                <div className="py-8 text-center text-text-secondary">No commits found for {selectedYear}.</div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {data?.topCommits.map((commit, idx) => (
                      <motion.div
                        key={`${commit.url}-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="flex gap-4 p-4 rounded-xl bg-background border border-neutral-800 hover:border-primary/40 transition-colors"
                      >
                        <div className="mt-1">
                          {commit.source === 'github' ? (
                            <FaGithub className="w-5 h-5 text-text-secondary" />
                          ) : (
                            <FaGitlab className="w-5 h-5 text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-text-primary font-medium truncate">
                            {commit.message.split('`').map((part, i) => 
                              i % 2 === 1 ? <code key={i} className="text-primary bg-primary/10 px-1 rounded">{part}</code> : part
                            )}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                            <span className="font-mono bg-surface px-2 py-0.5 rounded border border-neutral-800">{commit.repo}</span>
                            <span>{format(new Date(commit.date), 'MMM d, yyyy • h:mm a')}</span>
                          </div>
                        </div>
                        <a 
                          href={commit.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-surface border border-neutral-800 hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                          <GitCommit className="w-4 h-4" />
                        </a>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Year Filters */}
          <div className="w-full lg:w-48 flex flex-row lg:flex-col gap-2">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                disabled={loading}
                className={`flex-1 lg:flex-none px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                  selectedYear === year 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-transparent text-text-secondary hover:bg-surface'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
