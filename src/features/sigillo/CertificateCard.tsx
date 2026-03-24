/**
 * CertificateCard — Mostra il certificato completato.
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.1.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-25
 * @purpose Render della carta certificato con download PDF/JSON da backend
 *          e box informativo su come usare il certificato.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from './hooks/useCertification';

const EGI_BASE_URL = (import.meta.env.VITE_EGI_URL as string | undefined) ?? 'https://art.florenceegi.com';

interface CertificateCardProps {
    certificate: Certificate;
    onCertifyAnother: () => void;
}

export function CertificateCard({ certificate, onCertifyAnother }: CertificateCardProps) {
    const [copied, setCopied]           = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);
    const [showGuide, setShowGuide]     = useState(false);

    const verifyUrl = `${window.location.origin}/sigillo/certificato/${certificate.uuid}`;

    useEffect(() => {
        const t = setTimeout(() => setShowConfetti(false), 2500);
        return () => clearTimeout(t);
    }, []);

    const copyLink = async () => {
        await navigator.clipboard.writeText(verifyUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    /**
     * Scarica il file (PDF o JSON) dall'endpoint backend.
     * Usa un tag <a> temporaneo con l'URL diretto — il browser gestisce
     * il download nativo senza fetch intermedio, compatibile con tutti i browser.
     */
    const downloadFile = (type: 'pdf' | 'json') => {
        const url = `${EGI_BASE_URL}/sigillo/${certificate.uuid}/download/${type}`;
        const a   = document.createElement('a');
        a.href     = url;
        a.download = `sigillo-${certificate.uuid.slice(0, 8)}.${type}`;
        a.rel      = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const isAnchored = certificate.status === 'anchored';

    return (
        <div className="relative w-full">
            {/* Confetti burst */}
            <AnimatePresence>
                {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                        {[...Array(18)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    background: i % 3 === 0 ? '#0EA5A4' : i % 3 === 1 ? '#B08D2A' : '#ffffff',
                                    left: `${10 + (i * 5) % 80}%`,
                                    top: '40%',
                                }}
                                initial={{ y: 0, opacity: 1, scale: 1 }}
                                animate={{ y: -120 - Math.random() * 80, opacity: 0, scale: 0.3, x: (i % 2 === 0 ? 1 : -1) * Math.random() * 60 }}
                                transition={{ duration: 1.2 + Math.random() * 0.8, ease: 'easeOut' }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Carta certificato */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'backOut' }}
                className="rounded-2xl border-2 p-6 space-y-5 backdrop-blur-md"
                style={{ borderColor: '#B08D2A', background: 'rgba(176,141,42,0.06)' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">🏛️</span>
                        <div>
                            <p className="font-bold text-white/90 tracking-wide text-sm">SIGILLO</p>
                            <p className="text-[10px] text-white/40 font-mono">FlorenceEGI · Algorand</p>
                        </div>
                    </div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="text-3xl"
                        aria-label={isAnchored ? 'Certificato ancorato' : 'Ancoraggio in corso'}
                    >
                        {isAnchored ? '✅' : '⏳'}
                    </motion.div>
                </div>

                {/* Divisore gold */}
                <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, #B08D2A, transparent)' }} />

                {/* Dati certificato */}
                <div className="space-y-3 text-sm">
                    <Row label="File" value={certificate.file_name} />
                    <Row label="Dimensione" value={certificate.file_size_human} />
                    <Row label="Hash SHA-256" value={`${certificate.file_hash_sha256.slice(0, 16)}...${certificate.file_hash_sha256.slice(-8)}`} mono />
                    {certificate.algorand_tx_id && (
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-white/40 text-xs">TX Algorand</span>
                            <a
                                href={`https://allo.info/tx/${certificate.algorand_tx_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-mono text-[var(--accent)] hover:underline focus:outline-none focus:ring-1 focus:ring-[var(--accent)] rounded"
                                title={certificate.algorand_tx_id}
                                aria-label="Vedi transazione su Algorand Explorer"
                            >
                                {certificate.algorand_tx_id.slice(0, 16)}... ↗
                            </a>
                        </div>
                    )}
                    {certificate.anchored_at ? (
                        <Row label="Data certificazione" value={new Date(certificate.anchored_at).toLocaleString('it-IT')} />
                    ) : (
                        <Row label="Stato" value="Ancoraggio blockchain in corso..." />
                    )}
                    <Row label="UUID" value={certificate.uuid} mono small />
                </div>

                {/* Divisore */}
                <div className="h-px bg-white/10" />

                {/* Link verifica */}
                <div className="text-center">
                    <p className="text-[10px] text-white/40 font-mono truncate">{verifyUrl}</p>
                </div>

                {/* Azioni download — visibili solo se ancorato */}
                {isAnchored && (
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => downloadFile('pdf')}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                            style={{ background: 'var(--accent)', color: '#0A1222' }}
                            aria-label="Scarica certificato in formato PDF"
                        >
                            <span aria-hidden="true">📄</span>
                            Scarica PDF
                        </button>
                        <button
                            type="button"
                            onClick={() => downloadFile('json')}
                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'rgba(255,255,255,0.75)',
                            }}
                            aria-label="Scarica ricevuta in formato JSON"
                        >
                            <span aria-hidden="true" className="font-mono text-base leading-none">{'{}'}</span>
                            Scarica JSON
                        </button>
                    </div>
                )}

                {/* Azioni non-download */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={copyLink}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                        aria-label="Copia link di verifica"
                    >
                        {copied ? '✓ Copiato' : '🔗 Link'}
                    </button>
                    <button
                        type="button"
                        onClick={onCertifyAnother}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    >
                        + Altro file
                    </button>
                </div>

                {/* Box informativo collassabile */}
                <div
                    className="rounded-xl overflow-hidden"
                    style={{ border: '1px solid rgba(255,255,255,0.10)' }}
                >
                    <button
                        type="button"
                        onClick={() => setShowGuide((v) => !v)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent)]"
                        aria-expanded={showGuide}
                        aria-controls="cert-guide-panel"
                    >
                        <span className="text-xs font-medium text-white/60 flex items-center gap-2">
                            <span aria-hidden="true">ℹ️</span>
                            Come usare questo certificato
                        </span>
                        <span
                            className="text-white/40 text-xs transition-transform duration-200"
                            style={{ display: 'inline-block', transform: showGuide ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            aria-hidden="true"
                        >
                            ↓
                        </span>
                    </button>

                    <AnimatePresence initial={false}>
                        {showGuide && (
                            <motion.div
                                id="cert-guide-panel"
                                key="guide"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div
                                    className="px-4 pb-4 space-y-2.5"
                                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                                >
                                    <p className="text-xs text-white/50 pt-3 leading-relaxed">
                                        Il PDF è la tua prova legale di anteriorità temporale.
                                        Conservalo insieme al file originale.
                                    </p>
                                    <GuideRow icon="✅">
                                        <strong>Cosa dimostra:</strong> il file esisteva in questa forma esatta alla data indicata.
                                    </GuideRow>
                                    <GuideRow icon="⚠️">
                                        <strong>Cosa NON dimostra da solo:</strong> che sei tu l'autore. Per rafforzare la paternità, inserisci il tuo nome e contatti nel file prima di certificarlo.
                                    </GuideRow>
                                    <GuideRow icon="🔒">
                                        <strong>Conserva il file originale:</strong> senza di esso il certificato non è verificabile.
                                    </GuideRow>
                                    <GuideRow icon="📋">
                                        <strong>Verifica indipendente:</strong> chiunque può verificare su{' '}
                                        <a
                                            href="https://allo.info"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline hover:text-white/70 focus:outline-none focus:ring-1 focus:ring-[var(--accent)] rounded"
                                        >
                                            allo.info
                                        </a>
                                        {' '}usando il TX Algorand, senza dipendere da FlorenceEGI.
                                    </GuideRow>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Nota conservazione */}
                <p className="text-center text-xs text-[#B08D2A]/70 bg-[#B08D2A]/10 rounded-lg px-3 py-2">
                    ⚠️ Conserva il file originale. Senza di esso il certificato non è verificabile.
                </p>
            </motion.div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Componenti ausiliari
// ---------------------------------------------------------------------------

function Row({ label, value, mono = false, small = false }: {
    label: string; value: string; mono?: boolean; small?: boolean;
}) {
    return (
        <div className="flex justify-between items-start gap-3">
            <span className="text-white/40 shrink-0 text-xs">{label}</span>
            <span className={`text-right break-all ${mono ? 'font-mono text-[var(--accent)]' : 'text-white/80'} ${small ? 'text-[10px]' : 'text-xs'}`}>
                {value}
            </span>
        </div>
    );
}

function GuideRow({ icon, children }: { icon: string; children: React.ReactNode }) {
    return (
        <div className="flex gap-2 text-xs text-white/45 leading-relaxed">
            <span className="shrink-0 mt-px" aria-hidden="true">{icon}</span>
            <span>{children}</span>
        </div>
    );
}
