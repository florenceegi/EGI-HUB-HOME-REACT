/**
 * @package EGI-HUB-HOME-REACT — components/common
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB-HOME-REACT)
 * @date 2026-04-21
 * @purpose Pannello accessibilità floating (WCAG 2.1 AA + AAA toggle).
 *          Controlli: high-contrast, reduced-motion, font-size scale.
 *          Preferenze persistite via cookie cross-subdomain .florenceegi.com (vedi utils/a11yPrefs.ts).
 *          Propagato da CREATOR-STAGING gold standard (M-101).
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useI18n } from '@/i18n';
import {
    applyA11yPrefs,
    readA11yPrefs,
    writeA11yPrefs,
    type A11yPrefs,
    type A11yContrast,
    type A11yReducedMotion,
    type A11yFontScale,
} from '@/utils/a11yPrefs';

export const A11yPanel = () => {
    const { t } = useI18n();
    const [open, setOpen] = useState(false);
    const [prefs, setPrefs] = useState<A11yPrefs>(() => readA11yPrefs());
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const titleId = useId();

    useEffect(() => {
        applyA11yPrefs(prefs);
        writeA11yPrefs(prefs);
    }, [prefs]);

    const update = useCallback(<K extends keyof A11yPrefs>(key: K, value: A11yPrefs[K]) => {
        setPrefs((prev) => ({ ...prev, [key]: value }));
    }, []);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                triggerRef.current?.focus();
            }
        };
        const onClickOutside = (e: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target as Node) &&
                !triggerRef.current?.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('mousedown', onClickOutside);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [open]);

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                className="a11y-panel-trigger"
                aria-label={t('a11y.panel.open')}
                aria-expanded={open}
                aria-controls={titleId}
                onClick={() => setOpen((v) => !v)}
            >
                <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="8" r="1.3" fill="currentColor" />
                    <path d="M9 12h6" />
                    <path d="M12 12v7" />
                    <path d="M9 19l3-4 3 4" />
                </svg>
            </button>

            {open && (
                <div
                    ref={panelRef}
                    id={titleId}
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby={`${titleId}-title`}
                    className="a11y-panel"
                >
                    <h2 id={`${titleId}-title`} className="text-sm font-semibold mb-3 tracking-wide uppercase">
                        {t('a11y.panel.title')}
                    </h2>

                    <fieldset className="mb-3">
                        <legend className="text-xs opacity-80 mb-1">{t('a11y.panel.contrast')}</legend>
                        <RadioRow
                            name={`${titleId}-contrast`}
                            value={prefs.contrast}
                            options={[
                                { value: 'default' as A11yContrast, label: t('a11y.panel.contrast.default') },
                                { value: 'high' as A11yContrast, label: t('a11y.panel.contrast.high') },
                            ]}
                            onChange={(v) => update('contrast', v)}
                        />
                    </fieldset>

                    <fieldset className="mb-3">
                        <legend className="text-xs opacity-80 mb-1">{t('a11y.panel.reduced_motion')}</legend>
                        <RadioRow
                            name={`${titleId}-motion`}
                            value={prefs.reducedMotion}
                            options={[
                                { value: 'system' as A11yReducedMotion, label: t('a11y.panel.reduced_motion.system') },
                                { value: 'on' as A11yReducedMotion, label: t('a11y.panel.reduced_motion.on') },
                            ]}
                            onChange={(v) => update('reducedMotion', v)}
                        />
                    </fieldset>

                    <fieldset className="mb-3">
                        <legend className="text-xs opacity-80 mb-1">{t('a11y.panel.font_scale')}</legend>
                        <RadioRow
                            name={`${titleId}-font`}
                            value={prefs.fontScale}
                            options={[
                                { value: 'default' as A11yFontScale, label: t('a11y.panel.font_scale.default') },
                                { value: 'large' as A11yFontScale, label: t('a11y.panel.font_scale.large') },
                                { value: 'xlarge' as A11yFontScale, label: t('a11y.panel.font_scale.xlarge') },
                            ]}
                            onChange={(v) => update('fontScale', v)}
                        />
                    </fieldset>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                setPrefs({ contrast: 'default', reducedMotion: 'system', fontScale: 'default' });
                            }}
                            className="text-xs underline opacity-80 hover:opacity-100 focus:outline-none focus-visible:outline"
                        >
                            {t('a11y.panel.reset')}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

interface RadioRowProps<T extends string> {
    name: string;
    value: T;
    options: Array<{ value: T; label: string }>;
    onChange: (v: T) => void;
}

function RadioRow<T extends string>({ name, value, options, onChange }: RadioRowProps<T>) {
    return (
        <div className="grid grid-cols-2 gap-1.5" role="radiogroup">
            {options.map((opt) => {
                const id = `${name}-${opt.value}`;
                const active = value === opt.value;
                return (
                    <label
                        key={opt.value}
                        htmlFor={id}
                        className={[
                            'cursor-pointer select-none rounded-md px-2 py-1.5 text-xs text-center border transition-colors',
                            active
                                ? 'bg-[rgba(0,255,221,0.16)] border-[rgba(0,255,221,0.6)]'
                                : 'bg-transparent border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,255,221,0.35)]',
                        ].join(' ')}
                    >
                        <input
                            id={id}
                            type="radio"
                            name={name}
                            value={opt.value}
                            checked={active}
                            onChange={() => onChange(opt.value)}
                            className="sr-only"
                        />
                        {opt.label}
                    </label>
                );
            })}
        </div>
    );
}
