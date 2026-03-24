/**
 * VerifySection — Verifica un certificato Sigillo esistente.
 * L'hash viene calcolato client-side — il file non viene caricato.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFileHasher } from './hooks/useFileHasher';
import { useCertification, VerifyResult } from './hooks/useCertification';

export function VerifySection() {
    const [uuid, setUuid]         = useState('');
    const [result, setResult]     = useState<VerifyResult | null>(null);
    const [isVerifying, setVerifying] = useState(false);
    const [fileReady, setFileReady]   = useState(false);
    const [computedHash, setComputedHash] = useState<string | null>(null);

    const { compute, isHashing } = useFileHasher();
    const { verify }             = useCertification();

    // Pre-riempie l'UUID se il link contiene #verifica?uuid=...
    React.useEffect(() => {
        const hash = window.location.hash; // es. "#verifica?uuid=xxx"
        if (!hash.startsWith('#verifica')) return;
        const hashParams = new URLSearchParams(hash.split('?')[1] ?? '');
        const uuidParam = hashParams.get('uuid');
        if (uuidParam) setUuid(uuidParam);
    }, []);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setResult(null);
        setFileReady(false);
        const hash = await compute(file);
        if (hash) {
            setComputedHash(hash);
            setFileReady(true);
        }
    };

    const handleJsonReceipt = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target?.result as string);
                if (data.uuid) setUuid(data.uuid);
            } catch { /* non è un JSON valido */ }
        };
        reader.readAsText(file);
    };

    const handleVerify = async () => {
        if (!uuid.trim() || !computedHash) return;
        setVerifying(true);
        setResult(null);
        const r = await verify(uuid.trim(), computedHash);
        setResult(r);
        setVerifying(false);
    };

    const canVerify = fileReady && uuid.trim().length > 0 && !isHashing;

    return (
        <section className="w-full max-w-lg mx-auto space-y-6 py-10">
            <div className="text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40 mb-2">Verifica</p>
                <h2 className="text-2xl font-bold text-white/90">Verifica un Sigillo</h2>
                <p className="text-sm text-white/50 mt-1">
                    Carica il file originale per verificare che non sia stato modificato.
                </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 space-y-5">
                {/* Upload file originale */}
                <div>
                    <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">
                        1 — File originale
                    </label>
                    <label className={`
                        flex items-center gap-3 p-3 rounded-xl border border-dashed cursor-pointer transition-colors
                        ${fileReady ? 'border-[var(--accent)]/60 bg-[var(--accent)]/5' : 'border-white/20 hover:border-white/40'}
                    `}>
                        <span className="text-xl">{fileReady ? '✅' : '📂'}</span>
                        <span className="text-sm text-white/70">
                            {fileReady ? 'File pronto — hash calcolato' : 'Seleziona il file da verificare'}
                        </span>
                        {isHashing && <span className="text-xs text-white/40 ml-auto">Calcolo...</span>}
                        <input type="file" className="hidden" onChange={handleFile} />
                    </label>
                </div>

                {/* UUID o JSON receipt */}
                <div>
                    <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">
                        2 — UUID certificato
                    </label>
                    <input
                        type="text"
                        value={uuid}
                        onChange={(e) => setUuid(e.target.value)}
                        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white/80 font-mono placeholder:text-white/25 focus:outline-none focus:border-[var(--accent)]/60"
                    />
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-white/30">oppure</span>
                        <label className="text-xs text-[var(--accent)] cursor-pointer hover:underline">
                            carica ricevuta .json
                            <input type="file" accept=".json" className="hidden" onChange={handleJsonReceipt} />
                        </label>
                    </div>
                </div>

                {/* Bottone verifica */}
                <button
                    onClick={handleVerify}
                    disabled={!canVerify || isVerifying}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all
                               bg-[var(--accent)] text-white hover:opacity-90
                               disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isVerifying ? 'Verifica in corso...' : 'Verifica →'}
                </button>
            </div>

            {/* Risultato */}
            <AnimatePresence>
                {result !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`rounded-xl border p-5 space-y-3 ${
                            result.is_valid
                                ? 'border-emerald-500/40 bg-emerald-500/10'
                                : 'border-red-500/40 bg-red-500/10'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">{result.is_valid ? '✅' : '❌'}</span>
                            <div>
                                <p className={`font-bold text-sm ${result.is_valid ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {result.is_valid ? 'Valido' : 'Non valido'}
                                </p>
                                <p className="text-xs text-white/50">
                                    {result.is_valid
                                        ? 'Il file corrisponde esattamente al certificato registrato.'
                                        : 'Il file è stato modificato dopo la certificazione.'}
                                </p>
                            </div>
                        </div>

                        {result.is_valid && result.anchored_at && (
                            <div className="text-xs text-white/50 space-y-1 border-t border-white/10 pt-3">
                                <p>Certificato il: <span className="text-white/70">{new Date(result.anchored_at).toLocaleString('it-IT')}</span></p>
                                {result.algorand_tx_id && (
                                    <p className="font-mono break-all text-[var(--accent)]/70">TX: {result.algorand_tx_id}</p>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
