/**
 * @fileoverview Admin Project Controller Hook
 *
 * Manages all state and CRUD operations for the project manager
 * in the admin panel. Extracts business logic that was previously
 * inlined in the 188-line `admin/page.tsx` monolith.
 *
 * This hook:
 * 1. Loads all projects on mount
 * 2. Provides handlers for creating and deleting projects
 * 3. Manages form state and loading indicators
 *
 * @module features/admin/controllers/useAdminProjectController
 */

import { useState, useEffect } from "react";
import {
  fetchAllProjects,
  createProject,
  deleteProject,
  uploadProjectImage,
} from "@/features/projects/repositories/ProjectRepository";
import type { Project } from "@/features/projects/models/ProjectModel";

/** Shape of the new project form fields. */
interface ProjectFormData {
  title: string;
  description: string;
  tags: string;
  github_url: string;
  demo_url: string;
}

/** Initial empty state for the project form. */
const EMPTY_FORM: ProjectFormData = {
  title: "",
  description: "",
  tags: "",
  github_url: "",
  demo_url: "",
};

/**
 * Return type of the {@link useAdminProjectController} hook.
 */
interface AdminProjectControllerState {
  /** All projects from the database. */
  projects: Project[];
  /** Current form field values. */
  formData: ProjectFormData;
  /** The selected image file for upload, or null. */
  imageFile: File | null;
  /** Whether a save operation is in progress. */
  saving: boolean;
  /** Updates a single field in the form. */
  setFormField: (field: keyof ProjectFormData, value: string) => void;
  /** Sets the image file for upload. */
  setImageFile: (file: File | null) => void;
  /** Handles form submission — uploads image, creates project, resets form. */
  handleAdd: (e: React.FormEvent) => Promise<void>;
  /** Deletes a project by ID and refreshes the list. */
  handleDelete: (id: string) => Promise<void>;
}

/**
 * Controller hook for the admin project manager.
 *
 * Encapsulates all CRUD logic so the `ProjectManager` view component
 * can remain purely presentational.
 *
 * @returns State and handlers for managing projects.
 */
export function useAdminProjectController(): AdminProjectControllerState {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<ProjectFormData>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  /** Fetches all projects and updates local state. */
  const refresh = async () => {
    const data = await fetchAllProjects();
    setProjects(data);
  };

  // Load projects on mount
  useEffect(() => {
    refresh();
  }, []);

  /** Updates a single form field value. */
  const setFormField = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Handles adding a new project:
   * 1. Upload image (if selected)
   * 2. Parse comma-separated tags into an array
   * 3. Insert into database
   * 4. Reset form and refresh list
   */
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let image_url: string | null = null;
    if (imageFile) {
      image_url = await uploadProjectImage(imageFile);
    }

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    await createProject({
      title: formData.title,
      description: formData.description,
      tags: tagsArray,
      github_url: formData.github_url,
      demo_url: formData.demo_url,
      image_url: image_url ?? "",
    });

    setFormData(EMPTY_FORM);
    setImageFile(null);
    await refresh();
    setSaving(false);
  };

  /** Deletes a project and refreshes the list. */
  const handleDelete = async (id: string) => {
    await deleteProject(id);
    await refresh();
  };

  return {
    projects,
    formData,
    imageFile,
    saving,
    setFormField,
    setImageFile,
    handleAdd,
    handleDelete,
  };
}
