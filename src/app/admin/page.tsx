"use client";

import { useAdminController } from "@/features/admin/controllers/use_admin.controller";

export default function AdminDashboard() {
  const {
    activeTab, setActiveTab,
    projects, projForm, setProjForm, projImage, setProjImage, isLoadingProj,
    handleAddProject, handleDeleteProject,
    skills, skillForm, setSkillForm, isLoadingSkill,
    handleAddSkill, handleToggleSkill, handleDeleteSkill,
  } = useAdminController();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 border-b border-neutral-800 pb-4">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${activeTab === 'projects' ? 'bg-primary text-background' : 'text-text-secondary hover:bg-surface'}`}
        >
          Projects Manager
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${activeTab === 'skills' ? 'bg-primary text-background' : 'text-text-secondary hover:bg-surface'}`}
        >
          Skills Manager
        </button>
      </div>

      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Add Project Form */}
          <div className="bg-surface p-6 rounded-2xl border border-neutral-800">
            <h2 className="text-xl font-bold text-text-primary mb-6">Add New Project</h2>
            <form onSubmit={handleAddProject} className="space-y-4">
              <input required type="text" placeholder="Project Title" className="w-full p-3 bg-background border border-neutral-800 rounded-xl" value={projForm.title} onChange={e => setProjForm({ ...projForm, title: e.target.value })} />
              <textarea required placeholder="Description" rows={3} className="w-full p-3 bg-background border border-neutral-800 rounded-xl" value={projForm.description} onChange={e => setProjForm({ ...projForm, description: e.target.value })} />
              <input type="text" placeholder="Tags (comma separated)" className="w-full p-3 bg-background border border-neutral-800 rounded-xl" value={projForm.tags} onChange={e => setProjForm({ ...projForm, tags: e.target.value })} />
              <input type="url" placeholder="GitHub URL" className="w-full p-3 bg-background border border-neutral-800 rounded-xl" value={projForm.github_url} onChange={e => setProjForm({ ...projForm, github_url: e.target.value })} />
              <input type="url" placeholder="Live Demo URL" className="w-full p-3 bg-background border border-neutral-800 rounded-xl" value={projForm.demo_url} onChange={e => setProjForm({ ...projForm, demo_url: e.target.value })} />
              <input type="file" accept="image/*" onChange={e => setProjImage(e.target.files?.[0] || null)} className="w-full p-3 bg-background border border-neutral-800 rounded-xl text-text-secondary" />
              <button disabled={isLoadingProj} type="submit" className="w-full py-3 bg-primary text-background font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50">
                {isLoadingProj ? 'Saving...' : 'Save Project'}
              </button>
            </form>
          </div>

          {/* Project List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-text-primary mb-6">Existing Projects</h2>
            {projects.map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-surface border border-neutral-800 rounded-xl">
                <div>
                  <h3 className="font-bold text-text-primary">{p.title}</h3>
                  <p className="text-xs text-text-secondary mt-1 max-w-xs truncate">{p.description}</p>
                </div>
                <button onClick={() => handleDeleteProject(p.id)} className="text-red-500 text-sm hover:underline">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Add Skill Form */}
          <div className="bg-surface p-6 rounded-2xl border border-neutral-800">
            <h2 className="text-xl font-bold text-text-primary mb-6">Add New Skill</h2>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <input required type="text" placeholder="Skill Name (e.g. Flutter)" className="w-full p-3 bg-background border border-neutral-800 rounded-xl" value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} />
              <select className="w-full p-3 bg-background border border-neutral-800 rounded-xl text-text-primary" value={skillForm.category} onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}>
                <option value="mobile">Mobile</option>
                <option value="backend">Backend</option>
                <option value="devops">DevOps</option>
                <option value="tools">Tools</option>
              </select>
              <button disabled={isLoadingSkill} type="submit" className="w-full py-3 bg-primary text-background font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50">
                {isLoadingSkill ? 'Saving...' : 'Add Skill'}
              </button>
            </form>
          </div>

          {/* Skill List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-text-primary mb-6">Existing Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map(s => (
                <div key={s.id} className="flex items-center justify-between p-4 bg-surface border border-neutral-800 rounded-xl">
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded border ${s.is_active ? 'border-primary text-primary bg-primary/10' : 'border-neutral-600 text-neutral-500'} mb-2 inline-block capitalize`}>
                      {s.category}
                    </span>
                    <h3 className={`font-bold ${s.is_active ? 'text-text-primary' : 'text-text-secondary line-through'}`}>{s.name}</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleToggleSkill(s.id, s.is_active)} className="text-xs text-text-secondary hover:text-primary">Toggle</button>
                    <button onClick={() => handleDeleteSkill(s.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
