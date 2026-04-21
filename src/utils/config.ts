interface Config {
    logoPath: string;
    heroPath: string;
    projectsHeroPath: string;
    florenceHeroPath: string;
    infoHeroPath: string;
    appName: string;
    appUrl: string;
    infoUrl: string;
    florenceUrl: string;
    natanUrl: string;
    hubUrl: string;
    isProduction: boolean;
}

const config: Config = {
    logoPath: import.meta.env.VITE_APP_LOGO_PATH || '/images/egi_logo_maggiore_02.png',
    heroPath: import.meta.env.VITE_APP_HERO_PATH || '/assets/hero-images/hub-hero.webp',
    projectsHeroPath: import.meta.env.VITE_APP_PROJECTS_HERO_PATH || '/assets/hero-images/projects-hero.webp',
    florenceHeroPath: import.meta.env.VITE_APP_FLORENCE_HERO_PATH || '/assets/hero-images/florence-egi-hero.webp',
    infoHeroPath: import.meta.env.VITE_APP_INFO_HERO_PATH || '/assets/hero-images/info-hero.webp',
    appName: import.meta.env.VITE_APP_NAME || 'FlorenceEGI',
    appUrl: import.meta.env.VITE_APP_URL || 'https://florenceegi.com',
    infoUrl: import.meta.env.VITE_INFO_URL || 'https://info.florenceegi.com',
    florenceUrl: import.meta.env.VITE_FLORENCE_URL || 'https://art.florenceegi.com',
    natanUrl: import.meta.env.VITE_NATAN_URL || 'https://natan-loc.florenceegi.com',
    hubUrl: import.meta.env.VITE_HUB_URL || 'https://hub.florenceegi.com',
    isProduction: import.meta.env.PROD
};

export default config;
