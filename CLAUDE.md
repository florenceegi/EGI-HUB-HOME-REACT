@CLAUDE_ECOSYSTEM_CORE.md

# EGI-HUB-HOME — Contesto Specifico (Oracode OS3)

> Vetrina 3D world-class dell'ecosistema FlorenceEGI. Punto di accesso pubblico.
> Contiene Sigillo come feature integrata (/sigillo).
> URL: florenceegi.com | EC2: i-0940cdb7b955d1632 | Path: /home/forge/florenceegi.com

---

## 🌐 Ruolo nell'Organismo

```
EGI-HUB-HOME è la superficie pubblica dell'organismo FlorenceEGI.
NON è un pannello admin (quello è EGI-HUB backend).
È l'interfaccia pubblica che presenta l'ecosistema in forma tridimensionale.

Dipende da:
  → EGI-HUB backend API
  → EGI (Laravel) — backend Sigillo, DB condiviso florenceegi
  → Sanctum token-based auth + Header X-Tenant-ID

Sigillo (/sigillo):
  Frontend integrato qui | Backend: EGI (Laravel) | DB: florenceegi (stesso RDS)
  Features: piani dinamici, checkout Stripe, SigilloAdvisor AI (Claude Haiku),
            Demo PDF watermarked, TSA RFC 3161, batch Algorand anchoring
```

---

## 🏗️ Stack

```
React 18.3.1 + TypeScript 5.3.3
Vite 5.0.12 (alias @ → ./src)
Three.js 0.160.1 + React Three Fiber 8.15.19 + Drei (3D scene)
Framer Motion 11.0.5 + GSAP 3.14.2 (animazioni)
TanStack Query 5.17.19 · Zustand 4.5.0 (useUIStore)
Tailwind CSS 3.4.1 · React Router DOM 7.13.0
React Helmet Async 2.0.5 (SEO)
```

**Design System:**
```
Grid: 8pt system | Primary: #00ffdd | Gold: oro-fiorentino | florence-verde-rinascita
Fonts: Rajdhani (sans) · Share Tech Mono · Playfair Display (renaissance)
Build: terser drop_console: true in produzione
```

---

## 📁 Struttura & File Critici

```
src/
├── components/three/       → Scene.tsx [LEGACY candidato — verificare LOC]
├── components/desktop/     → home/, platform/
├── components/mobile/      → pages/, components/, sections/
├── features/
│   ├── ecosystem/          → useEcosystemData, EcosystemView, fallbackData
│   └── sigillo/            → SigilloPage, SigilloPlans, SigilloAdvisor, ...
├── stores/                 → useUIStore.ts (Zustand)
└── contracts/              → ecosystemManifest.ts (contratto tipizzato — Interface stabile)

File legacy candidati (verificare LOC):
  EcosystemView.tsx · DesktopHeroSection.tsx · HomeAtmosphere.tsx · Scene.tsx
```

---

## 🛑 P0 Specifici EGI-HUB-HOME

| # | Regola | Enforcement |
|---|--------|-------------|
| P0-HOME-1 | **Anti-Three-Invention** | Verifica hook Three.js esistano prima di usarli |
| P0-HOME-2 | **Performance First** | Ogni aggiunta 3D → valutare impatto fps (target 60fps+) |
| P0-HOME-3 | **Lighthouse 95+** | Niente che degradi performance senza approvazione Fabio |
| P0-HOME-4 | **ecosystemManifest** | `contracts/ecosystemManifest.ts` = Interface stabile. NON modificare struttura senza piano |

---

## 🚀 Pipeline Post-Commit

```
1. npm run build  (public/build/ è in .gitignore — buildato localmente prima del push)
2. git push origin main
3. SSM EC2 (i-0940cdb7b955d1632, path /home/forge/florenceegi.com):
   git pull origin main && npm run build
4. Verificare output SSM (Status: Success)
```

---

## ⚡ Checklist Aggiuntiva EGI-HUB-HOME

```
- Sto aggiungendo 3D? impatto fps valutato?    NO → 🛑 VALUTA prima (P0-HOME-2)
- Hook/Component Three.js verificato con grep? NO → 🛑 grep prima (P0-HOME-1)
- Modifica a ecosystemManifest.ts?             SÌ → 🛑 piano Fabio (P0-HOME-4)
- i18n presente? (se testo visibile)           NO → 🛑 aggiungere
```

---

## 🔍 Audit Oracode

Target ID: **T-004** | SSOT docs: `EGI-DOC/docs/egi-hub-home/` · `EGI-DOC/docs/sigillo/`
