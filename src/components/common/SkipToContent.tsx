/**
 * @package EGI-HUB-HOME-REACT — components/common
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-HUB-HOME-REACT)
 * @date 2026-04-21
 * @purpose Skip-link WCAG 2.1 AA: visibile solo su :focus, porta il focus a #main-content.
 */

import { useI18n } from '@/i18n';

export const SkipToContent = () => {
    const { t } = useI18n();
    return (
        <a href="#main-content" className="a11y-skip-link">
            {t('a11y.skip_to_content')}
        </a>
    );
};
