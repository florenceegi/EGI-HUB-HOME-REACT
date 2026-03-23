/**
 * SigilloPaywall — Mostra le opzioni di upgrade quando i 3 free sono esauriti.
 */
import { motion } from 'framer-motion';

interface SigilloPaywallProps {
    egiliBalance?: number;
    onUseEgili: () => void;
    onBuyPack: () => void;
    onBuyPro: () => void;
}

const EGILI_PER_CERT = 50;

export function SigilloPaywall({ egiliBalance = 0, onUseEgili, onBuyPack, onBuyPro }: SigilloPaywallProps) {
    const canUseEgili = egiliBalance >= EGILI_PER_CERT;

    const tiers = [
        {
            id: 'egili',
            icon: '⚡',
            title: 'Usa i tuoi Egili',
            price: '50 Egili / cert',
            description: 'Usa gli Egili che hai già nel wallet, guadagnati in qualsiasi modo nell\'ecosistema.',
            cta: canUseEgili ? `Usa Egili (saldo: ${egiliBalance})` : `Egili insufficienti (hai ${egiliBalance})`,
            disabled: !canUseEgili,
            color: 'teal',
            action: onUseEgili,
        },
        {
            id: 'pack',
            icon: '📦',
            title: 'Pack 50 Certificazioni',
            price: '€4,90',
            description: '50 certificazioni valide 1 anno. Include 500 Egili in regalo.',
            cta: 'Acquista Pack — €4,90',
            badge: '500 Egili in regalo',
            disabled: false,
            color: 'blue',
            action: onBuyPack,
        },
        {
            id: 'pro',
            icon: '🏆',
            title: 'Sigillo Pro',
            price: '€7,90/mese',
            description: '100 certificazioni al mese con rinnovo automatico. Include 800 Egili in regalo ogni mese.',
            cta: 'Attiva Pro — €7,90/mese',
            badge: '800 Egili/mese',
            disabled: false,
            color: 'gold',
            action: onBuyPro,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-5"
        >
            <div className="text-center space-y-1">
                <p className="text-lg font-semibold text-white/90">
                    Hai usato le tue 3 certificazioni gratuite
                </p>
                <p className="text-sm text-white/50">
                    Scegli come continuare a certificare
                </p>
            </div>

            <div className="space-y-3">
                {tiers.map((tier, i) => (
                    <motion.button
                        key={tier.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={tier.action}
                        disabled={tier.disabled}
                        className={`
                            w-full text-left rounded-xl border p-4 transition-all duration-200
                            ${tier.disabled
                                ? 'border-white/10 bg-white/5 opacity-50 cursor-not-allowed'
                                : 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 cursor-pointer'
                            }
                        `}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <span className="text-xl mt-0.5">{tier.icon}</span>
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-white/90 text-sm">{tier.title}</p>
                                        {tier.badge && (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] font-medium">
                                                {tier.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-white/50">{tier.description}</p>
                                    {!tier.disabled && (
                                        <p className="text-xs text-[var(--accent)] font-medium mt-1">
                                            {tier.cta} →
                                        </p>
                                    )}
                                    {tier.disabled && (
                                        <p className="text-xs text-white/30 mt-1">{tier.cta}</p>
                                    )}
                                </div>
                            </div>
                            <span className="text-sm font-bold text-white/60 shrink-0">{tier.price}</span>
                        </div>
                    </motion.button>
                ))}
            </div>

            <div className="text-center">
                <a href="/ecosystem" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                    Come guadagnare Egili nell'ecosistema →
                </a>
            </div>
        </motion.div>
    );
}
