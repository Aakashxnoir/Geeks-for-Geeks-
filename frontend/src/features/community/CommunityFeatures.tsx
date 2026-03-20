import { useState, useCallback, useEffect } from 'react';
import ParticipationTracker from './ParticipationTracker';
import Leaderboards from './Leaderboards';
import CommunityBlog from './CommunityBlog';
import MemberEngagement from './MemberEngagement';
import AnalyticsSummary from './AnalyticsSummary';
import SearchFilterBar from './SearchFilterBar';
import type { SearchCategory } from './SearchFilterBar';
import ActivityFeed from './ActivityFeed';
import GamificationSection from './GamificationSection';
import TopDepartmentHighlight from './TopDepartmentHighlight';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import DepartmentLeaderboard from './DepartmentLeaderboard';
import CertificateVerification from './CertificateVerification';
import MemberOfTheMonthCard from './MemberOfTheMonthCard';
import SmartParticipationInsights from './SmartParticipationInsights';
import ActivityHeatmap from './ActivityHeatmap';
import DigitalMemberIdCard from './DigitalMemberIdCard';
import EventRecommendations from './EventRecommendations';
import EventManagementSection from './EventManagementSection';
import CollapsibleSection from './CollapsibleSection';
import AnalyticsStrip from './AnalyticsStrip';
import { CommunityThemeProvider, useCommunityTheme } from './ThemeContext';
import { BarChart3 } from 'lucide-react';

/**
 * Self-contained Community Features module for
 * GeeksforGeeks Campus Club — Rajalakshmi Institute of Technology (RIT).
 * Dense, full-width layout with collapsible sections and no empty gaps.
 */
function CommunityFeaturesInner({ initialSearchQuery = '' }: { initialSearchQuery?: string }) {
  const [globalSearchQuery, setGlobalSearchQuery] = useState(initialSearchQuery);
  const [globalSearchCategory, setGlobalSearchCategory] = useState<SearchCategory>('all');
  const [analyticsExpanded, setAnalyticsExpanded] = useState(false);
  const { isDark } = useCommunityTheme();

  useEffect(() => {
    setGlobalSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const scrollToAnalytics = () => {
    setAnalyticsExpanded(true);
    requestAnimationFrame(() => {
      document.getElementById('analytics')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleGlobalSearch = useCallback((query: string, category: SearchCategory) => {
    setGlobalSearchQuery(query);
    setGlobalSearchCategory(category);
  }, []);

  const searchForStudents = globalSearchCategory === 'all' || globalSearchCategory === 'students' ? globalSearchQuery : '';
  const searchForPosts = globalSearchCategory === 'all' || globalSearchCategory === 'posts' ? globalSearchQuery : '';
  const searchForAchievements = globalSearchCategory === 'all' || globalSearchCategory === 'achievements' ? globalSearchQuery : '';

  return (
    <div
      className={[
        'gfg-community-module relative min-h-screen w-full',
        'bg-[#F9FAFB] dark:bg-[#09090b]',
        'text-[#1F2937] dark:text-[#FFFFFF]',
        isDark ? 'dark' : '',
      ].join(' ')}
    >
      <div className="gfg-shell gfg-grid">
        <header className="col-span-12 mb-2 sm:mb-4">
          <AnalyticsStrip onViewDetails={scrollToAnalytics} />
        </header>

        {globalSearchCategory === 'all' && (
          <div className="col-span-12 gfg-grid">
            {/* Main Content Area (8/12) */}
            <div className="col-span-12 lg:col-span-8 space-y-4">
              {/* Row 1: Top Department */}
              <TopDepartmentHighlight />
              
              {/* Row 2: Widgets Grid */}
              <div className="gfg-grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DepartmentLeaderboard />
                <CertificateVerification initialCertId={searchForAchievements} />
                <SmartParticipationInsights />
                <EventRecommendations />
              </div>

              {/* Row 3: Event Management */}
              <EventManagementSection />

              {/* Row 4: Heatmap & Tracker */}
              <div className="gfg-grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7">
                  <ActivityHeatmap />
                </div>
                <div className="lg:col-span-5">
                   <DigitalMemberIdCard />
                </div>
              </div>

              {/* Row 5: Participation Tracker */}
              <ParticipationTracker
                searchQuery={searchForStudents}
                onSearchQueryChange={(q) => {
                  setGlobalSearchQuery(q);
                  setGlobalSearchCategory('students');
                }}
              />
              
              {/* Row 6: Blog */}
              <CommunityBlog
                searchQuery={searchForPosts}
                onSearchQueryChange={(q) => {
                  setGlobalSearchQuery(q);
                  setGlobalSearchCategory('posts');
                }}
              />
            </div>

            {/* Sidebar Area (4/12) */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <MemberOfTheMonthCard />
              <ActivityFeed />
              <Leaderboards />
              <PersonalizedRecommendations />
              <GamificationSection searchQuery={searchForAchievements} />
              <MemberEngagement />
            </div>

            {/* Row 9: Full Analytics — collapsible */}
            <div className="col-span-12">
              <CollapsibleSection
                id="analytics"
                title="Community Analytics (detailed)"
                subtitle="Key metrics, growth, and participation overview — click any metric above to jump here"
                icon={<BarChart3 className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E]" />}
                defaultExpanded={false}
                expanded={analyticsExpanded}
                onExpandedChange={setAnalyticsExpanded}
              >
                <div className="p-3 sm:p-4">
                  <AnalyticsSummary />
                </div>
              </CollapsibleSection>
            </div>
          </div>
        )}

        {globalSearchCategory === 'students' && (
          <div className="col-span-12 gfg-grid">
            <div className="col-span-12 lg:col-span-8 space-y-4">
               <TopDepartmentHighlight />
               <ParticipationTracker
                searchQuery={searchForStudents}
                onSearchQueryChange={(q) => {
                  setGlobalSearchQuery(q);
                  setGlobalSearchCategory('students');
                }}
              />
              <Leaderboards />
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <MemberOfTheMonthCard />
              <ActivityFeed />
              <SmartParticipationInsights />
              <DigitalMemberIdCard />
            </div>
          </div>
        )}

        {globalSearchCategory === 'posts' && (
          <div className="col-span-12 gfg-grid">
            <div className="col-span-12 lg:col-span-8 space-y-4">
              <CommunityBlog
                searchQuery={searchForPosts}
                onSearchQueryChange={(q) => {
                  setGlobalSearchQuery(q);
                  setGlobalSearchCategory('posts');
                }}
              />
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <ActivityFeed />
              <PersonalizedRecommendations />
              <MemberEngagement />
            </div>
          </div>
        )}

        {globalSearchCategory === 'achievements' && (
          <div className="col-span-12 gfg-grid">
            <div className="col-span-12 lg:col-span-8 space-y-4">
               <GamificationSection searchQuery={searchForAchievements} />
               <CertificateVerification initialCertId={searchForAchievements} />
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <MemberOfTheMonthCard />
              <EventRecommendations />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface CommunityFeaturesProps {
  siteTheme?: 'light' | 'dark';
  /** Pre-fill search from navbar or URL ?q= */
  initialSearchQuery?: string;
}

export default function CommunityFeatures({ siteTheme, initialSearchQuery = '' }: CommunityFeaturesProps = {}) {
  return (
    <CommunityThemeProvider controlledTheme={siteTheme}>
      <CommunityFeaturesInner initialSearchQuery={initialSearchQuery} />
    </CommunityThemeProvider>
  );
}
