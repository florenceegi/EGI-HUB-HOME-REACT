/**
 * SigilloAdvisor — AI Sidebar per Sigillo, FlorenceEGI
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - Sigillo AI Advisor)
 * @date 2026-03-26
 * @purpose FAB + sliding sidebar con chat AI Natan specializzata su Sigillo.
 *          Due modalità: guest (spiega il prodotto) e auth (guida operativa).
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { egiApi } from '@/services/api';
import { useUIStore } from '@/stores/useUIStore';

// ─── Types ─────────────────────────────────────────────────────────────────

interface Message { role: 'user' | 'assistant'; content: string; }

interface SigilloAdvisorProps {
    user: { name: string; email: string } | null;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const CHIPS_GUEST = ["Cos'è Sigillo?", 'CID: cosa cambia?', 'Qual piano fa per me?', 'È davvero legale?'] as const;
const CHIPS_AUTH  = ['Come certifico un file?', 'Come verifico?', 'Cosa mettere nel file prima?', 'I miei Egili'] as const;

const WELCOME_GUEST = "Ciao! Sono Natan, l'assistente AI di Sigillo. Posso spiegarti come funziona la certificazione blockchain, la differenza tra i piani e aiutarti a scegliere. Cosa vuoi sapere?";
const WELCOME_AUTH  = 'Ciao! Sono Natan, il tuo assistente per Sigillo. Posso guidarti nel flusso di certificazione, spiegarti come verificare un certificato o aiutarti con i tuoi crediti. Come posso aiutarti?';

const S = {
    teal:        'rgba(14,165,164,0.15)',
    tealBorder:  'rgba(14,165,164,0.40)',
    dark:        'rgba(255,255,255,0.05)',
    darkBorder:  'rgba(255,255,255,0.10)',
    divider:     '1px solid rgba(255,255,255,0.08)',
} as const;

// ─── Spinner ────────────────────────────────────────────────────────────────

function Spinner() {
    return (
        <span aria-hidden="true" style={{
            display: 'inline-block', width: 14, height: 14,
            border: '2px solid rgba(14,165,164,0.3)', borderTopColor: '#0EA5A4',
            borderRadius: '50%', animation: 'spin 0.7s linear infinite',
        }} />
    );
}

// ─── MessageBubble ──────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
    const u = msg.role === 'user';
    return (
        <div style={{ display: 'flex', justifyContent: u ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
            <div style={{
                maxWidth: '85%', padding: '8px 12px', fontSize: 13, lineHeight: 1.5, wordBreak: 'break-word',
                color: 'rgba(255,255,255,0.90)',
                borderRadius: u ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                background: u ? S.teal  : S.dark,
                border:     u ? `1px solid ${S.tealBorder}` : `1px solid ${S.darkBorder}`,
            }}>
                {msg.content}
            </div>
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function SigilloAdvisor({ user }: SigilloAdvisorProps) {
    const [open, setOpen]         = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput]       = useState('');
    const [loading, setLoading]   = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const messagesEndRef          = useRef<HTMLDivElement>(null);
    const textareaRef             = useRef<HTMLTextAreaElement>(null);
    const currentPath             = useUIStore((s) => s.currentPath);

    // Detect mobile
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 640px)');
        setIsMobile(mq.matches);
        const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', h);
        return () => mq.removeEventListener('change', h);
    }, []);

    // ESC closes sidebar
    useEffect(() => {
        if (!open) return;
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [open]);

    // Inject CSS keyframe once
    useEffect(() => {
        const id = 'natan-advisor-styles';
        if (document.getElementById(id)) return;
        const s = document.createElement('style');
        s.id = id;
        s.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(s);
    }, []);

    // Open: inject welcome once
    const handleOpen = useCallback(() => {
        setOpen(true);
        if (messages.length === 0) {
            setMessages([{ role: 'assistant', content: user ? WELCOME_AUTH : WELCOME_GUEST }]);
        }
    }, [messages.length, user]);

    // Auto-scroll
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    // Focus textarea on open
    useEffect(() => { if (open) setTimeout(() => textareaRef.current?.focus(), 120); }, [open]);

    // Send message
    const sendMessage = useCallback(async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || loading) return;
        const userMsg: Message = { role: 'user', content: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        try {
            const allMsgs = [...messages, userMsg];
            const { data } = await egiApi.post<{ message: string }>('/sigillo/advisor/chat', {
                message: trimmed,
                mode: user ? 'auth' : 'guest',
                conversation_history: allMsgs.slice(-6).map((m) => ({ role: m.role, content: m.content })),
                context: { current_page: currentPath },
            });
            setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
        } catch {
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Mi dispiace, si è verificato un errore. Riprova tra un momento.' }]);
        } finally {
            setLoading(false);
        }
    }, [loading, messages, user, currentPath]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 64) + 'px';
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
    };

    const chips      = user ? CHIPS_AUTH : CHIPS_GUEST;
    const showChips  = messages.length <= 1;
    const W          = isMobile ? '100vw' : '380px';
    const slideX     = isMobile ? '100%' : 400;
    const canSend    = !loading && !!input.trim();

    return (
        <>
            {/* FAB */}
            <AnimatePresence>
                {!open && (
                    <motion.button key="fab"
                        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                        onClick={handleOpen}
                        aria-label="Apri assistente Sigillo AI"
                        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9500, width: 52, height: 52,
                            borderRadius: '50%', background: 'var(--accent, #0EA5A4)', border: 'none', cursor: 'pointer',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(14,165,164,0.50)', color: '#fff', gap: 1 }}
                    >
                        <span style={{ fontSize: 20, lineHeight: 1 }} aria-hidden="true">✨</span>
                        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1, opacity: 0.9 }}>AI</span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Backdrop (mobile) */}
            <AnimatePresence>
                {open && isMobile && (
                    <motion.div key="backdrop"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        style={{ position: 'fixed', inset: 0, zIndex: 9390, background: 'rgba(0,0,0,0.55)' }}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div key="panel"
                        role="dialog" aria-modal="true" aria-label="Assistente Sigillo AI"
                        initial={{ x: slideX }} animate={{ x: 0 }} exit={{ x: slideX }}
                        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
                        style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: W, zIndex: 9400,
                            background: '#0A1222', borderLeft: '1px solid rgba(14,165,164,0.30)',
                            boxShadow: '-8px 0 32px rgba(0,0,0,0.60)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                    >
                        {/* Header */}
                        <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '0 16px', borderBottom: S.divider, flexShrink: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 18 }} aria-hidden="true">✨</span>
                                <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.90)', letterSpacing: '0.02em' }}>
                                    Natan · Sigillo AI
                                </span>
                            </div>
                            <button onClick={() => setOpen(false)} aria-label="Chiudi assistente AI"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.50)',
                                    fontSize: 20, lineHeight: 1, padding: '4px 6px', borderRadius: 6, transition: 'color 0.15s' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.90)'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.50)'; }}
                            >✕</button>
                        </div>

                        {/* Chat Area */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column' }}>
                            {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}

                            {loading && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                    <Spinner />
                                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.40)' }}>Natan sta elaborando…</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />

                            {/* Quick Chips — shown only when chat is empty (welcome only) */}
                            {showChips && !loading && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto', paddingTop: 16 }}>
                                    {chips.map((chip) => (
                                        <button key={chip} onClick={() => sendMessage(chip)}
                                            style={{ background: 'transparent', border: '1px solid rgba(14,165,164,0.35)',
                                                borderRadius: 999, padding: '5px 12px', fontSize: 12,
                                                color: 'rgba(255,255,255,0.70)', cursor: 'pointer', transition: 'background 0.15s, color 0.15s', lineHeight: 1.4 }}
                                            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(14,165,164,0.12)'; b.style.color = 'rgba(255,255,255,0.95)'; }}
                                            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = 'rgba(255,255,255,0.70)'; }}
                                        >{chip}</button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div style={{ borderTop: S.divider, padding: '10px 12px', display: 'flex', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                            <textarea ref={textareaRef} value={input} onChange={handleTextareaChange} onKeyDown={handleKeyDown}
                                placeholder="Scrivi un messaggio…" rows={1} aria-label="Messaggio per Natan AI"
                                style={{ flex: 1, resize: 'none', background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 12px',
                                    fontSize: 13, color: 'rgba(255,255,255,0.90)', outline: 'none',
                                    lineHeight: 1.5, minHeight: 38, maxHeight: 64, overflowY: 'auto', caretColor: '#0EA5A4' }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(14,165,164,0.55)'; }}
                                onBlur={(e)  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                            />
                            <button onClick={() => sendMessage(input)} disabled={!canSend} aria-label="Invia messaggio"
                                style={{ background: canSend ? 'var(--accent, #0EA5A4)' : 'rgba(14,165,164,0.25)',
                                    border: 'none', borderRadius: 10, width: 38, height: 38,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: canSend ? 'pointer' : 'not-allowed', fontSize: 16, color: '#fff', flexShrink: 0, transition: 'background 0.15s' }}
                            >
                                {loading ? <Spinner /> : '→'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
