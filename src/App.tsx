import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EcosystemView } from '@/features/ecosystem/EcosystemView';
import { AmbientePage } from '@/pages/AmbientePage';
import { OracodePage } from '@/pages/OracodePage';
import { CorporatePage } from '@/pages/CorporatePage';
import { useUIStore } from '@/stores/useUIStore';

import { PlatformsPage } from '@/pages/PlatformsPage';
import { NatanSystemPage } from '@/pages/NatanSystemPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { TeamPage } from '@/pages/TeamPage';
import { EcosystemPage } from '@/pages/EcosystemPage';
import { UnderConstructionPage } from '@/pages/UnderConstructionPage';
import { SigilloPage }      from '@/pages/SigilloPage';
import { SigilloPlansPage } from '@/pages/SigilloPlansPage';

// Mobile components
import { AppShell } from '@/mobile/app/AppShell';
import { HomePage as MobileHomePage } from '@/mobile/pages/HomePage';
import { WhatIsEgiPage } from '@/mobile/pages/WhatIsEgiPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function App() {
    const currentPath = useUIStore((state) => state.currentPath);
    const location = useLocation();

    // Sync Router with Store
    useEffect(() => {
        useUIStore.setState({ currentPath: location.pathname });
    }, [location]);

    // Mobile detection
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(max-width: 768px)').matches ||
            /iPhone|iPad|iPod|Android|webOS|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent);
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const media = window.matchMedia('(max-width: 768px)');
        const handleChange = () => {
            const uaMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent);
            setIsMobile(media.matches || uaMobile);
        };

        handleChange();
        media.addEventListener('change', handleChange);
        return () => media.removeEventListener('change', handleChange);
    }, []);

    // Mobile routing
    if (isMobile) {
        return (
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <AppShell>
                        {/* Simple Mobile Routing */}
                        {currentPath === '/' && <MobileHomePage />}
                        {currentPath === '/corporate' && <CorporatePage />}
                        {currentPath === '/platforms' && <UnderConstructionPage />} {/* Fallback for now */}
                        {currentPath === '/ecosystem' && <EcosystemPage />}
                        {currentPath === '/what-is' && <WhatIsEgiPage />}
                        {currentPath === '/how-it-works' && <HowItWorksPage />}
                        {currentPath === '/team' && <TeamPage />}
                        {currentPath === '/under-construction' && <UnderConstructionPage />}
                        {currentPath === '/sigillo' && <SigilloPage />}
                        {currentPath === '/sigillo/piani' && <SigilloPlansPage />}

                        {/* Fallback for unknown mobile routes */}
                        {!['/', '/corporate', '/platforms', '/ecosystem', '/what-is', '/how-it-works', '/team', '/under-construction', '/sigillo', '/sigillo/piani'].includes(currentPath) && <MobileHomePage />}

                    </AppShell>
                </QueryClientProvider>
            </HelmetProvider>
        );
    }

    // Desktop routing
    const renderPage = () => {
        // Static pages
        if (currentPath === '/ambiente') return <AmbientePage />;
        if (currentPath === '/oracode') return <OracodePage />;
        if (currentPath === '/corporate') return <CorporatePage />;
        if (currentPath === '/under-construction') return <UnderConstructionPage />;
        if (currentPath === '/what-is') return <WhatIsEgiPage />;
        if (currentPath === '/how-it-works') return <HowItWorksPage />;
        if (currentPath === '/team') return <TeamPage />;
        if (currentPath === '/ecosystem') return <EcosystemPage />;

        // Sigillo
        if (currentPath === '/sigillo') return <SigilloPage />;
        if (currentPath === '/sigillo/piani') return <SigilloPlansPage />;

        // Desktop-specific pages
        if (currentPath === '/platforms') return <PlatformsPage />;
        if (currentPath === '/platforms/natan') return <NatanSystemPage />;
        if (currentPath === '/projects') return <PlatformsPage />;

        // Home page routing - Desktop 3D view
        const path = typeof window !== 'undefined' ? window.location.pathname : currentPath;
        const isHomePath = path === '/' || currentPath === '/' || path.endsWith('/index.html');

        if (isHomePath) {
            return <EcosystemView />;
        }

        // Default fallback: desktop 3D
        return <EcosystemView />;
    };

    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                {renderPage()}
            </QueryClientProvider>
        </HelmetProvider>
    );
}

export default App;
