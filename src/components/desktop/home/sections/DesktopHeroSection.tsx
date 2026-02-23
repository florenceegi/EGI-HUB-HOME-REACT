import { useI18n } from '@/i18n';
import { homepageContent } from '@/data/content/homepage';
import { EgiTransformationAnimation } from '@/mobile/components/EgiTransformationAnimation';
import '@/mobile/styles/motion.css'; // Reusing global motion styles

export function DesktopHeroSection() {
    const { locale } = useI18n();
    const content = homepageContent[locale];

    return (
        <section className="min-h-[80vh] flex flex-col justify-center px-8 py-20 relative overflow-hidden">
            <div className="space-y-8 relative z-10">
                <div className="reveal is-in inline-flex items-center px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm">
                    <span className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase">
                        {content.hero.badge}
                    </span>
                </div>

                <div>
                    <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-sm">
                        {content.hero.headline.split(/(EGI)/g).map((part, i) =>
                            part === 'EGI' ? (
                                <span
                                    key={i}
                                    className="font-extrabold bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent inline-block"
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
                    <p className="text-base leading-relaxed text-gray-300">
                        {content.hero.subheadline}
                    </p>
                </div>

                <div className="my-8 reveal is-in flex justify-center w-full min-h-[250px]" style={{ animationDelay: '0.4s' }}>
                    <div className="w-full flex justify-center scale-90 origin-top">
                        {/* Reusing the animation component as it's self-contained */}
                        <EgiTransformationAnimation />
                    </div>
                </div>
            </div>
        </section>
    );
}
