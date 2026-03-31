/** Raw shape returned by Supabase for the `projects` table. */
export interface ProjectDto {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image_url: string | null;
    github_url: string | null;
    demo_url: string | null;
    created_at: string;
}
