/**
 * FeaturePurchasesPage — Pannello superadmin: lista acquisti feature, rimborsi, riattivazioni.
 *
 * @package EGI-HUB-HOME-REACT
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (EGI-HUB - Feature Purchases Admin)
 * @date 2026-03-26
 * @purpose Vista admin per gestione user_feature_purchases: lista, rimborso Stripe, riattivazione manuale
 */
import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

// ── Types ──────────────────────────────────────────────────────────────────────

interface Purchase {
    id: number;
    user_id: number | null;
    user_email: string | null;
    user_name: string | null;
    feature_code: string;
    payment_method: string | null;
    payment_provider: string | null;
    payment_transaction_id: string | null;
    amount_paid_eur: string | null;
    amount_paid_egili: number | null;
    status: string;
    is_active: boolean;
    purchased_at: string | null;
    activated_at: string | null;
    expires_at: string | null;
    metadata: string | null;
    created_at: string | null;
}

interface PaginatedResponse {
    data: Purchase[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Filters {
    status: string;
    feature_code: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<string, string> = {
    active:   'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    refunded: 'bg-red-500/20 text-red-300 border border-red-500/30',
    pending:  'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
};

function statusBadgeClass(status: string): string {
    return STATUS_BADGE[status] ?? 'bg-white/10 text-white/50 border border-white/10';
}

function formatDate(raw: string | null): string {
    if (!raw) return '—';
    return new Date(raw).toLocaleString('it-IT', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function formatAmount(eur: string | null, egili: number | null): string {
    if (eur) return `€ ${parseFloat(eur).toFixed(2)}`;
    if (egili) return `${egili} Egili`;
    return '—';
}

// ── Skeleton ───────────────────────────────────────────────────────────────────

function SkeletonRow() {
    return (
        <tr className="border-t border-white/5">
            {Array.from({ length: 8 }).map((_, i) => (
                <td key={i} className="px-4 py-3">
                    <div className="h-4 bg-white/10 rounded animate-pulse w-full max-w-[120px]" />
                </td>
            ))}
        </tr>
    );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function FeaturePurchasesPage() {
    const [purchases, setPurchases]   = useState<Purchase[]>([]);
    const [pagination, setPagination] = useState<Omit<PaginatedResponse, 'data'> | null>(null);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState<string | null>(null);
    const [page, setPage]             = useState(1);
    const [filters, setFilters]       = useState<Filters>({ status: '', feature_code: '' });
    const [pendingFilters, setPending] = useState<Filters>({ status: '', feature_code: '' });
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [actionMessage, setActionMessage] = useState<{ id: number; text: string; ok: boolean } | null>(null);

    // ── Fetch ──────────────────────────────────────────────────────────────────

    const fetchPurchases = useCallback(async (currentPage: number, f: Filters) => {
        setLoading(true);
        setError(null);
        try {
            const params: Record<string, string> = { page: String(currentPage) };
            if (f.status)       params['status']       = f.status;
            if (f.feature_code) params['feature_code'] = f.feature_code;

            const { data } = await api.get<{ success: boolean; data: PaginatedResponse }>(
                '/superadmin/feature-purchases',
                { params }
            );

            setPurchases(data.data.data);
            const { data: _ignored, ...meta } = data.data;
            setPagination(meta);
        } catch (err: any) {
            const msg = err.response?.data?.message ?? err.message ?? 'Errore nel caricamento';
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPurchases(page, filters);
    }, [page, filters, fetchPurchases]);

    // ── Actions ────────────────────────────────────────────────────────────────

    const handleRefund = async (id: number) => {
        if (!window.confirm(`Emettere rimborso per acquisto #${id}?`)) return;
        setActionLoading(id);
        try {
            const { data } = await api.post(`/superadmin/feature-purchases/${id}/refund`);
            setActionMessage({ id, text: `Rimborso emesso. ID: ${data.refund_id ?? 'N/A'}`, ok: true });
            fetchPurchases(page, filters);
        } catch (err: any) {
            const msg = err.response?.data?.message ?? 'Errore rimborso';
            setActionMessage({ id, text: msg, ok: false });
        } finally {
            setActionLoading(null);
        }
    };

    const handleActivate = async (id: number) => {
        if (!window.confirm(`Riattivare il purchase #${id}?`)) return;
        setActionLoading(id);
        try {
            await api.post(`/superadmin/feature-purchases/${id}/activate`);
            setActionMessage({ id, text: 'Feature riattivata con successo', ok: true });
            fetchPurchases(page, filters);
        } catch (err: any) {
            const msg = err.response?.data?.message ?? 'Errore riattivazione';
            setActionMessage({ id, text: msg, ok: false });
        } finally {
            setActionLoading(null);
        }
    };

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        setFilters({ ...pendingFilters });
    };

    const handleFilterReset = () => {
        setPending({ status: '', feature_code: '' });
        setFilters({ status: '', feature_code: '' });
        setPage(1);
    };

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
        <div
            className="min-h-screen text-white p-6"
            style={{ background: '#0A1222', fontFamily: 'Share Tech Mono, monospace' }}
        >
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white tracking-wide">Feature Purchases</h1>
                <p className="mt-1 text-white/50 text-sm">Gestione rimborsi e riattivazioni acquisti feature</p>
            </div>

            {/* Filters */}
            <form
                onSubmit={handleFilterSubmit}
                className="mb-6 flex flex-wrap items-end gap-3 p-4 rounded-xl border border-white/10 bg-white/5"
            >
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Status</label>
                    <select
                        value={pendingFilters.status}
                        onChange={(e) => setPending((p) => ({ ...p, status: e.target.value }))}
                        className="bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 w-36"
                    >
                        <option value="">Tutti</option>
                        <option value="active">Active</option>
                        <option value="refunded">Refunded</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Feature Code</label>
                    <input
                        type="text"
                        value={pendingFilters.feature_code}
                        onChange={(e) => setPending((p) => ({ ...p, feature_code: e.target.value }))}
                        placeholder="es. sigillo_single_cert"
                        className="bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 w-52 placeholder-white/30"
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-lg transition-colors"
                >
                    Filtra
                </button>
                <button
                    type="button"
                    onClick={handleFilterReset}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/70 text-sm rounded-lg transition-colors"
                >
                    Reset
                </button>
            </form>

            {/* Error banner */}
            {error && (
                <div className="mb-4 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                    {error}
                </div>
            )}

            {/* Table */}
            <div className="rounded-xl border border-white/10 bg-white/5 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            {['ID', 'Utente', 'Feature', 'Importo', 'Metodo', 'Status', 'Data acquisto', 'Azioni'].map((h) => (
                                <th
                                    key={h}
                                    className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider font-medium"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            : purchases.length === 0
                            ? (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-4 py-12 text-center text-white/30 text-sm"
                                    >
                                        Nessun acquisto trovato.
                                    </td>
                                </tr>
                            )
                            : purchases.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-4 py-3 font-mono text-xs text-white/60">#{p.id}</td>

                                    <td className="px-4 py-3">
                                        {p.user_email ? (
                                            <div>
                                                <div className="text-white/90 text-xs">{p.user_email}</div>
                                                <div className="text-white/30 text-[10px]">#{p.user_id}</div>
                                            </div>
                                        ) : (
                                            <span className="text-white/20">—</span>
                                        )}
                                    </td>

                                    <td className="px-4 py-3 font-mono text-xs text-white/70">{p.feature_code}</td>

                                    <td className="px-4 py-3 text-xs text-white/70">
                                        {formatAmount(p.amount_paid_eur, p.amount_paid_egili)}
                                    </td>

                                    <td className="px-4 py-3 text-xs text-white/60">{p.payment_method ?? '—'}</td>

                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${statusBadgeClass(p.status)}`}>
                                            {p.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-xs text-white/50">
                                        {formatDate(p.purchased_at)}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex gap-2 items-center flex-wrap">
                                            {/* Feedback messaggio azione */}
                                            {actionMessage?.id === p.id && (
                                                <span className={`text-[10px] ${actionMessage.ok ? 'text-emerald-400' : 'text-red-400'}`}>
                                                    {actionMessage.text}
                                                </span>
                                            )}

                                            {/* Rimborsa: solo se active + stripe */}
                                            {p.status === 'active' && p.payment_provider === 'stripe' && (
                                                <button
                                                    onClick={() => handleRefund(p.id)}
                                                    disabled={actionLoading === p.id}
                                                    className="px-2 py-1 bg-red-600/70 hover:bg-red-600 text-white text-[10px] rounded transition-colors disabled:opacity-50"
                                                >
                                                    {actionLoading === p.id ? '...' : 'Rimborsa'}
                                                </button>
                                            )}

                                            {/* Riattiva: se non active */}
                                            {p.status !== 'active' && (
                                                <button
                                                    onClick={() => handleActivate(p.id)}
                                                    disabled={actionLoading === p.id}
                                                    className="px-2 py-1 bg-yellow-600/70 hover:bg-yellow-600 text-white text-[10px] rounded transition-colors disabled:opacity-50"
                                                >
                                                    {actionLoading === p.id ? '...' : 'Riattiva'}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
                <div className="mt-4 flex items-center gap-3 justify-end text-sm">
                    <span className="text-white/40 text-xs">
                        Pagina {pagination.current_page} di {pagination.last_page}
                        {' '}({pagination.total} totali)
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={pagination.current_page <= 1}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/70 rounded transition-colors disabled:opacity-30 text-xs"
                    >
                        Prec
                    </button>
                    <button
                        onClick={() => setPage((p) => Math.min(pagination.last_page, p + 1))}
                        disabled={pagination.current_page >= pagination.last_page}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/70 rounded transition-colors disabled:opacity-30 text-xs"
                    >
                        Succ
                    </button>
                </div>
            )}
        </div>
    );
}
