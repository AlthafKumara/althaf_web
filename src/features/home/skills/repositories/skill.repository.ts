import { supabase } from '@/utils/services/supabase_client';
import { SkillModel, SkillCategory } from '@/shared/models/skill.model';
import { SkillDto } from '@/shared/models/remote/skill.dto';

function mapDtoToModel(dto: SkillDto): SkillModel {
    return {
        id: dto.id,
        name: dto.name,
        category: dto.category as SkillCategory,
        is_active: dto.is_active,
        created_at: dto.created_at,
    };
}

export const skillRepository = {
    async fetchActiveSkills(): Promise<SkillModel[]> {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .eq('is_active', true);

        if (error) throw new Error(error.message);
        return (data as SkillDto[]).map(mapDtoToModel);
    },
};
