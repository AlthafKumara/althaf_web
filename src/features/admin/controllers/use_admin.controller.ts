'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProjectModel } from '@/shared/models/project.model';
import { SkillModel } from '@/shared/models/skill.model';
import { adminRepository } from '@/features/admin/repositories/admin.repository';

interface ProjectForm {
    title: string;
    description: string;
    tags: string;
    github_url: string;
    demo_url: string;
}

interface SkillForm {
    name: string;
    category: string;
}

interface AdminControllerState {
    // Tab
    activeTab: 'projects' | 'skills';
    setActiveTab: (tab: 'projects' | 'skills') => void;
    // Projects
    projects: ProjectModel[];
    projForm: ProjectForm;
    setProjForm: (form: ProjectForm) => void;
    projImage: File | null;
    setProjImage: (file: File | null) => void;
    isLoadingProj: boolean;
    handleAddProject: (e: React.FormEvent) => Promise<void>;
    handleDeleteProject: (id: string) => Promise<void>;
    // Skills
    skills: SkillModel[];
    skillForm: SkillForm;
    setSkillForm: (form: SkillForm) => void;
    isLoadingSkill: boolean;
    handleAddSkill: (e: React.FormEvent) => Promise<void>;
    handleToggleSkill: (id: string, currentStatus: boolean) => Promise<void>;
    handleDeleteSkill: (id: string) => Promise<void>;
}

const defaultProjForm: ProjectForm = { title: '', description: '', tags: '', github_url: '', demo_url: '' };
const defaultSkillForm: SkillForm = { name: '', category: 'backend' };

export function useAdminController(): AdminControllerState {
    const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects');

    // Projects state
    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [projForm, setProjForm] = useState<ProjectForm>(defaultProjForm);
    const [projImage, setProjImage] = useState<File | null>(null);
    const [isLoadingProj, setIsLoadingProj] = useState(false);

    // Skills state
    const [skills, setSkills] = useState<SkillModel[]>([]);
    const [skillForm, setSkillForm] = useState<SkillForm>(defaultSkillForm);
    const [isLoadingSkill, setIsLoadingSkill] = useState(false);

    const loadProjects = useCallback(async () => {
        const data = await adminRepository.fetchProjects();
        setProjects(data);
    }, []);

    const loadSkills = useCallback(async () => {
        const data = await adminRepository.fetchSkills();
        setSkills(data);
    }, []);

    useEffect(() => {
        loadProjects();
        loadSkills();
    }, [loadProjects, loadSkills]);

    const handleAddProject = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingProj(true);

        let image_url: string | null = null;
        if (projImage) {
            image_url = await adminRepository.uploadProjectImage(projImage);
        }

        const tagsArray = projForm.tags.split(',').map((t) => t.trim()).filter((t) => t);

        await adminRepository.createProject({
            title: projForm.title,
            description: projForm.description,
            tags: tagsArray,
            github_url: projForm.github_url,
            demo_url: projForm.demo_url,
            image_url,
        });

        setProjForm(defaultProjForm);
        setProjImage(null);
        await loadProjects();
        setIsLoadingProj(false);
    }, [projForm, projImage, loadProjects]);

    const handleDeleteProject = useCallback(async (id: string) => {
        await adminRepository.deleteProject(id);
        await loadProjects();
    }, [loadProjects]);

    const handleAddSkill = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingSkill(true);
        await adminRepository.createSkill(skillForm);
        setSkillForm(defaultSkillForm);
        await loadSkills();
        setIsLoadingSkill(false);
    }, [skillForm, loadSkills]);

    const handleToggleSkill = useCallback(async (id: string, currentStatus: boolean) => {
        await adminRepository.toggleSkill(id, currentStatus);
        await loadSkills();
    }, [loadSkills]);

    const handleDeleteSkill = useCallback(async (id: string) => {
        await adminRepository.deleteSkill(id);
        await loadSkills();
    }, [loadSkills]);

    return {
        activeTab, setActiveTab,
        projects, projForm, setProjForm, projImage, setProjImage, isLoadingProj,
        handleAddProject, handleDeleteProject,
        skills, skillForm, setSkillForm, isLoadingSkill,
        handleAddSkill, handleToggleSkill, handleDeleteSkill,
    };
}
