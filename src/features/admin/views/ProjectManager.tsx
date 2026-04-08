/**
 * @fileoverview Project Manager View (Admin)
 *
 * Renders the admin interface for managing portfolio projects.
 * Includes a creation form (left column) and an existing projects
 * list (right column). All data logic is handled by the
 * `useAdminProjectController` hook — this component is purely UI.
 *
 * @module features/admin/views/ProjectManager
 */

"use client";

import { useAdminProjectController } from "../controllers/useAdminProjectController";

/**
 * Renders the project CRUD interface for the admin panel.
 *
 * Layout (on large screens):
 * - **Left column**: New project form with image upload
 * - **Right column**: List of existing projects with delete buttons
 */
export default function ProjectManager() {
  const {
    projects,
    formData,
    saving,
    setFormField,
    setImageFile,
    handleAdd,
    handleDelete,
  } = useAdminProjectController();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* ---------------------------------------------------------------- */}
      {/* Add Project Form                                                  */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-surface p-6 rounded-2xl border border-neutral-800">
        <h2 className="text-xl font-bold text-text-primary mb-6">
          Add New Project
        </h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Project Title"
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={formData.title}
            onChange={(e) => setFormField("title", e.target.value)}
          />
          <textarea
            required
            placeholder="Description"
            rows={3}
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={formData.description}
            onChange={(e) => setFormField("description", e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={formData.tags}
            onChange={(e) => setFormField("tags", e.target.value)}
          />
          <input
            type="url"
            placeholder="GitHub URL"
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={formData.github_url}
            onChange={(e) => setFormField("github_url", e.target.value)}
          />
          <input
            type="url"
            placeholder="Live Demo URL"
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={formData.demo_url}
            onChange={(e) => setFormField("demo_url", e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl text-text-secondary"
          />

          <button
            disabled={saving}
            type="submit"
            className="w-full py-3 bg-primary text-background font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Project"}
          </button>
        </form>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Existing Projects List                                            */}
      {/* ---------------------------------------------------------------- */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-text-primary mb-6">
          Existing Projects
        </h2>
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-4 bg-surface border border-neutral-800 rounded-xl"
          >
            <div>
              <h3 className="font-bold text-text-primary">{p.title}</h3>
              <p className="text-xs text-text-secondary mt-1 max-w-xs truncate">
                {p.description}
              </p>
            </div>
            <button
              onClick={() => handleDelete(p.id)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
