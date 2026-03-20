import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteTheme } from '../lib/context/SiteThemeContext';
import {
  Users,
  Calendar,
  Wrench,
  Code2,
  Award,
  BookOpen,
  ChevronRight,
  Mail,
  LayoutDashboard,
} from 'lucide-react';
import {
  HERO,
  ABOUT_SNAPSHOT,
  STATS,
  WHY_JOIN,
  CTA_BANNER,
  CONTACT_PREVIEW,
  HERO_MOVING_TITLES,
  HERO_FEATURE_CARDS,
} from '../utils/data/homePageData';
import {
  CommunityThemeProvider,
  DigitalMemberIdCard,
  SmartParticipationInsights,
  ActivityHeatmap,
  PersonalizedRecommendations,
  ParticipationTracker,
  AnalyticsSummary,
} from '../features/community';
import { BarChart3 } from 'lucide-react';
import { useCardDetail } from '../lib/context/CardDetailContext';

const statIcons: Record<string, React.ElementType> = {
  members: Users,
  events: Calendar,
  workshops: Wrench,
  problems: Code2,
  contributors: Award,
};

function getResourcePreviewIcon(category: string, type: string) {
  if (type === 'Course') return BookOpen;

  switch (category) {
    case 'DSA':
      return Code2;
    case 'Programming Languages':
      return Code2;
    case 'Interview Preparation':
      return Award;
    case 'Web Development':
      return Wrench;
    case 'Competitive Programming':
      return Code2;
    case 'AI/ML':
      return Award;
    case 'Careers':
      return Award;
    default:
      return Code2;
  }
}

function HomeInner() {
  const { isDark } = useSiteTheme();
  const { showDetails } = useCardDetail();
  const [upcomingPreview, setUpcomingPreview] = useState<Array<any>>([]);
  const [resourcesPreview, setResourcesPreview] = useState<Array<any>>([]);

  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [eventsRes, resourcesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/events/upcoming`),
          fetch(`${API_BASE_URL}/api/resources`),
        ]);

        const eventsData = await eventsRes.json();
        const resourcesData = await resourcesRes.json();

        if (cancelled) return;
        setUpcomingPreview(Array.isArray(eventsData?.events) ? eventsData.events.slice(0, 3) : []);
        setResourcesPreview(Array.isArray(resourcesData?.resources) ? resourcesData.resources.slice(0, 4) : []);
      } catch {
        if (cancelled) return;
        setUpcomingPreview([]);
        setResourcesPreview([]);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [API_BASE_URL]);

  const handleFeatureClick = (_card: typeof HERO_FEATURE_CARDS[0]) => {
    // Info integrated directly into cards — no popup
  };

  const handleStatClick = (_stat: typeof STATS[0]) => {
    // Info displayed directly in stat card — no popup
  };

  return (
    <div
      className={[
        'gfg-page-module min-h-screen w-full',
        isDark ? 'dark' : '',
      ].join(' ')}
    >
      <div className="gfg-shell gfg-grid">

        {/* ─── 1. HERO ──────────────────────────────── */}
        <section
          className={`col-span-12 relative rounded-2xl overflow-hidden px-6 sm:px-10 py-8 sm:py-12 shadow-lg gfg-hero-section ${isDark ? 'bg-gradient-to-br from-[#14532d] via-[#0f2d1a] to-[#09090b] border border-[#27272a]' : 'bg-gradient-to-br from-[#2F8D46] to-[#14532d]'}`}
          aria-labelledby="hero-heading"
        >
          <h1
            id="hero-heading"
            className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-extrabold tracking-tight !text-white mb-1"
          >
            {HERO.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg !text-white font-medium mb-4 !opacity-100">
            {HERO.subtitle}
          </p>
          <p className="text-xs sm:text-sm md:text-base !text-white max-w-2xl mb-6 !opacity-90">
            {HERO.tagline}
          </p>

          {upcomingPreview.length > 0 && (
            <p className="text-xs sm:text-sm !text-white mb-4">
              <span className="font-bold !text-white">Next:</span>
              <span className="!text-white !opacity-90">
                {' '}
                {upcomingPreview[0].title} — {upcomingPreview[0].date}
              </span>
            </p>
          )}

          <div className="overflow-hidden rounded-xl bg-black/20 dark:bg-black/30 py-3 px-2 border border-white/10">
            <div className="gfg-hero-moving-strip">
              {[...HERO_MOVING_TITLES, ...HERO_MOVING_TITLES].map((label, i) => (
                <span
                  key={i}
                  className="shrink-0 px-4 py-2 rounded-lg bg-white/15 dark:bg-white/10 !text-white font-semibold text-xs sm:text-sm border border-white/20"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT WE DO ──────────────────────────── */}
        <section
          className="col-span-12 glass-panel p-5 sm:p-6"
          aria-labelledby="what-we-do-heading"
        >
          <h2 id="what-we-do-heading" className="text-base sm:text-lg md:text-xl font-bold text-[#111827] dark:text-white mb-2">
            What we do
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] dark:text-white/90 mb-6 max-w-2xl">
            {ABOUT_SNAPSHOT.what}
          </p>
          <div className="gfg-grid">
            {HERO_FEATURE_CARDS.map((card) => (
              <div
                key={card.title}
                onClick={() => handleFeatureClick(card)}
                className="col-span-12 sm:col-span-6 lg:col-span-3 glass-card group p-5 cursor-pointer hover:ring-2 hover:ring-[color:var(--gfg-accent)] active:scale-[0.98] transition-all"
              >
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#020617] dark:text-white group-hover:text-[#22C55E] transition-colors pointer-events-none">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#111827] dark:text-white/85 mt-2 max-w-xs pointer-events-none">
                  {card.short}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 3. STATS ──────────────────────────── */}
        <section aria-labelledby="stats-heading" className="col-span-12 gfg-grid">
          <h2 id="stats-heading" className="sr-only">Key statistics</h2>
          {STATS.map((stat) => {
            const Icon = statIcons[stat.icon] || Award;
            return (
              <div
                key={stat.label}
                onClick={() => handleStatClick(stat)}
                className="col-span-12 sm:col-span-6 lg:col-span-2 glass-card flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:shadow-lg hover:shadow-[color:var(--gfg-accent)]/5 active:scale-[0.98] transition-all"
              >
                <span className="text-[#2F8D46] dark:text-[#22C55E] mb-2 pointer-events-none">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" aria-hidden />
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#111827] dark:text-white pointer-events-none">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-[#4B5563] dark:text-white/70 mt-1 font-medium pointer-events-none">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </section>

        {/* ─── 4. UPCOMING EVENTS PREVIEW ──────────────────────────── */}
        {upcomingPreview.length > 0 && (
          <section className="col-span-12 glass-panel p-5 sm:p-6" aria-labelledby="events-preview-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="events-preview-heading" className="text-base sm:text-lg md:text-xl font-bold text-[#111827] dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#2F8D46] dark:text-[#22C55E]" aria-hidden />
                Upcoming Events
              </h2>
              <Link to="/events" className="text-xs sm:text-sm font-semibold text-[#2F8D46] dark:text-[#22C55E] hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="gfg-grid">
              {upcomingPreview.map((ev) => (
                <div key={ev.id} className="col-span-12 sm:col-span-6 lg:col-span-4 glass-card p-5 group">
                  <span className="inline-block text-xs font-semibold text-[#2F8D46] dark:text-[#22C55E] bg-[#f0fdf4] dark:bg-[rgba(34,197,94,0.12)] px-2.5 py-1 rounded-full mb-3">
                    {ev.type}
                  </span>
                  <h3 className="font-bold text-[#111827] dark:text-white text-xs sm:text-sm md:text-base group-hover:text-[#22C55E] transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] dark:text-white/70 mt-1">{ev.date} · {ev.venue}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── 5. RESOURCES PREVIEW ──────────────────────────── */}
        {resourcesPreview.length > 0 && (
          <section className="col-span-12 glass-panel p-5 sm:p-6" aria-labelledby="resources-preview-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="resources-preview-heading" className="text-base sm:text-lg md:text-xl font-bold text-[#111827] dark:text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E]" aria-hidden />
                Resources
              </h2>
              <Link to="/resources" className="text-xs sm:text-sm font-semibold text-[#2F8D46] dark:text-[#22C55E] hover:underline flex items-center gap-1">
                See all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="gfg-grid">
              {resourcesPreview.map((res) => {
                const Icon = getResourcePreviewIcon(res.category, res.type);
                return (
                  <div key={res.title} className="col-span-12 sm:col-span-6 lg:col-span-3 glass-card p-5 group">
                    <div className="flex items-center gap-2 mb-2 pointer-events-none">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--gfg-accent)]/10 border border-[color:var(--gfg-accent)]/20">
                        <Icon className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" aria-hidden />
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#2F8D46] dark:text-[#22C55E]">
                        {res.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#111827] dark:text-white text-xs sm:text-sm group-hover:text-[#22C55E] transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs text-[#4B5563] dark:text-white/70 mt-1 line-clamp-2">{res.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── 6. WHY JOIN ──────────────────────────── */}
        {WHY_JOIN && WHY_JOIN.length > 0 && (
          <section className="col-span-12 glass-panel p-5 sm:p-6" aria-labelledby="why-join-heading">
            <h2 id="why-join-heading" className="text-base sm:text-lg md:text-xl font-bold text-[#111827] dark:text-white mb-4">
              Why join GFG @ RIT?
            </h2>
            <div className="gfg-grid">
              {WHY_JOIN.map((item) => (
                <div key={item.title} className="col-span-12 sm:col-span-6 lg:col-span-4 glass-card p-5 group">
                  <h3 className="font-bold text-[#020617] dark:text-white text-xs sm:text-sm md:text-base group-hover:text-[#22C55E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-[#4B5563] dark:text-white/80 mt-2 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════
            DASHBOARD SECTION — Personal tracking & analytics
            ═══════════════════════════════════════════════════ */}
        <div className="col-span-12">
          <div className="flex items-center gap-3 mb-4 mt-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2F8D46] to-[#14532d] flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white">My Dashboard</h2>
              <p className="text-sm text-[#4B5563] dark:text-white/70">Track your progress, certificates, and activity</p>
            </div>
          </div>
        </div>

        {/* Row D1: Member ID + Insights */}
        <div className="col-span-12 lg:col-span-6">
          <DigitalMemberIdCard />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-[var(--gfg-grid-gap)]">
          <SmartParticipationInsights />
          <PersonalizedRecommendations />
        </div>

        {/* Row D2: Activity Heatmap */}
        <div className="col-span-12">
          <ActivityHeatmap />
        </div>

        {/* Row D3: Participation Tracker */}
        <div className="col-span-12">
          <ParticipationTracker searchQuery="" onSearchQueryChange={() => {}} />
        </div>

        {/* Row D4: Platform Analytics */}
        <div className="col-span-12 glass-card shadow-lg z-10">
          <div className="px-6 py-5 border-b border-[#e4e4e7] dark:border-[#3d4a5c] bg-white/40 dark:bg-white/5 flex items-center gap-3 rounded-t-[var(--gfg-radius-lg)]">
            <BarChart3 className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E]" />
            <div>
              <h2 className="text-lg font-bold text-[#09090b] dark:text-white">Platform Overview</h2>
              <p className="text-sm text-[#71717a] dark:text-[#a1a1aa] mt-0.5 font-medium">
                Key metrics and platform growth
              </p>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <AnalyticsSummary />
          </div>
        </div>

        {/* ─── FINAL CTA ──────────────────────────── */}
        <section
          className={`col-span-12 rounded-2xl overflow-hidden px-6 sm:px-10 pt-6 sm:pt-8 pb-8 sm:pb-10 text-left shadow-xl ${isDark ? 'bg-gradient-to-br from-[#0f2d1a] via-[#14532d] to-[#09090b] border border-[#27272a]' : 'bg-gradient-to-br from-[#14532d] to-[#0f2d1a]'}`}
          aria-labelledby="cta-section-heading"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-white/25">
            <div>
              <h2 id="contact-preview-heading" className="text-base sm:text-lg font-bold !text-white">
                Get in touch
              </h2>
              <p className="text-sm !text-white !opacity-100 mt-0.5">
                {CONTACT_PREVIEW.tagline}
              </p>
              <a
                href={`mailto:${CONTACT_PREVIEW.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium !text-[#A7F3D0] hover:!text-white hover:underline mt-2"
              >
                <Mail className="w-4 h-4" />
                {CONTACT_PREVIEW.email}
              </a>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium bg-white/20 hover:bg-white/30 !text-white border border-white/40 hover:border-white/60 transition-colors"
            >
              Contact page
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-sm font-medium !text-white mb-1">
            {HERO.subtitle}
          </p>
          <h2 id="cta-section-heading" className="text-2xl sm:text-3xl font-bold tracking-tight !text-white">
            {HERO.title}
          </h2>
          <p className="text-lg sm:text-xl !text-white mt-1">{HERO.tagline}</p>
          <p className="text-sm sm:text-base !text-white mt-4 max-w-2xl leading-relaxed !opacity-90">
            {HERO.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
            <Link to="/community" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-white/20 hover:bg-white/30 !text-white border border-white/40 transition-colors">
              Explore Community <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/events" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-[#22C55E] hover:bg-[#16A34A] !text-white transition-colors">
              View Events
            </Link>
            <Link to="/join" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-white/20 hover:bg-white/30 !text-white border border-white/40 transition-colors">
              Join Us
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

export default function Home() {
  const { isDark } = useSiteTheme();

  return (
    <CommunityThemeProvider controlledTheme={isDark ? 'dark' : 'light'}>
      <HomeInner />
    </CommunityThemeProvider>
  );
}
