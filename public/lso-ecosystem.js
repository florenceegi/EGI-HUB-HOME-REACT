/**
 * lso-ecosystem.js — FlorenceEGI Living Software Organism Web Component
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.6.1 (FlorenceEGI — LSO)
 * @date 2026-04-05
 * @purpose Web Component autonomo per il sub-footer ecosistema LSO.
 *          SSOT hostato su florenceegi.com — incluso da tutti gli organi
 *          con 2 righe HTML. Aggiornamento = modifica di questo solo file.
 *          Zero dipendenze. Funziona in React, Blade, HTML puro.
 *          v1.6.0: organi da DB via GET hub.florenceegi.com/api/lso/organs (fallback hardcodato).
 */

const ALGORAND_TX = '2COCRU6I6FB6PUQPKSCKV3KR4OQX2APKJDJ3CTJI5JWHUIXNSRKQ';
const ALGORAND_URL = 'https://allo.info/tx/' + ALGORAND_TX;
const SHA256_FULL  = '41c9588b6c0d55ac47d64723e6bac32078726172d2aa9908e1735ee8bb81b512';
const SHA256_SHORT = '41c9588b\u202681b512';

const SIGILLO_ICON = 'data:image/png;base64,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';

const I18N = {
  it: {
    subtitle:    "FlorenceEGI è un organismo software vivente. Ogni organo lavora in sinergia con gli altri.",
    exploreLabel:"Esplora l'ecosistema",
    currentLabel:"questo sito",
    certLine:    "Sigillo · 2026 FlorenceEGI S.r.l. · Tutti i diritti riservati",
    verifyLabel: "Vedi il certificato →",
    modalTitle:  "Dichiarazione di Proprietà Intellettuale",
    modalBody:   "FlorenceEGI è un <strong>LSO</strong> (Living Software Organism — organismo software vivente): un sistema di organi software interconnessi che condividono infrastruttura, evolvono in sinergia e operano come un unico organismo coerente.<br><br>Composto da: <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>È vietata la riproduzione, copia, distribuzione, modifica o qualsiasi utilizzo non autorizzato, anche parziale, di qualsiasi componente di questo sistema.<br><br><em>Certificato e protetto su blockchain Algorand.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Verifica su blockchain →",
    close:       "Chiudi",
  },
  en: {
    subtitle:    "FlorenceEGI is a living software organism. Each organ works in synergy with the others.",
    exploreLabel:"Explore the ecosystem",
    currentLabel:"this site",
    certLine:    "Sigillo · 2026 FlorenceEGI S.r.l. · All rights reserved",
    verifyLabel: "View certificate →",
    modalTitle:  "Intellectual Property Declaration",
    modalBody:   "FlorenceEGI is a <strong>LSO</strong> (Living Software Organism — living software organism): a system of interconnected software organs that share infrastructure, evolve in synergy and operate as a single coherent organism.<br><br>Composed of: <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>Reproduction, copying, distribution, modification or any unauthorized use, even partial, of any component of this system is prohibited.<br><br><em>Certified and protected on Algorand blockchain.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Verify on blockchain →",
    close:       "Close",
  },
  de: {
    subtitle:    "FlorenceEGI ist ein lebendiger Software-Organismus. Jedes Organ arbeitet synergetisch mit den anderen.",
    exploreLabel:"Ökosystem erkunden",
    currentLabel:"diese Seite",
    certLine:    "Sigillo · 2026 FlorenceEGI S.r.l. · Alle Rechte vorbehalten",
    verifyLabel: "Zertifikat anzeigen →",
    modalTitle:  "Erklärung des geistigen Eigentums",
    modalBody:   "FlorenceEGI ist ein <strong>LSO</strong> (Living Software Organism — lebendiger Software-Organismus): ein System vernetzter Software-Organe, die Infrastruktur teilen, synergetisch evolvieren und als kohärenter Organismus operieren.<br><br>Bestehend aus: <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>Jede Reproduktion, Kopie, Verteilung, Modifikation oder unbefugte Nutzung, auch teilweise, ist verboten.<br><br><em>Zertifiziert und geschützt auf der Algorand-Blockchain.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Auf Blockchain prüfen →",
    close:       "Schließen",
  },
  es: {
    subtitle:    "FlorenceEGI es un organismo software vivo. Cada órgano trabaja en sinergia con los demás.",
    exploreLabel:"Explorar el ecosistema",
    currentLabel:"este sitio",
    certLine:    "Sigillo · 2026 FlorenceEGI S.r.l. · Todos los derechos reservados",
    verifyLabel: "Ver certificado →",
    modalTitle:  "Declaración de Propiedad Intelectual",
    modalBody:   "FlorenceEGI es un <strong>LSO</strong> (Living Software Organism — organismo de software vivo): un sistema de órganos de software interconectados que comparten infraestructura, evolucionan en sinergia y operan como un único organismo coherente.<br><br>Compuesto por: <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>Está prohibida la reproducción, copia, distribución, modificación o cualquier uso no autorizado, incluso parcial, de cualquier componente de este sistema.<br><br><em>Certificado y protegido en blockchain Algorand.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Verificar en blockchain →",
    close:       "Cerrar",
  },
  fr: {
    subtitle:    "FlorenceEGI est un organisme logiciel vivant. Chaque organe travaille en synergie avec les autres.",
    exploreLabel:"Explorer l'écosystème",
    currentLabel:"ce site",
    certLine:    "Sigillo · 2026 FlorenceEGI S.r.l. · Tous droits réservés",
    verifyLabel: "Voir le certificat →",
    modalTitle:  "Déclaration de Propriété Intellectuelle",
    modalBody:   "FlorenceEGI est un <strong>LSO</strong> (Living Software Organism — organisme logiciel vivant) : un système d'organes logiciels interconnectés qui partagent une infrastructure, évoluent en synergie et opèrent comme un organisme cohérent.<br><br>Composé de : <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>Toute reproduction, copie, distribution, modification ou utilisation non autorisée, même partielle, est interdite.<br><br><em>Certifié et protégé sur la blockchain Algorand.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Vérifier sur blockchain →",
    close:       "Fermer",
  },
  pt: {
    subtitle:    "FlorenceEGI é um organismo de software vivo. Cada órgão trabalha em sinergia com os outros.",
    exploreLabel:"Explorar o ecossistema",
    currentLabel:"este site",
    certLine:    "Sigillo · 2026 FlorenceEGI S.r.l. · Todos os direitos reservados",
    verifyLabel: "Ver certificado →",
    modalTitle:  "Declaração de Propriedade Intelectual",
    modalBody:   "FlorenceEGI é um <strong>LSO</strong> (Living Software Organism — organismo de software vivo): um sistema de órgãos de software interconectados que partilham infraestrutura, evoluem em sinergia e operam como um único organismo coerente.<br><br>Composto por: <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>É proibida a reprodução, cópia, distribuição, modificação ou qualquer utilização não autorizada, mesmo parcial, de qualquer componente deste sistema.<br><br><em>Certificado e protegido na blockchain Algorand.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Verificar na blockchain →",
    close:       "Fechar",
  },
};

const LSO_API = 'https://hub.florenceegi.com/api/lso/organs';
const LSO_FALLBACK = [
  { key: 'florenceegi',    url: 'https://florenceegi.com',                name: 'FlorenceEGI'   },
  { key: 'info',           url: 'https://info.florenceegi.com',           name: 'Info'           },
  { key: 'art',            url: 'https://art.florenceegi.com',            name: 'EGI'            },
  { key: 'natan-loc',      url: 'https://natan-loc.florenceegi.com',      name: 'NATAN_LOC'      },
  { key: 'egi-credential', url: 'https://egi-credential.florenceegi.com', name: 'EGI Credential' },
  { key: 'egi-sigillo',    url: 'https://egi-sigillo.florenceegi.com',    name: 'Sigillo'        },
];

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
    this._render(LSO_FALLBACK);
    fetch(LSO_API)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (Array.isArray(data) && data.length) this._render(data); })
      .catch(() => {});
  }

  static get observedAttributes() { return ['current']; }
  attributeChangedCallback() { this.connectedCallback(); }

  _render(sites) {
    const current = this.getAttribute('current') ?? '';
    const lang = (document.documentElement.lang || navigator.language || 'it').slice(0, 2).toLowerCase();
    const t = I18N[lang] ?? I18N.it;

    const nav = sites.map(site =>
      site.key === current
        ? `<span class="lso-current" aria-current="page">${esc(site.name)}<span class="lso-current-badge">(${esc(t.currentLabel)})</span></span>`
        : `<a class="lso-link" href="${site.url}" target="_blank" rel="noopener noreferrer">${esc(site.name)}</a>`
    ).join('');

    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <section class="lso-wrapper" role="complementary" aria-label="${esc(t.exploreLabel)}">
        <p class="lso-label">Living Software Organism</p>
        <p class="lso-subtitle">${esc(t.subtitle)}</p>
        <nav class="lso-nav" aria-label="${esc(t.exploreLabel)}">${nav}</nav>
        <div class="lso-cert-row">
          <img class="lso-cert-icon" src="${SIGILLO_ICON}" alt="Sigillo" width="22" height="22">
          <span class="lso-cert-text">${esc(t.certLine)}</span>
          <span class="lso-cert-sep">·</span>
          <button class="lso-cert-btn" id="lso-open-modal">${esc(t.verifyLabel)}</button>
        </div>
      </section>

      <div class="lso-modal-backdrop lso-modal-hidden" id="lso-modal" role="dialog" aria-modal="true">
        <div class="lso-modal">
          <button class="lso-modal-close" id="lso-close" aria-label="Chiudi">×</button>
          <div class="lso-modal-header">
            <img class="lso-modal-icon" src="${SIGILLO_ICON}" alt="Sigillo" width="28" height="28">
            <span class="lso-modal-title">${esc(t.modalTitle)}</span>
          </div>
          <div class="lso-modal-body">${t.modalBody}</div>
          <div class="lso-proof">
            <div class="lso-proof-row">
              <span class="lso-proof-label">${esc(t.hashLabel)}</span>
              <span class="lso-proof-value">${SHA256_FULL}</span>
            </div>
            <div class="lso-proof-row">
              <span class="lso-proof-label">${esc(t.txLabel)}</span>
              <span class="lso-proof-value">${ALGORAND_TX}</span>
            </div>
          </div>
          <a class="lso-chain-link" href="${ALGORAND_URL}" target="_blank" rel="noopener noreferrer">
            ⛓ ${esc(t.viewOnChain)}
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
