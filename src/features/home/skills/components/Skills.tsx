"use client";

import { motion } from "framer-motion";
import { useSkillsController } from "../controllers/use_skills.controller";
import { SkillCategory } from "@/shared/models/skill.model";

const categories: SkillCategory[] = ['mobile', 'backend', 'devops', 'tools'];

export default function Skills() {
  const { skills, isLoading, error } = useSkillsController();

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
            Technical <span className="text-primary">Arsenal</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : skills.length === 0 ? (
          <div className="text-center text-text-secondary">Skills currently updating...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {categories.map((cat, idx) => {
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
                  <h3 className="text-xl font-bold text-text-primary capitalize mb-6 flex items-center gap-2">
                    {cat}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {catSkills.map((skill) => (
                      <span key={skill.id} className="px-4 py-2 bg-background border border-neutral-800 rounded-xl text-sm font-medium text-text-secondary hover:text-primary hover:border-primary/50 transition-colors cursor-default">
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
