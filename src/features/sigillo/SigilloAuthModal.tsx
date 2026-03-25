/**
 * SigilloAuthModal — Modal inline per login/registrazione su florenceegi.com/sigillo.
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - Sigillo)
 * @date 2026-03-25
 * @purpose Form di autenticazione cross-domain senza redirect.
 *          Login via Bearer token Sanctum → egiApi interceptor.
 *          Register: nome + email + password + 3 consensi GDPR obbligatori.
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSigilloAuth, RegisterData } from './hooks/useSigilloAuth';

interface Props {
    initialMode?: 'login' | 'register';
    onClose:      () => void;
    onSuccess?:   () => void;
}

export function SigilloAuthModal({ initialMode = 'login', onClose, onSuccess }: Props) {
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);

    const { login, register, isLoading, error, clearError } = useSigilloAuth();

    // Campi login
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    // Campi register extra
    const [name, setName]         = useState('');
    const [passwordConf, setPwConf] = useState('');
    const [privacy, setPrivacy]   = useState(false);
    const [terms, setTerms]       = useState(false);
    const [age, setAge]           = useState(false);

    const firstInputRef = useRef<HTMLInputElement>(null);

    // Focus primo campo all'apertura
    useEffect(() => {
        clearError();
        setTimeout(() => firstInputRef.current?.focus(), 80);
    }, [mode]);

    // Chiudi con Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            onSuccess?.();
            onClose();
        } catch { /* error già in state */ }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConf) {
            return; // HTML5 validation già blocca
        }
        const data: RegisterData = {
            name,
            email,
            password,
            password_confirmation:   passwordConf,
            privacy_policy_accepted: privacy,
            terms_accepted:          terms,
            age_confirmation:        age,
        };
        try {
            await register(data);
            onSuccess?.();
            onClose();
        } catch { /* error già in state */ }
    };

    return (
        <AnimatePresence>
            {/* Overlay */}
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                style={{ background: 'rgba(10,18,34,0.85)', backdropFilter: 'blur(4px)' }}
                onClick={onClose}
                aria-modal="true"
                role="dialog"
                aria-label={mode === 'login' ? 'Accedi a Sigillo' : 'Crea account Sigillo'}
            >
                {/* Pannello */}
                <motion.div
                    key="panel"
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="w-full max-w-sm rounded-2xl p-6 space-y-5"
                    style={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.12)' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-[var(--accent)]/70 uppercase tracking-widest mb-0.5">Sigillo</p>
                            <h2 className="text-white font-semibold text-lg">
                                {mode === 'login' ? 'Accedi' : 'Crea account'}
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white/40 hover:text-white/70 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                            aria-label="Chiudi"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Tab toggle */}
                    <div
                        className="flex rounded-xl overflow-hidden"
                        style={{ border: '1px solid rgba(255,255,255,0.10)' }}
                        role="tablist"
                    >
                        {(['login', 'register'] as const).map((m) => (
                            <button
                                key={m}
                                type="button"
                                role="tab"
                                aria-selected={mode === m}
                                onClick={() => { setMode(m); clearError(); }}
                                className="flex-1 py-2 text-xs font-medium transition-colors focus:outline-none"
                                style={{
                                    background: mode === m ? 'var(--accent)' : 'transparent',
                                    color:      mode === m ? '#0A1222' : 'rgba(255,255,255,0.5)',
                                }}
                            >
                                {m === 'login' ? 'Accedi' : 'Registrati'}
                            </button>
                        ))}
                    </div>

                    {/* Errore */}
                    {error && (
                        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    {/* Form */}
                    {mode === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-3" noValidate>
                            {/* Nome non richiesto in login */}
                            <Field
                                ref={firstInputRef}
                                label="Email"
                                type="email"
                                value={email}
                                onChange={setEmail}
                                required
                                autoComplete="email"
                            />
                            <Field
                                label="Password"
                                type="password"
                                value={password}
                                onChange={setPassword}
                                required
                                autoComplete="current-password"
                            />
                            <SubmitBtn loading={isLoading} label="Accedi" />
                            <div className="text-center">
                                <a
                                    href="https://art.florenceegi.com/forgot-password"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-white/30 hover:text-white/60 transition-colors"
                                >
                                    Password dimenticata?
                                </a>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-3" noValidate>
                            <Field
                                ref={firstInputRef}
                                label="Nome e cognome"
                                type="text"
                                value={name}
                                onChange={setName}
                                required
                                autoComplete="name"
                            />
                            <Field
                                label="Email"
                                type="email"
                                value={email}
                                onChange={setEmail}
                                required
                                autoComplete="email"
                            />
                            <Field
                                label="Password"
                                type="password"
                                value={password}
                                onChange={setPassword}
                                required
                                autoComplete="new-password"
                                hint="Minimo 8 caratteri"
                            />
                            <Field
                                label="Conferma password"
                                type="password"
                                value={passwordConf}
                                onChange={setPwConf}
                                required
                                autoComplete="new-password"
                            />

                            {/* Consensi GDPR */}
                            <div className="space-y-2 pt-1">
                                <Checkbox
                                    id="privacy"
                                    checked={privacy}
                                    onChange={setPrivacy}
                                    required
                                >
                                    Ho letto e accetto la{' '}
                                    <a
                                        href="https://art.florenceegi.com/legal/collector"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--accent)] hover:underline"
                                    >
                                        Privacy Policy
                                    </a>
                                </Checkbox>
                                <Checkbox
                                    id="terms"
                                    checked={terms}
                                    onChange={setTerms}
                                    required
                                >
                                    Accetto i{' '}
                                    <a
                                        href="https://art.florenceegi.com/legal/collector"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--accent)] hover:underline"
                                    >
                                        Termini di Servizio
                                    </a>
                                </Checkbox>
                                <Checkbox
                                    id="age"
                                    checked={age}
                                    onChange={setAge}
                                    required
                                >
                                    Confermo di avere almeno 18 anni
                                </Checkbox>
                            </div>

                            <SubmitBtn loading={isLoading} label="Crea account" />
                        </form>
                    )}

                    <p className="text-center text-[10px] text-white/20">
                        Account FlorenceEGI · Sigillo Blockchain Certification
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ---------------------------------------------------------------------------
// Sub-componenti
// ---------------------------------------------------------------------------

import { forwardRef } from 'react';

interface FieldProps {
    label:        string;
    type:         string;
    value:        string;
    onChange:     (v: string) => void;
    required?:    boolean;
    autoComplete?: string;
    hint?:        string;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
    ({ label, type, value, onChange, required, autoComplete, hint }, ref) => (
        <div className="space-y-1">
            <label className="block text-xs text-white/50">{label}</label>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                autoComplete={autoComplete}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-colors"
            />
            {hint && <p className="text-[10px] text-white/25">{hint}</p>}
        </div>
    )
);
Field.displayName = 'Field';

interface CheckboxProps {
    id:       string;
    checked:  boolean;
    onChange: (v: boolean) => void;
    required?: boolean;
    children: React.ReactNode;
}

function Checkbox({ id, checked, onChange, required, children }: CheckboxProps) {
    return (
        <label htmlFor={id} className="flex items-start gap-2 cursor-pointer group">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                required={required}
                className="mt-0.5 w-4 h-4 rounded accent-[var(--accent)] shrink-0"
            />
            <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors leading-relaxed">
                {children}
            </span>
        </label>
    );
}

interface SubmitBtnProps { loading: boolean; label: string; }
function SubmitBtn({ loading, label }: SubmitBtnProps) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-60"
            style={{ background: 'var(--accent)', color: '#0A1222' }}
        >
            {loading ? 'Attendere...' : label}
        </button>
    );
}
