/**
 * CertificateMockModal — Certificato demo con filigrana ANTEPRIMA.
 * Identico al certificato reale, dati fittizi, download disabilitati.
 * Scopo: conversione — l'utente vede esattamente cosa riceverà.
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-26
 * @purpose CTA demo: mostra certificato autentico con hash finto + watermark ANTEPRIMA
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificateMockModalProps {
    onClose:    () => void;
    onBuy:      (featureCode: string) => void;
    buyLoading: string | null;
}

const MOCK = {
    file_name:        'contratto_prestazione_2026.pdf',
    file_size_human:  '1.8 MB',
    file_hash_sha256: 'a4f3c9d2e8b1f7a2c5d6e9b3f4a7c2d5e8b1f6a3c4d7e2b5f8a1c3d6e9b2f5a8',
    algorand_tx_id:   'SIGILLODEMOHASHFAKETXIDALGORAND7FAKE3ANCHOR9DEMO',
    anchored_at:      new Date().toISOString(),
    uuid:             'demo-a1b2-c3d4-e5f6-000000000000',
};

export function CertificateMockModal({ onClose, onBuy, buyLoading }: CertificateMockModalProps) {
    const [showGuide, setShowGuide] = useState(false);

    const verifyUrl = `${window.location.origin}/sigillo/certificato/${MOCK.uuid}`;

    return (
        <AnimatePresence>
            <motion.div
                key="mock-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(6px)' }}
                onClick={onClose}
                role="dialog"
                aria-modal="true"
                aria-label="Anteprima certificato Sigillo"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93 }}
                    transition={{ duration: 0.3, ease: 'backOut' }}
                    className="w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Label demo */}
                    <div className="flex items-center justify-between mb-3 px-1">
                        <span className="text-[10px] uppercase tracking-widest text-white/30">
                            Anteprima certificato
                        </span>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white/40 hover:text-white/80 transition-colors text-lg leading-none focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                            aria-label="Chiudi anteprima"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Card certificato — identica al reale */}
                    <div className="relative">

                        {/* Filigrana ANTEPRIMA */}
                        <div
                            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none rounded-2xl overflow-hidden"
                            aria-hidden="true"
                        >
                            <span
                                className="text-5xl font-black tracking-[0.25em] select-none"
                                style={{
                                    color: 'rgba(255,255,255,0.10)',
                                    transform: 'rotate(-30deg)',
                                    whiteSpace: 'nowrap',
                                    letterSpacing: '0.2em',
                                    userSelect: 'none',
                                }}
                            >
                                ANTEPRIMA
                            </span>
                        </div>

                        {/* Carta certificato */}
                        <div
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
                                <span className="text-3xl" aria-label="Certificato ancorato">✅</span>
                            </div>

                            {/* Divisore gold */}
                            <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, #B08D2A, transparent)' }} />

                            {/* Dati */}
                            <div className="space-y-3 text-sm">
                                <Row label="File"         value={MOCK.file_name} />
                                <Row label="Dimensione"   value={MOCK.file_size_human} />
                                <Row
                                    label="Hash SHA-256"
                                    value={`${MOCK.file_hash_sha256.slice(0, 16)}...${MOCK.file_hash_sha256.slice(-8)}`}
                                    mono
                                />
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-white/40 text-xs">TX Algorand</span>
                                    <span className="text-xs font-mono text-[var(--accent)]">
                                        {MOCK.algorand_tx_id.slice(0, 16)}... ↗
                                    </span>
                                </div>
                                <Row
                                    label="Data certificazione"
                                    value={new Date(MOCK.anchored_at).toLocaleString('it-IT')}
                                />
                                <Row label="UUID" value={MOCK.uuid} mono small />
                            </div>

                            {/* Divisore */}
                            <div className="h-px bg-white/10" />

                            {/* Link verifica (disabilitato) */}
                            <div className="text-center">
                                <p className="text-[10px] text-white/40 font-mono truncate">{verifyUrl}</p>
                            </div>

                            {/* Download — disabilitati nel demo */}
                            <div className="grid grid-cols-2 gap-3 opacity-40 pointer-events-none select-none" aria-hidden="true">
                                <div
                                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold"
                                    style={{ background: 'var(--accent)', color: '#0A1222' }}
                                >
                                    <span>📄</span> Scarica PDF
                                </div>
                                <div
                                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium"
                                    style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)' }}
                                >
                                    <span className="font-mono">{'{}'}</span> Scarica JSON
                                </div>
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
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.22 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div className="px-4 pb-4 space-y-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                                                <p className="text-xs text-white/50 pt-3 leading-relaxed">
                                                    Il PDF è la tua prova legale di anteriorità temporale. Conservalo insieme al file originale.
                                                </p>
                                                <GuideRow icon="✅"><strong>Cosa dimostra:</strong> il file esisteva in questa forma esatta alla data indicata.</GuideRow>
                                                <GuideRow icon="⚠️"><strong>Cosa NON dimostra da solo:</strong> che sei tu l'autore. Inserisci il tuo nome nel file prima di certificarlo.</GuideRow>
                                                <GuideRow icon="🔒"><strong>Conserva il file originale:</strong> senza di esso il certificato non è verificabile.</GuideRow>
                                                <GuideRow icon="📋"><strong>Verifica indipendente:</strong> chiunque può verificare su allo.info usando il TX Algorand, senza dipendere da FlorenceEGI.</GuideRow>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Nota conservazione */}
                            <p className="text-center text-xs text-[#B08D2A]/70 bg-[#B08D2A]/10 rounded-lg px-3 py-2">
                                ⚠️ Conserva il file originale. Senza di esso il certificato non è verificabile.
                            </p>
                        </div>
                    </div>

                    {/* CTA acquisto — fuori dalla card */}
                    <div className="mt-4 space-y-2">
                        <p className="text-center text-xs text-white/40 mb-3">
                            Questo è un certificato demo. Il tuo avrà hash e TX reali, verificabili su blockchain.
                        </p>
                        <button
                            type="button"
                            onClick={() => onBuy('sigillo_single_cert')}
                            disabled={buyLoading === 'sigillo_single_cert'}
                            className="w-full py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                            style={{ background: 'var(--accent)', color: '#0A1222' }}
                        >
                            {buyLoading === 'sigillo_single_cert' ? '...' : 'Certifica il tuo file — €4,99'}
                        </button>
                        <button
                            type="button"
                            onClick={() => onBuy('sigillo_single_cert_cid')}
                            disabled={buyLoading === 'sigillo_single_cert_cid'}
                            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-white/10 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white/30"
                            style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)' }}
                        >
                            {buyLoading === 'sigillo_single_cert_cid' ? '...' : '+ Verifica identità (CIE) — €14,99'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

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
