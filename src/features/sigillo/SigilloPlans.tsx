/**
 * SigilloPlans — Vista prezzi classica con 5 piani + Enterprise.
 * Design dark, coerente con SigilloPage (#0A1222).
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-26
 * @purpose Sezione pricing pubblica: sostituisce SubscriptionTiers inline.
 */
import { motion } from 'framer-motion';

interface SigilloPlansProps {
    onCheckout:      (featureCode: string) => void;
    checkoutLoading: string | null;
}

interface Plan {
    code:        string | null;
    icon:        string;
    title:       string;
    price:       string;
    unit:        string;
    pricePerCert: string;
    egiliGift:   string | null;
    badge:       string | null;
    highlight:   boolean;
    cta:         string | null;
    borderColor: string;
    accentColor: string;
}

const PLANS: Plan[] = [
    {
        code:         'sigillo_single_cert',
        icon:         '📄',
        title:        'Certificazione Singola',
        price:        '€4,99',
        unit:         'una tantum',
        pricePerCert: 'SHA-256 + ancoraggio Algorand',
        egiliGift:    null,
        badge:        null,
        highlight:    false,
        cta:          'Acquista',
        borderColor:  'rgba(14,165,164,0.30)',
        accentColor:  'rgba(14,165,164,0.07)',
    },
    {
        code:         'sigillo_single_cert_cid',
        icon:         '🪪',
        title:        'Certificazione + Identità',
        price:        '€14,99',
        unit:         'una tantum',
        pricePerCert: 'Identità verificata (CIE)',
        egiliGift:    null,
        badge:        'Più valore legale',
        highlight:    true,
        cta:          'Acquista',
        borderColor:  'rgba(14,165,164,0.50)',
        accentColor:  'rgba(14,165,164,0.10)',
    },
    {
        code:         'sigillo_pack_10',
        icon:         '📋',
        title:        'Pack 10',
        price:        '€29,90',
        unit:         '10 cert · 2 anni',
        pricePerCert: '€2,99 / cert',
        egiliGift:    '1.500 Egili',
        badge:        null,
        highlight:    false,
        cta:          'Acquista',
        borderColor:  'rgba(59,130,246,0.25)',
        accentColor:  'rgba(59,130,246,0.10)',
    },
    {
        code:         'sigillo_pack_50',
        icon:         '📦',
        title:        'Pack 50',
        price:        '€99,90',
        unit:         '50 cert · 2 anni',
        pricePerCert: '€2,00 / cert',
        egiliGift:    '4.000 Egili',
        badge:        'Più popolare',
        highlight:    true,
        cta:          'Acquista',
        borderColor:  'rgba(139,92,246,0.45)',
        accentColor:  'rgba(139,92,246,0.12)',
    },
    {
        code:         'sigillo_pack_100',
        icon:         '🗂️',
        title:        'Pack 100',
        price:        '€179,90',
        unit:         '100 cert · 3 anni',
        pricePerCert: '€1,80 / cert',
        egiliGift:    '7.000 Egili',
        badge:        null,
        highlight:    false,
        cta:          'Acquista',
        borderColor:  'rgba(99,102,241,0.25)',
        accentColor:  'rgba(99,102,241,0.10)',
    },
    {
        code:         'sigillo_monthly_100',
        icon:         '🏆',
        title:        'Pro Mensile',
        price:        '€7,90',
        unit:         '/mese · 100 cert',
        pricePerCert: '€0,08 / cert',
        egiliGift:    '800 Egili/mese',
        badge:        'Miglior valore',
        highlight:    false,
        cta:          'Abbonati',
        borderColor:  'rgba(234,179,8,0.30)',
        accentColor:  'rgba(234,179,8,0.08)',
    },
];

export function SigilloPlans({ onCheckout, checkoutLoading }: SigilloPlansProps) {
    return (
        <section aria-label="Piani Sigillo">
            <p className="text-[10px] text-white/30 uppercase tracking-widest text-center pb-4">
                Piani disponibili
            </p>

            <div className="space-y-2.5">
                {PLANS.map((plan, i) => (
                    <motion.div
                        key={plan.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="rounded-xl px-4 py-3.5"
                        style={{
                            background: plan.highlight
                                ? plan.accentColor
                                : plan.accentColor,
                            border: `1px solid ${plan.borderColor}`,
                            boxShadow: plan.highlight
                                ? `0 0 20px ${plan.borderColor}`
                                : 'none',
                        }}
                    >
                        <div className="flex items-center justify-between gap-3">
                            {/* Left: icon + titolo + dettagli */}
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="text-xl shrink-0" aria-hidden="true">{plan.icon}</span>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-semibold text-white/90">{plan.title}</span>
                                        {plan.badge && (
                                            <span
                                                className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                                                style={{
                                                    background: plan.borderColor,
                                                    color: '#fff',
                                                }}
                                            >
                                                {plan.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-white/40">{plan.unit}</p>
                                    {plan.egiliGift && (
                                        <p className="text-[10px] text-[var(--accent)]/70 mt-0.5">
                                            + {plan.egiliGift} in regalo
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right: prezzo + cta */}
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                    <p className="text-sm font-bold text-white/80">{plan.price}</p>
                                    <p className="text-[10px] text-white/35">{plan.pricePerCert}</p>
                                </div>
                                {plan.cta && plan.code && (
                                    <button
                                        type="button"
                                        onClick={() => onCheckout(plan.code!)}
                                        disabled={checkoutLoading === plan.code}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-white/30"
                                        style={{ background: plan.borderColor, color: '#fff' }}
                                        aria-label={`${plan.cta} ${plan.title}`}
                                    >
                                        {checkoutLoading === plan.code ? '...' : plan.cta}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Enterprise */}
                <div
                    className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-3"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
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
