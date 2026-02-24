/**
 * @file natanSystemData.ts
 * @description NATAN Subsystem Solar View - NATAN variants
 * @author Padmin D. Curtis (OS3.0)
 */

import { EcosystemData, OrbitalConfig } from '@/types/ecosystem';
import config from '@/utils/config';

export const natanSystemData: EcosystemData = {
    // --- CORE: NATAN (Non-clickable, just visual hub) ---
    core: {
        label: "NATAN",
        tagline: "Certificazione Immutabile",
        cat: "HUB",
        color: 0xFF4500, // Orange Red (brand color)
        desc: "Suite completa per la certificazione documentale su blockchain.",
        bullets: [
            "PA & Trasparenza",
            "No-Profit & DAO",
            "Business & Supply Chain"
        ],
        egi_link: "#", // Not clickable
        route: "#" // No action on core
    },

    // --- SATELLITES ---
    natanloc: {
        label: "NATAN LOC",
        tagline: "Pubblica Amministrazione",
        cat: "ACTIVE",
        color: 0xFF6347, // Tomato
        desc: "Certificazione documentale per Albi Pretori e Trasparenza PA.",
        bullets: ["Albo Pretorio", "Trasparenza", "Immutabilità"],
        egi_link: config.natanUrl + '?ref=hub',
        route: config.natanUrl + '?ref=hub',
        radius: 42 // Same as home satellites
    },

    natanorg: {
        label: "NATAN ORG",
        tagline: "No-Profit & DAO",
        cat: "COMING_SOON",
        color: 0x888888, // Gray
        desc: "Governance trasparente per organizzazioni, fondazioni e DAO.",
        bullets: ["Voting Trasparente", "Treasury Management", "Impact Tracking"],
        egi_link: "UNDER_CONSTRUCTION",
        route: "/under-construction",
        radius: 42 // Same as home satellites
    },

    natanbusiness: {
        label: "NATAN BUSINESS",
        tagline: "Gestione Aziendale",
        cat: "COMING_SOON",
        color: 0x888888, // Gray
        desc: "Suite definitiva per certificazione processi aziendali e supply chain.",
        bullets: ["Invoice Tracking", "Supply Chain", "ESG Compliance"],
        egi_link: "UNDER_CONSTRUCTION",
        route: "/under-construction",
        radius: 42 // Same as home satellites
    },

    // --- BACK NAVIGATION SPHERE ---
    back: {
        label: "← PLATFORMS",
        tagline: "Torna Indietro",
        cat: "NAVIGATION",
        color: 0x00BFFF, // Deep Sky Blue
        desc: "Ritorna alla vista principale delle piattaforme.",
        bullets: ["Navigazione", "Iperspazio", "Sistema Principale"],
        egi_link: "#",
        route: "/platforms", // Navigate back to main platforms page
        radius: 42 // Same as home satellites
    }
};

export const natanOrbitConfig: OrbitalConfig[] = [
    // Orbit 1: Active + Coming Soon
    { id: "natanloc", orbit: 1 },
    { id: "natanorg", orbit: 1 },
    { id: "natanbusiness", orbit: 1 },

    // Orbit 2: Back navigation
    { id: "back", orbit: 2 }
];
