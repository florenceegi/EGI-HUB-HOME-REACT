import { motion } from 'framer-motion';
import { useRevealOnView } from '../../hooks/useRevealOnView';

const cases = [
    { icon: '📸', title: 'Fotografi',   body: "Certifica prima di pubblicare. Prova di anteriorità sul diritto d'autore.", badge: null },
    { icon: '🏠', title: 'Affittuari',  body: "Documenta lo stato dell'appartamento. Prova di data certa contro finti danni.", badge: null },
    { icon: '💼', title: 'Consulenti',  body: 'Certifica proposte commerciali inviate. Prova di anteriorità delle idee.', badge: null },
    { icon: '📱', title: 'Giornalisti', body: 'Certifica screenshot di post o messaggi prima che vengano cancellati.', badge: null },
    { icon: '💻', title: 'Developer',   body: 'Certifica il codice sorgente. Prova di anteriorità su algoritmi proprietari.', badge: null },
    { icon: '⚖️', title: 'Compro Oro',  body: 'Soddisfa Art. 6 D.M. — integrità e non alterabilità dati per 10 anni.', badge: 'Obbligo di Legge' },
];

export function UseCasesSection() {
    const { ref, isIn } = useRevealOnView();

    return (
        <section ref={ref} className="w-full py-16 space-y-10">
            <div className="text-center space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Chi lo usa</p>
                <h2 className="text-2xl font-bold text-white/90">Un caso d'uso per ognuno</h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cases.map((c, i) => (
                    <motion.div
                        key={c.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isIn ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-200 p-5 space-y-3"
                    >
                        {/* Shine */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <div className="flex items-start justify-between gap-2">
                            <span className="text-2xl">{c.icon}</span>
                            {c.badge && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-medium shrink-0">
                                    {c.badge}
                                </span>
                            )}
                        </div>

                        <div>
                            <h3 className="font-semibold text-white/85 mb-1">{c.title}</h3>
                            <p className="text-sm text-white/50 leading-relaxed">{c.body}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
