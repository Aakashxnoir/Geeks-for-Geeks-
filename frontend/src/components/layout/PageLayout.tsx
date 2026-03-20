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
 * Layout wrapper for site pages: consistent container and header.
 * Dense, premium layout with Liquid Glass styling.
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
        'gfg-page-module relative min-h-screen w-full pt-4 pb-8',
        isDark ? 'dark' : '',
      ].join(' ')}
    >
      <div className="gfg-shell space-y-4 px-3 sm:px-4 lg:px-6">
        <header className="glass-panel py-5 px-5 sm:py-6 sm:px-6 w-full">
          <div className="min-w-0 w-full max-w-3xl">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[color:var(--gfg-text-primary)]">
              <span className="text-[color:var(--gfg-accent)]">{title?.split(' ')[0]}</span>{' '}
              {title?.split(' ').slice(1).join(' ')}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[color:var(--gfg-text-secondary)] mt-1.5 leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          {showAnalyticsStrip && analyticsStrip}
        </header>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
