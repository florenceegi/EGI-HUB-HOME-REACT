/**
 * lso-ecosystem.js — FlorenceEGI Living System Oracode Web Component
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.5.1 (FlorenceEGI — LSO)
 * @date 2026-04-01
 * @purpose Web Component autonomo per il sub-footer ecosistema LSO.
 *          SSOT hostato su florenceegi.com — incluso da tutti gli organi
 *          con 2 righe HTML. Aggiornamento = modifica di questo solo file.
 *          Zero dipendenze. Funziona in React, Blade, HTML puro.
 *          v1.5.0: modal dichiarazione IP con prova blockchain Algorand.
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
    certLine:    "Sigillo · © 2026 FlorenceEGI S.r.l. · Tutti i diritti riservati",
    verifyLabel: "Vedi il certificato →",
    modalTitle:  "Dichiarazione di Proprietà Intellettuale",
    modalBody:   "FlorenceEGI è un <strong>LSO</strong> (Living System Oracode — organismo software vivente): un sistema di organi software interconnessi che condividono infrastruttura, evolvono in sinergia e operano come un unico organismo coerente.<br><br>Composto da: <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>È vietata la riproduzione, copia, distribuzione, modifica o qualsiasi utilizzo non autorizzato, anche parziale, di qualsiasi componente di questo sistema.<br><br><em>Certificato e protetto su blockchain Algorand.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Verifica su blockchain →",
    close:       "Chiudi",
  },
  en: {
    subtitle:    "FlorenceEGI is a living software organism. Each organ works in synergy with the others.",
    exploreLabel:"Explore the ecosystem",
    currentLabel:"this site",
    certLine:    "Sigillo · © 2026 FlorenceEGI S.r.l. · All rights reserved",
    verifyLabel: "View certificate →",
    modalTitle:  "Intellectual Property Declaration",
    modalBody:   "FlorenceEGI is a <strong>LSO</strong> (Living System Oracode — living software organism): a system of interconnected software organs that share infrastructure, evolve in synergy and operate as a single coherent organism.<br><br>Composed of: <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>Reproduction, copying, distribution, modification or any unauthorized use, even partial, of any component of this system is prohibited.<br><br><em>Certified and protected on Algorand blockchain.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Verify on blockchain →",
    close:       "Close",
  },
  de: {
    subtitle:    "FlorenceEGI ist ein lebendiger Software-Organismus. Jedes Organ arbeitet synergetisch mit den anderen.",
    exploreLabel:"Ökosystem erkunden",
    currentLabel:"diese Seite",
    certLine:    "Sigillo · © 2026 FlorenceEGI S.r.l. · Alle Rechte vorbehalten",
    verifyLabel: "Zertifikat anzeigen →",
    modalTitle:  "Erklärung des geistigen Eigentums",
    modalBody:   "FlorenceEGI ist ein <strong>LSO</strong> (Living System Oracode — lebendiger Software-Organismus): ein System vernetzter Software-Organe, die Infrastruktur teilen, synergetisch evolvieren und als kohärenter Organismus operieren.<br><br>Bestehend aus: <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>Jede Reproduktion, Kopie, Verteilung, Modifikation oder unbefugte Nutzung, auch teilweise, ist verboten.<br><br><em>Zertifiziert und geschützt auf der Algorand-Blockchain.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Auf Blockchain prüfen →",
    close:       "Schließen",
  },
  es: {
    subtitle:    "FlorenceEGI es un organismo software vivo. Cada órgano trabaja en sinergia con los demás.",
    exploreLabel:"Explorar el ecosistema",
    currentLabel:"este sitio",
    certLine:    "Sigillo · © 2026 FlorenceEGI S.r.l. · Todos los derechos reservados",
    verifyLabel: "Ver certificado →",
    modalTitle:  "Declaración de Propiedad Intelectual",
    modalBody:   "FlorenceEGI es un <strong>LSO</strong> (Living System Oracode — organismo de software vivo): un sistema de órganos de software interconectados que comparten infraestructura, evolucionan en sinergia y operan como un único organismo coherente.<br><br>Compuesto por: <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>Está prohibida la reproducción, copia, distribución, modificación o cualquier uso no autorizado, incluso parcial, de cualquier componente de este sistema.<br><br><em>Certificado y protegido en blockchain Algorand.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Verificar en blockchain →",
    close:       "Cerrar",
  },
  fr: {
    subtitle:    "FlorenceEGI est un organisme logiciel vivant. Chaque organe travaille en synergie avec les autres.",
    exploreLabel:"Explorer l'écosystème",
    currentLabel:"ce site",
    certLine:    "Sigillo · © 2026 FlorenceEGI S.r.l. · Tous droits réservés",
    verifyLabel: "Voir le certificat →",
    modalTitle:  "Déclaration de Propriété Intellectuelle",
    modalBody:   "FlorenceEGI est un <strong>LSO</strong> (Living System Oracode — organisme logiciel vivant) : un système d'organes logiciels interconnectés qui partagent une infrastructure, évoluent en synergie et opèrent comme un organisme cohérent.<br><br>Composé de : <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>Toute reproduction, copie, distribution, modification ou utilisation non autorisée, même partielle, est interdite.<br><br><em>Certifié et protégé sur la blockchain Algorand.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Vérifier sur blockchain →",
    close:       "Fermer",
  },
  pt: {
    subtitle:    "FlorenceEGI é um organismo de software vivo. Cada órgão trabalha em sinergia com os outros.",
    exploreLabel:"Explorar o ecossistema",
    currentLabel:"este site",
    certLine:    "Sigillo · © 2026 FlorenceEGI S.r.l. · Todos os direitos reservados",
    verifyLabel: "Ver certificado →",
    modalTitle:  "Declaração de Propriedade Intelectual",
    modalBody:   "FlorenceEGI é um <strong>LSO</strong> (Living System Oracode — organismo de software vivo): um sistema de órgãos de software interconectados que partilham infraestrutura, evoluem em sinergia e operam como um único organismo coerente.<br><br>Composto por: <strong>EGI · EGI-HUB · NATAN_LOC · Info · EGI Credential · Sigillo</strong>.<br><br>É proibida a reprodução, cópia, distribuição, modificação ou qualquer utilização não autorizada, mesmo parcial, de qualquer componente deste sistema.<br><br><em>Certificado e protegido na blockchain Algorand.</em>",
    hashLabel:   "SHA-256",
    txLabel:     "Algorand TX",
    viewOnChain: "Verificar na blockchain →",
    close:       "Fechar",
  },
};

const LSO_SITES = [
  { key: 'hub',        url: 'https://florenceegi.com',                name: 'FlorenceEGI'   },
  { key: 'info',       url: 'https://info.florenceegi.com',           name: 'Info'           },
  { key: 'egi',        url: 'https://art.florenceegi.com',            name: 'EGI'            },
  { key: 'natan',      url: 'https://natan-loc.florenceegi.com',      name: 'NATAN_LOC'      },
  { key: 'credential', url: 'https://egi-credential.florenceegi.com', name: 'EGI Credential' },
  { key: 'sigillo',    url: 'https://egi-sigillo.florenceegi.com',    name: 'Sigillo'        },
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

  connectedCallback() { this._render(); }

  static get observedAttributes() { return ['current']; }
  attributeChangedCallback() { this._render(); }

  _render() {
    const current = this.getAttribute('current') ?? '';
    const lang = (document.documentElement.lang || navigator.language || 'it').slice(0, 2).toLowerCase();
    const t = I18N[lang] ?? I18N.it;

    const nav = LSO_SITES.map(site =>
      site.key === current
        ? `<span class="lso-current" aria-current="page">${esc(site.name)}<span class="lso-current-badge">(${esc(t.currentLabel)})</span></span>`
        : `<a class="lso-link" href="${site.url}" target="_blank" rel="noopener noreferrer">${esc(site.name)}</a>`
    ).join('');

    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <section class="lso-wrapper" role="complementary" aria-label="${esc(t.exploreLabel)}">
        <p class="lso-label">Living System Oracode</p>
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
