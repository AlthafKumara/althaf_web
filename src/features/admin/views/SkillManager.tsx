/**
 * @fileoverview Skill Manager View (Admin)
 *
 * Renders the admin interface for managing technical skills.
 * Includes a creation form (left column) and an existing skills
 * grid (right column) with toggle and delete actions.
 *
 * All data logic is handled by the `useAdminSkillController` hook.
 *
 * @module features/admin/views/SkillManager
 */

"use client";

import { useAdminSkillController } from "../controllers/useAdminSkillController";

/**
 * Renders the skill CRUD interface for the admin panel.
 *
 * Layout (on large screens):
 * - **Left column**: New skill form with category selector
 * - **Right column**: 2-column grid of existing skills with toggle/delete
 */
export default function SkillManager() {
  const {
    skills,
    formData,
    saving,
    setFormField,
    handleAdd,
    handleToggle,
    handleDelete,
  } = useAdminSkillController();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* ---------------------------------------------------------------- */}
      {/* Add Skill Form                                                    */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-surface p-6 rounded-2xl border border-neutral-800">
        <h2 className="text-xl font-bold text-text-primary mb-6">
          Add New Skill
        </h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Skill Name (e.g. Flutter)"
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={formData.name}
            onChange={(e) => setFormField("name", e.target.value)}
          />
          <select
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl text-text-primary"
            value={formData.category}
            onChange={(e) => setFormField("category", e.target.value)}
          >
            <option value="mobile">Mobile</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
            <option value="tools">Tools</option>
          </select>
          <button
            disabled={saving}
            type="submit"
            className="w-full py-3 bg-primary text-background font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
          >
            {saving ? "Saving..." : "Add Skill"}
          </button>
        </form>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Existing Skills Grid                                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-text-primary mb-6">
          Existing Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between p-4 bg-surface border border-neutral-800 rounded-xl mb-0"
            >
              <div>
                <span
                  className={`text-xs px-2 py-0.5 rounded border ${
                    s.is_active
                      ? "border-primary text-primary bg-primary/10"
                      : "border-neutral-600 text-neutral-500"
                  } mb-2 inline-block capitalize`}
                >
                  {s.category}
                </span>
                <h3
                  className={`font-bold ${
                    s.is_active
                      ? "text-text-primary"
                      : "text-text-secondary line-through"
                  }`}
                >
                  {s.name}
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleToggle(s.id, s.is_active ?? true)}
                  className="text-xs text-text-secondary hover:text-primary"
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
