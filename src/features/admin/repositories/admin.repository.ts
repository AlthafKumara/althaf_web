import { supabase } from '@/utils/services/supabase_client';
import { ProjectModel } from '@/shared/models/project.model';
import { SkillModel, SkillCategory } from '@/shared/models/skill.model';
import { ProjectDto } from '@/shared/models/remote/project.dto';
import { SkillDto } from '@/shared/models/remote/skill.dto';

function mapProjectDto(dto: ProjectDto): ProjectModel {
    return {
        id: dto.id,
        title: dto.title,
        description: dto.description,
        tags: dto.tags ?? [],
        image_url: dto.image_url,
        github_url: dto.github_url,
        demo_url: dto.demo_url,
        created_at: dto.created_at,
    };
}

function mapSkillDto(dto: SkillDto): SkillModel {
    return {
        id: dto.id,
        name: dto.name,
        category: dto.category as SkillCategory,
        is_active: dto.is_active,
        created_at: dto.created_at,
    };
}

export const adminRepository = {
    // ── Projects ──────────────────────────────────────────────
    async fetchProjects(): Promise<ProjectModel[]> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        return (data as ProjectDto[]).map(mapProjectDto);
    },

    async uploadProjectImage(file: File): Promise<string> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(fileName, file);
        if (uploadError || !uploadData) throw new Error(uploadError?.message ?? 'Upload failed');
        const { data: publicURLData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
        return publicURLData.publicUrl;
    },

    async createProject(payload: {
        title: string;
        description: string;
        tags: string[];
        github_url: string;
        demo_url: string;
        image_url: string | null;
    }): Promise<void> {
        const { error } = await supabase.from('projects').insert([payload]);
        if (error) throw new Error(error.message);
    },

    async deleteProject(id: string): Promise<void> {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw new Error(error.message);
    },

    // ── Skills ────────────────────────────────────────────────
    async fetchSkills(): Promise<SkillModel[]> {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        return (data as SkillDto[]).map(mapSkillDto);
    },

    async createSkill(payload: { name: string; category: string }): Promise<void> {
        const { error } = await supabase.from('skills').insert([payload]);
        if (error) throw new Error(error.message);
    },

    async toggleSkill(id: string, currentStatus: boolean): Promise<void> {
        const { error } = await supabase
            .from('skills')
            .update({ is_active: !currentStatus })
            .eq('id', id);
        if (error) throw new Error(error.message);
    },

    async deleteSkill(id: string): Promise<void> {
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (error) throw new Error(error.message);
    },
};
