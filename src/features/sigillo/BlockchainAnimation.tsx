/**
 * BlockchainAnimation — Visualizza il flusso File → Merkle → Algorand
 * durante l'ancoraggio blockchain. Framer Motion path drawing.
 */
import React from 'react';
import { motion } from 'framer-motion';

interface BlockchainAnimationProps {
    batchCount?: number;
}

const nodes = [
    { id: 'file',     icon: '📄', label: 'Il tuo file',    sublabel: 'SHA-256' },
    { id: 'merkle',   icon: '🌐', label: 'Merkle Tree',    sublabel: 'Batch' },
    { id: 'algorand', icon: '⛓️', label: 'Algorand',       sublabel: 'Blockchain' },
];

export function BlockchainAnimation({ batchCount = 0 }: BlockchainAnimationProps) {
    return (
        <div className="w-full space-y-8 py-4">
            {/* Nodi + connettori */}
            <div className="flex items-center justify-center gap-2 md:gap-6">
                {nodes.map((node, i) => (
                    <React.Fragment key={node.id}>
                        {/* Nodo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.5, duration: 0.4, ease: 'backOut' }}
                            className="flex flex-col items-center gap-2 min-w-[72px]"
                        >
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        '0 0 0px rgba(14,165,164,0)',
                                        '0 0 18px rgba(14,165,164,0.6)',
                                        '0 0 0px rgba(14,165,164,0)',
                                    ],
                                }}
                                transition={{ delay: i * 0.5 + 0.3, duration: 1.8, repeat: Infinity }}
                                className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl"
                            >
                                {node.icon}
                            </motion.div>
                            <div className="text-center">
                                <p className="text-xs font-semibold text-white/80">{node.label}</p>
                                <p className="text-[10px] text-white/40 font-mono">{node.sublabel}</p>
                            </div>
                        </motion.div>

                        {/* Connettore (non dopo l'ultimo) */}
                        {i < nodes.length - 1 && (
                            <div className="flex-1 flex items-center px-1">
                                <svg className="w-full h-4 overflow-visible" viewBox="0 0 60 8">
                                    <motion.path
                                        d="M 0 4 L 60 4"
                                        stroke="rgba(14,165,164,0.6)"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 3"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ delay: i * 0.5 + 0.4, duration: 0.6 }}
                                    />
                                    {/* Freccia */}
                                    <motion.polygon
                                        points="54,1 60,4 54,7"
                                        fill="rgba(14,165,164,0.7)"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.5 + 1, duration: 0.3 }}
                                    />
                                </svg>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Testo batch + costo */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                className="text-center space-y-1"
            >
                {batchCount > 0 && (
                    <p className="text-sm text-white/60">
                        Stai certificando insieme ad altri{' '}
                        <span className="text-white/90 font-semibold">{batchCount}</span>{' '}
                        file.
                    </p>
                )}
                <p className="text-sm text-white/50">
                    Il costo blockchain è condiviso.{' '}
                    <span className="text-[var(--accent)] font-semibold">Costo: €0.00</span>
                </p>
            </motion.div>

            {/* Spinner progresso */}
            <div className="flex justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[var(--accent)]"
                />
            </div>
        </div>
    );
}
