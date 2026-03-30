/**
 * @package EGI-HUB-HOME — AnalyticsSitesList
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB)
 * @date 2026-03-30
 * @purpose Lista siti attivi con conteggio pageview per la dashboard analytics
 */
import type { TopSiteEntry } from '../../../services/endpoints/analyticsApi';

interface AnalyticsSitesListProps {
    sites: TopSiteEntry[];
    loading?: boolean;
}

const SITE_LABELS: Record<string, string> = {
    'natan-loc':    'NATAN LOC',
    'egi-hub-home': 'EGI-HUB Home',
    'egi':          'EGI',
    'egi-info':     'EGI Info',
    'sigillo':      'Sigillo',
};

const SITE_COLORS: Record<string, string> = {
    'natan-loc':    'bg-blue-100 text-blue-800',
    'egi-hub-home': 'bg-purple-100 text-purple-800',
    'egi':          'bg-green-100 text-green-800',
    'egi-info':     'bg-amber-100 text-amber-800',
    'sigillo':      'bg-rose-100 text-rose-800',
};

function SiteSkeleton() {
    return (
        <div className="flex gap-2 flex-wrap" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse bg-gray-200 rounded-full h-7 w-28" />
            ))}
        </div>
    );
}

export function AnalyticsSitesList({ sites, loading }: AnalyticsSitesListProps) {
    if (loading) return <SiteSkeleton />;

    if (!sites.length) {
        return (
            <p className="text-sm text-gray-400">Nessun sito con dati nel periodo.</p>
        );
    }

    const maxCount = Math.max(...sites.map((s) => s.count), 1);

    return (
        <div className="space-y-3">
            {sites.map((site) => {
                const label = SITE_LABELS[site.site_id] ?? site.site_id;
                const badge = SITE_COLORS[site.site_id] ?? 'bg-gray-100 text-gray-700';
                const pct   = Math.round((site.count / maxCount) * 100);

                return (
                    <div key={site.site_id} className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${badge}`}>
                            {label}
                        </span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                                className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                                role="presentation"
                            />
                        </div>
                        <span className="text-xs tabular-nums text-gray-600 w-14 text-right">
                            {site.count.toLocaleString('it-IT')}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
