/**
 * AnonCertificatesPanel — Accesso ai certificati per utenti anonimi Sigillo.
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-24
 * @purpose Permette agli utenti anonimi di recuperare la lista dei propri
 *          certificati inserendo il token ricevuto via email alla conferma.
 */

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCertification } from './hooks/useCertification';
import type { AnonCertificate, AnonCertificatesResult } from './hooks/useCertification';

// ---------------------------------------------------------------------------
// Tipi interni
// ---------------------------------------------------------------------------

type PanelState = 'form' | 'loading' | 'invalid_token' | 'error' | 'list';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string | null): string {
    if (!iso) return '—';
    try {
        return new Intl.DateTimeFormat('it-IT', {
            day: '2-digit', month: 'short', year: 'numeric',
        }).format(new Date(iso));
    } catch {
        return iso;
    }
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'anchored') {
        return (
            <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}
            >
                <span aria-hidden="true">●</span>
                Ancorato
            </span>
        );
    }
    if (status === 'pending' || status === 'anchoring') {
        return (
            <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(234,179,8,0.15)', color: '#fbbf24' }}
            >
                <span aria-hidden="true">◌</span>
                In corso
            </span>
        );
    }
    return (
        <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
        >
            {status}
        </span>
    );
}

// ---------------------------------------------------------------------------
// CertificateCard
// ---------------------------------------------------------------------------

function CertificateCard({ cert }: { cert: AnonCertificate }) {
    return (
        <div
            className="rounded-xl p-4 flex flex-col gap-2"
            style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            {/* Nome file + badge */}
            <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-white/90 leading-snug break-all">
                    {cert.file_name}
                </p>
                <StatusBadge status={cert.status} />
            </div>

            {/* Hash corto */}
            <p
                className="text-xs"
                style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)' }}
                title="Hash abbreviato del file"
            >
                {cert.short_hash}
            </p>

            {/* Meta row */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs text-white/40">
                    {formatDate(cert.created_at)}
                    {cert.file_size_human ? ` · ${cert.file_size_human}` : ''}
                </span>

                {cert.status === 'anchored' && (
                    <a
                        href={`#verifica?uuid=${encodeURIComponent(cert.uuid)}`}
                        className="text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded"
                        style={{ color: 'var(--accent)' }}
                        aria-label={`Verifica certificato ${cert.file_name}`}
                    >
                        Verifica →
                    </a>
                )}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Componente principale
// ---------------------------------------------------------------------------

export function AnonCertificatesPanel() {
    const { fetchAnonCertificates } = useCertification();

    const [panelState, setPanelState]   = useState<PanelState>('form');
    const [token, setToken]             = useState('');
    const [result, setResult]           = useState<AnonCertificatesResult | null>(null);
    const inputRef                      = useRef<HTMLInputElement>(null);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = token.trim();
        if (!trimmed) return;

        setPanelState('loading');
        try {
            const data = await fetchAnonCertificates(trimmed);
            if (data === null) {
                // 401 → token non valido
                setPanelState('invalid_token');
            } else {
                setResult(data);
                setPanelState('list');
            }
        } catch {
            setPanelState('error');
        }
    }, [token, fetchAnonCertificates]);

    const handleReset = useCallback(() => {
        setToken('');
        setResult(null);
        setPanelState('form');
        // Restituzione focus al campo dopo reset
        requestAnimationFrame(() => inputRef.current?.focus());
    }, []);

    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
            }}
            role="region"
            aria-label="I miei certificati"
        >
            {/* Header sezione */}
            <div
                className="px-5 py-4 flex items-center gap-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
                <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="var(--accent)" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M8 9h8M8 13h5" />
                </svg>
                <h2 className="text-sm font-semibold text-white/80">
                    I miei certificati
                </h2>
            </div>

            {/* Body */}
            <div className="px-5 py-5">
                <AnimatePresence mode="wait">

                    {/* ---- FORM ---- */}
                    {panelState === 'form' && (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <label
                                htmlFor="anon-cert-token"
                                className="block text-xs font-medium text-white/60 mb-2"
                            >
                                Inserisci il tuo token personale
                            </label>
                            <input
                                ref={inputRef}
                                id="anon-cert-token"
                                type="text"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="Il token è nell'email di conferma che hai ricevuto"
                                autoComplete="off"
                                spellCheck={false}
                                aria-describedby="anon-cert-token-help"
                                className="w-full rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:ring-2 focus:ring-[var(--accent)]"
                                style={{
                                    fontFamily: 'monospace',
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                }}
                            />
                            <p
                                id="anon-cert-token-help"
                                className="mt-2 text-xs text-white/35"
                            >
                                Il token ti è stato inviato via email quando hai confermato la tua prima certificazione.
                            </p>
                            <button
                                type="submit"
                                disabled={!token.trim()}
                                className="mt-4 w-full rounded-lg py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{
                                    background: 'var(--accent)',
                                    color: '#0A1222',
                                }}
                            >
                                Accedi ai tuoi certificati →
                            </button>
                        </motion.form>
                    )}

                    {/* ---- LOADING ---- */}
                    {panelState === 'loading' && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex flex-col items-center gap-3 py-6"
                            role="status"
                            aria-live="polite"
                            aria-label="Caricamento certificati in corso"
                        >
                            <svg
                                className="animate-spin"
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="12" cy="12" r="10"
                                    stroke="rgba(255,255,255,0.12)" strokeWidth="2.5"
                                />
                                <path
                                    d="M12 2a10 10 0 0 1 10 10"
                                    stroke="var(--accent)" strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <p className="text-sm text-white/50">Caricamento certificati...</p>
                        </motion.div>
                    )}

                    {/* ---- TOKEN NON VALIDO ---- */}
                    {panelState === 'invalid_token' && (
                        <motion.div
                            key="invalid"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            role="alert"
                            aria-live="assertive"
                        >
                            <div
                                className="rounded-xl p-4 text-sm text-center mb-4"
                                style={{
                                    background: 'rgba(239,68,68,0.1)',
                                    border: '1px solid rgba(239,68,68,0.25)',
                                    color: '#f87171',
                                }}
                            >
                                Token non valido. Controlla l'email di conferma.
                            </div>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-full rounded-lg py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    color: 'rgba(255,255,255,0.6)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                ← Riprova
                            </button>
                        </motion.div>
                    )}

                    {/* ---- ERRORE GENERICO ---- */}
                    {panelState === 'error' && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            role="alert"
                            aria-live="assertive"
                        >
                            <div
                                className="rounded-xl p-4 text-sm text-center mb-4"
                                style={{
                                    background: 'rgba(239,68,68,0.1)',
                                    border: '1px solid rgba(239,68,68,0.25)',
                                    color: '#f87171',
                                }}
                            >
                                Si è verificato un errore. Riprova tra qualche istante.
                            </div>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-full rounded-lg py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    color: 'rgba(255,255,255,0.6)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                ← Riprova
                            </button>
                        </motion.div>
                    )}

                    {/* ---- LISTA CERTIFICATI ---- */}
                    {panelState === 'list' && result && (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Header lista */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-white/80">
                                    I tuoi certificati
                                </h3>
                                <span
                                    className="text-xs px-2 py-0.5 rounded-full"
                                    style={{
                                        background: 'rgba(255,255,255,0.07)',
                                        color: 'rgba(255,255,255,0.45)',
                                    }}
                                    aria-label={`${result.meta.total} certificati trovati`}
                                >
                                    {result.meta.total}{' '}
                                    {result.meta.total === 1 ? 'certificato' : 'certificati'}
                                </span>
                            </div>

                            {/* Lista */}
                            {result.data.length === 0 ? (
                                <p className="text-sm text-white/35 text-center py-4">
                                    Nessun certificato trovato per questo token.
                                </p>
                            ) : (
                                <ul
                                    className="flex flex-col gap-3"
                                    aria-label="Elenco certificati"
                                >
                                    {result.data.map((cert) => (
                                        <li key={cert.uuid}>
                                            <CertificateCard cert={cert} />
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Bottone reset */}
                            <button
                                type="button"
                                onClick={handleReset}
                                className="mt-5 w-full rounded-lg py-2 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                style={{
                                    background: 'transparent',
                                    color: 'rgba(255,255,255,0.35)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                }}
                            >
                                ← Cambia token
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
