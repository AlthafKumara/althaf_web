'use client';

import { useState, useEffect } from 'react';
import { ProjectModel } from '@/shared/models/project.model';
import { projectRepository } from '@/features/home/projects/repositories/project.repository';

interface ProjectsControllerState {
    projects: ProjectModel[];
    isLoading: boolean;
    error: string | null;
}

export function useProjectsController(): ProjectsControllerState {
    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        projectRepository
            .fetchProjects()
            .then((data) => {
                if (isMounted) setProjects(data);
            })
            .catch((err: Error) => {
                if (isMounted) setError(err.message);
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    return { projects, isLoading, error };
}
