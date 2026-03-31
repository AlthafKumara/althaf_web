"use client";

import { SkillModel } from "@/shared/models/skill.model";

interface SkillForm {
  name: string;
  category: string;
}

interface SkillsManagerProps {
  skills: SkillModel[];
  skillForm: SkillForm;
  setSkillForm: (form: SkillForm) => void;
  isLoadingSkill: boolean;
  handleAddSkill: (e: React.FormEvent) => Promise<void>;
  handleToggleSkill: (id: string, currentStatus: boolean) => Promise<void>;
  handleDeleteSkill: (id: string) => Promise<void>;
}

export default function SkillsManager({
  skills,
  skillForm,
  setSkillForm,
  isLoadingSkill,
  handleAddSkill,
  handleToggleSkill,
  handleDeleteSkill,
}: SkillsManagerProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Add Skill Form */}
      <div className="bg-surface p-6 rounded-2xl border border-neutral-800">
        <h2 className="text-xl font-bold text-text-primary mb-6">Add New Skill</h2>
        <form onSubmit={handleAddSkill} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Skill Name (e.g. Flutter)"
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl"
            value={skillForm.name}
            onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
          />
          <select
            className="w-full p-3 bg-background border border-neutral-800 rounded-xl text-text-primary"
            value={skillForm.category}
            onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
          >
            <option value="mobile">Mobile</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
            <option value="tools">Tools</option>
          </select>
          <button
            disabled={isLoadingSkill}
            type="submit"
            className="w-full py-3 bg-primary text-background font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isLoadingSkill ? 'Saving...' : 'Add Skill'}
          </button>
        </form>
      </div>

      {/* Skill List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-text-primary mb-6">Existing Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-4 bg-surface border border-neutral-800 rounded-xl">
              <div>
                <span
                  className={`text-xs px-2 py-0.5 rounded border ${
                    s.is_active
                      ? 'border-primary text-primary bg-primary/10'
                      : 'border-neutral-600 text-neutral-500'
                  } mb-2 inline-block capitalize`}
                >
                  {s.category}
                </span>
                <h3 className={`font-bold ${s.is_active ? 'text-text-primary' : 'text-text-secondary line-through'}`}>
                  {s.name}
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleToggleSkill(s.id, s.is_active)}
                  className="text-xs text-text-secondary hover:text-primary"
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleDeleteSkill(s.id)}
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
