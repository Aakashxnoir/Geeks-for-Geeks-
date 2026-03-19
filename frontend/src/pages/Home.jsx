import { Link } from 'react-router-dom';
import { useSiteTheme } from '../context/SiteThemeContext';
import {
  Users,
  Calendar,
  Wrench,
  Code2,
  Award,
  Trophy,
  ChevronRight,
  Mail,
  Sparkles,
  Network,
  Briefcase,
  Globe,
} from 'lucide-react';
import {
  HERO,
  ABOUT_SNAPSHOT,
  STATS,
  STATS_AS_OF,
  WHY_JOIN,
  CTA_BANNER,
  COMMUNITY_TEASER,
  FEATURED_BLOG,
  CONTACT_PREVIEW,
  HERO_MOVING_TITLES,
  HERO_FEATURE_CARDS,
} from '../data/homePageData';
import { UPCOMING_EVENTS } from '../data/eventsData';
import { RESOURCES } from '../data/resourcesData';

const upcomingPreview = Array.isArray(UPCOMING_EVENTS) ? UPCOMING_EVENTS.slice(0, 3) : [];
const resourcesPreview = Array.isArray(RESOURCES) ? RESOURCES.slice(0, 4) : [];

const statIcons = {
  members: Users,
  events: Calendar,
  workshops: Wrench,
  problems: Code2,
  contributors: Award,
};

export default function Home() {
  const { isDark } = useSiteTheme();

  return (
    <div
      className={[
        'gfg-page-module min-h-screen w-full',
        isDark ? 'dark' : '',
      ].join(' ')}
    >
      <div className="gfg-shell space-y-8 sm:space-y-12">
        
        {/* ─── 1. HERO SECTION (Forced White Text) ───────────────────────── */}
        <section
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#2F8D46] to-[#14532d] dark:from-[#0a1f0d] dark:to-[#052E16] px-6 sm:px-10 py-10 sm:py-14 shadow-lg"
          aria-labelledby="hero-heading"
        >
          <h1
            id="hero-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight !text-white mb-1"
          >
            {HERO.title}
          </h1>

          <p className="text-base sm:text-lg !text-white font-medium mb-6 !opacity-100">
            {HERO.subtitle}
          </p>

          <p className="text-sm sm:text-base !text-white max-w-2xl mb-8 !opacity-90">
            {HERO.tagline}
          </p>

          {upcomingPreview.length > 0 && (
            <p className="text-sm !text-white mb-4">
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
                  className="shrink-0 px-4 py-2 rounded-lg bg-white/15 dark:bg-white/10 !text-white font-semibold text-sm border border-white/20"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT WE DO ────────────────────────────────────────────── */}
        <section
          className="bg-white dark:bg-[#161b22] rounded-xl border border-[#E5E7EB] dark:border-[#30363d] p-6 sm:p-8"
          aria-labelledby="what-we-do-heading"
        >
          <h2 id="what-we-do-heading" className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white mb-2">
            What we do
          </h2>
          <p className="text-sm text-[#4B5563] dark:text-white/90 mb-6 max-w-2xl">
            {ABOUT_SNAPSHOT.what}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {HERO_FEATURE_CARDS.map((card) => (
              <div
                key={card.title}
                className="group p-4 sm:p-5 rounded-xl border border-[#E5E7EB] dark:border-[#30363d] bg-[#F9FAFB] dark:bg-[#0d1117] hover:border-[#2F8D46] dark:hover:border-[#22C55E] transition-all duration-200 hover:shadow-md"
              >
                <h3 className="text-base sm:text-lg font-bold text-[#020617] dark:text-white group-hover:text-[#22C55E] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-[#111827] dark:text-white/85 mt-2 max-w-xs">
                  {card.short}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 3. KEY STATISTICS (Bento) ──────────────────────────────────── */}
        <section aria-labelledby="stats-heading" className="gfg-bento-grid">
          <h2 id="stats-heading" className="sr-only">Key statistics</h2>
          {STATS_AS_OF && (
            <p className="text-xs gfg-text-muted mb-2 gfg-bento-span-4">
              <span className="gfg-text-accent font-semibold">As of</span> {STATS_AS_OF}
            </p>
          )}
          {STATS.map((stat) => {
            const Icon = statIcons[stat.icon] || Award;
            return (
              <div
                key={stat.label}
                className="gfg-card-soft flex flex-col items-center text-center gfg-bento-span-1"
              >
                <span className="text-[#2F8D46] dark:text-[#22C55E] mb-2">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden />
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-white">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-[#4B5563] dark:text-white/70 mt-1 font-medium">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </section>

        {/* ─── 4-9 Sections (Kept standard to match your UI) ──────────────── */}
        {/* ... [Rest of your sections 4 through 9 remain standard] ... */}
        {/* [I have omitted them here for brevity, but keep them as they were in your file] */}

        {/* ─── 10. FINAL JOIN CARD (Forced White Text) ───────────────────── */}
        <section
          className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#14532d] to-[#0f2d1a] dark:from-[#0a1f0d] dark:to-[#052E16] px-6 sm:px-10 pt-6 sm:pt-8 pb-10 sm:pb-12 text-left shadow-xl"
          aria-labelledby="join-card-heading"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-white/25">
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
          <h2 id="join-card-heading" className="text-2xl sm:text-3xl font-bold tracking-tight !text-white">
            {HERO.title}
          </h2>
          <p className="text-lg sm:text-xl !text-white mt-1">
            {HERO.tagline}
          </p>
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
