export type SkillCategory = 'mobile' | 'backend' | 'devops' | 'tools';

export interface SkillModel {
    id: string;
    name: string;
    category: SkillCategory;
    is_active: boolean;
    created_at: string;
}
