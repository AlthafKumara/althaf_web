'use client';

import { useState, useEffect, useCallback } from 'react';
import { ActivityDataModel } from '@/shared/models/activity.model';
// ⚠️  The git tokens are server-only env vars — repository must be called via
//     a Server Action, never directly from a client-side hook.
import { fetchActivityData } from '@/app/actions/activity';

interface ActivityControllerState {
    data: ActivityDataModel | null;
    isLoading: boolean;
    error: string | null;
    selectedYear: number;
    setSelectedYear: (year: number) => void;
}

export function useActivityController(
    initialYear: number = new Date().getFullYear()
): ActivityControllerState {
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [data, setData] = useState<ActivityDataModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        // fetchActivityData is a Next.js Server Action — runs on the server,
        // has access to GITHUB_TOKEN / GITLAB_TOKEN, returns serialised data.
        fetchActivityData(selectedYear)
            .then((payload) => {
                if (isMounted) setData(payload);
            })
            .catch((err: unknown) => {
                if (isMounted) setError(err instanceof Error ? err.message : 'Failed to load activity');
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => { isMounted = false; };
    }, [selectedYear]);

    const handleSetYear = useCallback((year: number) => {
        setSelectedYear(year);
    }, []);

    return { data, isLoading, error, selectedYear, setSelectedYear: handleSetYear };
}
