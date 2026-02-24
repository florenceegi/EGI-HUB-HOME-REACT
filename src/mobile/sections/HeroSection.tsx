
import { useI18n } from '@/i18n';
import { homepageContent } from '../data/homepage';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { EgiTransformationAnimation } from '../components/EgiTransformationAnimation';
import '../styles/motion.css';

export function HeroSection() {
    const { locale } = useI18n();
    const content = homepageContent[locale];
    const progress = useScrollProgress();

    // Parallax/Scale logic: title scales up slightly as you scroll down (State 1 dynamics)
    // Scale 1 -> 1.05 during the first 20% of scroll
    const scale = 1 + (Math.min(progress, 0.2) * 0.25);
    // Fade-out solo dopo il 40% di scroll globale — evita il fade prematuro su mobile
    const opacity = 1 - Math.min(Math.max(progress - 0.4, 0) * 4, 1);

    return (
        <section className="min-h-[92vh] flex flex-col justify-center px-6 pt-32 relative overflow-hidden">
            {/* Background elements are handled by HomeAtmosphere, but we can add local decorative items if needed */}

            <div
                className="space-y-8 relative z-10"
                style={{ opacity }} // Fade out on scroll
            >
                <div className="reveal is-in inline-flex items-center px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm">
                    <span className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase">
                        {content.hero.badge}
                    </span>
                </div>

                <div
                    className="origin-left will-change-transform"
                    style={{ transform: `scale(${scale})` }}
                >
                    <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-[var(--text)] drop-shadow-sm">
                        {content.hero.headline.split(/(EGI)/g).map((part, i) =>
                            part === 'EGI' ? (
                                <span
                                    key={i}
                                    className="font-extrabold bg-gradient-to-r from-gray-400 to-emerald-500 bg-clip-text text-transparent inline-block"
                                >
                                    EGI
                                </span>
                            ) : (
                                part
                            )
                        )}
                    </h1>
                </div>

                <div className="reveal is-in" style={{ animationDelay: '0.2s' }}>
                    <p className="text-lg leading-relaxed text-[var(--muted)] max-w-[90%]">
                        {content.hero.subheadline}
                    </p>
                </div>

                <div className="my-8 reveal is-in flex justify-center w-full min-h-[300px]" style={{ animationDelay: '0.4s' }}>
                    <div className="w-full flex justify-center">
                        <EgiTransformationAnimation />
                    </div>
                </div>
            </div>
        </section>
    );
}
