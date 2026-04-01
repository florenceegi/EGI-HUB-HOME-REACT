/**
 * @package EGI-HUB-HOME — DesktopFooterSection
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.1.0 (FlorenceEGI — EGI-HUB-HOME)
 * @date 2026-04-01
 * @purpose Footer desktop con link legali e sub-footer LSO Ecosystem — v1.1.0: LSO Web Component.
 */
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { homepageContent } from '@/data/content/homepage';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lso-ecosystem': { current?: string; [key: string]: unknown };
    }
  }
}

export function DesktopFooterSection() {
    const { locale } = useI18n();
    const content = homepageContent[locale];


    return (
        <>
        {/* Script: <script src="/lso-ecosystem.js" defer> in index.html */}
        {/* LSO Ecosystem Web Component */}
        <lso-ecosystem current="hub" />
        <footer className="py-12 px-6 border-t border-[var(--border)] bg-[var(--surface2)]/30 backdrop-blur-sm mt-auto">
            <div className="flex flex-col gap-8">
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
        </>
    );
}
