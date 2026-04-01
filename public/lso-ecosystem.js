/**
 * lso-ecosystem.js — FlorenceEGI Living System Oracode Web Component
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.4.0 (FlorenceEGI — LSO)
 * @date 2026-04-01
 * @purpose Web Component autonomo per il sub-footer ecosistema LSO.
 *          SSOT hostato su florenceegi.com — incluso da tutti gli organi
 *          con 2 righe HTML. Aggiornamento = modifica di questo solo file.
 *          Zero dipendenze. Funziona in React, Blade, HTML puro.
 *          v1.2.0: Sigillo blockchain certification badge (IP ownership proof).
 */

const I18N = {
  it: { subtitle: "FlorenceEGI è un organismo software vivente. Ogni organo lavora in sinergia con gli altri.", exploreLabel: "Esplora l'ecosistema", currentLabel: "questo sito", certLabel: "2026 Fabio Cherici — FlorenceEGI S.r.l. · Tutti i diritti riservati e protetti su blockchain", verifyLabel: "Vedi il certificato →" },
  en: { subtitle: "FlorenceEGI is a living software organism. Each organ works in synergy with the others.", exploreLabel: "Explore the ecosystem", currentLabel: "this site", certLabel: "2026 Fabio Cherici — FlorenceEGI S.r.l. · All rights reserved and protected on blockchain", verifyLabel: "View certificate →" },
  de: { subtitle: "FlorenceEGI ist ein lebendiger Software-Organismus. Jedes Organ arbeitet synergetisch mit den anderen.", exploreLabel: "Ökosystem erkunden", currentLabel: "diese Seite", certLabel: "2026 Fabio Cherici — FlorenceEGI S.r.l. · Alle Rechte vorbehalten und auf der Blockchain geschützt", verifyLabel: "Zertifikat anzeigen →" },
  es: { subtitle: "FlorenceEGI es un organismo software vivo. Cada órgano trabaja en sinergia con los demás.", exploreLabel: "Explorar el ecosistema", currentLabel: "este sitio", certLabel: "2026 Fabio Cherici — FlorenceEGI S.r.l. · Todos los derechos reservados y protegidos en blockchain", verifyLabel: "Ver certificado →" },
  fr: { subtitle: "FlorenceEGI est un organisme logiciel vivant. Chaque organe travaille en synergie avec les autres.", exploreLabel: "Explorer l'écosystème", currentLabel: "ce site", certLabel: "2026 Fabio Cherici — FlorenceEGI S.r.l. · Tous droits réservés et protégés sur blockchain", verifyLabel: "Voir le certificat →" },
  pt: { subtitle: "FlorenceEGI é um organismo de software vivo. Cada órgão trabalha em sinergia com os outros.", exploreLabel: "Explorar o ecossistema", currentLabel: "este site", certLabel: "2026 Fabio Cherici — FlorenceEGI S.r.l. · Todos os direitos reservados e protegidos na blockchain", verifyLabel: "Ver certificado →" },
};

const LSO_SITES = [
  { key: 'hub',        url: 'https://florenceegi.com',                name: 'FlorenceEGI'   },
  { key: 'info',       url: 'https://info.florenceegi.com',           name: 'Info'           },
  { key: 'egi',        url: 'https://art.florenceegi.com',            name: 'EGI'            },
  { key: 'natan',      url: 'https://natan-loc.florenceegi.com',      name: 'NATAN_LOC'      },
  { key: 'credential', url: 'https://egi-credential.florenceegi.com', name: 'EGI Credential' },
  { key: 'sigillo',    url: 'https://egi-sigillo.florenceegi.com',    name: 'Sigillo'        },
];

const SIGILLO_VERIFY_URL = 'https://egi-sigillo.florenceegi.com/sigillo/certificato/eb7862a0-8563-4b64-ae63-3a6ab28045e8';
const SIGILLO_HASH = '41c9588b\u202681b512';
const SIGILLO_ICON = 'data:image/png;base64,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';

/** @param {string} s @returns {string} */
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

const CSS =`:host{display:block}.lso-wrapper{background:#0d1117;border-top:1px solid rgba(124,58,237,.25);padding:28px 16px;text-align:center;font-family:system-ui,-apple-system,sans-serif}.lso-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#7C3AED;margin:0 0 6px}.lso-subtitle{font-size:11px;color:rgba(255,255,255,.38);margin:0 0 18px;line-height:1.5}.lso-nav{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 20px}.lso-link{font-size:12px;color:rgba(255,255,255,.4);text-decoration:none;transition:color .2s}.lso-link:hover{color:#A78BFA}.lso-current{font-size:12px;font-weight:600;color:#7C3AED}.lso-current-badge{font-size:10px;color:rgba(255,255,255,.3);margin-left:4px}.lso-sigillo-row{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px 12px;margin-top:20px;padding-top:16px;border-top:1px solid rgba(124,58,237,.2)}.lso-sigillo-icon{width:22px;height:22px;display:inline-block;vertical-align:middle;opacity:.9;flex-shrink:0}.lso-sigillo-meta{font-size:13px;color:rgba(255,255,255,.55);line-height:1.4}.lso-hash{font-family:monospace;font-size:12px;color:#9D71F5;letter-spacing:.06em}.lso-sep{color:rgba(255,255,255,.2);font-size:13px}.lso-verify{font-size:13px;font-weight:600;color:#A78BFA;text-decoration:none;border:1px solid rgba(124,58,237,.4);border-radius:4px;padding:2px 10px;transition:all .2s;white-space:nowrap}.lso-verify:hover{color:#fff;background:rgba(124,58,237,.3);border-color:#7C3AED}`;

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
        <div class="lso-sigillo-row" aria-label="Blockchain IP certification">
          <img class="lso-sigillo-icon" src="${SIGILLO_ICON}" alt="Sigillo" width="22" height="22">
          <span class="lso-sigillo-meta">${esc(t.certLabel)}</span>
          <span class="lso-sep">·</span>
          <span class="lso-hash">${SIGILLO_HASH}</span>
          <span class="lso-sep">·</span>
          <a class="lso-verify" href="${SIGILLO_VERIFY_URL}" target="_blank" rel="noopener noreferrer" aria-label="Verifica certificato Sigillo su Algorand">${esc(t.verifyLabel)}</a>
        </div>
      </section>
    `;
  }
}

customElements.define('lso-ecosystem', LsoEcosystem);
