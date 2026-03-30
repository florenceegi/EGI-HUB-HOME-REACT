/**
 * @package EGI-HUB-HOME — SuperadminAnalyticsPage
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB)
 * @date 2026-03-30
 * @purpose Dashboard Web Analytics per superadmin FlorenceEGI.
 *          Richiede auth_token in localStorage + ruolo superadmin verificato da API.
 *          Non accessibile da mobile — redirect a Home se path non riconosciuto.
 */
import { useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { useWebAnalytics, type PeriodKey, type SiteFilter } from '../features/analytics/hooks/useWebAnalytics';
import { AnalyticsStatCard }  from '../features/analytics/components/AnalyticsStatCard';
import { AnalyticsEventChart } from '../features/analytics/components/AnalyticsEventChart';
import { AnalyticsSitesList }  from '../features/analytics/components/AnalyticsSitesList';

// ─── Guard: token assente → redirect ─────────────────────────────────────────
function useAuthGuard() {
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            useUIStore.setState({ currentPath: '/' });
        }
    }, []);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const SITE_OPTIONS: Array<{ value: SiteFilter; label: string }> = [
    { value: 'all',          label: 'Tutti i siti'  },
    { value: 'natan-loc',    label: 'NATAN LOC'     },
    { value: 'egi-hub-home', label: 'EGI-HUB Home'  },
    { value: 'egi',          label: 'EGI'            },
    { value: 'egi-info',     label: 'EGI Info'       },
    { value: 'sigillo',      label: 'Sigillo'        },
];

const PERIOD_OPTIONS: Array<{ value: PeriodKey; label: string }> = [
    { value: '7d',  label: 'Ultimi 7 giorni'  },
    { value: '30d', label: 'Ultimi 30 giorni' },
    { value: '90d', label: 'Ultimi 90 giorni' },
];

// ─── Select stilizzata ────────────────────────────────────────────────────────
interface FilterSelectProps<T extends string> {
    id:       string;
    label:    string;
    value:    T;
    onChange: (v: T) => void;
    options:  Array<{ value: T; label: string }>;
}

function FilterSelect<T extends string>({ id, label, value, onChange, options }: FilterSelectProps<T>) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="sr-only">{label}</label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                className="
                    border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    cursor-pointer
                "
                aria-label={label}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}

// ─── Errore ───────────────────────────────────────────────────────────────────
function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <div
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 flex items-center justify-between gap-4"
        >
            <span className="text-sm">{message}</span>
            <button
                type="button"
                onClick={onRetry}
                className="text-sm font-semibold underline focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
            >
                Riprova
            </button>
        </div>
    );
}

// ─── Accesso non autorizzato ──────────────────────────────────────────────────
function UnauthorizedView() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
            <div className="text-center space-y-3">
                <p className="text-2xl font-bold text-gray-800">Accesso non autorizzato</p>
                <p className="text-gray-500 text-sm">
                    Questa sezione richiede un account superadmin FlorenceEGI.
                </p>
                <button
                    type="button"
                    onClick={() => useUIStore.setState({ currentPath: '/' })}
                    className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold
                               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Torna alla home
                </button>
            </div>
        </div>
    );
}

// ─── Pagina principale ────────────────────────────────────────────────────────
export function SuperadminAnalyticsPage() {
    useAuthGuard();

    const token = localStorage.getItem('auth_token');
    if (!token) return <UnauthorizedView />;

    const {
        overview, events, loading, error,
        siteId, setSiteId, period, setPeriod, refresh,
    } = useWebAnalytics();

    const activeSitesCount = overview?.top_sites?.length ?? 0;
    const totalSites       = SITE_OPTIONS.length - 1; // escludi 'all'

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">
                        Web Analytics — FlorenceEGI
                    </h1>
                    <p className="text-xs text-gray-500 mt-0.5">Superadmin Dashboard</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <FilterSelect<SiteFilter>
                        id="analytics-site"
                        label="Filtra per sito"
                        value={siteId}
                        onChange={setSiteId}
                        options={SITE_OPTIONS}
                    />
                    <FilterSelect<PeriodKey>
                        id="analytics-period"
                        label="Filtra per periodo"
                        value={period}
                        onChange={setPeriod}
                        options={PERIOD_OPTIONS}
                    />
                    <button
                        type="button"
                        onClick={refresh}
                        disabled={loading}
                        aria-label="Aggiorna dati analytics"
                        className="
                            px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold
                            hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            transition-colors
                        "
                    >
                        {loading ? 'Caricamento…' : 'Aggiorna'}
                    </button>
                </div>
            </header>

            {/* Contenuto */}
            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* Banner errore */}
                {error && (
                    <ErrorBanner message={error} onRetry={refresh} />
                )}

                {/* KPI Cards */}
                <section aria-label="Metriche principali">
                    <div
                        role="status"
                        aria-live="polite"
                        aria-label="Aggiornamento metriche in corso"
                        className="sr-only"
                    >
                        {loading ? 'Caricamento dati analytics…' : 'Dati analytics aggiornati.'}
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <AnalyticsStatCard
                            label="Pageview"
                            value={overview?.total_pageviews ?? 0}
                            loading={loading}
                        />
                        <AnalyticsStatCard
                            label="Sessioni"
                            value={overview?.unique_sessions ?? 0}
                            loading={loading}
                        />
                        <AnalyticsStatCard
                            label="Utenti unici"
                            value={overview?.unique_users ?? 0}
                            loading={loading}
                        />
                        <AnalyticsStatCard
                            label="Siti attivi"
                            value={loading ? '—' : `${activeSitesCount}/${totalSites}`}
                            sublabel="nel periodo selezionato"
                            loading={loading}
                        />
                    </div>
                </section>

                {/* Riga inferiore: Siti + Eventi */}
                <section aria-label="Dettaglio siti ed eventi" className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Top siti */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4">
                            Top siti per pageview
                        </h2>
                        <AnalyticsSitesList
                            sites={overview?.top_sites ?? []}
                            loading={loading}
                        />
                    </div>

                    {/* Eventi per tipo */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4">
                            Eventi per tipo
                        </h2>
                        <AnalyticsEventChart
                            events={events.length ? events : (overview?.events_by_name ?? [])}
                            loading={loading}
                        />
                    </div>
                </section>

                {/* Footer info */}
                <p className="text-xs text-gray-400 text-right">
                    Fonte: EGI backend · {new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
            </main>
        </div>
    );
}
