'use client';

import { useState, useEffect } from 'react';
import { SkillModel } from '@/shared/models/skill.model';
import { skillRepository } from '@/features/home/skills/repositories/skill.repository';

interface SkillsControllerState {
    skills: SkillModel[];
    isLoading: boolean;
    error: string | null;
}

export function useSkillsController(): SkillsControllerState {
    const [skills, setSkills] = useState<SkillModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        skillRepository
            .fetchActiveSkills()
            .then((data) => {
                if (isMounted) setSkills(data);
            })
            .catch((err: Error) => {
                if (isMounted) setError(err.message);
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    return { skills, isLoading, error };
}
