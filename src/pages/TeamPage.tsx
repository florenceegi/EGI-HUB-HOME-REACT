/**
 * @package src/pages
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - TeamPage)
 * @date 2026-02-25
 * @purpose Il collettivo che costruisce FlorenceEGI: Fabio (reale) + 5 entità
 *          rappresentate da avatar DiceBear Adventurer su seed unico per nome/genere.
 *          Stessa tecnica del modello User: seed = nome, hair = genere.
 */
import { SeoHead } from '@/components/common/SeoHead';
import { useI18n } from '@/i18n';
import { useUIStore } from '@/stores/useUIStore';
import { ArrowLeft, Linkedin, ExternalLink } from 'lucide-react';

/* ─── Tipi ────────────────────────────────────────────────────────── */
type Gender = 'male' | 'female';

interface TeamMember {
    seed: string;
    gender: Gender;
    nameKey: string;
    roleKey: string;
    bioKey: string;
    accent: string;
    isFounder?: boolean;
    /** se true l'avatar usa la foto reale (placeholder per ora) */
    realPhoto?: string;
    link?: string;
}

/* ─── Helpers DiceBear ────────────────────────────────────────────── */
const HAIR_MALE =
    'short01,short02,short03,short04,short05,short06,short07,' +
    'short08,short09,short10,short11,short12,short13,short14,' +
    'short15,short16,short17,short18,short19';

const HAIR_FEMALE =
    'long01,long02,long03,long04,long05,long06,long07,long08,' +
    'long09,long10,long11,long12,long13,long14,long15,long16,' +
    'long17,long18,long19,long20';

function dicebearUrl(seed: string, gender: Gender): string {
    const hairParam = `&hair=${gender === 'female' ? HAIR_FEMALE : HAIR_MALE}`;
    return (
        `https://api.dicebear.com/9.x/adventurer/png` +
        `?seed=${encodeURIComponent(seed)}` +
        `&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf` +
        `&size=400` +
        hairParam
    );
}

/* ─── Dati team ───────────────────────────────────────────────────── */
const team: TeamMember[] = [
    {
        seed: 'Fabio Cherici',
        gender: 'male',
        nameKey: 'team.fabio.name',
        roleKey: 'team.fabio.role',
        bioKey: 'team.fabio.bio',
        accent: 'text-[#C9A84C]',           // oro fiorentino — fondatore
        isFounder: true,
        link: 'https://www.linkedin.com/in/fabio-cherici/',
    },
    {
        seed: 'Natan',
        gender: 'male',
        nameKey: 'team.natan.name',
        roleKey: 'team.natan.role',
        bioKey: 'team.natan.bio',
        accent: 'text-primary',              // teal
    },
    {
        seed: 'Padmin',
        gender: 'female',
        nameKey: 'team.padmin.name',
        roleKey: 'team.padmin.role',
        bioKey: 'team.padmin.bio',
        accent: 'text-secondary',            // blue
    },
    {
        seed: 'Dhara',
        gender: 'female',
        nameKey: 'team.dhara.name',
        roleKey: 'team.dhara.role',
        bioKey: 'team.dhara.bio',
        accent: 'text-pink-400',
    },
    {
        seed: 'Clayton',
        gender: 'male',
        nameKey: 'team.clayton.name',
        roleKey: 'team.clayton.role',
        bioKey: 'team.clayton.bio',
        accent: 'text-emerald-400',
    },
    {
        seed: 'Valerie',
        gender: 'female',
        nameKey: 'team.valerie.name',
        roleKey: 'team.valerie.role',
        bioKey: 'team.valerie.bio',
        accent: 'text-violet-400',
    },
];

/* ─── Componente avatar ───────────────────────────────────────────── */
function Avatar({ member }: { member: TeamMember }) {
    const url = member.realPhoto ?? dicebearUrl(member.seed, member.gender);
    return (
        <div className="relative w-28 h-28 mx-auto mb-4">
            {/* cerchio glow accent */}
            <div
                className={`absolute inset-0 rounded-full blur-md opacity-30 scale-110 ${
                    member.isFounder ? 'bg-[#C9A84C]' : 'bg-primary'
                }`}
            />
            <img
                src={url}
                alt={member.seed}
                className="relative z-10 w-full h-full rounded-full object-cover border-2 border-white/10"
                loading="lazy"
            />
        </div>
    );
}

/* ─── Card membro ─────────────────────────────────────────────────── */
function MemberCard({ member }: { member: TeamMember }) {
    const { t } = useI18n();
    return (
        <article className="flex flex-col items-center text-center rounded-2xl bg-dark-light border border-white/10 p-6 hover:border-white/20 transition-colors">
            <Avatar member={member} />

            <h3 className={`text-lg font-bold mb-1 ${member.accent}`}>
                {t(member.nameKey)}
            </h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
                {t(member.roleKey)}
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
                {t(member.bioKey)}
            </p>

            {member.link && (
                <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn di ${t(member.nameKey)}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                    <Linkedin size={13} aria-hidden="true" />
                    <span>LinkedIn</span>
                    <ExternalLink size={11} aria-hidden="true" />
                </a>
            )}
        </article>
    );
}

/* ─── Pagina ──────────────────────────────────────────────────────── */
export function TeamPage() {
    const { t } = useI18n();
    const navigate = useUIStore((s) => s.navigate);

    return (
        <>
            <SeoHead
                title={t('team.page_title')}
                description={t('team.hero.subtitle')}
            />

            <div className="min-h-screen bg-dark text-white">

                {/* ── Hero ───────────────────────────────────────── */}
                <section className="relative overflow-hidden pt-20 pb-16 px-6">
                    {/* sfondo radiale */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background:
                                'radial-gradient(ellipse 80% 60% at 50% 0%, #C9A84C33 0%, transparent 70%)',
                        }}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-8 focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label={t('team.back')}
                        >
                            <ArrowLeft size={16} aria-hidden="true" />
                            {t('team.back')}
                        </button>

                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-4">
                            {t('team.hero.label')}
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            {t('team.hero.title')}
                        </h1>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                            {t('team.hero.subtitle')}
                        </p>
                    </div>
                </section>

                {/* ── Griglia team ───────────────────────────────── */}
                <section className="max-w-5xl mx-auto px-6 pb-16" aria-label={t('team.grid.aria')}>
                    {/* Fondatore — evidenziato */}
                    <div className="mb-10">
                        <div className="max-w-xs mx-auto">
                            <MemberCard member={team[0]} />
                        </div>
                    </div>

                    {/* Il collettivo — 5 membri su griglia */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {team.slice(1).map((m) => (
                            <MemberCard key={m.seed} member={m} />
                        ))}
                    </div>
                </section>

                {/* ── Nota "chi siamo" ───────────────────────────── */}
                <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
                    <div className="rounded-2xl bg-dark-light border border-white/10 p-8">
                        <p className="text-white/50 text-sm leading-relaxed italic">
                            {t('team.note')}
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
