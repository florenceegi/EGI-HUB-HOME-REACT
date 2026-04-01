/**
 * lso-ecosystem.js — FlorenceEGI Living System Oracode Web Component
 *
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.2 (FlorenceEGI — LSO)
 * @date 2026-03-31
 * @purpose Web Component autonomo per il sub-footer ecosistema LSO.
 *          SSOT hostato su florenceegi.com — incluso da tutti gli organi
 *          con 2 righe HTML. Aggiornamento = modifica di questo solo file.
 *          Zero dipendenze. Funziona in React, Blade, HTML puro.
 */

const I18N = {
  it: { subtitle: "FlorenceEGI è un organismo software vivente. Ogni organo lavora in sinergia con gli altri.", exploreLabel: "Esplora l'ecosistema", currentLabel: "questo sito" },
  en: { subtitle: "FlorenceEGI is a living software organism. Each organ works in synergy with the others.", exploreLabel: "Explore the ecosystem", currentLabel: "this site" },
  de: { subtitle: "FlorenceEGI ist ein lebendiger Software-Organismus. Jedes Organ arbeitet synergetisch mit den anderen.", exploreLabel: "Ökosystem erkunden", currentLabel: "diese Seite" },
  es: { subtitle: "FlorenceEGI es un organismo software vivo. Cada órgano trabaja en sinergia con los demás.", exploreLabel: "Explorar el ecosistema", currentLabel: "este sitio" },
  fr: { subtitle: "FlorenceEGI est un organisme logiciel vivant. Chaque organe travaille en synergie avec les autres.", exploreLabel: "Explorer l'écosystème", currentLabel: "ce site" },
  pt: { subtitle: "FlorenceEGI é um organismo de software vivo. Cada órgão trabalha em sinergia com os outros.", exploreLabel: "Explorar o ecossistema", currentLabel: "este site" },
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

const CSS =`:host{display:block}.lso-wrapper{background:#0d1117;border-top:1px solid rgba(124,58,237,.25);padding:28px 16px;text-align:center;font-family:system-ui,-apple-system,sans-serif}.lso-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#7C3AED;margin:0 0 6px}.lso-subtitle{font-size:11px;color:rgba(255,255,255,.38);margin:0 0 18px;line-height:1.5}.lso-nav{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 20px}.lso-link{font-size:12px;color:rgba(255,255,255,.4);text-decoration:none;transition:color .2s}.lso-link:hover{color:#A78BFA}.lso-current{font-size:12px;font-weight:600;color:#7C3AED}.lso-current-badge{font-size:10px;color:rgba(255,255,255,.3);margin-left:4px}`;

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
      </section>
    `;
  }
}

customElements.define('lso-ecosystem', LsoEcosystem);
