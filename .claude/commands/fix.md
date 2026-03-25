# /fix — Debug e Fix Strutturato (P0-8) — EGI-HUB-HOME-REACT

## Fase 1 — Descrizione del problema

Chiedi (tutto in una volta):

1. **Sintomo**: cosa succede? (errore console, visual bug, performance drop)
2. **Quando**: sempre / dopo X azione / solo mobile / solo desktop
3. **Layer**: componente React / Three.js / hook / store / API call
4. **Log**: errore console se disponibile
5. **Ultimo cambiamento**: cosa è stato modificato di recente?

## Fase 2 — Mappatura flusso (P0-8)

```
FLOW MAP:
User action: [cosa fa l'utente]
    ↓
Componente React: [quale componente in src/]
    ↓
[Store Zustand]: [useUIStore state]
    ↓
[TanStack Query]: [quale query / endpoint]
    ↓
[Three.js]: [useFrame / useThree / Canvas]
    ↓
Render: [output visivo atteso]
```

## Fase 3 — Causa root

```
CAUSA ROOT PROBABILE: [descrizione]
FILE COINVOLTO: [path]
CONFIDENCE: [alta/media/bassa]
FILE [LEGACY]? [sì/no]
```

## Fase 4 — Fix minimale

Tocca solo i file strettamente necessari.
Verifica `npm run build` dopo il fix.

## Fase 5 — Chiusura

```
FIX COMPLETATO: [titolo]
CAUSA ROOT: [descrizione]
FILE MODIFICATI: [lista]
COMMIT: [FIX] [descrizione]
DOC-SYNC: [sì/no]
```
