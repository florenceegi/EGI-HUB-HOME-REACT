import { AboutSection } from '@/mobile/sections/AboutSection';
import { HeroSection } from '@/mobile/sections/HeroSection';
import { EgiExamplesSection } from '@/mobile/sections/EgiExamplesSection';
import { TransitionSection } from '@/mobile/sections/TransitionSection';
import { ImpactSection } from '@/mobile/sections/ImpactSection';
import { EgiOperationalSystemsSection } from '@/mobile/sections/EgiOperationalSystemsSection';
import { PillarsSection } from '@/mobile/sections/PillarsSection';
import { ForWhoSection } from '@/mobile/sections/ForWhoSection';
import { FinalCtaSection } from '@/mobile/sections/FinalCtaSection';
import { FooterSection } from '@/mobile/sections/FooterSection';

export function HomePage() {
    return (
        <div className="flex flex-col gap-0 pb-20">
            {/* State 1: Air & Light */}
            <AboutSection />
            <HeroSection />
            <EgiExamplesSection />

            {/* EPP Core Section */}
            <ImpactSection />

            {/* State 2: Transition & Dark Phase (Triggered by Scroll) */}
            <TransitionSection />

            {/* State 3: Return to Light (Structure) */}
            <EgiOperationalSystemsSection />
            <PillarsSection />
            <ForWhoSection />
            <FinalCtaSection />
            <FooterSection />
        </div>
    );
}
