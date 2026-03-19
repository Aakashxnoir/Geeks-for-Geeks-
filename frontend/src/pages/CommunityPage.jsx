import { useSearchParams } from 'react-router-dom';
import { CommunityFeatures } from '../components/community';
import { useSiteTheme } from '../context/SiteThemeContext';

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
