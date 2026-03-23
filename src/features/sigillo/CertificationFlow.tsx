/**
 * CertificationFlow — Macchina a stati che orchestra l'intera esperienza Sigillo.
 * idle → selected → hashing → certifying → anchoring | done | error/paywall
 */
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileHasher } from './FileHasher';
import { BlockchainAnimation } from './BlockchainAnimation';
import { CertificateCard } from './CertificateCard';
import { SigilloPaywall } from './SigilloPaywall';
import { useCertification } from './hooks/useCertification';
import config from '@/utils/config';

const POLL_INTERVAL_MS = 8000;   // controlla stato ogni 8s durante 'anchoring'
const POLL_MAX_ATTEMPTS = 45;    // max 6 minuti di polling

export function CertificationFlow() {
    const {
        state, file, certificate, paywallInfo, errorMessage,
        selectFile, setHash, certify, getCertificate, reset,
    } = useCertification();

    const pollCount  = useRef(0);
    const pollTimer  = useRef<ReturnType<typeof setInterval> | null>(null);

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

    // Dopo hashing: avvia certificazione automaticamente
    const handleHashReady = async (_file: File, hash: string) => {
        setHash(hash);
        await certify();
    };

    const isPaywall = state === 'error' && paywallInfo;

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

                        {/* Bottone certifica (attivo solo quando hash pronto) */}
                        {file?.hash && state === 'selected' && (
                            <motion.button
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={certify}
                                className="w-full mt-5 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold text-base hover:opacity-90 active:scale-[0.99] transition-all"
                            >
                                Certifica su Blockchain →
                            </motion.button>
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
                                Ancoraggio blockchain entro 1 ora.
                            </motion.p>
                        )}
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
                        <div className="text-4xl">⚠️</div>
                        <p className="text-red-400 text-sm">{errorMessage ?? 'Errore imprevisto. Riprova.'}</p>
                        <button
                            onClick={reset}
                            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-sm transition-colors"
                        >
                            Riprova
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
