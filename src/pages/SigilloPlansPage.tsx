/**
 * SigilloPlansPage — Pagina prezzi dedicata Sigillo.
 * Formato classico SaaS: card grandi, feature list, badge popolare.
 * Route: /sigillo/piani
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 3.1.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-27
 * @purpose Vista prezzi pubblica con riconoscimento piano attivo dell'utente.
 *          Se l'utente ha un piano attivo mostra solo quel piano (full-width),
 *          altrimenti mostra tutte le sezioni con CTA. Fetch /api/sigillo/my-plan
 *          fallisce silenziosamente — utenti non loggati vedono tutti i piani.
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

interface MyPlan {
    feature_code:        string;
    amount_paid_eur:     string | null;
    activated_at:        string;
    expires_at:          string | null;
    quantity_purchased:  number | null;
    quantity_used:       number;
    remaining:           number | null;
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

function formatDate(iso: string): string {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

// ---------------------------------------------------------------------------
// Skeleton
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
// Piano attuale
// ---------------------------------------------------------------------------

function ActivePlanCard({ plan, myPlan, onBack }: {
    plan: SigilloApiPlan; myPlan: MyPlan; onBack: () => void;
}) {
    const certLabel = (n: number): string =>
        n === 1 ? '1 certificazione disponibile' : `${n} certificazioni disponibili`;

    const usedLabel = (n: number): string =>
        n === 1 ? '· 1 usata' : `· ${n} usate`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-7 flex flex-col gap-5"
            style={{
                background: 'rgba(14,165,164,0.13)',
                border:     '1.5px solid rgba(14,165,164,0.60)',
                boxShadow:  '0 0 30px rgba(14,165,164,0.18)',
            }}
        >
            {/* Badge + nome */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <span
                        className="inline-block text-[10px] px-2.5 py-1 rounded-full font-semibold mb-3"
                        style={{
                            background: 'rgba(14,165,164,0.30)',
                            color:      '#5eead4',
                        }}
                    >
                        Piano attuale
                    </span>
                    <h3 className="font-bold text-white/90 text-lg leading-tight">
                        {plan.feature_name}
                    </h3>
                    <p className="text-xs text-white/40 mt-0.5">{plan.feature_description}</p>
                </div>
            </div>

            {/* Prezzo piano corrente */}
            {plan.cost_fiat_eur && (
                <p className="text-sm text-white/55">
                    Prezzo piano:{' '}
                    <span className="font-semibold text-white/80">
                        {formatEur(plan.cost_fiat_eur)}
                    </span>
                </p>
            )}

            {/* Crediti */}
            <div className="space-y-1">
                {myPlan.remaining !== null && (
                    <p className="text-sm font-semibold" style={{ color: 'rgba(94,234,212,0.80)' }}>
                        {certLabel(myPlan.remaining)}
                        {myPlan.quantity_used > 0 && (
                            <span className="font-normal text-white/40 ml-1">
                                {usedLabel(myPlan.quantity_used)}
                            </span>
                        )}
                    </p>
                )}
                {myPlan.expires_at && (
                    <p className="text-[10px] text-white/35">
                        Scade: {formatDate(myPlan.expires_at)}
                    </p>
                )}
            </div>

            {/* CTA unico */}
            <button
                type="button"
                onClick={onBack}
                className="mt-1 w-full py-3 px-6 rounded-xl text-sm font-bold transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[rgba(14,165,164,0.60)]"
                style={{
                    background: 'rgba(14,165,164,0.20)',
                    color:      '#5eead4',
                    border:     '1px solid rgba(14,165,164,0.40)',
                }}
                aria-label="Torna a Sigillo"
            >
                ← Torna a Sigillo
            </button>
        </motion.div>
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
    const [myPlan, setMyPlan]             = useState<MyPlan | null | undefined>(undefined); // undefined = loading

    useEffect(() => {
        egiApi.get<{ plans: SigilloApiPlan[] }>('/sigillo/plans')
            .then(({ data }) => setPlans(data.plans))
            .catch(() => setPlans([]))
            .finally(() => setLoadingPlans(false));

        egiApi.get<{ plan: MyPlan | null }>('/sigillo/my-plan')
            .then(({ data }) => setMyPlan(data.plan))
            .catch(() => setMyPlan(null));
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

    // Piano attivo: cercato nell'elenco piani fetchati
    const activePlan = myPlan
        ? plans.find((p) => p.feature_code === myPlan.feature_code) ?? null
        : null;

    // Raggruppamento dinamico per tipo piano (usato solo quando nessun piano attivo)
    const spotPlans = plans.filter((p) => !p.is_recurring && (p.max_uses_per_purchase === null || p.max_uses_per_purchase === 1));
    const packPlans = plans.filter((p) => !p.is_recurring && p.max_uses_per_purchase !== null && p.max_uses_per_purchase > 1);
    const proPlans  = plans.filter((p) => p.is_recurring);

    // Loading complessivo: attesa sia plans che my-plan
    const isLoading = loadingPlans || myPlan === undefined;

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
                    {activePlan ? 'Il tuo piano' : 'Scegli il tuo piano'}
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

            {isLoading ? (
                <div className="px-6 pb-12">
                    <PlansSkeleton />
                </div>
            ) : activePlan && myPlan ? (
                <>
                    {/* Piano attuale — full-width card centrata */}
                    <div className="px-6 pb-12 max-w-5xl mx-auto">
                        <p
                            className="text-center text-xs uppercase tracking-widest mb-6"
                            style={{ color: 'rgba(94,234,212,0.80)' }}
                        >
                            Il tuo piano attuale
                        </p>
                        <div className="max-w-lg mx-auto">
                            <ActivePlanCard
                                plan={activePlan}
                                myPlan={myPlan}
                                onBack={() => navigate('/sigillo')}
                            />
                        </div>
                    </div>
                </>
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

            {/* Enterprise — sempre visibile */}
            <div className="px-6 pb-16 max-w-4xl mx-auto">
                <div
                    className="rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <div className="text-center md:text-left">
                        <p className="font-bold text-white/80 text-lg">Enterprise</p>
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
