import { FaGithub, FaGitlab } from "react-icons/fa";

export default function ActivitySkeleton() {
  return (
    <section id="activity" className="py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
            Live <span className="text-primary">Activity</span>
          </h2>
          <p className="mt-4 text-text-secondary">Loading recent contributions...</p>
        </div>

        <div className="bg-surface border border-neutral-800 rounded-2xl p-6 md:p-8 animate-pulse">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
            <div className="h-6 w-32 bg-neutral-800 rounded"></div>
            <div className="flex gap-4">
               <div className="h-5 w-20 bg-neutral-800 rounded"></div>
               <div className="h-5 w-20 bg-neutral-800 rounded"></div>
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-neutral-800">
                <div className="w-5 h-5 bg-neutral-800 rounded mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-neutral-800 rounded"></div>
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-20 bg-neutral-800 rounded"></div>
                    <div className="h-4 w-32 bg-neutral-800 rounded"></div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-800"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
