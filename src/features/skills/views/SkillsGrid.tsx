/**
 * @fileoverview Public Skills Grid View
 *
 * Renders the "Technical Arsenal" section on the homepage. Skills are
 * grouped by category (mobile, backend, devops, tools) and displayed
 * as chip-style tags inside category cards.
 *
 * This is a **Client Component** because it consumes the
 * `useSkillController` hook which manages client-side state.
 *
 * Data Flow:
 *   `useSkillController` → `SkillRepository.fetchActiveSkills()` → Supabase
 *   → returns `Skill[]` → grouped by category → rendered here
 *
 * @module features/skills/views/SkillsGrid
 */

"use client";

import { motion } from "framer-motion";
import { useSkillController } from "../controllers/useSkillController";
import Spinner from "@/core/ui/Spinner";

/** The ordered list of skill categories to display. */
const CATEGORIES = ["mobile", "backend", "devops", "tools"] as const;

/**
 * Renders the skills section with category-grouped skill chips.
 *
 * States:
 * - **Loading**: Shows a centered spinner
 * - **Empty**: Shows a "currently updating" message
 * - **Loaded**: Shows a 2-column grid of category cards with skill tags
 */
export default function SkillsGrid() {
  const { skills, loading } = useSkillController();

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
            Technical <span className="text-primary">Arsenal</span>
          </h2>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center text-text-secondary">
            Skills currently updating...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {CATEGORIES.map((cat, idx) => {
              const catSkills = skills.filter((s) => s.category === cat);
              if (catSkills.length === 0) return null;

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-surface border border-neutral-800 rounded-2xl p-8"
                >
                  {/* Category Title */}
                  <h3 className="text-xl font-bold text-text-primary capitalize mb-6 flex items-center gap-2">
                    {cat}
                  </h3>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-3">
                    {catSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-4 py-2 bg-background border border-neutral-800 rounded-xl text-sm font-medium text-text-secondary hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
