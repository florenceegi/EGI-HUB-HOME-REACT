/**
 * CertificateCard — Mostra il certificato completato.
 * Bordo gold, QR code, download PDF/JSON, link verifica.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from './hooks/useCertification';

interface CertificateCardProps {
    certificate: Certificate;
    onCertifyAnother: () => void;
}

export function CertificateCard({ certificate, onCertifyAnother }: CertificateCardProps) {
    const [copied, setCopied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);

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

    const downloadJson = () => {
        const receipt = {
            sigillo_version: '1.0',
            uuid:             certificate.uuid,
            file_name:        certificate.file_name,
            file_hash_sha256: certificate.file_hash_sha256,
            algorand_tx_id:   certificate.algorand_tx_id,
            merkle_root:      certificate.merkle_root,
            anchored_at:      certificate.anchored_at,
            ipfs_cid:         certificate.ipfs_cid,
            verify_url:       verifyUrl,
            issued_by:        'FlorenceEGI — Sigillo',
        };
        const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = `sigillo-${certificate.uuid.slice(0, 8)}.json`;
        a.click();
        URL.revokeObjectURL(url);
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
                        <span className="text-2xl">🏛️</span>
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

                {/* Azioni */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={downloadJson}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium transition-colors"
                    >
                        ⬇ JSON
                    </button>
                    <button
                        onClick={copyLink}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium transition-colors"
                    >
                        {copied ? '✓ Copiato' : '🔗 Link'}
                    </button>
                </div>

                <button
                    onClick={onCertifyAnother}
                    className="w-full py-3 rounded-xl bg-[var(--accent)] hover:opacity-90 text-white font-semibold text-sm transition-opacity"
                >
                    Certifica un altro file
                </button>

                {/* Nota conservazione */}
                <p className="text-center text-xs text-[#B08D2A]/70 bg-[#B08D2A]/10 rounded-lg px-3 py-2">
                    ⚠️ Conserva il file originale. Senza di esso il certificato non è verificabile.
                </p>
            </motion.div>
        </div>
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
