import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { useI18n } from '@/i18n';
import { homepageContent } from '../data/homepage';
import { useRevealOnView } from '@/hooks/useRevealOnView';
import '../styles/motion.css';

export function EgiOperationalSystemsSection() {
    const { locale } = useI18n();
    const content = homepageContent[locale];
    const { ref, className } = useRevealOnView();

    return (
        <section className="py-24 px-6 relative">
            <SectionTitle
                title={content.systems.title}
                eyebrow={content.systems.eyebrow}
                className={className}
            />

            <div ref={ref} className={`space-y-6 ${className}`} style={{ transitionDelay: '0.2s' }}>
                <Card
                    title={content.systems.florenceArt.title}
                    description={content.systems.florenceArt.description}
                    link="https://art.florenceegi.com?ref=hub"
                    linkText={content.systems.florenceArt.linkText}
                    glowColor="value" // Gold for Art
                    className="blue-glass"
                />

                <Card
                    title={content.systems.natan.title}
                    description={content.systems.natan.description}
                    link="https://natan-loc.florenceegi.com?ref=hub"
                    linkText={content.systems.natan.linkText}
                    glowColor="trust" // Blue for PA
                    className="blue-glass"
                />

                <Card
                    title={content.systems.egiPt.title}
                    description={content.systems.egiPt.description}
                    link="/under-construction"
                    linkText={content.systems.egiPt.linkText}
                    glowColor="innovation" // Violet/Pink for Pure Trading
                    className="blue-glass"
                />

                <Card
                    title={content.systems.sigillo.title}
                    description={content.systems.sigillo.description}
                    link="/sigillo"
                    linkText={content.systems.sigillo.linkText}
                    glowColor="equilibrium" // Teal — accent color
                    className="blue-glass"
                />
            </div>
        </section>
    );
}
