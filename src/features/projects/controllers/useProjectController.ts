/**
 * @fileoverview Project Controller Hook (Public Gallery)
 *
 * Custom React hook that manages the state and data loading for the
 * public-facing project gallery. Separates data orchestration from
 * the UI rendering in `ProjectGrid`.
 *
 * This hook:
 * 1. Calls the repository to fetch all projects on mount
 * 2. Manages loading state
 * 3. Returns typed data for the view to consume
 *
 * @module features/projects/controllers/useProjectController
 */

import { useState, useEffect } from "react";
import type { Project } from "../models/ProjectModel";
import { fetchAllProjects } from "../repositories/ProjectRepository";

/**
 * Return type of the {@link useProjectController} hook.
 */
interface ProjectControllerState {
  /** Array of projects fetched from the database. */
  projects: Project[];
  /** Whether the initial data fetch is in progress. */
  loading: boolean;
}

/**
 * Controller hook for the public project gallery.
 *
 * @returns Current projects and loading state.
 *
 * @example
 * ```tsx
 * function ProjectGrid() {
 *   const { projects, loading } = useProjectController();
 *   if (loading) return <Spinner />;
 *   return projects.map(p => <ProjectCard key={p.id} project={p} />);
 * }
 * ```
 */
export function useProjectController(): ProjectControllerState {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchAllProjects();
      setProjects(data);
      setLoading(false);
    }

    loadProjects();
  }, []);

  return { projects, loading };
}
