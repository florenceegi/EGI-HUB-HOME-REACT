/**
 * lso-ecosystem.js — Firma Sigillo PARAMETRICA per gli LSO FlorenceEGI (SSOT)
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 2.0.0  (M-ORNEX-004 — footer-sigillo parametrico)
 * @date 2026-06-29
 * @purpose Web Component <lso-ecosystem current="<organo>"> servito da florenceegi.com e incluso da
 *          tutti gli organi con 2 righe. Mostra SOLO la firma del Sigillo in fondo al sito:
 *          "[logo] Sigillo: <denominazione> · 2026 FlorenceEGI S.r.l. · Tutti i diritti riservati ·
 *          Vedi il certificato →" + modale col certificato di anteriorità e paternità di QUELL'organo.
 *          Niente sezione "Living Software Organism" né navigazione organi.
 *          La denominazione e il certificato (uuid/sha/tx reali, on-chain) sono nella mappa ORGANS,
 *          selezionati dall'attributo `current`. Un organo non in mappa non mostra alcun footer.
 *          Aggiornamento = modifica di questo solo file. Zero dipendenze.
 */

// Dati comuni a tutti i sigilli del batch (signer/standard/data di ancoraggio identici).
const SIGNER      = 'Fabio Cherici';
const SIGNER_STD  = 'eIDAS SES (Stripe Identity)';
const ANCHORED_AT = '2026-06-29';
const ALGO_BASE   = 'https://allo.info/tx/';
const pdfUrl = uuid => 'https://art.florenceegi.com/api/sigillo/' + uuid + '/download/pdf';

// MAPPA PARAMETRICA organo (attributo current) -> { denominazione, certificato reale }.
// I valori cert (uuid/sha/tx) sono i sigilli on-chain CONGELATI del registro Oracode Nexus
// (vedi oracode-nexus/apps/web/src/data/seals.mjs): sola lettura, mai modificare.
// Un organo non presente qui NON mostra il footer-sigillo (graceful): es. egi-hub (interno),
// egi-info (da sopprimere).
const ORGANS = {
  // SEGNAPOSTO: art usa il cert di Oracode Nexus finch\u00e9 non si crea quello di "FlorenceEGI Art".
  'art':            { name: 'FlorenceEGI Art', uuid: '13cdd05b-0482-4da9-9c7d-21b63b46856b', sha: 'bfd9039975387220317d609b324bf10ed6a9bcd273d5ffcaca3d363bb8d3b225', tx: '5ZH62RMOCYZEWI5SIW4VV64Y7TP6M6MMEM5DW5C3XC3QM5RD5YGA', placeholder: true },
  'florenceegi':    { name: 'FlorenceEGI',     uuid: '8b127af0-9e6f-42c9-8e0a-2fd3fbeb1c4d', sha: '85db3d70c39d377c03c4dd5e1d324d14c171a9accb866ae27e27ea17cab9d9c6', tx: 'DXQESWDXG5222NWPIFDAQ4HFF2HIOFBXLYOVLQXHIT3KCN7KUPYQ' },
  'natan':          { name: 'NATAN_LOC',       uuid: '44e847a7-9a2c-44f9-8352-231b30114d9c', sha: 'c7317a34a568e132d5bb386fab5f83bb834d8a1ee4da05fd84410c7a0ca8ca91', tx: 'DXQESWDXG5222NWPIFDAQ4HFF2HIOFBXLYOVLQXHIT3KCN7KUPYQ' },
  'egi-credential': { name: 'EGI Credential',  uuid: 'ac416822-43ae-4aff-ba87-1005684e61d3', sha: '635c5cfef86058b06468ca58c36251935a8af6ebc8da11231127d7d4f1bb2dd6', tx: 'AEA7WTOSRZMQ6RCYN4GLSZWBLHUWYI4NSJXSXMEHCCK6FTBQS7JA' },
  'sigillo':        { name: 'Sigillo',         uuid: '08b2c58c-c21e-4388-a374-9bd42ab03e2e', sha: '43094aa7ae95e5ee68debd348ef8cb6678c49924046d663f3ea9939f39439f0a', tx: 'IXE2MTP6DUGETNVQ4EPQNNELTOY6WP57ZJC2PJLUGZGB2KEDM7UA' },
  'dimostralo':     { name: 'Dimostralo',      uuid: '65b71387-58cf-48e9-86ff-1d1d7c1b83c3', sha: '1efaba50e67fc9c5161b837f430adaf4ae2226c40f20e2d223fda350f597eb14', tx: 'AEA7WTOSRZMQ6RCYN4GLSZWBLHUWYI4NSJXSXMEHCCK6FTBQS7JA' },
  'oracode-nexus':  { name: 'Oracode Nexus',   uuid: '13cdd05b-0482-4da9-9c7d-21b63b46856b', sha: 'bfd9039975387220317d609b324bf10ed6a9bcd273d5ffcaca3d363bb8d3b225', tx: '5ZH62RMOCYZEWI5SIW4VV64Y7TP6M6MMEM5DW5C3XC3QM5RD5YGA' },
};

const SIGILLO_ICON = 'data:image/png;base64,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';

// Testi parametrici: {{name}} = denominazione dell'organo (da ORGANS[current].name).
const I18N = {
  it: {
    certLine:    "{{name}} · 2026 FlorenceEGI S.r.l. · Tutti i diritti riservati",
    verifyLabel: "Vedi il certificato →",
    modalTitle:  "Sigillo di anteriorità e paternità — {{name}}",
    modalBody:   "Questo sigillo attesta due fatti sul nome <strong>{{name}}</strong>: <strong>quando</strong> — la prima adozione documentata, con data certa — e <strong>a chi appartiene</strong>, perché il documento è firmato con identità verificata (eIDAS SES via Stripe Identity). L'impronta del documento è ancorata in modo immutabile sulla blockchain Algorand.<br><br>Vale quindi come <strong>prova di anteriorità e di paternità</strong> (prior art + authorship), <em>non</em> come marchio registrato.<br><br>Verificabile in modo indipendente tramite l'impronta SHA-256 e la transazione Algorand qui sotto.",
    signerLabel: "Firmatario",
    dateLabel:   "Data di ancoraggio",
    uuidLabel:   "UUID certificato",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Verifica su blockchain →",
    downloadPdf: "Stampa il certificato (PDF) →",
    close:       "Chiudi",
  },
  en: {
    certLine:    "{{name}} · 2026 FlorenceEGI S.r.l. · All rights reserved",
    verifyLabel: "View certificate →",
    modalTitle:  "Anteriority & authorship seal — {{name}}",
    modalBody:   "This seal attests two facts about the name <strong>{{name}}</strong>: <strong>when</strong> — the first documented adoption, with a certain date — and <strong>to whom it belongs</strong>, because the document is signed with verified identity (eIDAS SES via Stripe Identity). The document fingerprint is immutably anchored on the Algorand blockchain.<br><br>It therefore serves as <strong>proof of anteriority and authorship</strong> (prior art + authorship), <em>not</em> as a registered trademark.<br><br>Independently verifiable via the SHA-256 fingerprint and the Algorand transaction below.",
    signerLabel: "Signer",
    dateLabel:   "Anchoring date",
    uuidLabel:   "Certificate UUID",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Verify on blockchain →",
    downloadPdf: "Print the certificate (PDF) →",
    close:       "Close",
  },
};

/** @param {string} s @returns {string} */
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

const CSS = `
:host{display:block}
.lso-wrapper{background:#0d1117;border-top:1px solid rgba(124,58,237,.25);padding:28px 16px;text-align:center;font-family:system-ui,-apple-system,sans-serif}
.lso-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#7C3AED;margin:0 0 6px}
.lso-subtitle{font-size:11px;color:rgba(255,255,255,.38);margin:0 0 18px;line-height:1.5}
.lso-nav{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 20px}
.lso-link{font-size:12px;color:rgba(255,255,255,.4);text-decoration:none;transition:color .2s}
.lso-link:hover{color:#A78BFA}
.lso-current{font-size:12px;font-weight:600;color:#7C3AED}
.lso-current-badge{font-size:10px;color:rgba(255,255,255,.3);margin-left:4px}
.lso-cert-row{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px 10px;margin-top:16px}
.lso-cert-icon{width:22px;height:22px;flex-shrink:0;opacity:.95;image-rendering:-webkit-optimize-contrast;image-rendering:crisp-edges;transition:transform .3s ease}
.lso-cert-icon:hover{transform:scale(2)}
.lso-cert-text{font-size:13px;color:rgba(255,255,255,.6)}
.lso-cert-tool{color:#d4af6a;font-weight:600;letter-spacing:.02em}
.lso-cert-sep{color:rgba(255,255,255,.2);font-size:13px}
.lso-cert-btn{font-size:13px;font-weight:600;color:#A78BFA;background:none;border:1px solid rgba(124,58,237,.4);border-radius:4px;padding:3px 12px;cursor:pointer;transition:all .2s;font-family:inherit}
.lso-cert-btn:hover{color:#fff;background:rgba(124,58,237,.3);border-color:#7C3AED}
/* Modal */
.lso-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:99999;padding:16px}
.lso-modal{background:#0d1117;border:1px solid rgba(124,58,237,.4);border-radius:12px;max-width:560px;width:100%;padding:32px;position:relative;text-align:left}
.lso-modal-close{position:absolute;top:14px;right:16px;background:none;border:none;color:rgba(255,255,255,.4);font-size:20px;cursor:pointer;line-height:1;transition:color .2s}
.lso-modal-close:hover{color:#fff}
.lso-modal-header{display:flex;align-items:center;gap:10px;margin-bottom:20px}
.lso-modal-icon{width:28px;height:28px;image-rendering:-webkit-optimize-contrast;image-rendering:crisp-edges}
.lso-modal-title{font-size:16px;font-weight:700;color:#fff}
.lso-modal-body{font-size:13px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:24px}
.lso-modal-body strong{color:rgba(255,255,255,.9)}
.lso-modal-body em{color:rgba(124,58,237,.8);font-style:normal}
.lso-proof{background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.2);border-radius:8px;padding:16px;margin-bottom:20px}
.lso-proof-row{display:flex;flex-direction:column;gap:4px;margin-bottom:12px}
.lso-proof-row:last-child{margin-bottom:0}
.lso-proof-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#7C3AED}
.lso-proof-value{font-family:monospace;font-size:11px;color:#C4B5FD;word-break:break-all}
.lso-chain-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#A78BFA;text-decoration:none;border:1px solid rgba(124,58,237,.4);border-radius:6px;padding:8px 16px;transition:all .2s;width:100%;justify-content:center;box-sizing:border-box}
.lso-chain-link:hover{color:#fff;background:rgba(124,58,237,.2);border-color:#7C3AED}
.lso-modal-footer{text-align:center}
.lso-modal-close-btn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);border-radius:6px;padding:8px 24px;cursor:pointer;font-size:13px;font-family:inherit;transition:all .2s}
.lso-modal-close-btn:hover{color:#fff;border-color:rgba(255,255,255,.3)}
.lso-modal-hidden{display:none}
`;

class LsoEcosystem extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }

  connectedCallback() {
    this._render();
  }

  static get observedAttributes() { return ['current']; }
  attributeChangedCallback() { if (this.shadowRoot) this._render(); }

  _render() {
    const lang = (document.documentElement.lang || navigator.language || 'it').slice(0, 2).toLowerCase();
    const t = I18N[lang] ?? I18N.it;

    // PARAMETRICO: l'organo è dato dall'attributo current. Se non è in ORGANS (es. egi-hub interno,
    // egi-info da sopprimere) non si mostra alcun footer-sigillo.
    const org = ORGANS[(this.getAttribute('current') || '').toLowerCase()];
    if (!org) { this.shadowRoot.innerHTML = ''; return; }
    const name = esc(org.name);
    const certLine   = t.certLine.replaceAll('{{name}}', name);
    const modalTitle = t.modalTitle.replaceAll('{{name}}', name);
    const modalBody  = t.modalBody.replaceAll('{{name}}', name);

    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <section class="lso-wrapper" role="contentinfo" aria-label="Sigillo">
        <div class="lso-cert-row">
          <img class="lso-cert-icon" src="${SIGILLO_ICON}" alt="Sigillo" width="22" height="22">
          <span class="lso-cert-text"><span class="lso-cert-tool">Sigillo:</span> ${certLine}</span>
          <span class="lso-cert-sep">·</span>
          <button class="lso-cert-btn" id="lso-open-modal">${esc(t.verifyLabel)}</button>
        </div>
      </section>

      <div class="lso-modal-backdrop lso-modal-hidden" id="lso-modal" role="dialog" aria-modal="true">
        <div class="lso-modal">
          <button class="lso-modal-close" id="lso-close" aria-label="Chiudi">×</button>
          <div class="lso-modal-header">
            <img class="lso-modal-icon" src="${SIGILLO_ICON}" alt="Sigillo" width="28" height="28">
            <span class="lso-modal-title">${modalTitle}</span>
          </div>
          <div class="lso-modal-body">${modalBody}</div>
          <div class="lso-proof">
            <div class="lso-proof-row">
              <span class="lso-proof-label">${esc(t.signerLabel ?? 'Firmatario')}</span>
              <span class="lso-proof-value">${esc(SIGNER)} — ${esc(SIGNER_STD)}</span>
            </div>
            <div class="lso-proof-row">
              <span class="lso-proof-label">${esc(t.dateLabel ?? 'Data di ancoraggio')}</span>
              <span class="lso-proof-value">${esc(ANCHORED_AT)}</span>
            </div>
            <div class="lso-proof-row">
              <span class="lso-proof-label">${esc(t.uuidLabel ?? 'UUID certificato')}</span>
              <span class="lso-proof-value">${org.uuid}</span>
            </div>
            <div class="lso-proof-row">
              <span class="lso-proof-label">${esc(t.hashLabel)}</span>
              <span class="lso-proof-value">${org.sha}</span>
            </div>
            <div class="lso-proof-row">
              <span class="lso-proof-label">${esc(t.txLabel)}</span>
              <span class="lso-proof-value">${org.tx}</span>
            </div>
          </div>
          <a class="lso-chain-link" href="${ALGO_BASE}${org.tx}" target="_blank" rel="noopener noreferrer">
            ⛓ ${esc(t.viewOnChain)}
          </a>
          <a class="lso-chain-link" href="${pdfUrl(org.uuid)}" target="_blank" rel="noopener noreferrer" style="margin-top:10px">
            📄 ${esc(t.downloadPdf ?? 'Stampa il certificato (PDF) →')}
          </a>
          <div class="lso-modal-footer" style="margin-top:20px">
            <button class="lso-modal-close-btn" id="lso-close-btn">${esc(t.close)}</button>
          </div>
        </div>
      </div>
    `;

    const modal   = this.shadowRoot.getElementById('lso-modal');
    const openBtn = this.shadowRoot.getElementById('lso-open-modal');
    const closeX  = this.shadowRoot.getElementById('lso-close');
    const closeBtn= this.shadowRoot.getElementById('lso-close-btn');

    const open  = () => modal.classList.remove('lso-modal-hidden');
    const close = () => modal.classList.add('lso-modal-hidden');

    openBtn.addEventListener('click', open);
    closeX.addEventListener('click', close);
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
  }
}

customElements.define('lso-ecosystem', LsoEcosystem);
