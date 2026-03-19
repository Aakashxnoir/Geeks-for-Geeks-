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
        'bg-[#F9FAFB] dark:bg-[#000000]',
        'text-[#1F2937] dark:text-[#FFFFFF]',
        isDark ? 'dark' : '',
      ].join(' ')}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-2 sm:py-3 space-y-2 sm:space-y-3">
        {/* Top bar: title + search + analytics strip — single compact row on desktop */}
        <header className="flex flex-col gap-2 pt-8 sm:pt-10 md:pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1F2937] dark:text-[#FFFFFF] truncate">
                GeeksforGeeks Campus Club
              </h1>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#E5E7EB] truncate mt-0.5">
                Rajalakshmi Institute of Technology (RIT) — Community
              </p>
            </div>
            <div className="w-full sm:max-w-md lg:max-w-lg flex-shrink-0">
              <SearchFilterBar
                onSearch={handleGlobalSearch}
                activeCategory={globalSearchCategory}
                searchQuery={globalSearchQuery}
                onSearchQueryChange={setGlobalSearchQuery}
                placeholder="Search students, posts, achievements..."
              />
            </div>
          </div>
          {globalSearchCategory !== 'all' && (
            <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB]">
              Showing: <span className="font-medium text-[#1F2937] dark:text-[#FFFFFF] capitalize">{globalSearchCategory}</span>
            </p>
          )}
          <AnalyticsStrip onViewDetails={scrollToAnalytics} />
        </header>

        {globalSearchCategory === 'all' && (
          <>
            {/* Row 1: Top Department (wide) | Member of the Month | Live activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="min-w-0 lg:col-span-2">
                <TopDepartmentHighlight />
              </div>
              <div className="min-w-0">
                <MemberOfTheMonthCard />
              </div>
            </div>

            {/* Row 1b: Live activity full-width under hero row */}
            <div className="min-w-0">
                <ActivityFeed />
              </div>

            {/* Row 2: Department Leaderboard | Certificate Verification | Smart Insights | Event Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              <div className="min-w-0">
                <DepartmentLeaderboard />
              </div>
              <div className="min-w-0">
                <CertificateVerification initialCertId={searchForAchievements} />
              </div>
              <div className="min-w-0">
                <SmartParticipationInsights />
              </div>
              <div className="min-w-0">
                <EventRecommendations />
              </div>
            </div>

            {/* Row 3: Event Management — full width */}
            <div className="min-w-0">
              <EventManagementSection />
            </div>

            {/* Row 4: Activity Heatmap | Digital Member ID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="min-w-0">
                <ActivityHeatmap />
              </div>
              <div className="min-w-0">
                <DigitalMemberIdCard />
              </div>
            </div>

            {/* Row 5: Participation Tracker — full width */}
            <div className="min-w-0">
              <ParticipationTracker
                searchQuery={searchForStudents}
                onSearchQueryChange={(q) => {
                  setGlobalSearchQuery(q);
                  setGlobalSearchCategory('students');
                }}
              />
            </div>

            {/* Row 6: Leaderboards — full width */}
            <div className="min-w-0">
              <Leaderboards />
            </div>

            {/* Row 7: Blog (2/3) + Sidebar (1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3">
              <div className="lg:col-span-2 min-w-0">
                <CommunityBlog
                  searchQuery={searchForPosts}
                  onSearchQueryChange={(q) => {
                    setGlobalSearchQuery(q);
                    setGlobalSearchCategory('posts');
                  }}
                />
              </div>
              <div className="min-w-0 space-y-2 sm:space-y-3">
                <PersonalizedRecommendations />
              </div>
            </div>

            {/* Row 8: Gamification | Member Engagement */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
              <div className="min-w-0">
                <GamificationSection searchQuery={searchForAchievements} />
              </div>
              <div className="min-w-0">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="min-w-0 lg:col-span-2">
                <TopDepartmentHighlight />
              </div>
              <div className="min-w-0">
                <MemberOfTheMonthCard />
              </div>
            </div>
            <div className="min-w-0">
              <ActivityFeed />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="min-w-0">
                <DepartmentLeaderboard />
              </div>
              <div className="min-w-0">
                <SmartParticipationInsights />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
              <div className="min-w-0">
                <ActivityHeatmap />
              </div>
              <div className="min-w-0">
                <DigitalMemberIdCard />
              </div>
            </div>
            <div className="min-w-0">
              <ParticipationTracker
                searchQuery={searchForStudents}
                onSearchQueryChange={(q) => {
                  setGlobalSearchQuery(q);
                  setGlobalSearchCategory('students');
                }}
              />
            </div>
            <div className="min-w-0">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3">
              <div className="lg:col-span-2 min-w-0">
                <CommunityBlog
                  searchQuery={searchForPosts}
                  onSearchQueryChange={(q) => {
                    setGlobalSearchQuery(q);
                    setGlobalSearchCategory('posts');
                  }}
                />
              </div>
              <div className="min-w-0 space-y-2 sm:space-y-3">
                <ActivityFeed />
                <PersonalizedRecommendations />
                <MemberEngagement />
              </div>
            </div>
          </>
        )}

        {globalSearchCategory === 'achievements' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              <div className="min-w-0">
                <MemberOfTheMonthCard />
              </div>
              <div className="min-w-0">
                <GamificationSection searchQuery={searchForAchievements} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="min-w-0">
                <CertificateVerification initialCertId={searchForAchievements} />
              </div>
              <div className="min-w-0">
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
