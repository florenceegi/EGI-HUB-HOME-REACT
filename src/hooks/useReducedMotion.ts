/**
 * @package EGI-HUB-HOME-REACT — hooks
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB-HOME-REACT)
 * @date 2026-04-21
 * @purpose Hook reattivo a prefers-reduced-motion (OS) + override utente via data-a11y-reduced-motion="on".
 *          Propagato da CREATOR-STAGING reference (M-101).
 */

import { useEffect, useState } from 'react';

function detectReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    const userOverride = document.documentElement.dataset.a11yReducedMotion === 'on';
    if (userOverride) return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(detectReducedMotion);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setPrefersReducedMotion(detectReducedMotion());
        mql.addEventListener('change', onChange);

        const observer = new MutationObserver(() => setPrefersReducedMotion(detectReducedMotion()));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-a11y-reduced-motion'] });

        return () => {
            mql.removeEventListener('change', onChange);
            observer.disconnect();
        };
    }, []);

    return prefersReducedMotion;
}
