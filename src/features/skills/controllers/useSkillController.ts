/**
 * @fileoverview Skill Controller Hook (Public Gallery)
 *
 * Custom React hook managing state and data loading for the public
 * skills section. Fetches only **active** skills from the repository.
 *
 * @module features/skills/controllers/useSkillController
 */

import { useState, useEffect } from "react";
import type { Skill } from "../models/SkillModel";
import { fetchActiveSkills } from "../repositories/SkillRepository";

/**
 * Return type of the {@link useSkillController} hook.
 */
interface SkillControllerState {
  /** Array of active skills fetched from the database. */
  skills: Skill[];
  /** Whether the initial data fetch is in progress. */
  loading: boolean;
}

/**
 * Controller hook for the public skills section.
 *
 * @returns Current active skills and loading state.
 *
 * @example
 * ```tsx
 * function SkillsGrid() {
 *   const { skills, loading } = useSkillController();
 *   if (loading) return <Spinner />;
 *   return skills.map(s => <SkillChip key={s.id} skill={s} />);
 * }
 * ```
 */
export function useSkillController(): SkillControllerState {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSkills() {
      const data = await fetchActiveSkills();
      setSkills(data);
      setLoading(false);
    }

    loadSkills();
  }, []);

  return { skills, loading };
}
