import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import BadgeSlider from './BadgeSlider';
import { BarChart3, Trophy, Users, Home, Activity, BookOpen, Rocket, Sparkles, Layout, Medal } from 'lucide-react';

function SectionHeader({ id, title, icon, subtitle }: { id: string, title: string, icon: React.ReactNode, subtitle?: string }) {
  return (
    <div id={id} className="mb-6 pt-8 scroll-mt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-[#1c212e] border border-gray-200 dark:border-[#3d4a5c] shadow-sm text-[#2F8D46] dark:text-[#22C55E]">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{subtitle}</p>}
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-[#2F8D46]/30 via-transparent to-transparent mt-2 rounded-full" />
    </div>
  );
}

function NavSidebar() {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" />, href: null },
    { id: 'leaderboards', label: 'Leaderboards', icon: <Trophy className="w-5 h-5" />, href: null },
    { id: 'members', label: 'Members', icon: <Users className="w-5 h-5" />, href: null },
    { id: 'learning', label: 'Events & Learning', icon: <BookOpen className="w-5 h-5" />, href: null },
    { id: 'activity', label: 'Activity Feed', icon: <Activity className="w-5 h-5" />, href: null },
    { id: 'gamification', label: 'Progress & Rewards', icon: <Rocket className="w-5 h-5" />, href: null },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, href: null },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="sticky top-20 h-[calc(100vh-6rem)] py-6 flex flex-col gap-2">
      <div className="mb-4 px-3">
        <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Navigation</h3>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 
                     text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-[#1c212e] hover:text-[#2F8D46] dark:hover:text-[#22C55E] 
                     hover:shadow-md border border-transparent hover:border-gray-100 dark:hover:border-[#3d4a5c] group"
          >
            <span className="text-gray-400 group-hover:text-[#2F8D46] dark:group-hover:text-[#22C55E] transition-colors">{item.icon}</span>
            {item.label}
          </button>
        ))}
        {/* Badges — navigates to /badges page */}
        <Link
          to="/badges"
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200
                   text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10
                   hover:bg-amber-100 dark:hover:bg-amber-900/20 border border-amber-200/60 dark:border-amber-400/20
                   hover:border-amber-400/50 group"
        >
          <span className="group-hover:scale-110 transition-transform"><Medal className="w-5 h-5" /></span>
          Badges
        </Link>
      </nav>
      
      <div className="mt-auto px-4 py-6 rounded-2xl bg-gradient-to-br from-[#2F8D46]/5 to-[#2F8D46]/10 border border-[#2F8D46]/10">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#2F8D46]" />
          <span className="text-xs font-bold text-[#2F8D46] uppercase">Tips</span>
        </div>
        <p className="text-[11px] leading-relaxed text-[#2F8D46]/80 font-medium">
          Check the Leaderboards to see the top performing departments this month!
        </p>
      </div>
    </aside>
  );
}

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
            <div className="hidden lg:block lg:col-span-2">
              <NavSidebar />
            </div>

            <div className="col-span-12 lg:col-span-10 space-y-12 w-full">
              {/* SECTION: OVERVIEW */}
              <section id="overview" className="scroll-mt-20">
                <SectionHeader 
                  id="overview-header" 
                  title="Dashboard Overview" 
                  icon={<Layout className="w-5 h-5" />} 
                  subtitle="Your pulse on the campus community"
                />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-12">
                    <TopDepartmentHighlight />
                  </div>
                  <div className="md:col-span-12">
                    <BadgeSlider />
                  </div>
                  <div className="md:col-span-8">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SmartParticipationInsights />
                        <EventRecommendations />
                     </div>
                  </div>
                  <div className="md:col-span-4">
                    <DigitalMemberIdCard />
                  </div>
                </div>
              </section>

              {/* SECTION: LEADERBOARDS */}
              <section id="leaderboards" className="scroll-mt-20">
                <SectionHeader 
                  id="leaderboards-header" 
                  title="Campus Leaderboards" 
                  icon={<Trophy className="w-5 h-5" />} 
                  subtitle="Competitive spirit of RIT Departments"
                />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8">
                    <DepartmentLeaderboard />
                  </div>
                  <div className="lg:col-span-4">
                    <Leaderboards />
                  </div>
                </div>
              </section>

              {/* SECTION: MEMBERS */}
              <section id="members" className="scroll-mt-20">
                <SectionHeader 
                  id="members-header" 
                  title="Member Directory" 
                  icon={<Users className="w-5 h-5" />} 
                  subtitle="Meet our diverse community of geeks"
                />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8">
                    <ParticipationTracker
                      searchQuery={searchForStudents}
                      onSearchQueryChange={(q) => {
                        setGlobalSearchQuery(q);
                        setGlobalSearchCategory('students');
                      }}
                    />
                  </div>
                  <div className="lg:col-span-4 space-y-4">
                    <MemberOfTheMonthCard />
                    <MemberEngagement />
                  </div>
                </div>
              </section>

              {/* SECTION: LEARNING */}
              <section id="learning" className="scroll-mt-20">
                <SectionHeader 
                  id="learning-header" 
                  title="Events & Knowledge" 
                  icon={<BookOpen className="w-5 h-5" />} 
                  subtitle="Upcoming workshops, hackathons and verified skills"
                />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8">
                    <EventManagementSection />
                  </div>
                  <div className="lg:col-span-4">
                    <CertificateVerification initialCertId={searchForAchievements} />
                  </div>
                </div>
              </section>

              {/* SECTION: ACTIVITY */}
              <section id="activity" className="scroll-mt-20">
                <SectionHeader 
                  id="activity-header" 
                  title="Activity Feed" 
                  icon={<Activity className="w-5 h-5" />} 
                  subtitle="What's happening in the community right now"
                />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8">
                    <CommunityBlog
                      searchQuery={searchForPosts}
                      onSearchQueryChange={(q) => {
                        setGlobalSearchQuery(q);
                        setGlobalSearchCategory('posts');
                      }}
                    />
                  </div>
                  <div className="lg:col-span-4 space-y-4">
                     <ActivityFeed />
                     <ActivityHeatmap />
                  </div>
                </div>
              </section>

              {/* SECTION: GAMIFICATION */}
              <section id="gamification" className="scroll-mt-20">
                <SectionHeader 
                  id="gamification-header" 
                  title="Progress & Rewards" 
                  icon={<Rocket className="w-5 h-5" />} 
                  subtitle="Unlock achievements and claim your rewards"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GamificationSection searchQuery={searchForAchievements} />
                  <PersonalizedRecommendations />
                </div>
              </section>

              {/* SECTION: ANALYTICS */}
              <section id="analytics" className="scroll-mt-20">
                <CollapsibleSection
                  id="analytics-section"
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
              </section>
            </div>
          </>
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
