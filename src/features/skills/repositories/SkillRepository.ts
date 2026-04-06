/**
 * @fileoverview Skill Repository — Supabase Data Access
 *
 * This is the **data access layer** for Skills. It encapsulates all
 * direct Supabase calls for skill-related operations.
 *
 * Used by:
 * - `useSkillController` (public — fetches active skills only)
 * - `useAdminSkillController` (admin — full CRUD)
 *
 * @module features/skills/repositories/SkillRepository
 */

import { supabase } from "@/core/lib/supabase";
import type { Skill } from "../models/SkillModel";

// ---------------------------------------------------------------------------
// Read Operations
// ---------------------------------------------------------------------------

/**
 * Fetches only active (visible) skills, for the public-facing skills section.
 *
 * @returns Array of active skills, or empty array on error.
 */
export async function fetchActiveSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("is_active", true);

  if (error) {
    console.error("Error fetching active skills:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Fetches ALL skills (active and inactive), for the admin panel.
 * Sorted newest first so recently added skills appear at the top.
 *
 * @returns Array of all skills, or empty array on error.
 */
export async function fetchAllSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all skills:", error);
    return [];
  }

  return data ?? [];
}

// ---------------------------------------------------------------------------
// Write Operations (Admin Only)
// ---------------------------------------------------------------------------

/**
 * Inserts a new skill into the database.
 *
 * @param skill - Skill data with `name` and `category` (id is auto-generated).
 */
export async function createSkill(
  skill: Pick<Skill, "name" | "category">
): Promise<void> {
  const { error } = await supabase.from("skills").insert([skill]);

  if (error) {
    console.error("Error creating skill:", error);
  }
}

/**
 * Toggles the `is_active` status of a skill (show/hide on public site).
 *
 * @param id            - The UUID of the skill to toggle.
 * @param currentStatus - The current `is_active` value (will be inverted).
 */
export async function toggleSkill(
  id: string,
  currentStatus: boolean
): Promise<void> {
  const { error } = await supabase
    .from("skills")
    .update({ is_active: !currentStatus })
    .eq("id", id);

  if (error) {
    console.error("Error toggling skill:", error);
  }
}

/**
 * Deletes a skill by its ID.
 *
 * @param id - The UUID of the skill to delete.
 */
export async function deleteSkill(id: string): Promise<void> {
  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) {
    console.error("Error deleting skill:", error);
  }
}
