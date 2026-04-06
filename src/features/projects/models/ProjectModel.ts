/**
 * @fileoverview Project Domain Model
 *
 * Defines the data shape for a portfolio project. Used across:
 * - Public project gallery (`ProjectGrid`)
 * - Admin project manager (`ProjectManager`)
 * - Repository layer for Supabase CRUD
 *
 * @module features/projects/models/ProjectModel
 */

/**
 * Represents a single portfolio project stored in Supabase.
 *
 * Maps 1:1 with the `projects` table columns:
 * - `id`: UUID primary key (auto-generated)
 * - `title`: Display title of the project
 * - `description`: Short description / summary
 * - `tags`: Array of technology tags (e.g. ["Flutter", "Supabase"])
 * - `image_url`: Public URL of the project screenshot in Supabase Storage
 * - `github_url`: Link to the source code repository
 * - `demo_url`: Link to the live demo / deployed version
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_url: string;
  github_url: string;
  demo_url: string;
}
