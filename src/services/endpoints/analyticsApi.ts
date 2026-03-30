/**
 * @package EGI-HUB-HOME — Analytics API Service
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB)
 * @date 2026-03-30
 * @purpose Client API per endpoints superadmin Web Analytics su EGI backend
 */
import { egiApi } from '../api';

export type SiteId = 'natan-loc' | 'egi-hub-home' | 'egi' | 'egi-info' | 'sigillo';

export interface TopSiteEntry {
    site_id: string;
    count: number;
}

export interface EventByNameEntry {
    event_name: string;
    count: number;
}

export interface AnalyticsOverview {
    total_pageviews: number;
    unique_sessions: number;
    unique_users: number;
    top_sites: TopSiteEntry[];
    events_by_name: EventByNameEntry[];
}

export interface AnalyticsParams {
    site_id?: SiteId;
    from?: string; // YYYY-MM-DD
    to?: string;   // YYYY-MM-DD
}

export interface AnalyticsEventsParams extends AnalyticsParams {
    event_name?: string;
    per_page?: number;
}

export interface FunnelParams {
    site_id: SiteId;
    events: string[];
    from?: string;
    to?: string;
}

export interface FunnelStep {
    event_name: string;
    count: number;
    drop_rate: number | null;
}

export interface FunnelData {
    steps: FunnelStep[];
}

const analyticsApi = {
    /**
     * Panoramica aggregata: pageview, sessioni, utenti, top siti, eventi.
     */
    overview: (params?: AnalyticsParams) =>
        egiApi.get<{ success: boolean; data: AnalyticsOverview }>(
            '/superadmin/analytics/web/overview',
            { params }
        ),

    /**
     * Lista eventi grezzi con paginazione e filtro opzionale per nome.
     */
    events: (params?: AnalyticsEventsParams) =>
        egiApi.get('/superadmin/analytics/web/events', { params }),

    /**
     * Analisi funnel per sequenza di eventi su un sito specifico.
     */
    funnel: (params: FunnelParams) =>
        egiApi.get<{ success: boolean; data: FunnelData }>(
            '/superadmin/analytics/web/funnel',
            { params }
        ),
};

export { analyticsApi };
