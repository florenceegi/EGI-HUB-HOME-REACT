/**
 * CertificationDemoFlow — Flusso demo reale: file reale → hash SHA-256 → PDF ANTEPRIMA.
 * Standalone: non tocca CertificationFlow.tsx legacy.
 * Flusso: drop file → hash browser → POST /api/sigillo/demo-pdf → download PDF.
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-26
 * @purpose CTA demo: certificato identico al reale con hash del file vero + watermark ANTEPRIMA
 */
import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { egiApi } from '@/services/api';
import { useUIStore } from '@/stores/useUIStore';

type DemoState = 'idle' | 'hashing' | 'generating' | 'done' | 'error';

interface CertificationDemoFlowProps {
    onClose?: () => void;
}

export function CertificationDemoFlow({ onClose }: CertificationDemoFlowProps) {
    const navigate = useUIStore((s) => s.navigate);
    const [state, setState]       = useState<DemoState>('idle');
    const [fileName, setFileName] = useState<string | null>(null);
    const [progress, setProgress] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // SHA-256 via Web Crypto API
    const computeHash = async (file: File): Promise<string> => {
        const buffer = await file.arrayBuffer();
        const hashBuf = await window.crypto.subtle.digest('SHA-256', buffer);
        return Array.from(new Uint8Array(hashBuf))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    };

    const processFile = useCallback(async (file: File) => {
        setFileName(file.name);
        setErrorMsg(null);
        setState('hashing');
        setProgress('Calcolo impronta SHA-256...');

        let hash: string;
        try {
            hash = await computeHash(file);
        } catch {
            setState('error');
            setErrorMsg('Errore nel calcolo dell\'hash. Riprova.');
            return;
        }

        setState('generating');
        setProgress('Generazione certificato ANTEPRIMA...');

        try {
            const response = await egiApi.post(
                '/sigillo/demo-pdf',
                {
                    file_hash_sha256: hash,
                    file_name:        file.name,
                    file_size_bytes:  file.size,
                    file_mime_type:   file.type || null,
                },
                { responseType: 'blob' }
            );

            // Trigger download
            const url     = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const anchor  = document.createElement('a');
            anchor.href   = url;
            anchor.download = 'sigillo-anteprima.pdf';
            anchor.click();
            URL.revokeObjectURL(url);

            setState('done');
        } catch (err: any) {
            setState('error');
            setErrorMsg(err.response?.data?.message ?? 'Errore nella generazione del PDF. Riprova.');
        }
    }, []);

    const handleFile = useCallback((file: File | undefined) => {
        if (!file) return;
        processFile(file);
    }, [processFile]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
    }, [handleFile]);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => setDragging(false);

    const reset = () => {
        setState('idle');
        setFileName(null);
        setErrorMsg(null);
        setProgress('');
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <AnimatePresence>
            <motion.div
                key="demo-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
                onClick={onClose}
                role="dialog"
                aria-modal="true"
                aria-label="Prova Sigillo con il tuo file"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93 }}
                    transition={{ duration: 0.3, ease: 'backOut' }}
                    className="w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 px-1">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-[var(--accent)]/70">
                                Prova gratuita
                            </p>
                            <p className="text-white/80 text-sm font-semibold mt-0.5">
                                Certifica il tuo file — ANTEPRIMA
                            </p>
                        </div>
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-white/40 hover:text-white/80 transition-colors text-lg leading-none focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                                aria-label="Chiudi"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Card */}
                    <div
                        className="rounded-2xl p-6 space-y-5"
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.10)',
                        }}
                    >
                        {/* Stato: idle */}
                        {state === 'idle' && (
                            <>
                                <p className="text-xs text-white/50 leading-relaxed">
                                    Trascina o seleziona <strong className="text-white/70">qualsiasi file</strong>.
                                    Calcoliamo l'hash SHA-256 nel browser (il file non viene caricato),
                                    poi generiamo il certificato PDF con filigrana <span className="text-[#c0392b]">ANTEPRIMA</span>.
                                </p>

                                {/* Drop zone */}
                                <div
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Seleziona file da certificare"
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onClick={() => inputRef.current?.click()}
                                    onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
                                    className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-10 px-4 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    style={{
                                        borderColor: dragging
                                            ? 'rgba(14,165,164,0.70)'
                                            : 'rgba(255,255,255,0.15)',
                                        background: dragging
                                            ? 'rgba(14,165,164,0.06)'
                                            : 'rgba(255,255,255,0.02)',
                                    }}
                                >
                                    <span className="text-3xl mb-3" aria-hidden="true">📂</span>
                                    <p className="text-sm text-white/60 text-center">
                                        Trascina qui il file<br />
                                        <span className="text-xs text-white/30">oppure clicca per selezionare</span>
                                    </p>
                                </div>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    className="hidden"
                                    aria-hidden="true"
                                    onChange={(e) => handleFile(e.target.files?.[0])}
                                />
                            </>
                        )}

                        {/* Stato: hashing / generating */}
                        {(state === 'hashing' || state === 'generating') && (
                            <div className="flex flex-col items-center py-8 gap-4">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                                    className="w-10 h-10 rounded-full border-2 border-[var(--accent)]/30"
                                    style={{ borderTopColor: 'var(--accent)' }}
                                    aria-hidden="true"
                                />
                                <div className="text-center">
                                    <p className="text-sm text-white/70">{progress}</p>
                                    {fileName && (
                                        <p className="text-xs text-white/30 mt-1 font-mono truncate max-w-xs">
                                            {fileName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Stato: done */}
                        {state === 'done' && (
                            <div className="text-center py-4 space-y-4">
                                <span className="text-5xl" aria-hidden="true">✅</span>
                                <div>
                                    <p className="text-white/80 font-semibold text-sm">
                                        PDF ANTEPRIMA scaricato!
                                    </p>
                                    <p className="text-xs text-white/40 mt-1 max-w-xs mx-auto leading-relaxed">
                                        Questo è esattamente come apparirà il tuo certificato autentico,
                                        con hash reale e transazione Algorand.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onClose?.();
                                            navigate('/sigillo/piani');
                                        }}
                                        className="w-full py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                        style={{ background: 'var(--accent)', color: '#0A1222' }}
                                    >
                                        Acquista il certificato autentico →
                                    </button>
                                    <button
                                        type="button"
                                        onClick={reset}
                                        className="w-full py-2.5 rounded-xl text-xs text-white/40 hover:text-white/70 transition-colors focus:outline-none"
                                    >
                                        Prova con un altro file
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Stato: error */}
                        {state === 'error' && (
                            <div className="text-center py-4 space-y-4">
                                <span className="text-4xl" aria-hidden="true">⚠️</span>
                                <p className="text-sm text-red-400">{errorMsg}</p>
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="w-full py-2.5 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 border border-white/15 transition-all focus:outline-none"
                                >
                                    Riprova
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Nota sotto */}
                    {state === 'idle' && (
                        <p className="text-center text-[10px] text-white/20 mt-3 px-2">
                            L'hash è calcolato localmente nel tuo browser · Il file non viene mai caricato
                        </p>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
