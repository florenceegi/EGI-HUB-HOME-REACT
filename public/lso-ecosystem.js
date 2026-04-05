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
.lso-cert-icon{width:22px;height:22px;flex-shrink:0;opacity:.95}
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
.lso-modal-icon{width:28px;height:28px}
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
