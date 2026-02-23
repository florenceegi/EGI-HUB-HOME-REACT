# FlorenceEGI Hub Home (florenceegi.com) — AI Agent Instructions (OS3.0)

> **Landing Page 3D dell'Ecosistema FlorenceEGI — React + Three.js**
> **"L'AI non pensa. Predice. Non deduce logicamente. Completa statisticamente."**

---

<!-- ══════════════════════════════════════════════════════════════
     CORE CONDIVISO — Questa sezione è IDENTICA in tutti i progetti
     dell'ecosistema FlorenceEGI (EGI, EGI-HUB-HOME-REACT, NATAN_LOC).
     Qualsiasi modifica va replicata in tutti e 3 i file.
     ══════════════════════════════════════════════════════════════ -->

## 🛑 REGOLE P0 - BLOCCANTI (Violazione = STOP immediato)

| #        | Regola                 | Cosa Fare                                                           |
| -------- | ---------------------- | ------------------------------------------------------------------- |
| **P0-0** | **NO ALPINE/LIVEWIRE** | **VIETATO SCRIVERE NUOVO CODICE ALPINE/LIVEWIRE. Solo Vanilla/TS.** |
| **P0-1** | REGOLA ZERO            | MAI dedurre. Se non sai → 🛑 CHIEDI                                 |
| **P0-2** | Translation Keys       | `__('key')` mai stringhe hardcoded                                  |
| **P0-3** | Statistics Rule        | No `->take(10)` nascosti, sempre param espliciti                    |
| **P0-4** | Anti-Method-Invention  | Verifica metodo esiste PRIMA di usarlo                              |
| **P0-5** | UEM-First              | Errori → `$errorManager->handle()`, mai solo ULM                    |
| **P0-6** | Anti-Service-Method    | `read_file` + `grep` prima di usare service                         |
| **P0-7** | Anti-Enum-Constant     | Verifica costanti enum esistono                                     |
| **P0-8** | Complete Flow Analysis | Map ENTIRE flow BEFORE any fix (15-35 min)                          |
| **P0-9** | i18n 6 Lingue          | Traduzioni in TUTTE: `it`, `en`, `de`, `es`, `fr`, `pt`             |

### 🔍 Prima di Ogni Risposta

```
1. Ho TUTTE le info? → NO = 🛑 CHIEDI
2. Metodi VERIFICATI? → NO = 🛑 semantic_search/grep/read_file
3. Pattern simile esiste? → Non so = 🛑 CHIEDI esempio
4. Sto ASSUMENDO? → SÌ = 🛑 DICHIARA e CHIEDI
5. Limiti impliciti? → SÌ = 🛑 RENDI ESPLICITO
```

### 🔄 Prima di Ogni FIX/DEBUG (P0-8)

```
1. Flow MAPPATO? (user action → response) → NO = 🛑 MAP FIRST
2. Types TRACCIATI? (ogni variabile/step) → NO = 🛑 TRACE FIRST
3. ALL occurrences TROVATE? (grep/search) → NO = 🛑 FIND ALL
4. Context VERIFICATO? (dependencies/patterns) → NO = 🛑 VERIFY

TEMPO: 15-35 min | RISPARMIO: 2+ ore debugging
```

---

## ♿ ACCESSIBILITY (A11Y) - Incrementale

**FILOSOFIA**: Non stop totale, ma **miglioramento incrementale**. Ogni fix/refactor su una pagina = occasione per sistemare A11Y.

### 📋 Checklist per OGNI pagina modificata

```
✅ 1. SEMANTIC HTML (P2)
   <main>, <nav>, <header>/<footer>, <section>/<article>, <aside>

✅ 2. ARIA LABELS (P2)
   aria-label per icon-only buttons, aria-label per nav multiple
   alt SEMPRE su <img>, aria-hidden="true" su icone decorative

✅ 3. KEYBOARD NAVIGATION (P2)
   focus:ring-2 focus:ring-oro-fiorentino, tabindex="0" per custom elements

✅ 4. SCREEN READER TEXT (P2)
   <span class="sr-only">, aria-live="polite"/"assertive", role="status"

✅ 5. FORM ACCESSIBILITY (P1)
   <label for="id"> SEMPRE, aria-describedby per help text, aria-invalid per errori
```

**Target**: WCAG 2.1 Level AA — A11Y è **P2 (SHOULD)**, non P0.

---

## 🧬 Oracode System

**3 Livelli**: OSZ (kernel) → OS3 (AI discipline) → OS4 (human education)

**6+1 Pilastri**: Intenzionalità, Semplicità, Coerenza, Circolarità, Evoluzione, Sicurezza + **REGOLA ZERO**

**Concetti OSZ**:

- **EGI**: `Wrapper<T> + Regole + Audit + Valore`
- **USE**: Ultra Semantic Engine — pipeline query semantiche
- **URS**: Unified Reliability Score — metrica affidabilità risposta AI
- **Nerve**: Sistema nervoso AI (governatori, validatori)

---

## ⚡ Priorità

| P      | Nome      | Conseguenza          |
| ------ | --------- | -------------------- |
| **P0** | BLOCKING  | 🛑 STOP totale       |
| **P1** | MUST      | Non production-ready |
| **P2** | SHOULD    | Debt tecnico         |
| **P3** | REFERENCE | Info only            |

---

## 📝 TAG System v2.0

Formato: `[TAG] Descrizione breve`

| Tag    | Peso | Tag   | Peso | Tag      | Peso | Tag    | Peso |
| ------ | ---- | ----- | ---- | -------- | ---- | ------ | ---- |
| FEAT   | 1.0  | FIX   | 1.5  | REFACTOR | 2.0  | TEST   | 1.2  |
| DEBUG  | 1.3  | DOC   | 0.8  | CONFIG   | 0.7  | CHORE  | 0.6  |
| I18N   | 0.7  | PERF  | 1.4  | SECURITY | 1.8  | WIP    | 0.3  |
| REVERT | 0.5  | MERGE | 0.4  | DEPLOY   | 0.8  | UPDATE | 0.6  |

Alias: `[FEAT]` = `feat:` = ✨

---

## 🔒 Git Hooks

| Regola | Trigger                   | Azione     |
| ------ | ------------------------- | ---------- |
| R1     | >100 righe rimosse/file   | 🛑 BLOCCA  |
| R2     | 50-100 righe rimosse      | ⚠️ WARNING |
| R3     | >50% contenuto rimosso    | 🛑 BLOCCA  |
| R4     | >500 righe totali rimosse | 🛑 BLOCCA  |

Bypass: `git commit --no-verify` (solo se intenzionale)

---

## 💎 FIRMA STANDARD

```php
/**
 * @package App\Http\Controllers\[Area]
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - [Context])
 * @date 2025-10-28
 * @purpose [Clear, specific purpose]
 */
```

<!-- ══════════════════════════════════════════════════════════════
     FINE CORE CONDIVISO — Da qui in poi: specifico per EGI-HUB-HOME-REACT
     ══════════════════════════════════════════════════════════════ -->

---

## 📌 Adattamento Regole P0 per questo progetto (React puro)

Questo è un progetto **React SPA** senza backend Laravel. Alcune regole P0 si applicano con adattamenti:

| Regola   | Adattamento per React                                            |
| -------- | ---------------------------------------------------------------- |
| **P0-0** | No jQuery, no librerie legacy. Solo React + TS moderno.          |
| **P0-2** | Usare `t('key')` dal custom i18n Context, mai stringhe hardcoded |
| **P0-5** | Nessun UEM. Usare `try/catch` + feedback utente (toast/alert)    |
| **P0-7** | Verificare che i tipi TypeScript/interfaces esistano             |
| **P0-9** | Aggiornare `src/i18n/translations.ts` per tutte le lingue        |

---

## 🏗️ Architettura EGI-HUB-HOME-REACT

```
Browser → React 18 SPA (Vite :5174) → hub.florenceegi.com/api
              ↓
         Three.js Engine (3D PBR + Bloom)
         React Three Fiber (R3F)
```

| Componente      | Tecnologia                                       |
| --------------- | ------------------------------------------------ |
| Framework       | React 18.3 + TypeScript 5.3 (strict mode)        |
| Build           | Vite 5.0.12                                       |
| 3D Engine       | Three.js 0.160 + React Three Fiber 8.15           |
| Post-Processing | UnrealBloomPass (PBR, glass materials)             |
| Animazioni      | Framer Motion 11 + GSAP 3.14                      |
| State           | Zustand 4.5 (UI) + TanStack Query 5.17 (server)  |
| Routing         | React Router DOM 7.13 + custom Zustand router     |
| Styling         | TailwindCSS 3.4 + Florence EGI theme              |
| i18n            | Custom Context API (`src/i18n/`)                   |
| HTTP            | Axios con interceptors (Bearer + X-Tenant-ID)     |
| Backend         | Nessuno. SPA pura, chiama `hub.florenceegi.com`   |

---

### 🌍 Lingue e Traduzioni (P0-9)

Le traduzioni sono in `src/i18n/translations.ts` (dizionario multi-lingua).

Usare il custom hook:

```tsx
const { t } = useI18n();
<button>{t('action.submit')}</button>  // ✅ MAI hardcoded
```

---

## 🔌 Pattern React (equivalente ULM/UEM)

```tsx
// ✅ Error handling pattern
try {
  const data = await api.get('/endpoint');
  // success
} catch (error) {
  console.error('[Component] Context:', error);
  // Show user feedback (toast/SweetAlert2)
}

// ✅ i18n pattern (P0-2)
const { t } = useI18n();
<button aria-label={t('action.close')}>{t('action.submit')}</button>

// ✅ State pattern (Zustand)
const { navigate, currentPath } = useUIStore();

// ✅ Server state pattern (TanStack Query)
const { data, isLoading } = useQuery({ queryKey: ['metrics'], queryFn: getMetrics });
```

---

### ♿ A11Y Pattern React (JSX/TSX)

```tsx
{/* ✅ BUTTON ICON-ONLY */}
<button
  type="button"
  aria-label={t('action.edit_avatar')}
  className="focus:ring-2 focus:ring-oro-fiorentino focus:outline-none"
  onClick={openModal}
>
  <LucideIcon aria-hidden="true" />
</button>

{/* ✅ NAVIGATION TABS */}
<nav aria-label={t('nav.main_navigation')}>
  <div role="tablist">
    <button
      role="tab"
      aria-selected={activeTab === 'overview'}
      aria-controls="overview-panel"
      className="focus:ring-2"
    >
      {t('tabs.overview')}
    </button>
  </div>
</nav>

{/* ✅ LIVE REGION for dynamic updates */}
<div aria-live="polite" aria-atomic="true" className="sr-only" id="status-announcements" />

{/* ✅ SKIP LINK */}
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
>
  {t('a11y.skip_to_content')}
</a>
<main id="main-content">...</main>
```

---

## 🔧 Processo Verifica Metodi (React)

```bash
grep "export function\|export const" src/services/api.ts
grep "export function\|export const" src/stores/useUIStore.ts
grep "export function\|export const" src/hooks/useEcosystemManifest.ts
# SE non trovo → 🛑 STOP e CHIEDI
```

---

## 📁 File Chiave EGI-HUB-HOME-REACT

| Scopo                  | Path                                                  |
| ---------------------- | ----------------------------------------------------- |
| Entry point            | `src/main.tsx`                                        |
| Root component         | `src/App.tsx`                                         |
| 3D Engine (vanilla)    | `src/engine.js`                                       |
| 3D Cube (R3F)          | `src/components/desktop/DesktopEgiCube.tsx`           |
| Ecosystem View         | `src/features/ecosystem/EcosystemView.tsx`            |
| UI Store (Zustand)     | `src/stores/useUIStore.ts`                            |
| API Client             | `src/services/api.ts`                                 |
| i18n Provider          | `src/i18n/index.tsx`                                  |
| Translations           | `src/i18n/translations.ts`                            |
| Ecosystem Data         | `src/ecosystem_data.js`                               |
| Config (env)           | `src/utils/config.ts`                                 |
| Desktop Home Sections  | `src/components/desktop/home/sections/`               |
| Mobile Pages           | `src/mobile/pages/`                                   |
| Types                  | `src/types/ecosystem.ts`                              |
| Tailwind Config        | `tailwind.config.js`                                  |
| Vite Config            | `vite.config.ts`                                      |

---

## 🛠️ Comandi EGI-HUB-HOME-REACT

```bash
npm run dev          # Vite dev server (port 5174)
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build
npm run lint         # ESLint
npm run type-check   # TypeScript type checking
```

---

**OS3.0 — "Less talk, more code. Ship it."**
