/**
 * @package EGI-HUB-HOME-REACT — utils
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB-HOME-REACT)
 * @date 2026-04-21
 * @purpose Gestione preferenze A11y utente con persistenza cross-subdomain .florenceegi.com.
 *          Cookie Domain=.florenceegi.com SameSite=Lax per condivisione fra organi (EGI, NATAN_LOC, EGI-HUB, EGI-Credential).
 *          Fallback localStorage se document.cookie non disponibile.
 */

export type A11yContrast = 'default' | 'high';
export type A11yReducedMotion = 'system' | 'on';
export type A11yFontScale = 'default' | 'large' | 'xlarge';

export interface A11yPrefs {
    contrast: A11yContrast;
    reducedMotion: A11yReducedMotion;
    fontScale: A11yFontScale;
}

const COOKIE_NAME = 'florenceegi_a11y_prefs';
const LS_KEY = 'florenceegi_a11y_prefs';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const DEFAULT_PREFS: A11yPrefs = {
    contrast: 'default',
    reducedMotion: 'system',
    fontScale: 'default',
};

function isFlorenceegiDomain(): boolean {
    if (typeof window === 'undefined') return false;
    return window.location.hostname.endsWith('.florenceegi.com') || window.location.hostname === 'florenceegi.com';
}

function readCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string): void {
    if (typeof document === 'undefined') return;
    const domain = isFlorenceegiDomain() ? '; Domain=.florenceegi.com' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${domain}`;
}

function safeParse(raw: string | null): Partial<A11yPrefs> | null {
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed as Partial<A11yPrefs>;
    } catch {
        return null;
    }
    return null;
}

export function readA11yPrefs(): A11yPrefs {
    if (typeof window === 'undefined') return { ...DEFAULT_PREFS };

    const fromCookie = safeParse(readCookie(COOKIE_NAME));
    const fromLs = safeParse(window.localStorage.getItem(LS_KEY));
    const merged = { ...DEFAULT_PREFS, ...(fromLs ?? {}), ...(fromCookie ?? {}) };

    return {
        contrast: merged.contrast === 'high' ? 'high' : 'default',
        reducedMotion: merged.reducedMotion === 'on' ? 'on' : 'system',
        fontScale: merged.fontScale === 'large' ? 'large' : merged.fontScale === 'xlarge' ? 'xlarge' : 'default',
    };
}

export function writeA11yPrefs(prefs: A11yPrefs): void {
    if (typeof window === 'undefined') return;
    const payload = JSON.stringify(prefs);
    writeCookie(COOKIE_NAME, payload);
    try {
        window.localStorage.setItem(LS_KEY, payload);
    } catch {
        /* noop */
    }
}

export function applyA11yPrefs(prefs: A11yPrefs): void {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;

    if (prefs.contrast === 'high') {
        html.dataset.a11yContrast = 'high';
    } else {
        delete html.dataset.a11yContrast;
    }

    if (prefs.reducedMotion === 'on') {
        html.dataset.a11yReducedMotion = 'on';
    } else {
        delete html.dataset.a11yReducedMotion;
    }

    if (prefs.fontScale === 'large' || prefs.fontScale === 'xlarge') {
        html.dataset.a11yFontScale = prefs.fontScale;
    } else {
        delete html.dataset.a11yFontScale;
    }
}
