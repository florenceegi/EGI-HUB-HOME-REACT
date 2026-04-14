/**
 * @package EGI-HUB-HOME — BrochureFirenzeFutureWeekPage
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB-HOME-REACT)
 * @date 2026-04-14
 * @purpose Landing page web della brochure Firenze Future Week 2026 — contenuti dalla brochure cartacea, layout nativo web responsive mobile-first
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUIStore } from '@/stores/useUIStore';
import { useI18n } from '@/i18n';
import { SeoHead } from '@/components/common/SeoHead';
import { homepageContent } from '@/data/content/homepage';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const STATS = [
    { value: '9', label: 'Organi operativi' },
    { value: '1M+', label: 'Righe di codice' },
    { value: '4.5s', label: 'Certificazione blockchain' },
    { value: '56k', label: 'Documenti RAG indicizzati' },
    { value: '20%', label: 'Impatto ambientale' },
    { value: '11', label: 'Linguaggi di programmazione' },
];

const PLATFORMS = [
    {
        name: 'NATAN — AI per la PA',
        url: 'https://natan-loc.florenceegi.com',
        desc: 'Intelligenza artificiale documentale al servizio dei cittadini. Indicizza atti, delibere e regolamenti pubblici e risponde con fonti verificabili e punteggio di affidabilita (URS 0-100).',
        tags: ['AI', 'RAG', 'Pubblica Amministrazione'],
    },
    {
        name: 'Sigillo — Certificazione Documenti',
        url: 'https://egi-sigillo.florenceegi.com',
        desc: 'Certifica qualsiasi documento con hash crittografico SHA-256 ancorato su blockchain Algorand. Validita legale ai sensi del DL 135/2018. In 4.5 secondi.',
        tags: ['Blockchain', 'Certificazione'],
    },
    {
        name: 'EGI Credential — Wallet Professionale',
        url: 'https://egi-credential.florenceegi.com',
        desc: 'Trasforma ogni competenza dimostrata in un certificato verificabile su blockchain. Il tuo curriculum diventa un wallet di credenziali immutabili.',
        tags: ['Blockchain', 'Professioni'],
    },
    {
        name: 'ArtFlorenceEGI — Arte Certificata',
        url: 'https://art.florenceegi.com',
        desc: 'Marketplace per opere d\'arte certificate su blockchain con royalties automatiche (4.5%) e impatto ambientale integrato. L\'artista resta proprietario per sempre.',
        tags: ['Blockchain', 'Arte'],
    },
];

const STEPS = [
    { n: '1', title: 'Crei o carichi', desc: 'La tua opera, il tuo documento, la tua competenza.' },
    { n: '2', title: 'Certifica', desc: 'Hash SHA-256 + registrazione su blockchain Algorand. 4.5 secondi. Validita legale.' },
    { n: '3', title: 'Impatto', desc: 'Il 20% di ogni transazione finanzia un progetto ambientale verificato (EPP).' },
    { n: '4', title: 'Valore nel tempo', desc: 'Royalties automatiche, tracciabilita permanente, identita sovrana.' },
];

const USE_CASES = [
    { who: 'Cittadino', what: 'Cerca risposte su delibere e regolamenti comunali. NATAN le trova con fonti verificabili, 24/7.' },
    { who: 'Artista', what: 'Certifica le opere, guadagna sulle rivendite, protegge il copyright.' },
    { who: 'Professionista', what: 'Costruisce un wallet di credenziali verificabili su blockchain.' },
    { who: 'Impresa', what: 'Certifica contratti e documenti con valore legale immediato.' },
    { who: 'Artigiano', what: 'Tokenizza i prodotti unici con tracciabilita e storia.' },
];

const DIFFERENTIATORS = [
    { title: 'Non e un progetto. E in produzione.', desc: '9 organi operativi, oltre 1 milione di righe di codice proprietario, 11 linguaggi, infrastruttura AWS, database unificato, pipeline AI con 56.000 documenti indicizzati.' },
    { title: 'Ambiente nel DNA, non nel marketing.', desc: 'Il 20% di ogni transazione finanzia automaticamente un progetto ambientale verificato. Non e un\'opzione: e nel protocollo. E il significato della E di EGI.' },
    { title: 'AI che non inventa.', desc: 'La nostra AI (NATAN) risponde solo con fonti verificabili. Ogni risposta ha un punteggio di affidabilita (URS). Se non sa, non inventa.' },
    { title: 'Validita legale reale.', desc: 'Certificazione blockchain riconosciuta dalla normativa italiana (DL 135/2018, Reg. eIDAS UE 910/2014). Non e teoria: e legge.' },
    { title: 'Fatto a Firenze. Standard europeo.', desc: 'GDPR-first. MiCA-safe. Dati in Europa (AWS eu-north-1). Nessun compromesso sulla sovranita dei dati.' },
];

const TAG_COLORS: Record<string, string> = {
    'AI': 'bg-violet-500/20 text-violet-300',
    'RAG': 'bg-violet-500/20 text-violet-300',
    'Pubblica Amministrazione': 'bg-pink-500/20 text-pink-300',
    'Blockchain': 'bg-emerald-500/20 text-emerald-300',
    'Certificazione': 'bg-amber-500/20 text-amber-300',
    'Professioni': 'bg-blue-500/20 text-blue-300',
    'Arte': 'bg-amber-500/20 text-amber-300',
};

export function BrochureFirenzeFutureWeekPage() {
    const navigate = useUIStore((s) => s.navigate);
    const { locale } = useI18n();
    const content = homepageContent[locale];

    return (
        <div className="min-h-screen bg-dark text-white overflow-y-auto">
            <SeoHead
                title="FlorenceEGI — Firenze Future Week 2026"
                description="Certifica. Proteggi. Rigenera. Ecosistema di piattaforme blockchain e AI in produzione. 9 organi, 1M+ righe di codice, da Firenze."
            />

            {/* Sticky nav */}
            <div className="sticky top-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-3 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    florenceegi.com
                </button>
                <span className="text-xs text-text-muted uppercase tracking-widest hidden sm:block">
                    Firenze Future Week 2026
                </span>
            </div>

            <div className="max-w-4xl mx-auto px-5 py-10 sm:py-16">

                {/* ═══ HERO ═══ */}
                <motion.section
                    className="text-center mb-16 sm:mb-24"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    <motion.div variants={fadeUp} custom={0}
                        className="inline-block px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-[3px] border border-primary/40 text-primary rounded-full"
                    >
                        In produzione
                    </motion.div>

                    <motion.h1 variants={fadeUp} custom={1}
                        className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4"
                    >
                        Florence<span className="text-primary">EGI</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} custom={2}
                        className="font-renaissance text-xl sm:text-2xl lg:text-3xl text-white/90 mb-6"
                    >
                        Certifica. Proteggi. <em className="text-primary not-italic">Rigenera.</em>
                    </motion.p>

                    <motion.p variants={fadeUp} custom={3}
                        className="text-sm sm:text-base text-text-muted max-w-xl mx-auto leading-relaxed"
                    >
                        Un ecosistema di piattaforme per certificare asset su blockchain, proteggere documenti
                        con AI verificabile e rigenerare l'ambiente ad ogni transazione. Tutto gia operativo. Tutto da Firenze.
                    </motion.p>

                    <motion.div variants={fadeUp} custom={4} className="mt-8 text-xs text-text-muted uppercase tracking-[2px]">
                        15 — 16 Aprile 2026 &middot; Camera di Commercio, Firenze
                    </motion.div>
                </motion.section>

                {/* ═══ STATS ═══ */}
                <motion.section
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16 sm:mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                >
                    {STATS.map((s, i) => (
                        <motion.div
                            key={s.label}
                            variants={fadeUp}
                            custom={i}
                            className="bg-dark-light border border-white/10 rounded-xl p-5 text-center hover:border-primary/30 transition-colors"
                        >
                            <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">{s.value}</div>
                            <div className="text-xs sm:text-sm text-text-muted uppercase tracking-wider">{s.label}</div>
                        </motion.div>
                    ))}
                </motion.section>

                {/* ═══ PIATTAFORME ═══ */}
                <motion.section
                    className="mb-16 sm:mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    <motion.h2 variants={fadeUp} custom={0}
                        className="font-renaissance text-2xl sm:text-3xl font-bold mb-2"
                    >
                        Le piattaforme
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={1}
                        className="text-sm text-text-muted mb-8"
                    >
                        Ogni piattaforma e un organo specializzato dell'ecosistema.
                        Condividono dati, identita e regole — ma ciascuna ha la sua funzione.
                    </motion.p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {PLATFORMS.map((p, i) => (
                            <motion.a
                                key={p.name}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={fadeUp}
                                custom={i + 2}
                                className="block bg-dark-light border border-white/10 rounded-xl p-5 hover:border-primary/40 transition-all group"
                            >
                                <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                                <div className="text-xs text-primary/70 mb-3">{p.url.replace('https://', '')}</div>
                                <p className="text-sm text-text-muted leading-relaxed mb-3">{p.desc}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {p.tags.map((tag) => (
                                        <span key={tag} className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${TAG_COLORS[tag] ?? 'bg-white/10 text-white/60'}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.section>

                {/* ═══ COS'E UN EGI ═══ */}
                <motion.section
                    className="mb-16 sm:mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    <motion.h2 variants={fadeUp} custom={0}
                        className="font-renaissance text-2xl sm:text-3xl font-bold mb-2"
                    >
                        Cos'e un EGI?
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={1}
                        className="text-sm text-text-muted mb-8"
                    >
                        EGI = Ecological Goods Invent. Non un NFT.
                        Un contenitore digitale certificato che unisce un bene reale, un impatto ambientale e l'ingegno umano.
                    </motion.p>

                    {/* Steps */}
                    <div className="space-y-4 mb-10">
                        {STEPS.map((s, i) => (
                            <motion.div
                                key={s.n}
                                variants={fadeUp}
                                custom={i + 2}
                                className="flex items-start gap-4"
                            >
                                <div className="w-9 h-9 min-w-[2.25rem] rounded-full bg-primary text-dark flex items-center justify-center font-bold text-sm">
                                    {s.n}
                                </div>
                                <div>
                                    <span className="font-bold">{s.title}</span>
                                    <span className="text-text-muted"> — {s.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Use cases */}
                    <motion.div
                        variants={fadeUp}
                        custom={6}
                        className="bg-gradient-to-br from-emerald-900/40 to-dark-light border border-emerald-500/20 rounded-xl p-6"
                    >
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Chi lo usa, e come</h3>
                        <div className="space-y-3">
                            {USE_CASES.map((uc) => (
                                <div key={uc.who} className="flex items-start gap-2 text-sm">
                                    <span className="text-primary font-bold mt-0.5">&rsaquo;</span>
                                    <p className="text-text-muted"><span className="text-white font-semibold">{uc.who}:</span> {uc.what}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.section>

                {/* ═══ PERCHE FLORENCEEGI ═══ */}
                <motion.section
                    className="mb-16 sm:mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    <motion.h2 variants={fadeUp} custom={0}
                        className="font-renaissance text-2xl sm:text-3xl font-bold mb-8"
                    >
                        Perche FlorenceEGI
                    </motion.h2>

                    <div className="space-y-4">
                        {DIFFERENTIATORS.map((d, i) => (
                            <motion.div
                                key={d.title}
                                variants={fadeUp}
                                custom={i + 1}
                                className="bg-dark-light border border-white/10 rounded-xl p-5 hover:border-primary/20 transition-colors"
                            >
                                <h3 className="font-bold text-base mb-2">{d.title}</h3>
                                <p className="text-sm text-text-muted leading-relaxed">{d.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* ═══ CTA ═══ */}
                <motion.section
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    <motion.div
                        variants={fadeUp}
                        custom={0}
                        className="bg-gradient-to-br from-emerald-900/60 to-dark-light border border-primary/30 rounded-2xl p-8 sm:p-12 text-center"
                    >
                        <h2 className="font-renaissance text-3xl sm:text-4xl font-bold mb-3">Parliamone.</h2>
                        <p className="text-text-muted text-sm sm:text-base mb-6 max-w-md mx-auto">
                            Cerchiamo partner, comuni, creator e imprese che vogliano certificare, proteggere e rigenerare.
                        </p>
                        <div className="space-y-2 text-sm">
                            <div><span className="text-white font-semibold">Fabio Cherici</span> — CEO &amp; Fondatore</div>
                            <div>
                                <a href="mailto:fabio@florenceegi.com" className="text-primary hover:underline">
                                    fabio@florenceegi.com
                                </a>
                            </div>
                            <div>
                                <a href="https://florenceegi.com" className="text-primary hover:underline">
                                    florenceegi.com
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* ═══ TECH STACK ═══ */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {['Algorand', 'ARC-72', 'Claude AI', 'pgvector RAG', 'Laravel', 'React', 'AWS', 'PostgreSQL'].map((t) => (
                        <span key={t} className="text-xs font-semibold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-text-muted">
                            {t}
                        </span>
                    ))}
                </div>

            </div>

            {/* ═══ FOOTER STANDARD ECOSISTEMA ═══ */}
            <lso-ecosystem current="hub" />
            <footer className="py-12 px-6 border-t border-white/10 bg-dark/80 backdrop-blur-sm">
                <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                    <div className="flex flex-col gap-2">
                        <span className="text-lg font-bold text-white tracking-tight">FlorenceEGI</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to="/privacy" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">
                            {content.footer.privacy}
                        </Link>
                        <Link to="/terms" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">
                            {content.footer.terms}
                        </Link>
                        <Link to="/cookies" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">
                            {content.footer.cookies}
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
