import { Link } from 'react-router-dom';
import { Home, FileQuestion } from 'lucide-react';
import { useSiteTheme } from '../lib/context/SiteThemeContext';

export default function NotFound() {
  const { isDark } = useSiteTheme();
  return (
    <div
      className={`gfg-page-module min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 text-center ${isDark ? 'dark' : ''}`}
    >
      <div className="max-w-md gfg-card">
        <FileQuestion className="w-16 h-16 mx-auto text-[#6B7280] dark:text-white/50 mb-4" aria-hidden />
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white mb-2 gfg-text-accent">
          Page not found
        </h1>
        <p className="text-sm text-[#4B5563] dark:text-white/80 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-[#2F8D46] dark:bg-[#22C55E] text-white hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" aria-hidden />
            Go to Home
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border border-white/20 dark:border-white/10 text-[color:var(--gfg-text-primary)] dark:text-white hover:bg-white/15 dark:hover:bg-white/10 backdrop-blur-sm transition-all"
          >
            View Events
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border border-white/20 dark:border-white/10 text-[color:var(--gfg-text-primary)] dark:text-white hover:bg-white/15 dark:hover:bg-white/10 backdrop-blur-sm transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

