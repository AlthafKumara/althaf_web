/**
 * @fileoverview Homepage
 *
 * The main landing page of the portfolio. This file is intentionally
 * kept as a **thin aggregator** — it simply imports and composes
 * feature views in the correct order. No business logic belongs here.
 *
 * Section Order:
 * 1. Hero — High-impact introduction
 * 2. About — Background & philosophy
 * 3. Skills — Technical arsenal (fetched from Supabase)
 * 4. Projects — Project portfolio (fetched from Supabase)
 * 5. Activity — Git contribution heatmap (fetched from GitHub/GitLab)
 * 6. Footer — Copyright
 *
 * @module app/(public)/page
 */

import Hero from "@/features/home/views/Hero";
import About from "@/features/home/views/About";
import SkillsGrid from "@/features/skills/views/SkillsGrid";
import ProjectGrid from "@/features/projects/views/ProjectGrid";
import ActivityDashboard from "@/features/activity/views/ActivityDashboard";

/**
 * Renders the homepage by composing feature views.
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <SkillsGrid />
      <ProjectGrid />

      <ActivityDashboard />

      <footer className="py-8 border-t border-neutral-800 text-center text-text-secondary text-sm">
        <p>© {new Date().getFullYear()} Althaf Kumara Website.</p>
      </footer>
    </div>
  );
}
