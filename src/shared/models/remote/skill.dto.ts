/** Raw shape returned by Supabase for the `skills` table. */
export interface SkillDto {
    id: string;
    name: string;
    category: string;
    is_active: boolean;
    created_at: string;
}
