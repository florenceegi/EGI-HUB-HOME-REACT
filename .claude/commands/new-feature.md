# /new-feature — Progettazione Feature (EGI-HUB-HOME-REACT)

## Fase 1 — Feature brief

Chiedi (tutto in una volta):

1. **Nome**: come si chiama la feature?
2. **Problema**: qual è il pain point?
3. **Layer**: componente / sezione 3D / nuova pagina / animazione
4. **Target**: desktop / mobile / entrambi
5. **Vincoli**: performance fps target? Lighthouse? WCAG?

## Fase 2 — Spec tecnica

```markdown
## SPEC: [Nome Feature]
**Branch target**: [branch]
**Layer**: [componente/3D/hook/store]

### Comportamento atteso
[input → processo → render]

### File da creare
- [ ] `src/path/file.tsx` — [scopo]
- [ ] `src/hooks/useNome.ts` — [scopo hook]

### File da modificare
- [ ] `src/path/file.tsx` riga ~[n] — [modifica]

### Performance (se Three.js coinvolto)
- fps target: 60fps+
- Lighthouse target: 95+

### DOC-SYNC richiesto
- [ ] `EGI-DOC/docs/egi-hub/[file.md]`
```

## Fase 3 — Implementazione

Un file per volta. Max 500 righe.
`npm run build` prima del commit.

## Fase 4 — Chiusura

```
FEATURE COMPLETATA: [Nome]
Commit: [hash]
Attiva /doc-sync-guardian.
```
