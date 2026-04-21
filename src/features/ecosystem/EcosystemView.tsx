import { useEffect } from 'react';
import { Loader } from '@/components/ui/Loader';
import { useEcosystemData } from './useEcosystemData';
import { DesktopHomeSidebar } from '@/components/desktop/home/DesktopHomeSidebar';
import { Sidebar } from '@/components/layout/Sidebar';
import { DesktopEgiCube } from '@/components/desktop/DesktopEgiCube';
import { TopBar } from '@/components/layout/TopBar';
import { useI18n } from '@/i18n';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const EcosystemView = () => {
    console.log(`📺 [EcosystemView] Rendering`);
    const { data: ecosystem, loading: isLoading } = useEcosystemData();
    const { t } = useI18n();
    const prefersReducedMotion = useReducedMotion();

    // A11y (M-101): canvas 3D è decorativo background — aria-hidden.
    // Screen reader naviga contenuto testuale (TopBar, Sidebar, DesktopHomeSidebar).
    // Su reduced-motion: expose global flag, engine.js lo legge per disattivare auto-rotation.
    useEffect(() => {
        const w = window as unknown as Record<string, unknown>;
        w.__florenceegiReducedMotion = prefersReducedMotion;
        window.dispatchEvent(new CustomEvent('florenceegi:reduced-motion', { detail: { enabled: prefersReducedMotion } }));

        const markCanvas = () => {
            const canvases = document.querySelectorAll<HTMLCanvasElement>('canvas');
            canvases.forEach((c) => {
                if (!c.hasAttribute('aria-hidden')) c.setAttribute('aria-hidden', 'true');
                if (!c.hasAttribute('role')) c.setAttribute('role', 'presentation');
                if (!c.hasAttribute('tabindex')) c.setAttribute('tabindex', '-1');
            });
        };
        markCanvas();
        const observer = new MutationObserver(markCanvas);
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [prefersReducedMotion]);

    if (isLoading || !ecosystem) {
        return <Loader />;
    }

    return (
        <>
            {/* A11y landmark: descrizione ecosystem per screen reader (canvas 3D è decorativo) */}
            <p className="sr-only">{t('a11y.ecosystem.description')}</p>

            {/* Top Navigation Bar */}
            <TopBar />

            {/* Left Navigation Sidebar */}
            <Sidebar />

            {/* EGI Transformation Cube (Center-left) */}
            <DesktopEgiCube />

            {/* New Desktop Sidebar (Content, shifted right) */}
            <DesktopHomeSidebar />

            {/* 3D Scene renders via engine.js loaded in index.html */}
            {/* Canvas marked aria-hidden via MutationObserver (decorative background) */}
        </>
    );
};

