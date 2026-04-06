/**
 * @fileoverview Admin Skill Controller Hook
 *
 * Manages all state and CRUD operations for the skill manager
 * in the admin panel. Extracted from the `admin/page.tsx` monolith.
 *
 * This hook:
 * 1. Loads all skills (including inactive) on mount
 * 2. Provides handlers for creating, toggling, and deleting skills
 * 3. Manages form state and loading indicators
 *
 * @module features/admin/controllers/useAdminSkillController
 */

import { useState, useEffect } from "react";
import {
  fetchAllSkills,
  createSkill,
  toggleSkill,
  deleteSkill,
} from "@/features/skills/repositories/SkillRepository";
import type { Skill, SkillCategory } from "@/features/skills/models/SkillModel";

/** Shape of the new skill form fields. */
interface SkillFormData {
  name: string;
  category: SkillCategory;
}

/** Initial empty state for the skill form. */
const EMPTY_FORM: SkillFormData = {
  name: "",
  category: "backend",
};

/**
 * Return type of the {@link useAdminSkillController} hook.
 */
interface AdminSkillControllerState {
  /** All skills from the database (including inactive). */
  skills: Skill[];
  /** Current form field values. */
  formData: SkillFormData;
  /** Whether a save operation is in progress. */
  saving: boolean;
  /** Updates a single field in the form. */
  setFormField: (field: keyof SkillFormData, value: string) => void;
  /** Handles form submission — creates skill, resets form, refreshes list. */
  handleAdd: (e: React.FormEvent) => Promise<void>;
  /** Toggles the is_active status of a skill. */
  handleToggle: (id: string, currentStatus: boolean) => Promise<void>;
  /** Deletes a skill by ID and refreshes the list. */
  handleDelete: (id: string) => Promise<void>;
}

/**
 * Controller hook for the admin skill manager.
 *
 * @returns State and handlers for managing skills.
 */
export function useAdminSkillController(): AdminSkillControllerState {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [formData, setFormData] = useState<SkillFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  /** Fetches all skills and updates local state. */
  const refresh = async () => {
    const data = await fetchAllSkills();
    setSkills(data);
  };

  // Load skills on mount
  useEffect(() => {
    refresh();
  }, []);

  /** Updates a single form field value. */
  const setFormField = (field: keyof SkillFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /** Handles adding a new skill, then resets form and refreshes. */
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await createSkill({
      name: formData.name,
      category: formData.category,
    });

    setFormData(EMPTY_FORM);
    await refresh();
    setSaving(false);
  };

  /** Toggles `is_active` state of a skill and refreshes. */
  const handleToggle = async (id: string, currentStatus: boolean) => {
    await toggleSkill(id, currentStatus);
    await refresh();
  };

  /** Deletes a skill and refreshes the list. */
  const handleDelete = async (id: string) => {
    await deleteSkill(id);
    await refresh();
  };

  return {
    skills,
    formData,
    saving,
    setFormField,
    handleAdd,
    handleToggle,
    handleDelete,
  };
}
