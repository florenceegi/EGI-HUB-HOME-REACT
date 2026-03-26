import { Brain, Globe, Info, Home, Fingerprint, ShoppingBag } from 'lucide-react';
import { useUIStore } from '@/stores/useUIStore';
import { useI18n } from '@/i18n';
import config from '@/utils/config';

// Online app URLs from config
const APPS = {
    HUB: config.hubUrl,
    EGI: config.florenceUrl,
    NATAN: config.natanUrl,
    INFO: config.infoUrl,
};

export const Sidebar = () => {
    const navigate = useUIStore((state) => state.navigate);
    const currentPath = useUIStore((state) => state.currentPath);
    const { t } = useI18n();

    const isActive = (path: string) => currentPath === path;

    return (
        <div className="fixed left-0 top-0 bottom-0 w-20 glass-dark border-r border-light hidden md:flex flex-col items-center pt-8 gap-4 z-20">
            {/* Navigation Buttons */}
            <NavButton
                icon={<Home />}
                label={t('nav.hub.label')}
                onClick={() => navigate('/')}
                active={isActive('/')}
                title={t('nav.hub.title')}
            />
            {/* PROJECTS Button (Internal) */}
            <NavButton
                icon={<Brain />}
                label={t('nav.projects.label')}
                onClick={() => navigate('/projects')}
                active={isActive('/projects')}
                title={t('nav.projects.title')}
            />
            {/* Sigillo */}
            <NavButton
                icon={<Fingerprint />}
                label="Sigillo"
                onClick={() => navigate('/sigillo')}
                active={isActive('/sigillo')}
                title="Sigillo — Certifica su Blockchain"
                badge="FREE"
            />
            {/* Admin — Feature Purchases */}
            <NavButton
                icon={<ShoppingBag />}
                label="Acquisti"
                onClick={() => navigate('/admin/feature-purchases')}
                active={isActive('/admin/feature-purchases')}
                title="Admin — Acquisti Feature"
            />
            {/* External Apps */}
            <NavButton
                icon={<Globe />}
                label={t('nav.egi.label')}
                href={APPS.EGI}
                title={t('nav.egi.title')}
            />
            <NavButton
                icon={<Brain />}
                label={t('nav.natan.label')}
                href={APPS.NATAN}
                title={t('nav.natan.title')}
            />
            <NavButton
                icon={<Info />}
                label={t('nav.info.label')}
                href={APPS.INFO}
                title={t('nav.info.title')}
            />
        </div>
    );
};

interface NavButtonProps {
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
    title?: string;
    badge?: string;
}

const NavButton = ({ icon, label, href, onClick, active, title, badge }: NavButtonProps) => {
    const handleClick = () => {
        console.log(`[Sidebar] Clicked ${label}`, { href, hasOnClick: !!onClick });
        if (onClick) {
            onClick();
        } else if (href) {
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`
        w-full h-[60px] flex flex-col items-center justify-center gap-1
        transition-all duration-200 border-l-[3px] border-transparent
        ${active
                    ? 'text-white bg-white/5 border-l-primary'
                    : 'text-text-muted hover:text-white hover:bg-white/5 hover:border-l-primary'
                }
        ${href || onClick ? 'cursor-pointer hover:scale-105' : 'cursor-default opacity-50'}
      `}
            title={title || (href ? `Apri ${label}` : label)}
            disabled={!href && !onClick}
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
        >
            <div className="relative w-5 h-5">
                {icon}
                {badge && (
                    <span className="absolute -top-1.5 -right-2.5 text-[7px] font-bold px-0.5 rounded bg-[var(--accent)] text-white leading-tight">
                        {badge}
                    </span>
                )}
            </div>
            <span className="text-[9px] tracking-wider uppercase">{label}</span>
        </button>
    );
};
