import { motion } from 'framer-motion';
import { useRevealOnView } from '../../hooks/useRevealOnView';

const steps = [
    {
        icon: '🔍',
        title: 'Impronta digitale',
        body: 'Il tuo file non viene mai caricato. Il browser calcola la sua impronta unica SHA-256.',
        eyebrow: 'Step 1',
        color: 'rgba(14,165,164,0.15)',
    },
    {
        icon: '⛓️',
        title: 'Blockchain immutabile',
        body: "L'impronta viene ancorata su Algorand con un Merkle tree. Una sola TX per migliaia di file.",
        eyebrow: 'Step 2',
        color: 'rgba(176,141,42,0.15)',
    },
    {
        icon: '📋',
        title: 'Prova per sempre',
        body: 'Ricevi un certificato PDF + ricevuta JSON. Chiunque può verificare indipendentemente da noi.',
        eyebrow: 'Step 3',
        color: 'rgba(14,165,164,0.1)',
    },
];

export function HowItWorksSection() {
    const { ref, isIn } = useRevealOnView();

    return (
        <section ref={ref} className="w-full py-16 space-y-10">
            <div className="text-center space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Come funziona</p>
                <h2 className="text-2xl font-bold text-white/90">Tre passi. Matematicamente certi.</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 24 }}
                        animate={isIn ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        className="rounded-2xl border border-white/10 p-6 space-y-4 backdrop-blur-sm"
                        style={{ background: step.color }}
                    >
                        {/* Shine top */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent -mt-1" />

                        <div className="text-4xl">{step.icon}</div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.14em] text-white/30 mb-1">{step.eyebrow}</p>
                            <h3 className="font-bold text-white/90 mb-2">{step.title}</h3>
                            <p className="text-sm text-white/55 leading-relaxed">{step.body}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
