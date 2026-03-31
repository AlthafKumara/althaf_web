export interface ProjectModel {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image_url: string | null;
    github_url: string | null;
    demo_url: string | null;
    created_at: string;
}
