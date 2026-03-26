/**
 * SigilloPlans — Vista prezzi compatta con piani dinamici da API.
 * Design dark, coerente con SigilloPage (#0A1222).
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-26
 * @purpose Sezione pricing pubblica: piani fetchati da /api/sigillo/plans, no dati hardcoded.
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

interface SigilloPlansProps {
    onCheckout:      (featureCode: string) => void;
    checkoutLoading: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatEur(raw: string): string {
    return '€' + parseFloat(raw).toFixed(2).replace('.', ',');
}

function borderColorFor(plan: SigilloApiPlan): string {
    if (plan.badge_color) return plan.badge_color;
    if (plan.is_featured) return 'rgba(14,165,164,0.50)';
    if (plan.is_recurring) return 'rgba(234,179,8,0.30)';
    return 'rgba(14,165,164,0.30)';
}

function accentBgFor(plan: SigilloApiPlan): string {
    if (plan.is_featured) return 'rgba(14,165,164,0.10)';
    if (plan.is_recurring) return 'rgba(234,179,8,0.08)';
    return 'rgba(14,165,164,0.07)';
}

function buildPriceLabel(plan: SigilloApiPlan): string | null {
    if (plan.cost_fiat_eur) {
        return formatEur(plan.cost_fiat_eur) + (plan.is_recurring ? '/mese' : '');
    }
    if (plan.cost_egili !== null) {
        return `${plan.cost_egili.toLocaleString('it-IT')} Egili`;
    }
    return null;
}

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export function SigilloPlans({ onCheckout, checkoutLoading }: SigilloPlansProps) {
    const [plans, setPlans]               = useState<SigilloApiPlan[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);

    useEffect(() => {
        egiApi.get<{ plans: SigilloApiPlan[] }>('/sigillo/plans')
            .then(({ data }) => setPlans(data.plans))
            .catch(() => setPlans([]))
            .finally(() => setLoadingPlans(false));
    }, []);

    return (
        <section aria-label="Piani Sigillo">
            <p className="text-[10px] text-white/30 uppercase tracking-widest text-center pb-4">
                Piani disponibili
            </p>

            <div className="space-y-2.5">
                {loadingPlans ? (
                    <>
                        {[0, 1, 2].map((n) => (
                            <div
                                key={n}
                                className="rounded-xl h-20 bg-white/5 animate-pulse"
                            />
                        ))}
                    </>
                ) : (
                    plans.map((plan, i) => {
                        const border   = borderColorFor(plan);
                        const accentBg = accentBgFor(plan);
                        const label    = buildPriceLabel(plan);

                        return (
                            <motion.div
                                key={plan.feature_code}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="rounded-xl px-4 py-3.5"
                                style={{
                                    background: accentBg,
                                    border:     `1px solid ${border}`,
                                    boxShadow:  plan.is_featured ? `0 0 20px ${border}` : 'none',
                                }}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    {/* Left: titolo + dettagli */}
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-sm font-semibold text-white/90">
                                                {plan.feature_name}
                                            </span>
                                            {plan.is_featured && (
                                                <span
                                                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                                                    style={{ background: border, color: '#fff' }}
                                                >
                                                    Più popolare
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-white/40">
                                            {plan.feature_description}
                                        </p>
                                        {plan.max_uses_per_purchase !== null && plan.max_uses_per_purchase > 1 && (
                                            <p className="text-[10px] text-white/35 mt-0.5">
                                                {plan.max_uses_per_purchase} certificazioni
                                            </p>
                                        )}
                                        {plan.egili_gift !== null && (
                                            <p className="text-[10px] text-[var(--accent)]/70 mt-0.5">
                                                + {plan.egili_gift.toLocaleString('it-IT')} Egili in omaggio
                                            </p>
                                        )}
                                    </div>

                                    {/* Right: prezzo + cta */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        {label && (
                                            <p className="text-sm font-bold text-white/80 text-right">
                                                {label}
                                            </p>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => onCheckout(plan.feature_code)}
                                            disabled={checkoutLoading === plan.feature_code}
                                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-white/30"
                                            style={{ background: border, color: '#fff' }}
                                            aria-label={`${plan.is_recurring ? 'Abbonati' : 'Acquista'} ${plan.feature_name}`}
                                        >
                                            {checkoutLoading === plan.feature_code
                                                ? '...'
                                                : plan.is_recurring ? 'Abbonati' : 'Acquista'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}

                {/* Enterprise — sempre visibile */}
                <div
                    className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-3"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border:     '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-xl" aria-hidden="true">🏢</span>
                        <div>
                            <p className="text-sm font-semibold text-white/70">Enterprise</p>
                            <p className="text-[11px] text-white/35">Volume personalizzato · API · White-label</p>
                        </div>
                    </div>
                    <a
                        href="mailto:info@florenceegi.com?subject=Sigillo%20Enterprise"
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white/60 hover:text-white/90 border border-white/10 hover:border-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                        aria-label="Contatta per piano Enterprise"
                    >
                        Contattaci
                    </a>
                </div>
            </div>

            <p className="text-[10px] text-white/20 text-center pt-3">
                Tutti i piani includono: blockchain Algorand · SHA-256 · certificato verificabile pubblicamente
            </p>
        </section>
    );
}
