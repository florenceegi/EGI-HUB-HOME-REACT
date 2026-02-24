/**
 * @package src/pages
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - HowItWorksPage)
 * @date 2026-02-24
 * @purpose Spiega il concetto di "manipolatori di EGI": ogni progetto usa il
 *          protocollo EGI in modo diverso (ART, NATAN, PT, futuri).
 */
import { useEffect } from 'react';
import { SeoHead } from '@/components/common/SeoHead';
import { useI18n } from '@/i18n';
import { useUIStore } from '@/stores/useUIStore';
import {
    Palette,
    FileText,
    TrendingUp,
    ShieldCheck,
    Leaf,
    Zap,
    ArrowRight,
    Sparkles,
    Lock,
    Eye,
    BadgeDollarSign,
    Building2,
    FlaskConical,
    Heart,
    Cpu,
} from 'lucide-react';

/* ─── Tipi ────────────────────────────────────────────────────────── */
interface ManipulatorFeature {
    icon: React.ElementType;
    textKey: string;
}

interface Manipulator {
    icon: React.ElementType;
    accent: string;
    accentBg: string;
    border: string;
    tagKey: string;
    titleKey: string;
    descKey: string;
    features: ManipulatorFeature[];
    earnKey: string;
    link?: string;
}

/* ─── Dati manipolatori ───────────────────────────────────────────── */
const manipulators: Manipulator[] = [
    {
        icon: Palette,
        accent: 'text-primary',
        accentBg: 'bg-primary/10',
        border: 'border-primary/30',
        tagKey: 'how.art.tag',
        titleKey: 'how.art.title',
        descKey: 'how.art.desc',
        features: [
            { icon: ShieldCheck, textKey: 'how.art.f1' },
            { icon: BadgeDollarSign, textKey: 'how.art.f2' },
            { icon: Leaf, textKey: 'how.art.f3' },
            { icon: Sparkles, textKey: 'how.art.f4' },
            { icon: Eye, textKey: 'how.art.f5' },
        ],
        earnKey: 'how.art.earn',
        link: 'https://art.florenceegi.com',
    },
    {
        icon: FileText,
        accent: 'text-secondary',
        accentBg: 'bg-secondary/10',
        border: 'border-secondary/30',
        tagKey: 'how.natan.tag',
        titleKey: 'how.natan.title',
        descKey: 'how.natan.desc',
        features: [
            { icon: Lock, textKey: 'how.natan.f1' },
            { icon: ShieldCheck, textKey: 'how.natan.f2' },
            { icon: Cpu, textKey: 'how.natan.f3' },
            { icon: Building2, textKey: 'how.natan.f4' },
        ],
        earnKey: 'how.natan.earn',
        link: 'https://natan-loc.florenceegi.com',
    },
    {
        icon: TrendingUp,
        accent: 'text-gold',
        accentBg: 'bg-gold/10',
        border: 'border-gold/30',
        tagKey: 'how.pt.tag',
        titleKey: 'how.pt.title',
        descKey: 'how.pt.desc',
        features: [
            { icon: Zap, textKey: 'how.pt.f1' },
            { icon: Leaf, textKey: 'how.pt.f2' },
            { icon: TrendingUp, textKey: 'how.pt.f3' },
            { icon: Heart, textKey: 'how.pt.f4' },
        ],
        earnKey: 'how.pt.earn',
    },
];

/* ─── Futuri manipolatori ─────────────────────────────────────────── */
const futureItems = [
    { icon: Building2, labelKey: 'how.future.item1' },
    { icon: FlaskConical, labelKey: 'how.future.item2' },
    { icon: FileText, labelKey: 'how.future.item3' },
    { icon: ShieldCheck, labelKey: 'how.future.item4' },
    { icon: Cpu, labelKey: 'how.future.item5' },
    { icon: Heart, labelKey: 'how.future.item6' },
];

/* ─── Componente ──────────────────────────────────────────────────── */
export const HowItWorksPage: React.FC = () => {
    const navigate = useUIStore((state) => state.navigate);
    const { t } = useI18n();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="h-screen bg-dark text-white overflow-y-scroll">
            <SeoHead
                title={t('how.page_title')}
                description={t('how.hero.subtitle')}
            />

            {/* ── Sticky Header ─────────────────────────────────────── */}
            <div className="sticky top-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-light/10 p-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-3 py-2 bg-dark-light border border-light rounded-lg hover:bg-light/10 transition-colors active:scale-95"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-xs uppercase tracking-wider">{t('how.back')}</span>
                </button>
            </div>

            <div className="px-4 py-8 pb-20">

                {/* ── Hero ──────────────────────────────────────────── */}
                <div className="mb-10">
                    <p className="text-xs uppercase tracking-widest text-primary mb-2">{t('how.hero.label')}</p>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-3 leading-tight">
                        {t('how.hero.title')}
                    </h1>
                    <p className="text-base text-text-muted leading-relaxed">
                        {t('how.hero.subtitle')}
                    </p>
                </div>

                {/* ── Intro: il protocollo ───────────────────────────── */}
                <section className="mb-10 p-5 bg-dark-light rounded-xl border border-light/20">
                    <h2 className="text-xl font-bold mb-3 text-primary">{t('how.protocol.title')}</h2>
                    <p className="text-sm text-text-muted leading-relaxed mb-4">
                        {t('how.protocol.body1')}
                    </p>
                    <p className="text-sm text-text-muted leading-relaxed">
                        {t('how.protocol.body2')}
                    </p>
                    {/* Flowchart visuale */}
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1.5 bg-primary/15 border border-primary/30 rounded-full text-xs font-bold text-primary">
                            EGI Protocol
                        </span>
                        <ArrowRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                        <span className="px-3 py-1.5 bg-dark rounded-full text-xs font-semibold border border-light/20">
                            {t('how.protocol.chip1')}
                        </span>
                        <span className="px-3 py-1.5 bg-dark rounded-full text-xs font-semibold border border-light/20">
                            {t('how.protocol.chip2')}
                        </span>
                        <span className="px-3 py-1.5 bg-dark rounded-full text-xs font-semibold border border-light/20">
                            {t('how.protocol.chip3')}
                        </span>
                        <span className="px-3 py-1.5 bg-dark rounded-full text-xs font-semibold border border-light/20 opacity-60">
                            {t('how.protocol.chip4')}
                        </span>
                    </div>
                </section>

                {/* ── Titolo sezione manipolatori ───────────────────── */}
                <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1">{t('how.manipulators.title')}</h2>
                    <p className="text-sm text-text-muted">{t('how.manipulators.subtitle')}</p>
                </div>

                {/* ── Card Manipolatori ─────────────────────────────── */}
                <div className="space-y-8 mb-10">
                    {manipulators.map((m, idx) => (
                        <div key={idx} className={`p-5 bg-dark-light rounded-xl border ${m.border}`}>
                            {/* Header card */}
                            <div className="flex items-start gap-3 mb-4">
                                <div className={`p-2.5 rounded-lg ${m.accentBg} flex-shrink-0`}>
                                    <m.icon className={`w-6 h-6 ${m.accent}`} />
                                </div>
                                <div className="flex-1">
                                    <p className={`text-xs uppercase tracking-widest font-bold ${m.accent} mb-0.5`}>
                                        {t(m.tagKey)}
                                    </p>
                                    <h3 className={`text-xl font-bold ${m.accent}`}>
                                        {t(m.titleKey)}
                                    </h3>
                                </div>
                            </div>

                            {/* Descrizione */}
                            <p className="text-sm text-text-muted leading-relaxed mb-4">
                                {t(m.descKey)}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 mb-4">
                                {m.features.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-2 text-sm">
                                        <f.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${m.accent} opacity-80`} />
                                        <span className="text-white leading-snug">{t(f.textKey)}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Chi guadagna */}
                            <div className={`pt-3 border-t border-light/15 flex items-start gap-2`}>
                                <BadgeDollarSign className={`w-4 h-4 mt-0.5 flex-shrink-0 ${m.accent}`} />
                                <p className="text-xs text-text-muted leading-snug">
                                    <span className="text-white font-semibold">{t('how.earn.label')} </span>
                                    {t(m.earnKey)}
                                </p>
                            </div>

                            {/* Link piattaforma */}
                            {m.link && (
                                <a
                                    href={m.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold ${m.accent} hover:opacity-80 transition-opacity`}
                                >
                                    {t('how.visit.platform')}
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Il Filo Rosso ─────────────────────────────────── */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-3 border-b border-light/20">
                        {t('how.thread.title')}
                    </h2>
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { icon: Zap, color: 'text-primary', key: 'how.thread.item1' },
                            { icon: Leaf, color: 'text-verde-rinascita', key: 'how.thread.item2' },
                            { icon: ShieldCheck, color: 'text-secondary', key: 'how.thread.item3' },
                            { icon: Eye, color: 'text-gold', key: 'how.thread.item4' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-dark-light rounded-lg border border-light/10">
                                <item.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${item.color}`} />
                                <p className="text-sm text-text-muted leading-relaxed">
                                    {t(item.key)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Futuri manipolatori ───────────────────────────── */}
                <section className="mb-10 p-5 bg-gradient-to-br from-dark-light to-dark rounded-xl border border-light/20">
                    <h2 className="text-xl font-bold mb-2">{t('how.future.title')}</h2>
                    <p className="text-sm text-text-muted mb-5 leading-relaxed">
                        {t('how.future.body')}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {futureItems.map((fi, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-3 bg-dark rounded-lg border border-light/10 opacity-70">
                                <fi.icon className="w-4 h-4 text-text-muted flex-shrink-0" />
                                <span className="text-xs text-text-muted font-medium">{t(fi.labelKey)}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-text-muted italic">{t('how.future.note')}</p>
                </section>

                {/* ── Footer CTA ────────────────────────────────────── */}
                <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-light/20 text-center">
                    <p className="text-base mb-2 font-semibold">{t('how.cta.title')}</p>
                    <p className="text-xs text-text-muted leading-relaxed">
                        {t('how.cta.body')}
                    </p>
                </div>
            </div>
        </div>
    );
};
