"use client";

import { ProjectModel } from "@/shared/models/project.model";

interface ProjectForm {
  title: string;
  description: string;
  tags: string;
  github_url: string;
  demo_url: string;
}

interface ProjectsManagerProps {
  projects: ProjectModel[];
  projForm: ProjectForm;
  setProjForm: (form: ProjectForm) => void;
  projImage: File | null;
  setProjImage: (file: File | null) => void;
  isLoadingProj: boolean;
  handleAddProject: (e: React.FormEvent) => Promise<void>;
  handleDeleteProject: (id: string) => Promise<void>;
}

export default function ProjectsManager({
  projects,
  projForm,
  setProjForm,
  projImage,
  setProjImage,
  isLoadingProj,
  handleAddProject,
  handleDeleteProject,
}: ProjectsManagerProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Add Project Form */}
      <div className="bg-surface p-6 rounded-2xl border border-neutral-800">
        <h2 className="text-xl font-bold text-text-primary mb-6">Add New Project</h2>
        <form onSubmit={handleAddProject} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Project Title"
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={projForm.title}
            onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
          />
          <textarea
            required
            placeholder="Description"
            rows={3}
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={projForm.description}
            onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={projForm.tags}
            onChange={(e) => setProjForm({ ...projForm, tags: e.target.value })}
          />
          <input
            type="url"
            placeholder="GitHub URL"
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={projForm.github_url}
            onChange={(e) => setProjForm({ ...projForm, github_url: e.target.value })}
          />
          <input
            type="url"
            placeholder="Live Demo URL"
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={projForm.demo_url}
            onChange={(e) => setProjForm({ ...projForm, demo_url: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProjImage(e.target.files?.[0] || null)}
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl text-text-secondary"
          />
          <button
            disabled={isLoadingProj}
            type="submit"
            className="w-full py-3 bg-primary text-background font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isLoadingProj ? 'Saving...' : 'Save Project'}
          </button>
        </form>
      </div>

      {/* Project List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-text-primary mb-6">Existing Projects</h2>
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 bg-surface border border-neutral-800 rounded-xl">
            <div>
              <h3 className="font-bold text-text-primary">{p.title}</h3>
              <p className="text-xs text-text-secondary mt-1 max-w-xs truncate">{p.description}</p>
            </div>
            <button
              onClick={() => handleDeleteProject(p.id)}
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
