/**
 * CertificationFlow — Macchina a stati che orchestra l'intera esperienza Sigillo.
 * idle → selected → hashing → certifying → pending_email | anchoring | done | error/paywall
 *
 * Flusso utenti anonimi: selected → [inserisce email] → certifying → pending_email
 * Flusso utenti autenticati: selected → certifying → anchoring → done
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.1.0
 * @purpose Gestione visuale della certificazione Sigillo con supporto email confirmation
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileHasher } from './FileHasher';
import { BlockchainAnimation } from './BlockchainAnimation';
import { CertificateCard } from './CertificateCard';
import { SigilloPaywall } from './SigilloPaywall';
import { useCertification } from './hooks/useCertification';
import config from '@/utils/config';

const POLL_INTERVAL_MS  = 8000;   // controlla stato ogni 8s durante 'anchoring'
const POLL_MAX_ATTEMPTS = 45;     // max 6 minuti di polling

export function CertificationFlow({ confirmedUuid }: { confirmedUuid?: string | null }) {
    const {
        state, file, certificate, paywallInfo, errorMessage,
        selectFile, setHash, certify, getCertificate, confirmFromUrl, reset,
    } = useCertification();

    const [email, setEmail] = useState('');

    const pollCount = useRef(0);
    const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    // Se l'utente arriva dal magic link di conferma email, carica il certificato
    // e porta la macchina a stati in 'anchoring' (o 'done' se già ancorato)
    useEffect(() => {
        if (confirmedUuid) {
            confirmFromUrl(confirmedUuid);
        }
    }, [confirmedUuid]);

    // Polling durante 'anchoring': controlla se il cron ha ancorato
    useEffect(() => {
        if (state === 'anchoring' && certificate?.uuid) {
            pollCount.current = 0;
            pollTimer.current = setInterval(async () => {
                pollCount.current++;
                const updated = await getCertificate(certificate.uuid);

                if (updated?.status === 'anchored' || pollCount.current >= POLL_MAX_ATTEMPTS) {
                    clearInterval(pollTimer.current!);
                }
            }, POLL_INTERVAL_MS);
        }
        return () => { if (pollTimer.current) clearInterval(pollTimer.current); };
    }, [state, certificate?.uuid]);

    // Dopo hashing: aggiorna solo l'hash, NON avvia auto-certificazione.
    // L'utente deve inserire email (se anonimo) e cliccare il bottone.
    const handleHashReady = (_file: File, hash: string) => {
        setHash(hash);
    };

    const handleCertify = () => {
        certify(email.trim() || undefined);
    };

    const isEmailValid = email.includes('@') && email.includes('.');
    const isPaywall    = state === 'error' && paywallInfo;

    return (
        <div className="w-full max-w-lg mx-auto">
            <AnimatePresence mode="wait">

                {/* STATO: idle / selected / hashing */}
                {(state === 'idle' || state === 'selected' || state === 'hashing') && (
                    <motion.div
                        key="hasher"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -12 }}
                    >
                        <FileHasher
                            onFileSelected={selectFile}
                            onHashReady={handleHashReady}
                        />

                        {/* Email + bottone certifica (visibili solo quando l'hash è pronto) */}
                        {file?.hash && state === 'selected' && (
                            <div className="mt-3 space-y-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="La tua email per ricevere il certificato"
                                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[var(--accent)]/60"
                                    aria-label="Email per ricevere il certificato"
                                />
                                <motion.button
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={handleCertify}
                                    disabled={!isEmailValid}
                                    className="w-full py-4 rounded-xl bg-[var(--accent)] text-white font-semibold text-base hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    type="button"
                                >
                                    Certifica su Blockchain →
                                </motion.button>
                                <p className="text-xs text-white/30 text-center">
                                    Il tuo file non viene caricato. Solo l'impronta SHA-256.
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* STATO: certifying / anchoring */}
                {(state === 'certifying' || state === 'anchoring') && (
                    <motion.div
                        key="animation"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8"
                    >
                        <BlockchainAnimation batchCount={Math.floor(Math.random() * 800) + 100} />
                        {state === 'anchoring' && certificate && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                                className="text-center text-xs text-white/40 mt-4"
                            >
                                UUID: <span className="font-mono text-white/60">{certificate.uuid}</span>
                                <br />
                                Ancoraggio blockchain in corso...
                            </motion.p>
                        )}
                    </motion.div>
                )}

                {/* STATO: pending_email */}
                {state === 'pending_email' && certificate && (
                    <motion.div
                        key="pending-email"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-5 py-10"
                    >
                        <div className="text-5xl" role="img" aria-label="Email inviata">📬</div>
                        <div>
                            <h3 className="font-bold text-white/90 text-lg mb-2">
                                Controlla la tua email
                            </h3>
                            <p className="text-sm text-white/55 max-w-sm mx-auto leading-relaxed">
                                Abbiamo inviato un link di conferma a<br />
                                <span className="text-[var(--accent)] font-mono">
                                    {certificate.email ?? '...'}
                                </span>
                            </p>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-xs text-white/40 max-w-xs mx-auto">
                            ⏱ Il link scade in 30 minuti
                        </div>
                        <button
                            onClick={reset}
                            className="text-xs text-white/30 hover:text-white/60 transition-colors"
                            type="button"
                        >
                            ← Ricomincia
                        </button>
                    </motion.div>
                )}

                {/* STATO: done */}
                {state === 'done' && certificate && (
                    <motion.div
                        key="certificate"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <CertificateCard
                            certificate={certificate}
                            onCertifyAnother={reset}
                        />
                    </motion.div>
                )}

                {/* STATO: paywall */}
                {isPaywall && (
                    <motion.div
                        key="paywall"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <SigilloPaywall
                            egiliBalance={paywallInfo?.egili_balance}
                            onUseEgili={() => { reset(); certify(); }}
                            onBuyPack={() => { window.location.href = `${config.florenceUrl}/features/sigillo_pack_50/purchase`; }}
                            onBuyPro={() => { window.location.href = `${config.florenceUrl}/features/sigillo_monthly_100/purchase`; }}
                        />
                        <button
                            onClick={reset}
                            className="w-full mt-4 text-xs text-white/40 hover:text-white/70 transition-colors"
                            type="button"
                        >
                            ← Torna indietro
                        </button>
                    </motion.div>
                )}

                {/* STATO: error generico */}
                {state === 'error' && !isPaywall && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-4 py-8"
                    >
                        <div className="text-4xl" role="img" aria-label="Errore">⚠️</div>
                        <p className="text-red-400 text-sm">{errorMessage ?? 'Errore imprevisto. Riprova.'}</p>
                        <button
                            onClick={reset}
                            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-sm transition-colors"
                            type="button"
                        >
                            Riprova
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
