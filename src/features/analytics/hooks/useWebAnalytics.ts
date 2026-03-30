/**
 * @package EGI-HUB-HOME — useWebAnalytics Hook
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB)
 * @date 2026-03-30
 * @purpose Hook React per dati Web Analytics superadmin: overview + eventi,
 *          con selezione sito e periodo, gestione loading/error.
 */
import { useState, useEffect, useCallback } from 'react';
import { analyticsApi, type SiteId, type AnalyticsOverview, type EventByNameEntry } from '../../../services/endpoints/analyticsApi';

export type PeriodKey = '7d' | '30d' | '90d';
export type SiteFilter = SiteId | 'all';

const PERIOD_DAYS: Record<PeriodKey, number> = {
    '7d':  7,
    '30d': 30,
    '90d': 90,
};

function periodToDates(period: PeriodKey): { from: string; to: string } {
    const to   = new Date();
    const from = new Date();
    from.setDate(from.getDate() - PERIOD_DAYS[period]);

    const fmt = (d: Date): string => d.toISOString().slice(0, 10);
    return { from: fmt(from), to: fmt(to) };
}

export interface WebAnalyticsState {
    overview:   AnalyticsOverview | null;
    events:     EventByNameEntry[];
    loading:    boolean;
    error:      string | null;
    siteId:     SiteFilter;
    setSiteId:  (s: SiteFilter) => void;
    period:     PeriodKey;
    setPeriod:  (p: PeriodKey) => void;
    refresh:    () => void;
}

const EMPTY_OVERVIEW: AnalyticsOverview = {
    total_pageviews: 0,
    unique_sessions: 0,
    unique_users:    0,
    top_sites:       [],
    events_by_name:  [],
};

export function useWebAnalytics(): WebAnalyticsState {
    const [siteId, setSiteId] = useState<SiteFilter>('all');
    const [period, setPeriod] = useState<PeriodKey>('30d');
    const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
    const [events,   setEvents]   = useState<EventByNameEntry[]>([]);
    const [loading,  setLoading]  = useState(false);
    const [error,    setError]    = useState<string | null>(null);

    // Token guard: se non c'e' auth_token non si fa la chiamata
    const hasToken = (): boolean =>
        Boolean(localStorage.getItem('auth_token'));

    const fetchData = useCallback(async () => {
        if (!hasToken()) {
            setError('Non autenticato.');
            return;
        }

        setLoading(true);
        setError(null);

        const { from, to } = periodToDates(period);
        const params = {
            ...(siteId !== 'all' ? { site_id: siteId as SiteId } : {}),
            from,
            to,
        };

        try {
            const [overviewRes, eventsRes] = await Promise.all([
                analyticsApi.overview(params),
                analyticsApi.events({ ...params, per_page: 50 }),
            ]);

            // Backend risponde { success: true, data: {...} }
            const ovData = overviewRes.data?.data ?? EMPTY_OVERVIEW;
            setOverview(ovData);

            // events_by_name disponibili gia' nell'overview; gli eventi grezzi
            // sono nel secondo endpoint — usiamo quello per la lista dettagliata.
            const evData: EventByNameEntry[] =
                eventsRes.data?.data?.events_by_name
                ?? eventsRes.data?.data
                ?? ovData.events_by_name
                ?? [];
            setEvents(evData);
        } catch (err: any) {
            const msg =
                err.response?.data?.message
                ?? err.message
                ?? 'Errore caricamento analytics.';
            setError(msg as string);
            setOverview(null);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    }, [siteId, period]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        overview,
        events,
        loading,
        error,
        siteId,
        setSiteId,
        period,
        setPeriod,
        refresh: fetchData,
    };
}
