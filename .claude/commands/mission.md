# /mission — Avvia Missione Strutturata (EGI-HUB-HOME-REACT)

## Fase 1 — Raccolta requisiti

Chiedi (tutto in una volta):

1. **Cosa**: comportamento atteso in una o due frasi
2. **Layer**: componente React / hook / store / 3D Three.js / animazioni / API service
3. **File di riferimento**: esiste un componente simile come pattern?
4. **Vincoli**: performance fps? Lighthouse? Mobile/desktop?

## Fase 2 — Analisi

1. Leggi i file rilevanti
2. `grep` per verificare componenti/hook esistenti (P0-4)
3. Valuta impatto performance se coinvolge Three.js
4. Mappa flusso: componente → store/query → API → render

## Fase 3 — Piano

```
PIANO MISSIONE: [titolo]
Layer: [componente / hook / store / 3D / API]

FILE COINVOLTI:
- [file 1] — create/modify

FILE [LEGACY] COINVOLTI: [se presenti]

SEQUENCE:
1. [step 1]
2. [step 2]

RISCHI:
- [performance fps / TypeScript strict / mobile responsiveness]

DOC-SYNC richiesto: [sì/no]
Procedo? (sì/modifica piano)
```

## Fase 4 — Esecuzione

Solo dopo approvazione:
- Un file per volta. Max 500 righe.
- Firma OS3.0 su ogni file.
- `npm run build` alla fine (zero errori TypeScript).

## Fase 5 — Chiusura

```
MISSIONE COMPLETATA: [titolo]
FILE CREATI/MODIFICATI: [lista]
NEXT STEPS:
- [ ] npm run build — zero errori TypeScript
- [ ] DOC-SYNC: aggiornare EGI-DOC/docs/egi-hub/
- [ ] Commit: [TAG] [descrizione]
```
