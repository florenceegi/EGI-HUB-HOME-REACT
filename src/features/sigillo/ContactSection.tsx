/**
 * @package EGI-HUB-HOME-REACT
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - Sigillo ContactSection)
 * @date 2026-03-27
 * @purpose Sezione contatti della pagina Sigillo — email, logo, CTA mailto e piani
 */
import { motion } from 'framer-motion';
import { useRevealOnView } from '../../hooks/useRevealOnView';
import { useUIStore } from '../../stores/useUIStore';

export function ContactSection() {
    const { ref, isIn } = useRevealOnView();
    const navigate = useUIStore((state) => state.navigate);

    return (
        <section ref={ref} className="w-full py-16 space-y-10">
            {/* Header centrato */}
            <div className="text-center space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                    SUPPORTO · FLORENCEEGI
                </p>

                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isIn ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <img
                        src="/images/logo_egi.svg"
                        alt="FlorenceEGI"
                        className="w-16 h-16 rounded-full ring-2 ring-[var(--accent)]/40 shadow-lg shadow-[var(--accent)]/10"
                        style={{ filter: 'drop-shadow(0 0 12px rgba(14,165,164,0.3))' }}
                    />
                </motion.div>

                <h2 className="text-2xl font-bold text-white/90">
                    Hai domande su Sigillo?
                </h2>
                <p className="text-sm text-white/55 max-w-md mx-auto leading-relaxed">
                    Il nostro team è qui per aiutarti. Scrivici per qualsiasi dubbio su certificazioni, piani o aspetti tecnici.
                </p>
            </div>

            {/* Card centrale */}
            <motion.div
                className="max-w-md mx-auto rounded-2xl border border-white/10 p-8 backdrop-blur-sm space-y-6"
                style={{ background: 'rgba(14,165,164,0.06)' }}
                initial={{ opacity: 0, y: 24 }}
                animate={isIn ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.5 }}
            >
                {/* Shine top */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -mt-2" />

                {/* Row email */}
                <div className="flex items-center gap-4">
                    <span className="text-2xl" aria-hidden="true">✉️</span>
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-[0.14em] text-white/30 mb-0.5">
                            Email
                        </span>
                        <a
                            href="mailto:info@florenceegi.com"
                            className="text-sm font-medium text-[var(--accent)] hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded"
                        >
                            info@florenceegi.com
                        </a>
                    </div>
                </div>

                {/* Row CTA */}
                <motion.div
                    className="flex items-center gap-3 flex-wrap pt-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={isIn ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.25, duration: 0.5 }}
                >
                    <a
                        href="mailto:info@florenceegi.com"
                        className="px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                        style={{ background: 'var(--accent)', color: '#0A1222' }}
                    >
                        Scrivici →
                    </a>
                    <button
                        type="button"
                        onClick={() => navigate('/sigillo/piani')}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)' }}
                    >
                        Vedi i piani
                    </button>
                </motion.div>
            </motion.div>

            {/* Footer testo */}
            <p className="text-center text-xs text-white/40">
                Risposta garantita entro 24 ore nei giorni lavorativi.
            </p>
        </section>
    );
}
