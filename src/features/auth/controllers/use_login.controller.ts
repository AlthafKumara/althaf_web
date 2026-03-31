'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authRepository } from '@/features/auth/repositories/auth.repository';

interface LoginControllerState {
    email: string;
    password: string;
    isLoading: boolean;
    error: string | null;
    setEmail: (v: string) => void;
    setPassword: (v: string) => void;
    handleLogin: (e: React.FormEvent) => Promise<void>;
}

export function useLoginController(): LoginControllerState {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await authRepository.signIn(email, password);
            router.push('/admin');
            router.refresh();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Login failed');
            setIsLoading(false);
        }
    }, [email, password, router]);

    return { email, password, isLoading, error, setEmail, setPassword, handleLogin };
}
