/**
 * @file platformsSystemData.ts
 * @description Platforms System Solar View - Main Hub with active platforms
 * @author Padmin D. Curtis (OS3.0)
 */

import { EcosystemData, OrbitalConfig } from '@/types/ecosystem';
import config from '@/utils/config';

export const platformsSystemData: EcosystemData = {
    // --- CORE: HUB ---
    core: {
        label: "HUB",
        tagline: "Sistema Nervoso Centrale",
        cat: "HUB",
        color: 0xFFD700, // Gold
        desc: "Il cervello dell'ecosistema EGI. Coordina infinite piattaforme attraverso il Business Granulare.",
        bullets: [
            "Orchestratore Centrale",
            "Multi-Tenant Architecture",
            "API Gateway"
        ],
        egi_link: config.hubUrl,
        route: config.hubUrl // External link to HUB
    },

    // --- SATELLITES ---
    florenceegi: {
        label: "FLORENCE EGI",
        tagline: "NFT Marketplace",
        cat: "ACTIVE",
        color: 0x00FF88, // Green
        desc: "La prima piattaforma al mondo per la certificazione 4D delle opere d'arte.",
        bullets: ["Certificazione 4D", "Marketplace NFT", "Royalties Perpetue"],
        egi_link: config.florenceUrl + '?ref=hub',
        route: config.florenceUrl + '?ref=hub',
        radius: 42 // Same as home satellites
    },

    natan: {
        label: "NATAN",
        tagline: "Certificazione Documentale",
        cat: "ACTIVE",
        color: 0xFF00FF, // Magenta brillante (zero rosso)
        desc: "Suite completa per certificazione documentale PA, aziende e organizzazioni.",
        bullets: ["NATAN LOC (PA)", "NATAN ORG (No-Profit)", "NATAN BUSINESS"],
        egi_link: "#", // No external link, navigates to subsystem
        route: "/platforms/natan", // Internal navigation to subsystem
        radius: 42 // Same as home satellites
    },

    sigillo: {
        label: "SIGILLO",
        tagline: "Certificazione Blockchain",
        cat: "ACTIVE",
        color: 0x0EA5A4, // Teal — colore accent Sigillo
        desc: "Certifica qualsiasi file su Algorand. SHA-256 + Merkle tree. Prova matematica dell'esistenza.",
        bullets: ["SHA-256 Client-Side", "Algorand Blockchain", "Merkle Batch"],
        egi_link: "#",
        route: "/sigillo",
        radius: 42
    },

    partners: {
        label: "PARTNERS",
        tagline: "Business Network",
        cat: "COMING_SOON",
        color: 0xFF1493, // Deep Pink (business network vibrante)
        desc: "La rete di aziende e integratori che costruiscono su EGI.",
        bullets: ["Solutions", "System Integrators", "Consulting"],
        egi_link: "UNDER_CONSTRUCTION",
        route: "/under-construction",
        radius: 42 // Same as home satellites
    },

    // --- BACK NAVIGATION SPHERE ---
    back: {
        label: "← HOME",
        tagline: "Torna Indietro",
        cat: "NAVIGATION",
        color: 0x1E90FF, // Blu elettrico (navigazione fredda)
        desc: "Ritorna alla vista principale dell'ecosistema.",
        bullets: ["Navigazione", "Iperspazio", "EGI Core"],
        egi_link: "#",
        route: "/", // Navigate back to home
        radius: 42
    }
};

export const platformsOrbitConfig: OrbitalConfig[] = [
    // Orbit 1: Active Platforms
    { id: "florenceegi", orbit: 1 },
    { id: "natan", orbit: 1 },
    { id: "back", orbit: 1 },

    // Orbit 1: Active
    { id: "sigillo", orbit: 1 },

    // Orbit 2: Coming Soon
    { id: "partners", orbit: 2 }
];
