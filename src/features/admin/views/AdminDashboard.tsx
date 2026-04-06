/**
 * @fileoverview Admin Dashboard View
 *
 * The main container for the admin CMS panel. Provides tab navigation
 * between the Project Manager and Skill Manager sections.
 *
 * This is a thin orchestration component — it delegates all CRUD logic
 * and rendering to the `ProjectManager` and `SkillManager` sub-views.
 *
 * @module features/admin/views/AdminDashboard
 */

"use client";

import { useState } from "react";
import ProjectManager from "./ProjectManager";
import SkillManager from "./SkillManager";

/** The two available admin tabs. */
type AdminTab = "projects" | "skills";

/**
 * Renders the admin dashboard with tab-based navigation.
 *
 * Tabs:
 * - **Projects Manager**: CRUD interface for portfolio projects
 * - **Skills Manager**: CRUD interface for technical skills
 */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex items-center gap-4 border-b border-neutral-800 pb-4">
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            activeTab === "projects"
              ? "bg-primary text-background"
              : "text-text-secondary hover:bg-surface"
          }`}
        >
          Projects Manager
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2 font-bold rounded-xl transition-colors ${
            activeTab === "skills"
              ? "bg-primary text-background"
              : "text-text-secondary hover:bg-surface"
          }`}
        >
          Skills Manager
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "projects" && <ProjectManager />}
      {activeTab === "skills" && <SkillManager />}
    </div>
  );
}
