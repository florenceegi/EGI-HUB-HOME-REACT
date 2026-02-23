import { useI18n } from '@/i18n';
import { homepageContent } from '../data/homepage';
import { useRevealOnView } from '@/hooks/useRevealOnView';
import '../styles/motion.css';

export function AboutSection() {
    const { locale } = useI18n();
    const content = homepageContent[locale];
    const { ref, className } = useRevealOnView();

    const paragraphs = content.about.body.split('\n\n');

    return (
        <section className="px-6 pt-10 pb-8 relative overflow-hidden">
            <div ref={ref} className={className}>
                {/* Title block */}
                <div className="mb-6">
                    <span className="text-sm font-bold tracking-[0.3em] text-[var(--accent)] opacity-70 uppercase block mb-3">
                        FlorenceEGI
                    </span>
                    <h2 className="text-4xl font-bold tracking-tight text-[var(--text)] leading-none">
                        {content.about.title}
                    </h2>
                    <div className="mt-4 h-px bg-[var(--border)]" />
                </div>

                {/* Body paragraphs */}
                <div className="space-y-5 mb-10">
                    {paragraphs.map((p, idx) => (
                        <p
                            key={idx}
                            className="text-base leading-relaxed text-[var(--muted)]"
                        >
                            {highlightKeyTerms(p)}
                        </p>
                    ))}
                </div>

                {/* Highlights grid — 2x2 */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {content.about.highlights.map((h, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center"
                        >
                            <span className="block text-3xl font-extrabold tracking-tight text-[var(--text)] leading-none mb-1.5">
                                {h.value}
                            </span>
                            <span className="block text-xs font-medium tracking-wider text-[var(--muted)] uppercase leading-tight">
                                {h.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Tagline */}
                <div className="pt-4 border-t border-[var(--border)]">
                    <p className="text-sm tracking-wide text-[var(--muted)] font-medium text-center leading-relaxed">
                        {content.about.cta}
                    </p>
                </div>
            </div>
        </section>
    );
}

function highlightKeyTerms(text: string) {
    const pattern = /\b(FlorenceEGI|Ecological Goods Invent|Algorand|GDPR|MiCA(?:-safe)?|EGI|EPP)\b/g;
    const parts = text.split(pattern);

    return parts.map((part, i) => {
        if (pattern.test(part)) {
            pattern.lastIndex = 0;
            return (
                <span key={i} className="text-[var(--accent)] font-semibold">
                    {part}
                </span>
            );
        }
        pattern.lastIndex = 0;
        return part;
    });
}
