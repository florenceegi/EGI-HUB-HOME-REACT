/**
 * @package EGI-HUB-HOME — LsoEcosystem
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB-HOME)
 * @date 2026-03-31
 * @purpose Sub-footer LSO — presenta l'ecosistema FlorenceEGI e invita
 *          a esplorare gli altri organi del Living System Oracode.
 *          Rotta corrente: florenceegi.com (hub) — questo sito evidenziato.
 */
import { useI18n } from '@/i18n';
import { lsoContent } from '../data/lsoContent';

const LSO_SITES = [
    { key: 'hub',        url: 'https://florenceegi.com',                isCurrent: true  },
    { key: 'egi',        url: 'https://art.florenceegi.com',            isCurrent: false },
    { key: 'natan',      url: 'https://natan-loc.florenceegi.com',      isCurrent: false },
    { key: 'credential', url: 'https://egi-credential.florenceegi.com', isCurrent: false },
    { key: 'sigillo',    url: 'https://egi-sigillo.florenceegi.com',    isCurrent: false },
] as const;

type SiteKey = typeof LSO_SITES[number]['key'];

export function LsoEcosystem() {
    const { locale } = useI18n();
    const content = lsoContent[locale];

    return (
        <section
            className="border-t border-[var(--border)] bg-[var(--surface2)]/20 py-10 px-6"
            aria-label="Living System Oracode — ecosistema FlorenceEGI"
        >
            <div className="max-w-lg mx-auto flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-widest text-purple-500 font-semibold">
                        Living System Oracode
                    </span>
                    <p className="text-xs text-[var(--muted)]">
                        {content.subtitle}
                    </p>
                </div>

                {/* Siti */}
                <div className="flex flex-col gap-3" role="list" aria-label={content.exploreLabel}>
                    {LSO_SITES.map((site) => {
                        const siteContent = content.sites[site.key as SiteKey];

                        if (site.isCurrent) {
                            return (
                                <div
                                    key={site.key}
                                    role="listitem"
                                    className="flex items-start gap-3 rounded-lg border border-purple-500/40 bg-purple-500/5 px-4 py-3"
                                >
                                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-[var(--text)]">
                                                {siteContent.name}
                                            </span>
                                            <span className="text-[10px] text-purple-400 border border-purple-500/30 rounded px-1.5 py-0.5 leading-none">
                                                {content.currentSiteLabel}
                                            </span>
                                        </div>
                                        <span className="text-xs text-[var(--muted)]">
                                            {siteContent.desc}
                                        </span>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <a
                                key={site.key}
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                role="listitem"
                                className="flex items-start gap-3 rounded-lg border border-[var(--border)] px-4 py-3 hover:border-purple-500/40 hover:bg-purple-500/5 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                                aria-label={`${siteContent.name} — ${siteContent.desc}`}
                            >
                                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                    <span className="text-xs font-semibold text-[var(--text)]">
                                        {siteContent.name}
                                    </span>
                                    <span className="text-xs text-[var(--muted)]">
                                        {siteContent.desc}
                                    </span>
                                </div>
                                <svg
                                    aria-hidden="true"
                                    className="w-3 h-3 mt-0.5 text-[var(--muted)] shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                                </svg>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
