import { useSearchParams } from 'react-router-dom';
import { CommunityFeatures } from '../features/community';
import { useSiteTheme } from '../lib/context/SiteThemeContext';

/** Wires /community route: URL ?q= and site theme. */
export default function CommunityPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const { isDark } = useSiteTheme();

  return (
    <div className="min-h-screen w-full" style={{ minHeight: '100vh' }}>
      <CommunityFeatures
        siteTheme={isDark ? 'dark' : 'light'}
        initialSearchQuery={q}
      />
    </div>
  );
}
