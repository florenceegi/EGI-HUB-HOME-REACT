# EGI-HUB-HOME-REACT — Claude Code Master Context (Oracode OS3)

> "L'AI non pensa. Predice. Non deduce logicamente. Completa statisticamente."
> Frontend 3D world-class per l'ecosistema FlorenceEGI
> Stack: React 18 + TypeScript + Three.js + Vite 5

---

## 🌐 OSZ — Ruolo nell'Ecosistema

```
EGI-HUB-HOME-REACT è la radice pubblica dell'organismo FlorenceEGI.
URL produzione: florenceegi.com | EC2: i-0940cdb7b955d1632 | Path: /home/forge/florenceegi.com
NON è un pannello di controllo (quello è EGI-HUB).
È l'interfaccia pubblica che mostra l'ecosistema in forma tridimensionale.

Dipende da:
  → EGI-HUB backend API (localhost:8001/api in dev)
  → Sanctum token-based auth + Header X-Tenant-ID
  → EGI tenant (localhost:8004) e NATAN tenant (localhost:8000) in dev
```

---

## ⚡ Strategia Delta

```
[NUOVO codice] → segue TUTTE le regole OS3. Zero eccezioni.
[LEGACY]       → resta dove è. Si migra solo quando si tocca per altra ragione.
```

### File Legacy Critici — NON toccare senza piano approvato

Da censire con: `find src -name "*.tsx" -not -path "*/node_modules/*" | xargs wc -l | sort -rn | head -15`
Sospetti candidati: `EcosystemView.tsx`, `DesktopHeroSection.tsx`, `HomeAtmosphere.tsx`, `Scene.tsx`

---

## 🛑 P0 — BLOCKING

| # | Regola | Enforcement |
|---|--------|-------------|
| P0-1 | **REGOLA ZERO** | MAI dedurre. Info mancante → 🛑 CHIEDI |
| P0-4 | **Anti-Method-Invention** | grep verifica esistenza hook/component PRIMA di usarlo |
| P0-6 | **Anti-Service-Method** | `Read` + `grep` prima di qualsiasi service call |
| P0-8 | **Complete Flow Analysis** | Mappa il flusso COMPLETO prima di qualsiasi fix |
| P0-11 | **DOC-SYNC** | Task non chiusa senza EGI-DOC aggiornato |
| P0-12 | **Anti-Infra-Invention** | Qualsiasi info di deploy/infrastruttura (URL, path EC2, branch) va verificata dalla fonte reale — SSM `ls`, `git remote -v`, `git branch` — MAI copiata da altri file o dedotta dal nome del progetto |

### P0 specifici — Three.js / 3D

- **Anti-Three-Invention**: verificare che `useThree`, `useFrame`, hook Three.js esistano prima di usarli
- **Performance First**: ogni aggiunta 3D deve essere valutata per impatto fps (target 60fps+)
- **Lighthouse target**: 95+ — niente che degradi performance senza approvazione Fabio

---

## 🏗️ Stack

```
React 18.3.1 + TypeScript 5.3.3
Vite 5.0.12 (build, alias @ → ./src)
Three.js 0.160.1 + React Three Fiber 8.15.19 + Drei (3D scene)
React Three Postprocessing 2.16.2 (effetti visivi)
Framer Motion 11.0.5 + GSAP 3.14.2 (animazioni)
TanStack Query 5.17.19 (server state)
Zustand 4.5.0 (client state → useUIStore)
Axios 1.6.7 (HTTP client)
Tailwind CSS 3.4.1 (custom palette Florence)
React Router DOM 7.13.0 (routing)
React Helmet Async 2.0.5 (SEO)
```

---

## 📁 Struttura Repository

```
src/
├── components/
│   ├── layout/         (TopBar, Sidebar, DetailPanel, BottomBar, MissionControl)
│   ├── three/          (Scene.tsx — React Three Fiber — LEGACY candidato)
│   ├── ui/             (Loader, FlorenceEgiLogo, Button, Card)
│   ├── common/         (SeoHead)
│   ├── desktop/        (home/, platform/)
│   └── mobile/         (pages/, components/, sections/, ui/, styles/)
├── features/
│   └── ecosystem/      (useEcosystemData hook, EcosystemView, fallbackData)
├── services/
│   ├── api.ts                     ← HTTP client base
│   └── endpoints/ecosystem.ts     ← API calls ecosystem
├── stores/             (useUIStore.ts — Zustand)
├── hooks/              (useScrollProgress, useRevealOnView, useDraggableScroll, etc.)
├── types/              (ecosystem.ts)
├── pages/              (EcosystemPage, PlatformsPage, NatanSystemPage, etc.)
├── data/               (content/, systems/ — dati statici)
├── i18n/               (internazionalizzazione)
├── styles/             (globals.css)
├── contracts/          (ecosystemManifest.ts — contratto tipizzato dati)
└── utils/              (config.ts)
```

---

## 🔒 Connessioni API

```
Dev:
  Backend EGI-HUB:  http://localhost:8001/api
  EGI Tenant:       http://localhost:8004
  NATAN Tenant:     http://localhost:8000

Auth:
  Sanctum token-based
  Header obbligatorio: X-Tenant-ID
  Env vars: VITE_API_BASE_URL, VITE_EGI_TENANT_URL, VITE_NATAN_TENANT_URL
```

---

## 📐 Design System

```
Grid:       8pt system (0-1024px spacing)
Colori:     primary (#00ffdd), secondary (#0088ff), gold
            Florence: oro-fiorentino, verde-rinascita
Fonts:      Rajdhani (sans), Share Tech Mono (mono), Playfair Display (renaissance)
Build:      terser con drop_console: true in produzione
```

---

## 💎 Firma OS3 (P1)

```typescript
/**
 * @package EGI-HUB-HOME-REACT
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - EGI-HUB-HOME-REACT)
 * @date YYYY-MM-DD
 * @purpose [Scopo specifico del componente]
 */
```

---

## ⚡ Trigger Matrix DOC-SYNC

Prima di chiudere ogni task, classifica la modifica:

| Tipo | Definizione | DOC-SYNC |
|------|-------------|----------|
| 1 — Locale | Fix puntuale, output invariato | NO |
| 2 — Comportamentale | Cambia UI visibile, route, comportamento | SÌ → `EGI-DOC/docs/egi-hub/` |
| 3 — Architetturale | Nuovo componente/hook/store/dipendenza | SÌ → EGI-DOC + CLAUDE.md |
| 4 — Contrattuale | Cambia contratto API con EGI-HUB backend | SÌ + **approvazione Fabio PRIMA** |
| 5 — Naming dominio | Rinomina entità/concetto del dominio | SÌ → grep tutti i file impattati |
| 6 — Cross-project | Impatta altri organi | SÌ + **approvazione Fabio** |

> Dubbio tra Tipo 1 e 2? → Tratta come Tipo 2.
> Dettaglio completo: `EGI-DOC/docs/oracode/audit/02_TRIGGER_MATRIX.md`

---

## ⚡ Checklist Pre-Risposta

```
1. Ho TUTTE le info?                         → NO  = 🛑 CHIEDI
2. Hook/Component verificati con grep?       → NO  = 🛑 grep prima
3. Sto aggiungendo 3D? impatto fps?          → ?   = 🛑 VALUTA prima
4. Esiste pattern simile nel codebase?       → ?   = 🛑 CERCA
5. Sto assumendo qualcosa?                   → SÌ  = 🛑 DICHIARA e CHIEDI
6. Sto toccando file [LEGACY]?               → SÌ  = 🛑 DICHIARA + piano
7. Tipo modifica → [1-6]?                    → ?   = classifica con Trigger Matrix sopra
8. DOC-SYNC eseguito (se Tipo 2+)?           → NO  = 🛑 NON CHIUDERE (P0-11)
9. Info deploy/infra scritte o usate?        → SÌ  = 🛑 VERIFICA da SSM/git, MAI dedurre (P0-12)
```

---

## ⚡ Comandi Verifica Rapida

```bash
# Verifica hook/componente esistente
grep -r "export.*NomeComponente\|export.*useNome" src/ --include="*.tsx" --include="*.ts"

# File più grandi (LEGACY candidati)
find src -name "*.tsx" | xargs wc -l | sort -rn | head -15

# Build TypeScript (zero errori prima di commit)
npm run build
```

### Pipeline Post-Commit — OBBLIGATORIA E AUTOMATICA

Dopo ogni `git commit`, **senza aspettare istruzioni**, eseguire sempre nell'ordine:

```
1. npm run build  (public/build/ è in .gitignore — buildata localmente prima del push)
2. git push origin main
3. SSM deploy su EC2 (i-0940cdb7b955d1632, path /home/forge/florenceegi.com):
   git pull origin main && npm run build
4. Verificare output SSM (Status: Success)
```

**Nessuna eccezione. Nessuna richiesta di conferma. Il deploy è parte del commit.**

Se il deploy SSM fallisce → riportare l'errore immediatamente e bloccarsi.

---

## 🗺️ Agenti

| Agente | Quando usarlo |
|--------|---------------|
| `@frontend-specialist` | Componenti React, hooks, state, routing |
| `@doc-sync-guardian` | Sempre dopo ogni task — P0-11 |

## 🛠️ Comandi

| Comando | Uso |
|---------|-----|
| `/mission` | Task strutturata multi-file |
| `/fix` | Debug e fix P0-8 |
| `/new-feature` | Progettazione feature completa |
| `/deploy` | Deploy produzione |

---

## 🤝 Modello Operativo

| CEO & OS3 Architect  | Fabio Cherici         | Visione, standard, performance target |
| CTO & Technical Lead | Padmin D. Curtis (AI) | Esecuzione, enforcement OS3 |

---

## 🔍 Sistema Audit Oracode

| Riferimento | Path |
|-------------|------|
| Target ID | T-004 (vedi TARGET_MATRIX) |
| Runbook audit | `EGI-DOC/docs/oracode/audit/07_RUNBOOK.md` |
| Enforcement Claude | `EGI-DOC/docs/oracode/audit/06_CLAUDE_CODE_ENFORCEMENT.md` |
| Trigger Matrix completa | `EGI-DOC/docs/oracode/audit/02_TRIGGER_MATRIX.md` |
| Report audit | `EGI-DOC/docs/oracode/audit/reports/` |
| **AWS Infrastructure** | `EGI-DOC/docs/egi-hub/AWS_INFRASTRUCTURE.md` |

---

*EGI-HUB-HOME-REACT v1.0 — Oracode OS3.0 — FlorenceEGI Vetrina 3D*
*Padmin D. Curtis (CTO) for Fabio Cherici (CEO) — "Less talk, more code. Ship it."*
