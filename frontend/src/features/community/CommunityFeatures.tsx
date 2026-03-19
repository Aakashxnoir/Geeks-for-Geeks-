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
          <>
            {/* Row 1: Top Department (wide) | Member of the Month */}
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 lg:col-span-8">
                <TopDepartmentHighlight />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <MemberOfTheMonthCard />
              </div>
            </div>

            {/* Row 1b: Live activity — full width */}
            <div className="col-span-12">
              <ActivityFeed />
            </div>

            {/* Row 2: 4-column widgets */}
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <DepartmentLeaderboard />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <CertificateVerification initialCertId={searchForAchievements} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <SmartParticipationInsights />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <EventRecommendations />
              </div>
            </div>

            {/* Row 3: Event Management — full width */}
            <div className="col-span-12">
              <EventManagementSection />
            </div>

            {/* Row 4: Activity Heatmap | Digital Member ID */}
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 lg:col-span-6">
                <ActivityHeatmap />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DigitalMemberIdCard />
              </div>
            </div>

            {/* Row 5: Participation Tracker — full width */}
            <div className="col-span-12">
              <ParticipationTracker
                searchQuery={searchForStudents}
                onSearchQueryChange={(q) => {
                  setGlobalSearchQuery(q);
                  setGlobalSearchCategory('students');
                }}
              />
            </div>

            {/* Row 6: Leaderboards — full width */}
            <div className="col-span-12">
              <Leaderboards />
            </div>

            {/* Row 7: Blog (2/3) + Sidebar (1/3) */}
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 lg:col-span-8">
                <CommunityBlog
                  searchQuery={searchForPosts}
                  onSearchQueryChange={(q) => {
                    setGlobalSearchQuery(q);
                    setGlobalSearchCategory('posts');
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-4 space-y-2 sm:space-y-3">
                <PersonalizedRecommendations />
              </div>
            </div>

            {/* Row 8: Gamification | Member Engagement */}
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 lg:col-span-6">
                <GamificationSection searchQuery={searchForAchievements} />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <MemberEngagement />
              </div>
            </div>

            {/* Row 9: Full Analytics — collapsible */}
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
          </>
        )}

        {globalSearchCategory === 'students' && (
          <>
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 lg:col-span-8">
                <TopDepartmentHighlight />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <MemberOfTheMonthCard />
              </div>
            </div>
            <div className="col-span-12">
              <ActivityFeed />
            </div>
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 lg:col-span-6">
                <DepartmentLeaderboard />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <SmartParticipationInsights />
              </div>
            </div>
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 lg:col-span-6">
                <ActivityHeatmap />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <DigitalMemberIdCard />
              </div>
            </div>
            <div className="col-span-12">
              <ParticipationTracker
                searchQuery={searchForStudents}
                onSearchQueryChange={(q) => {
                  setGlobalSearchQuery(q);
                  setGlobalSearchCategory('students');
                }}
              />
            </div>
            <div className="col-span-12">
              <Leaderboards />
            </div>
            <CollapsibleSection
              id="analytics"
              title="Community Analytics (detailed)"
              subtitle="Key metrics and participation overview"
              icon={<BarChart3 className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E]" />}
              defaultExpanded={false}
              expanded={analyticsExpanded}
              onExpandedChange={setAnalyticsExpanded}
            >
              <div className="p-3 sm:p-4">
                <AnalyticsSummary />
              </div>
            </CollapsibleSection>
          </>
        )}

        {globalSearchCategory === 'posts' && (
          <>
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 lg:col-span-8">
                <CommunityBlog
                  searchQuery={searchForPosts}
                  onSearchQueryChange={(q) => {
                    setGlobalSearchQuery(q);
                    setGlobalSearchCategory('posts');
                  }}
                />
              </div>
              <div className="col-span-12 lg:col-span-4 space-y-2 sm:space-y-3">
                <ActivityFeed />
                <PersonalizedRecommendations />
                <MemberEngagement />
              </div>
            </div>
          </>
        )}

        {globalSearchCategory === 'achievements' && (
          <>
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 lg:col-span-6">
                <MemberOfTheMonthCard />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <GamificationSection searchQuery={searchForAchievements} />
              </div>
            </div>
            <div className="col-span-12 gfg-grid">
              <div className="col-span-12 lg:col-span-6">
                <CertificateVerification initialCertId={searchForAchievements} />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <EventRecommendations />
              </div>
            </div>
          </>
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
