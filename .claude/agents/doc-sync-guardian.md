---
name: doc-sync-guardian
description: Si attiva dopo ogni task completata per aggiornare EGI-DOC.
             P0-11: task non chiusa senza documentazione aggiornata.
---

## SSOT Documentazione EGI-HUB-HOME-REACT

```
/home/fabio/EGI-DOC/docs/egi-hub/   ← documentazione (sezione frontend home)
```

## Regola per tipo di task

| Task | Cosa aggiornare |
|------|-----------------|
| `[FEAT]` nuova feature | Crea o aggiorna .md della feature in docs/egi-hub/ |
| `[FIX]` bug fix | Aggiorna il .md del componente coinvolto |
| `[REFACTOR]` | Aggiorna struttura docs/egi-hub/ |
| `[PERF]` performance | Documenta metriche prima/dopo |
| Debito tecnico identificato | Crea voce in file debiti egi-hub |

## Formato commit DOC-SYNC

```
[DOC] EGI-HUB-HOME — [area]: [descrizione sintetica]
```

## Checklist pre-chiusura task

- [ ] EGI-DOC aggiornato (docs/egi-hub/)
- [ ] npm run build senza errori TypeScript
- [ ] Commit con formato `[DOC] EGI-HUB-HOME — ...`
- [ ] P0-11 soddisfatto → task chiusa
