/**
 * @fileoverview Public Project Gallery View
 *
 * Renders the "Featured Projects" section on the homepage. Displays
 * projects in a responsive grid with image previews, tags, and links
 * to source code and live demos.
 *
 * This is a **Client Component** because it consumes the
 * `useProjectController` hook which manages client-side state.
 *
 * Data Flow:
 *   `useProjectController` → `ProjectRepository.fetchAllProjects()` → Supabase
 *   → returns `Project[]` → rendered here as cards
 *
 * @module features/projects/views/ProjectGrid
 */

"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useProjectController } from "../controllers/useProjectController";

/**
 * Renders the project portfolio section with a responsive card grid.
 *
 * States:
 * - **Loading**: Shows 3 skeleton cards with pulse animation
 * - **Empty**: Shows a "currently being populated" message
 * - **Loaded**: Renders project cards with image, tags, and action links
 */
export default function ProjectGrid() {
  const { projects, loading } = useProjectController();

  return (
    <section id="projects" className="py-24 bg-surface/30 border-t border-neutral-800">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            A selection of my recent work and open source contributions.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 bg-surface animate-pulse rounded-2xl border border-neutral-800"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          /* Empty State */
          <div className="text-center text-text-secondary">
            Projects are currently being populated.
          </div>
        ) : (
          /* Project Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col bg-background border border-neutral-800 rounded-2xl overflow-hidden hover:border-primary/40 transition-colors"
              >
                {/* Image */}
                <div className="relative h-48 w-full bg-surface overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="object-cover w-full h-full opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-neutral-600">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-surface border border-neutral-800 rounded-md text-xs text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-surface border border-neutral-800 rounded-md text-xs text-text-secondary">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                      >
                        <FaGithub className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors ml-auto"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
