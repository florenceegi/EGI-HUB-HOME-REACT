/**
 * @file platformsData.ts
 * @description Data configuration for the "Piattaforme Attive" Solar System
 */

import { EcosystemData, OrbitalConfig } from '../types/ecosystem';
import config from '@/utils/config';

export const platformsData: EcosystemData = {
    // --- CORE: PIATTAFORME ATTIVE ---
    core: {
        label: "PIATTAFORME",
        tagline: "Ecosistema in Espansione",
        cat: "HUB",
        color: 0x00FFAA, // Verde Acqua (Linked to Parent Node)
        desc: "Il cuore pulsante dell'operatività EGI. Qui nascono e crescono i progetti.",
        bullets: [
            "Live Platforms",
            "In Development",
            "Future Roadmap"
        ],
        egi_link: "Regia unica per certificazione e valore.",
        route: "/" // Back to Main Hub
    },

    // --- NODES ---
    florence: {
        label: "FLORENCE EGI",
        tagline: "Marketplace d'Arte",
        cat: "ACTIVE",
        color: 0xFFD700, // Gold
        desc: "La prima piattaforma al mondo per la certificazione 4D delle opere d'arte.",
        bullets: ["Certificazione 4D", "Marketplace NFT", "Royalties Perpetue"],
        egi_link: config.florenceUrl + '?ref=hub',
        route: "EXTERNAL",
        radius: 45 // 50% larger than standard 30
    },

    info: {
        label: "EGI INFO",
        tagline: "Documentation Hub",
        cat: "ACTIVE",
        color: 0x00BFFF, // Deep Sky Blue
        desc: "Il centro di conoscenza per sviluppatori, partner e utenti.",
        bullets: ["Whitepaper", "API Docs", "Tutorials"],
        egi_link: config.infoUrl,
        route: "EXTERNAL",
        radius: 45
    },

    natanloc: {
        label: "NATAN LOC",
        tagline: "PA & Documenti",
        cat: "ACTIVE",
        color: 0xFF4500, // Orange Red
        desc: "Certificazione e tracciabilità documentale per la Pubblica Amministrazione.",
        bullets: ["Albo Pretorio", "Trasparenza", "Immutabilità"],
        egi_link: config.natanUrl + '?ref=hub',
        route: "EXTERNAL",
        radius: 45
    },

    natancompany: {
        label: "NATAN COMPANY",
        tagline: "Gestione Aziendale",
        cat: "COMING SOON",
        color: 0x888888, // Gray
        desc: "La suite definitiva per la certificazione dei processi aziendali.",
        bullets: ["Invoice Tracking", "Supply Chain", "ESG Compliance"],
        egi_link: "UNDER_CONSTRUCTION",
        route: "/under-construction",
        radius: 45
    },

    natanorg: {
        label: "NATAN ORG",
        tagline: "No-Profit & DAO",
        cat: "COMING SOON",
        color: 0x888888, // Gray
        desc: "Governance trasparente per organizzazioni e fondazioni.",
        bullets: ["Voting", "Treasury", "Impact Tracking"],
        egi_link: "UNDER_CONSTRUCTION",
        route: "/under-construction",
        radius: 45
    },

    tosca: {
        label: "TOSCA BANDI",
        tagline: "Monitoraggio Bandi",
        cat: "COMING SOON",
        color: 0x9370DB, // Medium Purple
        desc: "AI-driven platform per il matching e la gestione dei bandi.",
        bullets: ["AI Matching", "Deadlines", "Reporting"],
        egi_link: "UNDER_CONSTRUCTION",
        route: "/under-construction",
        radius: 45
    },

    partners: {
        label: "PARTNERS",
        tagline: "Business Network",
        cat: "COMING SOON",
        color: 0x2E8B57, // Sea Green
        desc: "La rete di aziende che costruiscono su EGI.",
        bullets: ["Solutions", "Integrators", "Consulting"],
        egi_link: "UNDER_CONSTRUCTION",
        route: "/under-construction",
        radius: 45
    }
};

export const platformsOrbitConfig: OrbitalConfig[] = [
    // Orbit 1: Active Platforms
    { id: "florence", orbit: 1 },
    { id: "natanloc", orbit: 1 },
    { id: "info", orbit: 1 },

    // Orbit 2: Future / Pending
    { id: "natancompany", orbit: 2 },
    { id: "tosca", orbit: 2 },

    // Orbit 3: Ecosystem
    { id: "natanorg", orbit: 3 },
    { id: "partners", orbit: 3 }
];
