/**
 * SigilloPage — Pagina principale del servizio Sigillo su florenceegi.com/sigillo
 * Dark layout, full experience: certifica → verifica → casi d'uso → come funziona
 */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CertificationFlow }      from '../features/sigillo/CertificationFlow';
import { VerifySection }           from '../features/sigillo/VerifySection';
import { HowItWorksSection }       from '../features/sigillo/HowItWorksSection';
import { UseCasesSection }         from '../features/sigillo/UseCasesSection';
import { AnonCertificatesPanel }   from '../features/sigillo/AnonCertificatesPanel';

type ConfirmStatus = 'confirmed' | 'expired' | 'not_found' | null;

export function SigilloPage() {
    const [confirmStatus, setConfirmStatus] = useState<ConfirmStatus>(null);
    const [confirmedUuid, setConfirmedUuid] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const uuid = params.get('confirmed');
        if (uuid) {
            setConfirmStatus('confirmed');
            setConfirmedUuid(uuid);
        }
        if (params.get('confirm_error') === 'expired')        setConfirmStatus('expired');
        if (params.get('confirm_error') === 'not_found')      setConfirmStatus('not_found');
        // Pulisci URL senza ricaricare la pagina
        if (params.has('confirmed') || params.has('confirm_error')) {
            window.history.replaceState({}, '', '/sigillo');
        }
    }, []);

    return (
        <div
            className="min-h-screen text-white"
            style={{ background: '#0A1222' }}
        >
            {/* Hero */}
            <section className="relative px-6 pt-20 pb-10 max-w-2xl mx-auto text-center space-y-6 overflow-hidden">

                {/* Particelle sfondo */}
                <Particles />

                {/* Logo EGI */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex justify-center"
                >
                    <img
                        src="/images/logo_egi.svg"
                        alt="FlorenceEGI"
                        className="w-20 h-20 rounded-full ring-2 ring-[var(--accent)]/40 shadow-lg shadow-[var(--accent)]/10"
                        style={{ filter: 'drop-shadow(0 0 12px rgba(14,165,164,0.3))' }}
                    />
                </motion.div>

                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]/80"
                >
                    BLOCKCHAIN · ALGORAND · SHA-256
                </motion.p>

                {/* Titolo */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Sigillo
                    <span className="block text-2xl md:text-3xl mt-2 text-white/70 font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        Prova matematica dell'esistenza
                    </span>
                </motion.h1>

                {/* Sottotitolo */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-white/60 text-base max-w-md mx-auto"
                >
                    Certifica qualsiasi file su blockchain. Gratuito. Immutabile. Per sempre.
                </motion.p>

                {/* Auth CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-3 flex-wrap"
                >
                    <a
                        href="https://art.florenceegi.com/features/sigillo_monthly_100/purchase"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                        style={{ background: 'var(--accent)', color: '#0A1222' }}
                    >
                        Registrati — Sblocca illimitato
                    </a>
                    <a
                        href="https://art.florenceegi.com/login"
                        className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)' }}
                    >
                        Accedi
                    </a>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xs text-white/30"
                >
                    3 certificazioni gratuite senza registrazione · Illimitato con account
                </motion.p>
            </section>

            {/* Banner conferma email / errore link */}
            {confirmStatus === 'confirmed' && (
                <div className="px-6 mb-4 max-w-lg mx-auto">
                    <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-sm text-emerald-400 text-center">
                        Email confermata! La tua certificazione è in corso di ancoraggio blockchain.
                    </div>
                </div>
            )}
            {(confirmStatus === 'expired' || confirmStatus === 'not_found') && (
                <div className="px-6 mb-4 max-w-lg mx-auto">
                    <div className="rounded-xl bg-red-500/15 border border-red-500/30 p-4 text-sm text-red-400 text-center">
                        {confirmStatus === 'expired'
                            ? 'Link scaduto. Ricomincia la certificazione.'
                            : 'Link non valido.'}
                    </div>
                </div>
            )}

            {/* CertificationFlow — la box principale */}
            <section className="px-6 pb-10 max-w-lg mx-auto">
                <CertificationFlow confirmedUuid={confirmedUuid} />
            </section>

            {/* Separatore visivo */}
            <div className="px-6 max-w-lg mx-auto pb-6">
                <div className="h-px bg-white/10" />
            </div>

            {/* Accesso certificati anonimi */}
            <section className="px-6 pb-6 max-w-lg mx-auto">
                <AnonCertificatesPanel />
            </section>

            {/* Separatore con link verifica */}
            <div className="px-6 max-w-lg mx-auto pb-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <a
                        href="#verifica"
                        className="text-xs text-white/40 hover:text-white/70 transition-colors shrink-0"
                    >
                        Hai già un certificato? Verificalo →
                    </a>
                    <div className="flex-1 h-px bg-white/10" />
                </div>
            </div>

            {/* Come funziona */}
            <div className="px-6 max-w-4xl mx-auto">
                <HowItWorksSection />
            </div>

            {/* Verifica */}
            <div id="verifica" className="px-6 max-w-lg mx-auto border-t border-white/5 pt-4">
                <VerifySection />
            </div>

            {/* Casi d'uso */}
            <div className="px-6 max-w-4xl mx-auto border-t border-white/5 pt-4">
                <UseCasesSection />
            </div>

            {/* Footer mini */}
            <div className="px-6 py-10 text-center border-t border-white/5">
                <p className="text-xs text-white/25">
                    Sigillo è un servizio FlorenceEGI · Powered by Algorand Blockchain
                </p>
            </div>
        </div>
    );
}

/** Particelle floating leggere in background */
function Particles() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[var(--accent)]/30"
                    style={{
                        left:  `${8 + (i * 8) % 84}%`,
                        top:   `${10 + (i * 13) % 80}%`,
                    }}
                    animate={{
                        y:       [0, -18, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: 3 + (i % 3),
                        repeat:   Infinity,
                        delay:    i * 0.4,
                        ease:     'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}
