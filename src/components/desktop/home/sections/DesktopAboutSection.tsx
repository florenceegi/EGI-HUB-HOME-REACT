import { useI18n } from '@/i18n';
import { homepageContent } from '@/data/content/homepage';
import { useRevealOnView } from '@/hooks/useRevealOnView';
import '@/mobile/styles/motion.css';

export function DesktopAboutSection() {
    const { locale } = useI18n();
    const content = homepageContent[locale];
    const { ref, className } = useRevealOnView();

    const paragraphs = content.about.body.split('\n\n');

    return (
        <section className="relative px-8 pt-12 pb-10 overflow-hidden">
            {/* Ambient glow top-left */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none" />

            <div ref={ref} className={className}>
                {/* Title block */}
                <div className="mb-8">
                    <span className="text-sm font-bold tracking-[0.3em] text-emerald-400/70 uppercase block mb-3">
                        FlorenceEGI
                    </span>
                    <h2 className="text-5xl font-bold tracking-tight text-white leading-none">
                        {content.about.title}
                    </h2>
                    <div className="mt-4 h-px bg-gradient-to-r from-emerald-500/40 via-emerald-500/10 to-transparent" />
                </div>

                {/* Body paragraphs */}
                <div className="space-y-5 mb-10">
                    {paragraphs.map((p, idx) => (
                        <p
                            key={idx}
                            className="text-lg leading-relaxed text-gray-300"
                            style={{ animationDelay: `${0.1 + idx * 0.15}s` }}
                        >
                            {highlightKeyTerms(p)}
                        </p>
                    ))}
                </div>

                {/* Highlights grid — 2x2 */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {content.about.highlights.map((h, idx) => (
                        <div
                            key={idx}
                            className="relative group rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 text-center overflow-hidden transition-all duration-500 hover:border-emerald-500/20 hover:bg-white/[0.05]"
                        >
                            {/* Glow on hover */}
                            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                            <div className="relative z-10">
                                <span className="block text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent leading-none mb-2">
                                    {h.value}
                                </span>
                                <span className="block text-sm font-medium tracking-wider text-gray-500 uppercase leading-tight">
                                    {h.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tagline */}
                <div className="pt-5 border-t border-white/[0.06]">
                    <p className="text-base tracking-wide text-gray-500 font-medium text-center leading-relaxed">
                        {content.about.cta}
                    </p>
                </div>
            </div>
        </section>
    );
}

/**
 * Highlights key terms in the text with accent color.
 * Matches: EGI, Ecological Goods Invent, Algorand, GDPR, MiCA, EPP,
 * FlorenceEGI, royalties/royalty/Tantiemen/Tantieme
 */
function highlightKeyTerms(text: string) {
    const pattern = /\b(FlorenceEGI|Ecological Goods Invent|Algorand|GDPR|MiCA(?:-safe)?|EGI|EPP)\b/g;
    const parts = text.split(pattern);

    return parts.map((part, i) => {
        if (pattern.test(part)) {
            // Reset regex lastIndex after test
            pattern.lastIndex = 0;
            return (
                <span key={i} className="text-emerald-400/90 font-semibold">
                    {part}
                </span>
            );
        }
        // Also reset for non-matches to be safe
        pattern.lastIndex = 0;
        return part;
    });
}
