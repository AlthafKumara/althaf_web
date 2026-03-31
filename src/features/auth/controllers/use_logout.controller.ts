'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authRepository } from '../repositories/auth.repository';

interface LogoutControllerState {
    handleLogout: () => Promise<void>;
}

/**
 * Encapsulates sign-out logic and post-logout navigation.
 * Replaces the direct authRepository call that was previously in admin/layout.tsx.
 */
export function useLogoutController(): LogoutControllerState {
    const router = useRouter();

    const handleLogout = useCallback(async () => {
        await authRepository.signOut();
        router.push('/login');
        router.refresh();
    }, [router]);

    return { handleLogout };
}
