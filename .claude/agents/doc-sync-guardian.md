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

## RAG Sync automatico — post-commit hook

Il repository EGI-DOC ha un **post-commit hook** che triggera automaticamente
`pipeline/job.py sync` ogni volta che un commit modifica file `docs/**/*.md`.

**Non devi fare nulla di extra**: basta committare il file `.md` in EGI-DOC
e il RAG si aggiorna da solo in background.

```bash
# Il hook fa questo automaticamente dopo ogni commit con docs/*.md:
cd /home/fabio/EGI-DOC && python3 pipeline/job.py sync &
```

Log del sync automatico: `/home/fabio/EGI-DOC/pipeline/logs/post_commit_sync.log`

Se vuoi verificare che il sync sia partito:
```bash
tail -f /home/fabio/EGI-DOC/pipeline/logs/post_commit_sync.log
```

