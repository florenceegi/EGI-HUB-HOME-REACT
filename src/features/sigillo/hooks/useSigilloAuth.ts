/**
 * useSigilloAuth — Hook per autenticazione cross-domain su florenceegi.com/sigillo.
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-25
 * @purpose Gestisce login/register/logout via Bearer token Sanctum.
 *          Token in localStorage → egiApi interceptor lo aggiunge automaticamente.
 *          Nessun redirect ad art.florenceegi.com.
 */
import { useState, useEffect, useCallback } from 'react';
import { egiApi } from '../../../services/api';

const TOKEN_KEY = 'auth_token';       // Chiave letta dall'interceptor di egiApi
const USER_KEY  = 'sigillo_user';

export interface SigilloUser {
    name:  string;
    email: string;
}

export interface RegisterData {
    name:                    string;
    email:                   string;
    password:                string;
    password_confirmation:   string;
    privacy_policy_accepted: boolean;
    terms_accepted:          boolean;
    age_confirmation:        boolean;
}

export interface UseSigilloAuthReturn {
    user:      SigilloUser | null;
    isLoading: boolean;
    error:     string | null;
    login:     (email: string, password: string) => Promise<void>;
    register:  (data: RegisterData) => Promise<void>;
    logout:    () => void;
    clearError: () => void;
}

export function useSigilloAuth(): UseSigilloAuthReturn {
    const [user, setUser]         = useState<SigilloUser | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError]       = useState<string | null>(null);

    // Ripristina utente dal localStorage al montaggio
    useEffect(() => {
        const token  = localStorage.getItem(TOKEN_KEY);
        const stored = localStorage.getItem(USER_KEY);
        if (token && stored) {
            try { setUser(JSON.parse(stored)); } catch { /* stored malformato */ }
        }
    }, []);

    const persist = (token: string, userData: SigilloUser) => {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setUser(userData);
    };

    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await egiApi.post<{ token: string; user: SigilloUser }>(
                '/sigillo/auth/login',
                { email, password }
            );
            persist(data.token, data.user);
        } catch (err: any) {
            const msg = err.response?.data?.message ?? 'Email o password non corretti.';
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (data: RegisterData) => {
        setLoading(true);
        setError(null);
        try {
            const { data: resp } = await egiApi.post<{ token: string; user: SigilloUser }>(
                '/sigillo/auth/register',
                data
            );
            persist(resp.token, resp.user);
        } catch (err: any) {
            const raw = err.response?.data;
            const msg = raw?.message
                ?? (raw?.errors ? Object.values(raw.errors).flat().join(' ') : null)
                ?? 'Errore durante la registrazione.';
            setError(msg as string);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { user, isLoading, error, login, register, logout, clearError };
}
