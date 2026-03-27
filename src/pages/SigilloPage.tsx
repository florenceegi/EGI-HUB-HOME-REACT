/**
 * SigilloPage — Pagina principale del servizio Sigillo su florenceegi.com/sigillo
 * Dark layout, full experience: certifica → verifica → casi d'uso → come funziona
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CertificationFlow }        from '../features/sigillo/CertificationFlow';
import { VerifySection }             from '../features/sigillo/VerifySection';
import { HowItWorksSection }         from '../features/sigillo/HowItWorksSection';
import { UseCasesSection }           from '../features/sigillo/UseCasesSection';
import { AnonCertificatesPanel }     from '../features/sigillo/AnonCertificatesPanel';
import { SigilloAuthModal }          from '../features/sigillo/SigilloAuthModal';
import { SigilloPlans }              from '../features/sigillo/SigilloPlans';
import { CertificationDemoFlow }     from '../features/sigillo/CertificationDemoFlow';
import { useSigilloAuth }            from '../features/sigillo/hooks/useSigilloAuth';
import { useUIStore }                from '../stores/useUIStore';
import { egiApi }                  from '../services/api';
import { SigilloAdvisor }           from '../features/sigillo/SigilloAdvisor';
import { ContactSection }           from '../features/sigillo/ContactSection';

type ConfirmStatus = 'confirmed' | 'expired' | 'not_found' | null;
type AuthModal = 'login' | 'register' | null;

export function SigilloPage() {
    const [confirmStatus, setConfirmStatus]   = useState<ConfirmStatus>(null);
    const [confirmedUuid, setConfirmedUuid]   = useState<string | null>(null);
    const [authModal, setAuthModal]           = useState<AuthModal>(null);
    const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
    const [checkoutError, setCheckoutError]   = useState<string | null>(null);
    const [purchaseStatus, setPurchaseStatus] = useState<'success' | 'error' | null>(null);
    const [purchaseError, setPurchaseError]   = useState<string | null>(null);
    const [showMockModal, setShowMockModal]   = useState(false);

    const { user, logout } = useSigilloAuth();
    const navigate = useUIStore((state) => state.navigate);

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
        const purchaseComplete = params.get('purchase_complete');
        const purchaseErr      = params.get('purchase_error');
        if (purchaseComplete) {
            setPurchaseStatus('success');
            window.history.replaceState({}, '', '/sigillo');
        }
        if (purchaseErr) {
            setPurchaseStatus('error');
            setPurchaseError(purchaseErr);
            window.history.replaceState({}, '', '/sigillo');
        }
    }, []);

    const handleCheckout = async (featureCode: string) => {
        if (!user) {
            setAuthModal('login');
            return;
        }
        setCheckoutLoading(featureCode);
        setCheckoutError(null);
        try {
            const { data } = await egiApi.post<{ checkout_url: string }>(
                '/sigillo/checkout',
                { feature_code: featureCode }
            );
            window.location.href = data.checkout_url;
        } catch (err: any) {
            const msg = err.response?.data?.message ?? 'Errore durante il checkout. Riprova.';
            setCheckoutError(msg);
            setCheckoutLoading(null);
        }
    };

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

                {/* CTA principali: demo + piani */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-3 flex-wrap"
                >
                    <button
                        type="button"
                        onClick={() => setShowMockModal(true)}
                        className="px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                        style={{ background: 'var(--accent)', color: '#0A1222' }}
                    >
                        Vedi come funziona →
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/sigillo/piani')}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)' }}
                    >
                        Vedi i piani
                    </button>
                </motion.div>

                {/* Auth CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-3 flex-wrap"
                >
                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-white/60">👤 {user.name}</span>
                            <button
                                type="button"
                                onClick={logout}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
                            >
                                Esci
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={() => setAuthModal('register')}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                style={{ background: 'var(--accent)', color: '#0A1222' }}
                            >
                                Registrati — Sblocca illimitato
                            </button>
                            <button
                                type="button"
                                onClick={() => setAuthModal('login')}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                                style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)' }}
                            >
                                Accedi
                            </button>
                        </>
                    )}
                </motion.div>
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

            {/* Banner acquisto completato */}
            {purchaseStatus === 'success' && (
                <div className="px-6 mb-4 max-w-lg mx-auto">
                    <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-sm text-emerald-400 text-center">
                        Acquisto completato! Il pacchetto è ora attivo sul tuo account.
                    </div>
                </div>
            )}
            {purchaseStatus === 'error' && (
                <div className="px-6 mb-4 max-w-lg mx-auto">
                    <div className="rounded-xl bg-red-500/15 border border-red-500/30 p-4 text-sm text-red-400 text-center">
                        {purchaseError === 'payment_not_completed'
                            ? 'Pagamento non completato.'
                            : purchaseError === 'user_not_found'
                                ? 'Utente non trovato. Accedi e riprova.'
                                : purchaseError === 'activation_failed_refunded'
                                    ? 'Attivazione fallita — rimborso emesso automaticamente. Riprova tra qualche minuto o contatta il supporto.'
                                    : "Errore durante l'acquisto. Contatta il supporto."}
                    </div>
                </div>
            )}
            {/* Banner errore checkout lato client */}
            {checkoutError && (
                <div className="px-6 mb-4 max-w-lg mx-auto">
                    <div className="rounded-xl bg-red-500/15 border border-red-500/30 p-4 text-sm text-red-400 text-center">
                        {checkoutError}
                    </div>
                </div>
            )}

            {/* CertificationFlow — la box principale */}
            <section className="px-6 pb-10 max-w-lg mx-auto">
                <CertificationFlow confirmedUuid={confirmedUuid} isAuthenticated={!!user} />
            </section>

            {/* Piani di abbonamento — visibili sempre */}
            <section className="px-6 pb-6 max-w-lg mx-auto">
                <SigilloPlans onCheckout={handleCheckout} checkoutLoading={checkoutLoading} />
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

            {/* Contatti */}
            <div className="px-6 max-w-4xl mx-auto border-t border-white/5 pt-4">
                <ContactSection />
            </div>

            {/* Footer mini */}
            <div className="px-6 py-10 text-center border-t border-white/5 space-y-2">
                <p className="text-xs text-white/25">
                    Sigillo è un servizio FlorenceEGI · Powered by Algorand Blockchain
                </p>
                <button
                    type="button"
                    onClick={() => navigate('/sigillo/valore-legale')}
                    className="text-xs text-white/30 hover:text-white/60 transition-colors focus:outline-none underline underline-offset-2"
                >
                    Valore legale e limiti di Sigillo →
                </button>
            </div>

            {/* Flusso demo: file reale → hash SHA-256 → PDF ANTEPRIMA */}
            {showMockModal && (
                <CertificationDemoFlow
                    onClose={() => setShowMockModal(false)}
                />
            )}

            {/* Modal auth — inline, nessun redirect */}
            <AnimatePresence>
                {authModal && (
                    <SigilloAuthModal
                        key="auth-modal"
                        initialMode={authModal}
                        onClose={() => setAuthModal(null)}
                    />
                )}
            </AnimatePresence>

            {/* AI Advisor sidebar — FAB + sliding panel */}
            <SigilloAdvisor user={user} />
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
