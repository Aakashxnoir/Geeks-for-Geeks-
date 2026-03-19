import { ReactNode } from 'react';
import { useSiteTheme } from '../../lib/context/SiteThemeContext';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  showAnalyticsStrip?: boolean;
  analyticsStrip?: ReactNode;
  children: ReactNode;
}

/**
 * Layout wrapper for site pages: consistent container and header (title + subtitle).
 * Search and dark mode live in the navbar only; no duplicate toggle or search here.
 */
export default function PageLayout({
  title,
  subtitle,
  showAnalyticsStrip,
  analyticsStrip,
  children,
}: PageLayoutProps) {
  const { isDark } = useSiteTheme();

  return (
    <div
      className={[
        'gfg-page-module relative min-h-screen w-full',
        isDark ? 'dark' : '',
      ].join(' ')}
    >
      <div className="gfg-shell space-y-4">
        <header className="glass-card flex flex-col gap-3 p-6 !rounded-b-none border-b-0 shadow-none w-full">
          <div className="min-w-0 w-full text-center md:text-left">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold break-words tracking-tight text-[color:var(--gfg-text-primary)] dark:text-white">
              <span className="text-[color:var(--gfg-accent)]">{title?.split(' ')[0]}</span>{' '}
              {title?.split(' ').slice(1).join(' ')}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-[color:var(--gfg-text-secondary)] dark:text-white/80 mt-1 break-words leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {showAnalyticsStrip && analyticsStrip}
        </header>

        {children}
      </div>
    </div>
  );
}
