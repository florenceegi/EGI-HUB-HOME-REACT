/**
 * @package EGI-HUB-HOME — LSO Ecosystem Content
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB-HOME)
 * @date 2026-03-31
 * @purpose Contenuti tradotti per il sub-footer LSO Ecosystem.
 *          File separato per non toccare il file homepage.ts (LEGACY 866r).
 */
import { SupportedLocale } from '@/i18n/translations';

export interface LsoContent {
    subtitle: string;
    exploreLabel: string;
    currentSiteLabel: string;
    sites: {
        hub:        { name: string; desc: string };
        egi:        { name: string; desc: string };
        natan:      { name: string; desc: string };
        credential: { name: string; desc: string };
        sigillo:    { name: string; desc: string };
    };
}

export const lsoContent: Record<SupportedLocale, LsoContent> = {
    it: {
        subtitle: 'FlorenceEGI è un organismo software vivente. Ogni organo lavora in sinergia con gli altri.',
        exploreLabel: "Esplora l'ecosistema",
        currentSiteLabel: 'questo sito',
        sites: {
            hub:        { name: 'FlorenceEGI',   desc: "Vetrina pubblica dell'ecosistema" },
            egi:        { name: 'EGI',            desc: 'Creator economy su blockchain Algorand' },
            natan:      { name: 'NATAN_LOC',      desc: 'AI cognitiva per Comuni italiani' },
            credential: { name: 'EGI Credential', desc: 'Wallet competenze certificate su blockchain' },
            sigillo:    { name: 'Sigillo',        desc: 'Certificazione blockchain di documenti' },
        },
    },
    en: {
        subtitle: 'FlorenceEGI is a living software organism. Each organ works in synergy with the others.',
        exploreLabel: 'Explore the ecosystem',
        currentSiteLabel: 'this site',
        sites: {
            hub:        { name: 'FlorenceEGI',   desc: 'Public showcase of the ecosystem' },
            egi:        { name: 'EGI',            desc: 'Creator economy on Algorand blockchain' },
            natan:      { name: 'NATAN_LOC',      desc: 'Cognitive AI for Italian municipalities' },
            credential: { name: 'EGI Credential', desc: 'Certified skills wallet on blockchain' },
            sigillo:    { name: 'Sigillo',        desc: 'Blockchain document certification' },
        },
    },
    pt: {
        subtitle: 'FlorenceEGI é um organismo de software vivo. Cada órgão trabalha em sinergia com os outros.',
        exploreLabel: 'Explorar o ecossistema',
        currentSiteLabel: 'este site',
        sites: {
            hub:        { name: 'FlorenceEGI',   desc: 'Vitrine pública do ecossistema' },
            egi:        { name: 'EGI',            desc: 'Economia criativa na blockchain Algorand' },
            natan:      { name: 'NATAN_LOC',      desc: 'IA cognitiva para municípios italianos' },
            credential: { name: 'EGI Credential', desc: 'Carteira de competências certificadas em blockchain' },
            sigillo:    { name: 'Sigillo',        desc: 'Certificação blockchain de documentos' },
        },
    },
    es: {
        subtitle: 'FlorenceEGI es un organismo software vivo. Cada órgano trabaja en sinergia con los demás.',
        exploreLabel: 'Explorar el ecosistema',
        currentSiteLabel: 'este sitio',
        sites: {
            hub:        { name: 'FlorenceEGI',   desc: 'Escaparate público del ecosistema' },
            egi:        { name: 'EGI',            desc: 'Economía creativa en blockchain Algorand' },
            natan:      { name: 'NATAN_LOC',      desc: 'IA cognitiva para municipios italianos' },
            credential: { name: 'EGI Credential', desc: 'Wallet de competencias certificadas en blockchain' },
            sigillo:    { name: 'Sigillo',        desc: 'Certificación blockchain de documentos' },
        },
    },
    fr: {
        subtitle: "FlorenceEGI est un organisme logiciel vivant. Chaque organe travaille en synergie avec les autres.",
        exploreLabel: "Explorer l'écosystème",
        currentSiteLabel: 'ce site',
        sites: {
            hub:        { name: 'FlorenceEGI',   desc: "Vitrine publique de l'écosystème" },
            egi:        { name: 'EGI',            desc: 'Économie créative sur blockchain Algorand' },
            natan:      { name: 'NATAN_LOC',      desc: 'IA cognitive pour les communes italiennes' },
            credential: { name: 'EGI Credential', desc: 'Portefeuille de compétences certifiées sur blockchain' },
            sigillo:    { name: 'Sigillo',        desc: 'Certification blockchain de documents' },
        },
    },
    de: {
        subtitle: 'FlorenceEGI ist ein lebendiger Software-Organismus. Jedes Organ arbeitet synergetisch mit den anderen.',
        exploreLabel: 'Ökosystem erkunden',
        currentSiteLabel: 'diese Seite',
        sites: {
            hub:        { name: 'FlorenceEGI',   desc: 'Öffentliche Präsentation des Ökosystems' },
            egi:        { name: 'EGI',            desc: 'Creator Economy auf Algorand Blockchain' },
            natan:      { name: 'NATAN_LOC',      desc: 'Kognitive KI für italienische Kommunen' },
            credential: { name: 'EGI Credential', desc: 'Zertifiziertes Kompetenz-Wallet auf Blockchain' },
            sigillo:    { name: 'Sigillo',        desc: 'Blockchain-Dokumentenzertifizierung' },
        },
    },
};
