/**
 * @fileoverview Skill Domain Model
 *
 * Defines the data shape for a technical skill. Used across:
 * - Public skills grid (`SkillsGrid`)
 * - Admin skill manager (`SkillManager`)
 * - Repository layer for Supabase CRUD
 *
 * @module features/skills/models/SkillModel
 */

/**
 * Valid skill category values.
 * Maps to the category columns/filters in the Supabase `skills` table.
 */
export type SkillCategory = "mobile" | "backend" | "devops" | "tools";

/**
 * Represents a single technical skill stored in Supabase.
 *
 * Maps to the `skills` table columns:
 * - `id`: UUID primary key (auto-generated)
 * - `name`: Display name (e.g. "Flutter", "Docker")
 * - `category`: One of the predefined {@link SkillCategory} values
 * - `is_active`: Whether the skill is visible on the public site
 */
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  is_active?: boolean;
}
