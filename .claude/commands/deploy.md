# /deploy — Deploy EGI-HUB-HOME-REACT

Progetto frontend statico. Deploy tramite build + distribuzione.

**IMPORTANTE**: Fornisci i comandi. NON eseguirli direttamente — li esegue Fabio.

## Prerequisiti

```
□ npm run build — zero errori TypeScript
□ git status pulito
□ Branch corretto
□ Commit firmato ([FEAT]/[FIX]/etc.)
```

## Build locale (verifica prima del deploy)

```bash
npm run build
# Verifica che dist/ sia generato senza errori
ls dist/
```

## Note critiche

- `dist/` non è in git — va rebuildata sul server dopo pull
- Variabili d'ambiente: `.env.local` — verificare che siano configurate sul server
- Se si cambia `VITE_API_BASE_URL`: rebuild obbligatorio
