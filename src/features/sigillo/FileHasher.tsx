/**
 * FileHasher — Drag & drop + calcolo SHA-256 client-side.
 * Il file NON lascia il dispositivo. Solo l'hash viene trasmesso.
 */
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFileHasher } from './hooks/useFileHasher';

interface FileHasherProps {
    onHashReady: (file: File, hash: string) => void;
    onFileSelected: (file: File) => void;
}

export function FileHasher({ onHashReady, onFileSelected }: FileHasherProps) {
    const inputRef                    = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [displayHash, setDisplayHash] = useState('');
    const { hash, isHashing, progress, error, compute } = useFileHasher();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Effetto typewriter sull'hash mentre appare
    useEffect(() => {
        if (!hash) { setDisplayHash(''); return; }
        let i = 0;
        setDisplayHash('');
        const interval = setInterval(() => {
            setDisplayHash(hash.slice(0, i + 1));
            i++;
            if (i >= hash.length) {
                clearInterval(interval);
                if (selectedFile) onHashReady(selectedFile, hash);
            }
        }, 18); // ~18ms per carattere → ~1.1s per 64 chars
        return () => clearInterval(interval);
    }, [hash]);

    const handleFile = async (file: File) => {
        setSelectedFile(file);
        onFileSelected(file);
        await compute(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div className="w-full space-y-4">
            {/* Drop zone */}
            <motion.div
                className={`
                    relative rounded-2xl border-2 border-dashed p-10 text-center
                    cursor-pointer transition-colors duration-200
                    ${isDragging
                        ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                        : 'border-white/20 hover:border-[var(--accent)]/60 hover:bg-white/5'
                    }
                `}
                animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                {/* Pulse ring quando dragging */}
                {isDragging && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-[var(--accent)]"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                    />
                )}

                <div className="pointer-events-none space-y-3">
                    <div className="text-5xl">🔒</div>
                    <p className="text-lg font-semibold text-white/90">
                        Trascina qui il tuo file
                    </p>
                    <p className="text-sm text-white/50">
                        PDF · Foto · Video · Codice · Qualsiasi cosa
                    </p>
                    <div className="inline-block mt-2 px-4 py-2 rounded-lg bg-white/10 text-sm text-white/70 hover:bg-white/20 transition-colors">
                        Scegli file
                    </div>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                />
            </motion.div>

            {/* Card file selezionato + hash */}
            <AnimatePresence>
                {selectedFile && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 space-y-3"
                    >
                        {/* Info file */}
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{mimeIcon(selectedFile.type)}</span>
                            <div className="min-w-0">
                                <p className="font-medium text-white/90 truncate">{selectedFile.name}</p>
                                <p className="text-xs text-white/50">{formatSize(selectedFile.size)}</p>
                            </div>
                        </div>

                        {/* Hash typewriter */}
                        <div>
                            <p className="text-xs text-white/40 mb-1 uppercase tracking-widest">SHA-256</p>
                            <div className="font-mono text-xs text-[var(--accent)] break-all leading-relaxed min-h-[2.5rem]">
                                {isHashing && !displayHash && (
                                    <motion.span
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="text-white/40"
                                    >
                                        Calcolo impronta digitale...
                                    </motion.span>
                                )}
                                {displayHash}
                                {isHashing && displayHash.length < 64 && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        className="inline-block w-[1ch] bg-[var(--accent)]"
                                    >
                                        &nbsp;
                                    </motion.span>
                                )}
                            </div>
                        </div>

                        {/* Progress bar durante hashing */}
                        {isHashing && (
                            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[var(--accent)]"
                                    animate={{ width: `${progress * 100}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        )}

                        {/* Errore */}
                        {error && (
                            <p className="text-xs text-red-400">{error}</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Disclaimer privacy */}
            <p className="text-center text-xs text-white/40 flex items-center justify-center gap-1">
                <span>🔒</span>
                <span>Il tuo file <strong className="text-white/60">NON viene caricato</strong>. Solo la sua impronta digitale.</span>
            </p>
        </div>
    );
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`;
    return `${(bytes / 1073741824).toFixed(2)} GB`;
}

function mimeIcon(mime: string): string {
    if (mime.startsWith('image/')) return '🖼️';
    if (mime.startsWith('video/')) return '🎬';
    if (mime.startsWith('audio/')) return '🎵';
    if (mime === 'application/pdf') return '📄';
    if (mime.includes('zip') || mime.includes('archive')) return '📦';
    if (mime.includes('text') || mime.includes('javascript') || mime.includes('json')) return '📝';
    return '📁';
}
