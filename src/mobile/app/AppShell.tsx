import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { translations } from '@/i18n/translations';
import { FlorenceEgiLogo } from '@/components/ui/FlorenceEgiLogo';
import { HomeAtmosphere } from '../components/HomeAtmosphere';
import { EcosystemBackButton } from '../components/EcosystemBackButton';

export function AppShell({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { locale, setLocale } = useI18n();
    const t = translations[locale];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Layout B Header Styles
    // Sticky, simple blur, transition on scroll
    // Scrolled: slightly more opaque white background
    const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/70 backdrop-blur-md border-b border-[var(--border)] shadow-sm'
        : 'bg-transparent backdrop-blur-[2px]'
        }`;

    return (
        <HomeAtmosphere>
            <div className={`min-h-screen text-[var(--text)] font-sans antialiased selection:bg-[var(--accent)] selection:text-white`}>
                <header className={headerClasses}>
                    <div className="px-6 h-20 pt-4 flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="relative z-50 flex items-center gap-2 group">
                            <FlorenceEgiLogo className="h-10 w-10 text-emerald-500 group-hover:scale-105 transition-transform" />
                            <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-gray-400 to-emerald-500 bg-clip-text text-transparent">
                                Florence EGI
                            </span>
                        </Link>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {/* Back to ecosystem (visibile solo con ?ref=) */}
                            <EcosystemBackButton />
                            {/* Lang Switcher (Mini) */}
                            <button
                                onClick={() => {
                                    const locales: import('@/i18n/translations').SupportedLocale[] = ['it', 'en', 'de', 'fr', 'es', 'pt'];
                                    const currentIndex = locales.indexOf(locale);
                                    const nextIndex = (currentIndex + 1) % locales.length;
                                    setLocale(locales[nextIndex]);
                                }}
                                className="text-xs font-medium uppercase tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors w-6 text-center"
                            >
                                {locale}
                            </button>

                            {/* Menu Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="relative z-50 p-2 -mr-2 text-[var(--text)] hover:bg-[var(--border)] rounded-full transition-colors"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="relative pt-[120px] pb-24">
                    {children}
                </main>

                {/* Drawer Menu — bg via inline style: Tailwind opacity modifier /N non funziona
                     con CSS vars hex, il colore diventava trasparente lasciando vedere il dark bg */}
                <div
                    className={`fixed inset-0 z-40 transition-transform duration-500 ease-spring ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    style={{ backgroundColor: 'var(--bg)' }}
                >
                    <div className="h-full flex flex-col p-8 pt-44">
                        <nav className="flex flex-col gap-6">

                            <Link
                                to="/what-is"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-3xl font-medium tracking-tight text-[var(--text)]"
                            >
                                {t['nav.whatIsEgi']}
                            </Link>
                            <Link
                                to="/how-it-works"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-3xl font-medium tracking-tight text-[var(--text)]"
                            >
                                {t['nav.howItWorks']}
                            </Link>
                            <Link
                                to="/team"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-3xl font-medium tracking-tight text-[var(--text)]"
                            >
                                {t['nav.team'] ?? 'Team'}
                            </Link>
                            <Link
                                to="/ecosystem"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-3xl font-medium tracking-tight text-[var(--text)] hover:opacity-80 transition-opacity"
                            >
                                {t['nav.ecosystem']}
                            </Link>
                            {/* Azienda Section */}
                            <div className="flex flex-col gap-3">
                                <span className="text-2xl font-bold tracking-tight text-[var(--muted)] uppercase opacity-90 mb-2 mt-4 block">
                                    {t['nav.corporate']}
                                </span>
                                <div className="flex flex-col gap-4 pl-0">
                                    <Link
                                        to="/corporate"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-2xl font-medium tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        {t['nav.mission_vision']}
                                    </Link>
                                    <Link
                                        to="/corporate"
                                        onClick={() => setIsMenuOpen(false)}

                                        className="text-2xl font-medium tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        {t['nav.about']}
                                    </Link>
                                    <Link
                                        to="/corporate"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-2xl font-medium tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        {t['nav.governance']}
                                    </Link>
                                    <Link
                                        to="/corporate"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-2xl font-medium tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        {t['nav.contacts']}
                                    </Link>
                                </div>
                            </div>
                        </nav>

                        <div className="mt-auto pt-8 border-t border-[var(--border)]">
                            <p className="text-sm text-[var(--muted)]">FlorenceEGI © 2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeAtmosphere>
    );
}
