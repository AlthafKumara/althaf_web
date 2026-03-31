"use client";

import { useAdminController } from "@/features/admin";
import { ProjectsManager } from "@/features/admin";
import { SkillsManager } from "@/features/admin";

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
      {/* Tab Navigation */}
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
        <ProjectsManager
          projects={projects}
          projForm={projForm}
          setProjForm={setProjForm}
          projImage={projImage}
          setProjImage={setProjImage}
          isLoadingProj={isLoadingProj}
          handleAddProject={handleAddProject}
          handleDeleteProject={handleDeleteProject}
        />
      )}

      {activeTab === 'skills' && (
        <SkillsManager
          skills={skills}
          skillForm={skillForm}
          setSkillForm={setSkillForm}
          isLoadingSkill={isLoadingSkill}
          handleAddSkill={handleAddSkill}
          handleToggleSkill={handleToggleSkill}
          handleDeleteSkill={handleDeleteSkill}
        />
      )}
    </div>
  );
}

