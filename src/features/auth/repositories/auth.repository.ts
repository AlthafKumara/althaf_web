import { supabase } from '@/utils/services/supabase_client';

export const authRepository = {
    async signIn(email: string, password: string): Promise<void> {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
    },

    async signOut(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message);
    },
};
