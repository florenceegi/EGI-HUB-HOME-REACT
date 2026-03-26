/**
 * SigilloPlansPage — Pagina prezzi dedicata Sigillo.
 * Formato classico SaaS: card grandi, feature list, badge popolare.
 * Route: /sigillo/piani
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-26
 * @purpose Vista prezzi pubblica con tutti i piani Sigillo nel formato classico
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '@/stores/useUIStore';
import { egiApi } from '@/services/api';

// ---------------------------------------------------------------------------
// Struttura piani
// ---------------------------------------------------------------------------

interface Plan {
    code:        string | null;
    icon:        string;
    category:    string;
    title:       string;
    price:       string;
    period:      string;
    pricePerCert: string | null;
    egiliGift:   string | null;
    expiry:      string | null;
    features:    string[];
    badge:       string | null;
    highlight:   boolean;
    cta:         string;
    ctaStyle:    'primary' | 'secondary' | 'outline';
}

const SPOT_PLANS: Plan[] = [
    {
        code:         'sigillo_single_cert',
        icon:         '📄',
        category:     'Pay per uso',
        title:        'Certificazione Singola',
        price:        '€4,99',
        period:       'una tantum',
        pricePerCert: null,
        egiliGift:    null,
        expiry:       'Nessuna scadenza',
        features: [
            'Hash SHA-256 del tuo file',
            'Ancoraggio permanente su Algorand',
            'Certificato PDF scaricabile',
            'Link di verifica pubblica',
            'Verificabile su allo.info senza FlorenceEGI',
        ],
        badge:     null,
        highlight: false,
        cta:       'Acquista — €4,99',
        ctaStyle:  'secondary',
    },
    {
        code:         'sigillo_single_cert_cid',
        icon:         '🪪',
        category:     'Pay per uso',
        title:        'Certificazione + Identità',
        price:        '€14,99',
        period:       'una tantum',
        pricePerCert: null,
        egiliGift:    null,
        expiry:       'Nessuna scadenza',
        features: [
            'Tutto della Certificazione Singola',
            'Verifica identità (CIE / Passaporto)',
            'Certificato riporta identità verificata del firmatario',
            'Valore legale rafforzato (firma avanzata)',
            'Utile per contratti, accordi, NDA',
        ],
        badge:     'Più valore legale',
        highlight: true,
        cta:       'Acquista — €14,99',
        ctaStyle:  'primary',
    },
];

const PACK_PLANS: Plan[] = [
    {
        code:         'sigillo_pack_10',
        icon:         '📋',
        category:     'Pacchetto',
        title:        'Pack 10',
        price:        '€29,90',
        period:       '10 certificazioni',
        pricePerCert: '€2,99 / cert',
        egiliGift:    '1.500 Egili in regalo',
        expiry:       'Valido 2 anni',
        features: [
            '10 certificazioni blockchain',
            'Validità 2 anni (nessun rinnovo annuale forzato)',
            '1.500 Egili in regalo',
            'PDF + JSON per ogni certificato',
            'Verifica pubblica permanente',
        ],
        badge:     null,
        highlight: false,
        cta:       'Acquista Pack 10',
        ctaStyle:  'secondary',
    },
    {
        code:         'sigillo_pack_50',
        icon:         '📦',
        category:     'Pacchetto',
        title:        'Pack 50',
        price:        '€99,90',
        period:       '50 certificazioni',
        pricePerCert: '€2,00 / cert',
        egiliGift:    '4.000 Egili in regalo',
        expiry:       'Valido 2 anni',
        features: [
            '50 certificazioni blockchain',
            'Validità 2 anni',
            '4.000 Egili in regalo',
            'PDF + JSON per ogni certificato',
            'Verifica pubblica permanente',
        ],
        badge:     'Più popolare',
        highlight: true,
        cta:       'Acquista Pack 50',
        ctaStyle:  'primary',
    },
    {
        code:         'sigillo_pack_100',
        icon:         '🗂️',
        category:     'Pacchetto',
        title:        'Pack 100',
        price:        '€179,90',
        period:       '100 certificazioni',
        pricePerCert: '€1,80 / cert',
        egiliGift:    '7.000 Egili in regalo',
        expiry:       'Valido 3 anni',
        features: [
            '100 certificazioni blockchain',
            'Validità 3 anni',
            '7.000 Egili in regalo',
            'PDF + JSON per ogni certificato',
            'Verifica pubblica permanente',
        ],
        badge:     null,
        highlight: false,
        cta:       'Acquista Pack 100',
        ctaStyle:  'secondary',
    },
];

const PRO_PLAN: Plan = {
    code:         'sigillo_monthly_100',
    icon:         '🏆',
    category:     'Abbonamento',
    title:        'Pro Mensile',
    price:        '€7,90',
    period:       '/mese · rinnovo automatico',
    pricePerCert: '€0,08 / cert',
    egiliGift:    '800 Egili ogni mese',
    expiry:       '100 cert/mese',
    features: [
        '100 certificazioni al mese',
        'Rinnovo automatico mensile',
        '800 Egili ogni mese',
        'PDF + JSON per ogni certificato',
        'Priorità nel batch di ancoraggio',
        'Ideale per studi legali, commercialisti, PMI',
    ],
    badge:     'Miglior valore €/cert',
    highlight: false,
    cta:       'Abbonati — €7,90/mese',
    ctaStyle:  'secondary',
};

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export function SigilloPlansPage() {
    const navigate = useUIStore((state) => state.navigate);
    const [loading, setLoading]   = useState<string | null>(null);
    const [error, setError]       = useState<string | null>(null);

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
                    <div className="rounded-xl bg-red-500/15 border border-red-500/30 px-4 py-3 text-sm text-red-400 max-w-md mx-auto">
                        {error}
                    </div>
                )}
            </div>

            {/* ── Sezione SPOT ──────────────────────────────────────────── */}
            <Section title="Pay per uso" subtitle="Paga solo quando ne hai bisogno. Nessun abbonamento.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
                    {SPOT_PLANS.map((plan, i) => (
                        <PlanCard key={plan.code} plan={plan} index={i} loading={loading} onCheckout={handleCheckout} />
                    ))}
                </div>
            </Section>

            {/* ── Sezione PACK ──────────────────────────────────────────── */}
            <Section title="Pacchetti" subtitle="Compra una volta, usa nel tempo. Egili in regalo.">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                    {PACK_PLANS.map((plan, i) => (
                        <PlanCard key={plan.code} plan={plan} index={i} loading={loading} onCheckout={handleCheckout} />
                    ))}
                </div>
            </Section>

            {/* ── Sezione PRO ──────────────────────────────────────────── */}
            <Section title="Abbonamento" subtitle="Per chi certifica regolarmente. Il costo per certificato più basso.">
                <div className="max-w-lg mx-auto">
                    <PlanCard plan={PRO_PLAN} index={0} loading={loading} onCheckout={handleCheckout} wide />
                </div>
            </Section>

            {/* ── Enterprise ────────────────────────────────────────────── */}
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
    plan: Plan; index: number; loading: string | null;
    onCheckout: (code: string) => void; wide?: boolean;
}) {
    const isLoading = loading === plan.code;

    const ctaBg = plan.ctaStyle === 'primary'
        ? 'var(--accent)'
        : plan.ctaStyle === 'secondary'
            ? 'rgba(255,255,255,0.10)'
            : 'transparent';

    const ctaColor = plan.ctaStyle === 'primary' ? '#0A1222' : 'rgba(255,255,255,0.85)';
    const ctaBorder = plan.ctaStyle === 'outline' ? '1px solid rgba(255,255,255,0.2)' : 'none';

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className={`rounded-2xl p-6 flex flex-col gap-5 ${wide ? 'md:flex-row md:items-start md:gap-8' : ''}`}
            style={{
                background: plan.highlight ? 'rgba(14,165,164,0.07)' : 'rgba(255,255,255,0.03)',
                border: plan.highlight ? '1.5px solid rgba(14,165,164,0.40)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: plan.highlight ? '0 0 30px rgba(14,165,164,0.08)' : 'none',
            }}
        >
            {/* Top */}
            <div className={wide ? 'flex-1' : ''}>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{plan.category}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-xl" aria-hidden="true">{plan.icon}</span>
                            <h3 className="font-bold text-white/90 text-base">{plan.title}</h3>
                        </div>
                    </div>
                    {plan.badge && (
                        <span
                            className="text-[10px] px-2.5 py-1 rounded-full font-semibold shrink-0"
                            style={{
                                background: plan.highlight ? 'rgba(14,165,164,0.25)' : 'rgba(255,255,255,0.10)',
                                color: plan.highlight ? '#0EA5A4' : 'rgba(255,255,255,0.70)',
                            }}
                        >
                            {plan.badge}
                        </span>
                    )}
                </div>

                {/* Prezzo */}
                <div className="mb-5">
                    <span className="text-3xl font-black text-white/95">{plan.price}</span>
                    <span className="text-xs text-white/40 ml-2">{plan.period}</span>
                    {plan.pricePerCert && (
                        <p className="text-xs text-[var(--accent)]/70 mt-1">{plan.pricePerCert}</p>
                    )}
                    {plan.expiry && (
                        <p className="text-xs text-white/30 mt-0.5">{plan.expiry}</p>
                    )}
                    {plan.egiliGift && (
                        <p className="text-xs text-[var(--accent)]/60 mt-1">+ {plan.egiliGift}</p>
                    )}
                </div>

                {/* Feature list */}
                <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-white/55">
                            <span className="text-[var(--accent)] shrink-0 mt-px" aria-hidden="true">✓</span>
                            {f}
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA */}
            <div className={wide ? 'shrink-0 self-center' : ''}>
                {plan.code ? (
                    <button
                        type="button"
                        onClick={() => onCheckout(plan.code!)}
                        disabled={isLoading}
                        className={`w-full py-3 px-6 rounded-xl text-sm font-bold transition-opacity hover:opacity-85 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${wide ? 'md:w-auto' : ''}`}
                        style={{ background: ctaBg, color: ctaColor, border: ctaBorder }}
                        aria-label={plan.cta}
                    >
                        {isLoading ? 'Caricamento...' : plan.cta}
                    </button>
                ) : (
                    <p className="text-xs text-white/30 text-center">Usa gli Egili nel flusso di certificazione</p>
                )}
            </div>
        </motion.div>
    );
}
