/**
 * @package EGI-HUB-HOME — FooterSection
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.2.0 (FlorenceEGI — EGI-HUB-HOME)
 * @date 2026-03-31
 * @purpose Footer principale con link legali e sub-footer LSO Ecosystem — v1.2.0: LSO Web Component.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { homepageContent } from '../data/homepage';

// TypeScript declaration per Web Component LSO
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lso-ecosystem': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { current?: string };
    }
  }
}

export function FooterSection() {
    const { locale } = useI18n();
    const content = homepageContent[locale];

    const currentYear = new Date().getFullYear();

    return (
        <>
        {/* Script: <script src="/lso-ecosystem.js" defer> in index.html (dev locale) / florenceegi.com (prod) */}
        {/* LSO Ecosystem Web Component */}
        <lso-ecosystem current="hub" />
        <footer className="py-12 px-6 border-t border-[var(--border)] bg-[var(--surface2)]/30 backdrop-blur-sm">
            <div className="flex flex-col gap-8">
                {/* Brand & Copyright */}
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold text-[var(--text)] tracking-tight">FlorenceEGI</span>
                    <p className="text-xs text-[var(--muted)]">
                        © {currentYear} Florence Consulting Group. {content.footer.rights}
                    </p>
                </div>

                {/* Legal Links */}
                <div className="flex flex-col gap-3">
                    <Link to="/privacy" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                        {content.footer.privacy}
                    </Link>
                    <Link to="/terms" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                        {content.footer.terms}
                    </Link>
                    <Link to="/cookies" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                        {content.footer.cookies}
                    </Link>
                </div>
            </div>
        </footer>
        </>
    );
}
