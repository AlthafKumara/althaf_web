/**
 * @fileoverview Project Repository — Supabase Data Access
 *
 * This is the **data access layer** for Projects. It encapsulates all
 * direct Supabase calls (database reads/writes and storage uploads).
 * No UI or state management logic belongs here.
 *
 * Used by:
 * - `useProjectController` (public gallery — read only)
 * - `useAdminProjectController` (admin CRUD — full access)
 *
 * @module features/projects/repositories/ProjectRepository
 */

import { supabase } from "@/core/lib/supabase";
import type { Project } from "../models/ProjectModel";

// ---------------------------------------------------------------------------
// Read Operations
// ---------------------------------------------------------------------------

/**
 * Fetches all projects from the database, sorted newest first.
 *
 * @returns Array of projects, or empty array on error.
 */
export async function fetchAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data ?? [];
}

// ---------------------------------------------------------------------------
// Write Operations (Admin Only)
// ---------------------------------------------------------------------------

/**
 * Uploads a project image to Supabase Storage and returns its public URL.
 *
 * The file is stored in the `portfolio` bucket with a random filename
 * to prevent collisions.
 *
 * @param file - The image file to upload.
 * @returns The public URL of the uploaded image, or `null` on failure.
 */
export async function uploadProjectImage(
  file: File
): Promise<string | null> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("portfolio")
    .upload(fileName, file);

  if (uploadError || !uploadData) {
    console.error("Error uploading project image:", uploadError);
    return null;
  }

  const { data: publicURLData } = supabase.storage
    .from("portfolio")
    .getPublicUrl(fileName);

  return publicURLData.publicUrl;
}

/**
 * Inserts a new project into the database.
 *
 * @param project - Project data (without `id`, which is auto-generated).
 */
export async function createProject(
  project: Omit<Project, "id">
): Promise<void> {
  const { error } = await supabase.from("projects").insert([project]);

  if (error) {
    console.error("Error creating project:", error);
  }
}

/**
 * Deletes a project by its ID.
 *
 * @param id - The UUID of the project to delete.
 */
export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
  }
}
