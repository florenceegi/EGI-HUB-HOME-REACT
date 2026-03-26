/**
 * SigilloPlansPage — Pagina prezzi dedicata Sigillo.
 * Formato classico SaaS: card grandi, feature list, badge popolare.
 * Route: /sigillo/piani
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-26
 * @purpose Vista prezzi pubblica: piani fetchati da /api/sigillo/plans, no dati hardcoded.
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '@/stores/useUIStore';
import { egiApi } from '@/services/api';

// ---------------------------------------------------------------------------
// Tipi
// ---------------------------------------------------------------------------

interface SigilloApiPlan {
    feature_code:          string;
    feature_name:          string;
    feature_description:   string;
    cost_fiat_eur:         string | null;
    cost_egili:            number | null;
    egili_gift:            number | null;
    is_recurring:          boolean;
    recurrence_period:     string | null;
    max_uses_per_purchase: number | null;
    display_order:         number;
    is_featured:           boolean;
    badge_color:           string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatEur(raw: string): string {
    return '€' + parseFloat(raw).toFixed(2).replace('.', ',');
}

function buildPriceLabel(plan: SigilloApiPlan): string | null {
    if (plan.cost_fiat_eur) {
        return formatEur(plan.cost_fiat_eur);
    }
    if (plan.cost_egili !== null) {
        return `${plan.cost_egili.toLocaleString('it-IT')} Egili`;
    }
    return null;
}

function buildPeriodLabel(plan: SigilloApiPlan): string {
    if (plan.is_recurring) return '/mese · rinnovo automatico';
    if (plan.max_uses_per_purchase !== null && plan.max_uses_per_purchase > 1) {
        return `${plan.max_uses_per_purchase} certificazioni`;
    }
    return 'una tantum';
}

function ctaBgFor(isFeatured: boolean): string {
    return isFeatured ? 'var(--accent)' : 'rgba(255,255,255,0.10)';
}

function ctaColorFor(isFeatured: boolean): string {
    return isFeatured ? '#0A1222' : 'rgba(255,255,255,0.85)';
}

function ctaLabel(plan: SigilloApiPlan): string {
    const price = plan.cost_fiat_eur ? formatEur(plan.cost_fiat_eur) : null;
    if (plan.is_recurring) {
        return price ? `Abbonati — ${price}/mese` : 'Abbonati';
    }
    if (plan.max_uses_per_purchase !== null && plan.max_uses_per_purchase > 1) {
        return price ? `Acquista Pack — ${price}` : `Acquista Pack`;
    }
    return price ? `Acquista — ${price}` : 'Acquista';
}

// ---------------------------------------------------------------------------
// Skeleton loader
// ---------------------------------------------------------------------------

function PlansSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {[0, 1, 2].map((n) => (
                <div
                    key={n}
                    className="rounded-2xl h-64 bg-white/5 animate-pulse"
                />
            ))}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Componente pagina
// ---------------------------------------------------------------------------

export function SigilloPlansPage() {
    const navigate = useUIStore((state) => state.navigate);

    const [loading, setLoading]           = useState<string | null>(null);
    const [error, setError]               = useState<string | null>(null);
    const [plans, setPlans]               = useState<SigilloApiPlan[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);

    useEffect(() => {
        egiApi.get<{ plans: SigilloApiPlan[] }>('/sigillo/plans')
            .then(({ data }) => setPlans(data.plans))
            .catch(() => setPlans([]))
            .finally(() => setLoadingPlans(false));
    }, []);

    const handleCheckout = async (featureCode: string) => {
        setLoading(featureCode);
        setError(null);
        try {
            const { data } = await egiApi.post<{ checkout_url: string }>(
                '/sigillo/checkout',
                { feature_code: featureCode }
            );
            window.location.href = data.checkout_url;
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Errore durante il checkout. Riprova.');
            setLoading(null);
        }
    };

    // Raggruppamento dinamico per tipo piano
    const spotPlans = plans.filter((p) => !p.is_recurring && (p.max_uses_per_purchase === null || p.max_uses_per_purchase === 1));
    const packPlans = plans.filter((p) => !p.is_recurring && p.max_uses_per_purchase !== null && p.max_uses_per_purchase > 1);
    const proPlans  = plans.filter((p) => p.is_recurring);

    return (
        <div className="min-h-screen text-white" style={{ background: '#0A1222' }}>

            {/* Header */}
            <div className="px-6 pt-12 pb-8 max-w-5xl mx-auto text-center space-y-4">
                <button
                    type="button"
                    onClick={() => navigate('/sigillo')}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors mb-2 focus:outline-none"
                    aria-label="Torna a Sigillo"
                >
                    ← Sigillo
                </button>
                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Scegli il tuo piano
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/50 text-sm max-w-lg mx-auto"
                >
                    Blockchain Algorand · Permanente · Nessuna scadenza annuale forzata
                </motion.p>

                {error && (
                    <div
                        role="alert"
                        className="rounded-xl bg-red-500/15 border border-red-500/30 px-4 py-3 text-sm text-red-400 max-w-md mx-auto"
                    >
                        {error}
                    </div>
                )}
            </div>

            {loadingPlans ? (
                <div className="px-6 pb-12">
                    <PlansSkeleton />
                </div>
            ) : (
                <>
                    {/* Sezione Pay per uso */}
                    {spotPlans.length > 0 && (
                        <Section title="Pay per uso" subtitle="Paga solo quando ne hai bisogno. Nessun abbonamento.">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
                                {spotPlans.map((plan, i) => (
                                    <PlanCard
                                        key={plan.feature_code}
                                        plan={plan}
                                        index={i}
                                        loading={loading}
                                        onCheckout={handleCheckout}
                                    />
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Sezione Pacchetti */}
                    {packPlans.length > 0 && (
                        <Section title="Pacchetti" subtitle="Compra una volta, usa nel tempo. Egili in omaggio.">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                                {packPlans.map((plan, i) => (
                                    <PlanCard
                                        key={plan.feature_code}
                                        plan={plan}
                                        index={i}
                                        loading={loading}
                                        onCheckout={handleCheckout}
                                    />
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Sezione Abbonamento */}
                    {proPlans.length > 0 && (
                        <Section title="Abbonamento" subtitle="Per chi certifica regolarmente. Il costo per certificato più basso.">
                            <div className="max-w-lg mx-auto space-y-5">
                                {proPlans.map((plan, i) => (
                                    <PlanCard
                                        key={plan.feature_code}
                                        plan={plan}
                                        index={i}
                                        loading={loading}
                                        onCheckout={handleCheckout}
                                        wide
                                    />
                                ))}
                            </div>
                        </Section>
                    )}
                </>
            )}

            {/* Enterprise */}
            <div className="px-6 pb-16 max-w-4xl mx-auto">
                <div
                    className="rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <div className="text-center md:text-left">
                        <p className="font-bold text-white/80 text-lg">🏢 Enterprise</p>
                        <p className="text-sm text-white/40 mt-1">Volume personalizzato · API · White-label · SLA dedicato</p>
                    </div>
                    <a
                        href="mailto:info@florenceegi.com?subject=Sigillo%20Enterprise"
                        className="px-6 py-3 rounded-xl text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/20 shrink-0"
                    >
                        Contattaci
                    </a>
                </div>
            </div>

            {/* Footer note */}
            <div className="px-6 pb-12 text-center">
                <p className="text-xs text-white/20">
                    Tutti i prezzi IVA inclusa · Pagamenti sicuri via Stripe · Blockchain Algorand · SHA-256
                </p>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Componenti interni
// ---------------------------------------------------------------------------

function Section({ title, subtitle, children }: {
    title: string; subtitle: string; children: React.ReactNode;
}) {
    return (
        <div className="px-6 pb-12 max-w-5xl mx-auto">
            <div className="text-center mb-7">
                <p className="text-[10px] uppercase tracking-widest text-[var(--accent)]/70 mb-1">{title}</p>
                <p className="text-sm text-white/40">{subtitle}</p>
            </div>
            {children}
        </div>
    );
}

function PlanCard({ plan, index, loading, onCheckout, wide = false }: {
    plan: SigilloApiPlan;
    index: number;
    loading: string | null;
    onCheckout: (code: string) => void;
    wide?: boolean;
}) {
    const isLoading  = loading === plan.feature_code;
    const priceLabel = buildPriceLabel(plan);
    const periodLabel = buildPeriodLabel(plan);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className={`rounded-2xl p-6 flex flex-col gap-5 ${wide ? 'md:flex-row md:items-start md:gap-8' : ''}`}
            style={{
                background:  plan.is_featured ? 'rgba(14,165,164,0.07)' : 'rgba(255,255,255,0.03)',
                border:      plan.is_featured ? '1.5px solid rgba(14,165,164,0.40)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow:   plan.is_featured ? '0 0 30px rgba(14,165,164,0.08)' : 'none',
            }}
        >
            {/* Top */}
            <div className={wide ? 'flex-1' : ''}>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-white/90 text-base">{plan.feature_name}</h3>
                        <p className="text-xs text-white/40 mt-0.5">{plan.feature_description}</p>
                    </div>
                    {plan.is_featured && (
                        <span
                            className="text-[10px] px-2.5 py-1 rounded-full font-semibold shrink-0 ml-2"
                            style={{
                                background: 'rgba(14,165,164,0.25)',
                                color:      '#0EA5A4',
                            }}
                        >
                            Più popolare
                        </span>
                    )}
                </div>

                {/* Prezzo */}
                <div className="mb-5">
                    {priceLabel && (
                        <span className="text-3xl font-black text-white/95">{priceLabel}</span>
                    )}
                    <span className="text-xs text-white/40 ml-2">{periodLabel}</span>
                    {plan.egili_gift !== null && (
                        <p className="text-xs text-[var(--accent)]/60 mt-1">
                            + {plan.egili_gift.toLocaleString('it-IT')} Egili in omaggio
                        </p>
                    )}
                </div>
            </div>

            {/* CTA */}
            <div className={wide ? 'shrink-0 self-center' : ''}>
                <button
                    type="button"
                    onClick={() => onCheckout(plan.feature_code)}
                    disabled={isLoading}
                    className={`w-full py-3 px-6 rounded-xl text-sm font-bold transition-opacity hover:opacity-85 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${wide ? 'md:w-auto' : ''}`}
                    style={{
                        background: ctaBgFor(plan.is_featured),
                        color:      ctaColorFor(plan.is_featured),
                    }}
                    aria-label={ctaLabel(plan)}
                >
                    {isLoading ? 'Caricamento...' : ctaLabel(plan)}
                </button>
            </div>
        </motion.div>
    );
}
