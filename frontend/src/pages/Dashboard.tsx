import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSiteTheme } from '../lib/context/SiteThemeContext';
import { 
  CommunityThemeProvider, 
  DigitalMemberIdCard,
  SmartParticipationInsights,
  ActivityHeatmap,
  CertificateVerification,
  PersonalizedRecommendations,
  ParticipationTracker,
  AnalyticsSummary 
} from '../features/community';
import { BarChart3 } from 'lucide-react';

function DashboardInner() {
  return (
      <div className="gfg-shell gfg-grid">
        <header className="col-span-12 glass-card p-6 !rounded-b-none border-b-0 shadow-none">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white">My Dashboard</h1>
          <p className="text-sm text-[#4B5563] dark:text-white/80 mt-1">
            Track your progress, manage certificates, and get personalized recommendations.
          </p>
        </header>

        {/* Row 1: ID Card & Smart Insights */}
        <div className="col-span-12 lg:col-span-6">
          <DigitalMemberIdCard />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-[var(--gfg-grid-gap)]">
          <SmartParticipationInsights />
          <PersonalizedRecommendations />
        </div>

        {/* Row 2: Heatmap */}
        <div className="col-span-12">
          <ActivityHeatmap />
        </div>

        {/* Row 3: Participation Tracker details */}
        <div className="col-span-12">
            <ParticipationTracker searchQuery="" onSearchQueryChange={() => {}} />
        </div>

        {/* Row 4: Certificates & Admin Stats */}
        <div className="col-span-12 lg:col-span-6">
          <CertificateVerification />
        </div>

        <div className="col-span-12 lg:col-span-6 glass-card shadow-lg z-10 w-full">
          <div className="px-6 py-5 border-b border-[#e4e4e7] dark:border-[#3d4a5c] bg-white/40 dark:bg-white/5 flex items-center gap-3">
             <BarChart3 className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E]" />
             <div>
               <h2 className="text-lg font-bold text-[#09090b] dark:text-white">Platform Overview (Admin)</h2>
               <p className="text-sm text-[#71717a] dark:text-[#a1a1aa] mt-0.5 font-medium">
                 Key metrics and platform growth overview
               </p>
             </div>
          </div>
          <div className="p-4 sm:p-6">
            <AnalyticsSummary />
          </div>
        </div>
      </div>
  );
}

export default function Dashboard() {
  const { isDark } = useSiteTheme();
  
  return (
    <CommunityThemeProvider controlledTheme={isDark ? 'dark' : 'light'}>
      <DashboardInner />
    </CommunityThemeProvider>
  );
}
