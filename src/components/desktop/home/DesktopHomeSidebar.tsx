import { useRef, useState, createContext, useContext } from 'react';
import { DesktopAboutSection } from './sections/DesktopAboutSection';
import { DesktopHeroSection } from './sections/DesktopHeroSection';
import { DesktopExamplesSection } from './sections/DesktopExamplesSection';
import { DesktopImpactSection } from './sections/DesktopImpactSection';
import { DesktopPillarsSection } from './sections/DesktopPillarsSection';
import { DesktopFooterSection } from './sections/DesktopFooterSection';

// Context to share scroll progress within the sidebar
const SidebarScrollContext = createContext<number>(0);

export const useSidebarScroll = () => useContext(SidebarScrollContext);

export const DesktopHomeSidebar = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    const handleScroll = () => {
        if (!containerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const totalScrollable = scrollHeight - clientHeight;

        if (totalScrollable > 0) {
            const currentProgress = scrollTop / totalScrollable;
            setProgress(Math.min(Math.max(currentProgress, 0), 1));
        }
    };

    return (
        <SidebarScrollContext.Provider value={progress}>
            <aside
                ref={containerRef}
                onScroll={handleScroll}
                className="fixed top-0 bottom-0 z-30 overflow-y-auto bg-black/90 border-r border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl no-scrollbar"
                style={{ background: '#05080ce6', width: '25vw', minWidth: '360px', left: '80px' }}
            >
                <div className="flex flex-col min-h-full">
                    <DesktopAboutSection />
                    <DesktopHeroSection />
                    <DesktopExamplesSection />
                    <DesktopImpactSection />
                    <DesktopPillarsSection />
                    <DesktopFooterSection />
                </div>
            </aside>
        </SidebarScrollContext.Provider>
    );
};
