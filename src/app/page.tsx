import { Hero } from "@/features/home/hero";
import { About } from "@/features/home/about";
import { Skills } from "@/features/home/skills";
import { Projects } from "@/features/home/projects";
import { ActivityDashboard } from "@/features/home/activity";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />

      <ActivityDashboard />

      <footer className="py-8 border-t border-neutral-800 text-center text-text-secondary text-sm">
        <p>© {new Date().getFullYear()} Althaf Kumara Website.</p>
      </footer>
    </div>
  );
}
