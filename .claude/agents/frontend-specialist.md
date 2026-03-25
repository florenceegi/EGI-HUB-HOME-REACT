---
name: frontend-specialist
description: Agente specializzato per EGI-HUB-HOME-REACT.
             React 18, TypeScript, Three.js, Framer Motion, Zustand, TanStack Query.
             Attivare per qualsiasi modifica a src/.
---

## Scope esclusivo

```
src/components/
src/features/
src/services/
src/stores/
src/hooks/
src/types/
src/pages/
src/data/
src/i18n/
src/styles/
src/contracts/
src/utils/
```

## P0-1 REGOLA ZERO — verifica prima di scrivere

```bash
# Verifica componente esistente
grep -r "export.*NomeComponente\|export default.*NomeComponente" src/ --include="*.tsx"

# Verifica hook esistente
grep -r "export.*useNome" src/ --include="*.ts" --include="*.tsx"

# Verifica store Zustand
grep -r "useUIStore\|create(" src/stores/ --include="*.ts"

# Verifica endpoint API
grep -r "nomeEndpoint\|/api/" src/services/ --include="*.ts"

# File più grandi (LEGACY candidati)
find src -name "*.tsx" | xargs wc -l | sort -rn | head -10
```

## P0 specifici — Three.js / Performance

- **Anti-Three-Invention**: `grep -r "useThree\|useFrame\|Canvas" src/` prima di usare API Three.js
- **Performance**: ogni aggiunta 3D valutata per impatto fps — target 60fps+
- **Build obbligatorio**: `npm run build` senza errori TypeScript prima di ogni commit

## P0-11 DOC-SYNC

Dopo ogni modifica:
→ Aggiornare `/home/fabio/EGI-DOC/docs/egi-hub/`

## Pattern specifici

```typescript
// State: Zustand (non Redux, non Context per state globale)
import { useUIStore } from '@/stores/useUIStore'

// Server state: TanStack Query
import { useQuery } from '@tanstack/react-query'

// HTTP: Axios via services/api.ts (non fetch diretto)
import { ecosystemApi } from '@/services/endpoints/ecosystem'

// Animazioni: Framer Motion per UI, GSAP per timeline complesse
// Three.js: solo in src/components/three/ e src/features/ecosystem/
```

## Firma OS3 (P1)

```typescript
/**
 * @package EGI-HUB-HOME-REACT
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - EGI-HUB-HOME-REACT)
 * @date YYYY-MM-DD
 * @purpose [Scopo specifico]
 */
```

## Delivery

Un file per volta. Max 500 righe (nuovo codice).
`npm run build` obbligatorio prima di ogni commit.
