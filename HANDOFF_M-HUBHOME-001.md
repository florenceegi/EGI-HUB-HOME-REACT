# HANDOFF — M-HUBHOME-001

**SSOT footer-sigillo parametrico (`public/lso-ecosystem.js`): commit + deploy florenceegi.com + accensione organi**

- **Organo:** EGI-HUB-HOME-REACT (regge `florenceegi.com`, che serve `lso-ecosystem.js` a tutti gli LSO)
- **Mission:** M-HUBHOME-001 (stato: `draft`)
- **Origine:** lavoro svolto sotto **M-ORNEX-004** (Oracode Nexus). Il commit dell'SSOT **deve** stare in questo organo per non falsare le statistiche per-organo (lo impone `commit-organ-guard`).
- **Validità handoff:** dal 2026-06-29 fino a chiusura M-HUBHOME-001. Timbra **CONSUMATO** quando i task 1-3 sono fatti.
- **Approvazione CEO:** standard footer **già approvato** dal CEO ("lo standard va bene", 2026-06-29).

---

## 1. Contesto — cosa è e perché

Tutti gli LSO FlorenceEGI caricano **lo stesso file** `https://florenceegi.com/lso-ecosystem.js` e lo distinguono con `<lso-ecosystem current="<organo>">`. Prima il componente mostrava un sub-footer "Living Software Organism" + lista organi + **una** dichiarazione IP/certificato hardcodata: sbagliato e incoerente per N organi.

**Nuovo standard (già implementato in `public/lso-ecosystem.js`):** il componente è **parametrico**. Mostra **solo la firma del Sigillo**:

> `[logo Sigillo, hover=zoom]` **Sigillo:** *‹denominazione organo›* · 2026 FlorenceEGI S.r.l. · Tutti i diritti riservati · **Vedi il certificato →**

"Vedi il certificato →" apre la modale "Sigillo di anteriorità e paternità — ‹nome›" con i dati del certificato di **quell'organo** (firmatario eIDAS, data, UUID, SHA-256, Algorand TX) + "Verifica su blockchain →" + "Stampa il certificato (PDF) →". Niente più sezione ecosistema/nav organi.

Denominazione + certificato stanno nella **mappa `ORGANS`** in cima al file, selezionati da `current`. Un organo **non** in mappa non mostra alcun footer (es. `hub` interno, `info` da sopprimere).

---

## 2. Stato attuale (NON rifare — è già fatto)

- ✅ `public/lso-ecosystem.js` — **già riscritto parametrico** (v2.0.0). **Non sovrascriverlo**, va solo committato.
- ✅ `public/footer-demo.html` — demo locale (selettore organo + lingua). Provala: `cd public && python3 -m http.server 8099` → http://localhost:8099/footer-demo.html
- ✅ Test verde (4/4): `oracode-nexus/tests/lso-footer-parametrico.test.mjs` (committato in Oracode Nexus, `faf94f3`). Verifica la mappa ORGANS e il render.
- Voci `ORGANS` presenti: `art` (FlorenceEGI Art — **cert SEGNAPOSTO** = Oracode Nexus), `florenceegi`, `natan`, `egi-credential`, `sigillo`, `dimostralo`, `oracode-nexus`.

---

## 3. Cosa fare — task

1. **Focus + executing**
   - `bin/mission focus M-HUBHOME-001`
   - `bin/mission advance --to=planned`
   - leggi un SSOT dell'organo (gate trigger 3), poi `bin/mission advance --to=executing --test-file=<un test verde dell'organo>` (il test dello standard vive in oracode-nexus; per questo organo usa/aggiungi un check locale se richiesto).

2. **Commit dell'SSOT** (qui, in EGI-HUB-HOME-REACT):
   ```
   git add public/lso-ecosystem.js public/footer-demo.html HANDOFF_M-HUBHOME-001.md
   git commit -m "[FEAT] M-HUBHOME-001 — lso-ecosystem.js parametrico (firma Sigillo per ogni LSO)"
   git push origin main
   ```
   (verifica `git branch --show-current` = main prima.)

3. **Deploy `florenceegi.com`** col processo dell'organo (verifica come si deploya questo repo: script in `deploy/`, CI, o build+S3/CDN). Obiettivo: `https://florenceegi.com/lso-ecosystem.js` serve la **v2.0.0**. Poi **invalida la CDN** se presente. Verifica: `curl -s https://florenceegi.com/lso-ecosystem.js | grep -c 'const ORGANS'` → deve dare ≥1.

---

## 4. Prossimi passi cross-organo (coordinare, NON tutto qui)

Dopo che l'SSOT è live, ogni organo va **acceso** con `current=<chiave ORGANS>` nel suo repo:

| Organo / dominio | repo | `current` | certificato |
|---|---|---|---|
| art.florenceegi.com | `/home/fabio/EGI` | `art` (oggi è `egi`, va cambiato) | **SEGNAPOSTO** finché non si crea "FlorenceEGI Art" |
| florenceegi.com | questo repo / sito principale | `florenceegi` | `florence-egi` (esistente) |
| natan_loc | `/home/fabio/NATAN_LOC` | `natan` | esistente |
| egi-credential | `/home/fabio/web/apps/egi-credential` | `egi-credential` | esistente |
| egi-sigillo | `/home/fabio/EGI-SIGILLO` | `sigillo` | esistente |
| dimostralo | (repo Dimostralo) | `dimostralo` | esistente |
| fabio-gianni / terzi (fabiocherici, pinocapasso, levespe, idealoro) | rispettivi repo | da aggiungere a ORGANS | **da CREARE** via Sigillo+TOTP |

**Certificati da CREARE** (via Sigillo, firma eIDAS + TOTP del CEO, poi pubblicare nel registro Oracode Nexus e aggiungere la voce in `ORGANS`): FlorenceEGI Art, fabio-gianni, fabiocherici, pinocapasso, levespe, idealoro. Questo lo coordina il CEO con la sessione Oracode Nexus (M-ORNEX-004).

---

## 5. Vincoli (non negoziabili)

- **Mai modificare i valori cert** (uuid/sha/tx) nella mappa: sono sigilli **congelati on-chain** (Algorand). Fonte: `oracode-nexus/apps/web/src/data/seals.mjs` (SSOT, frozen). Nuovi sigilli = nuovo batch, mai overwrite.
- **art usa il segnaposto** (cert di Oracode Nexus) **finché** non esiste il certificato di "FlorenceEGI Art". Non spacciarlo per definitivo.
- **Organi esclusi**: `hub` (interno), `info` (da sopprimere) — restano senza footer (non aggiungerli a ORGANS).
- Niente overclaim: la modale dice "prova di anteriorità e di paternità (prior art + authorship), **non** marchio registrato".

---

## 6. Riferimenti

- SSOT componente: `public/lso-ecosystem.js` (questo repo)
- Demo: `public/footer-demo.html`
- Test: `oracode-nexus/tests/lso-footer-parametrico.test.mjs`
- Dati certificati (frozen): `oracode-nexus/apps/web/src/data/seals.mjs`
- Denominazioni/definizioni: `oracode-nexus/apps/web/src/data/nomenclature.mjs`
- Mission gemella (lato Oracode Nexus): **M-ORNEX-004**
