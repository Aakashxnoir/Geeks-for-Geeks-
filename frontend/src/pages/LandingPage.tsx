// (no React hooks used here beyond the SiteThemeContext hook)
import { Link } from 'react-router-dom';
import { ArrowRight, Moon, Radar, Route, ShieldCheck, Sun } from 'lucide-react';
import { useSiteTheme } from '../lib/context/SiteThemeContext';
import { HERO, STATS, HERO_FEATURE_CARDS } from '../utils/data/homePageData';

export default function LandingPage() {
  const { isDark, toggleTheme } = useSiteTheme();

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f0fdf4] dark:bg-[#070707]">
      <header className="w-full">
        <div className="mx-auto max-w-[1180px] px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/logo.png" alt="GFG X RIT" className="w-10 h-10 object-contain" />
            <div className="min-w-0">
              <div className="text-sm sm:text-lg font-extrabold tracking-tight text-[#15803d] dark:text-[#4ade80] truncate">
                GFG <span className="text-[color:var(--gfg-accent)]">X</span> RIT
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-[#2f855a]/80 dark:text-[#22c55e] truncate">
                  {HERO.subtitle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/60 dark:bg-white/5 border border-[#bbf7d0] dark:border-[#14532d] hover:opacity-90 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#fde68a]" /> : <Moon className="w-4 h-4 text-[#15803d]" />}
            </button>

            <Link
              to="/signin"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white/70 dark:bg-white/5 border border-[#bbf7d0] dark:border-[#14532d] text-[#0f2d1a] dark:text-white hover:opacity-90 transition-colors"
            >
              Login <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>

            <Link to="/signup" className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-semibold bg-[#16a34a] text-white hover:bg-[#15803d] transition-colors shrink-0">
              <span className="hidden sm:inline">Get Started Now</span>
              <span className="sm:hidden">Start</span>
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="sm:hidden px-3 pb-3">
          <Link
            to="/signup"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-[#16a34a] text-white hover:bg-[#15803d] transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
          <section className="mt-2 rounded-3xl overflow-hidden border border-[#bbf7d0]/70 dark:border-[#14532d]/70 shadow-lg">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#16a34a] via-[#14532d] to-[#0f2d1a] opacity-90 dark:opacity-100" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.35),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.25),transparent_60%)]" />

              <div className="relative p-6 sm:p-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="max-w-2xl">
                    <h1 className="mt-2 sm:mt-4 text-2xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
                      Learn.
                      <br />
                      Compete.
                      <br />
                      Grow.
                    </h1>

                    <p className="mt-3 sm:mt-4 text-white/90 text-xs sm:text-base leading-relaxed max-w-[52ch]">
                      {HERO.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        to="/signin"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/25 text-white font-semibold transition-colors"
                      >
                        Login <ArrowRight className="w-4 h-4" aria-hidden />
                      </Link>
                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#16a34a] text-white hover:bg-[#15803d] transition-colors font-semibold"
                      >
                        Get Started Now <ArrowRight className="w-4 h-4" aria-hidden />
                      </Link>
                    </div>
                  </div>

                  <div className="md:min-w-[320px]">
                    <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-lg p-5">
                      <div className="text-white font-bold text-base">The Campus Platform for Growth.</div>
                      <div className="mt-3 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                            <Radar className="w-5 h-5 text-white" aria-hidden />
                          </div>
                          <div>
                            <div className="text-white font-semibold">{HERO_FEATURE_CARDS[0]?.title}</div>
                            <div className="text-white/80 text-xs mt-1">{HERO_FEATURE_CARDS[0]?.short}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-white" aria-hidden />
                          </div>
                          <div>
                            <div className="text-white font-semibold">{HERO_FEATURE_CARDS[1]?.title}</div>
                            <div className="text-white/80 text-xs mt-1">{HERO_FEATURE_CARDS[1]?.short}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                            <Route className="w-5 h-5 text-white" aria-hidden />
                          </div>
                          <div>
                            <div className="text-white font-semibold">{HERO_FEATURE_CARDS[2]?.title}</div>
                            <div className="text-white/80 text-xs mt-1">{HERO_FEATURE_CARDS[2]?.short}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {STATS.slice(0, 4).map((s) => (
                    <div key={s.label} className="rounded-2xl bg-white/10 border border-white/15 p-4">
                      <div className="text-white font-extrabold text-lg">{s.value}</div>
                      <div className="text-white/80 text-[11px] mt-1 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-white font-bold text-base">
                  Ready to level up? Choose Login or Get Started above.
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: HERO_FEATURE_CARDS[0]?.title ?? 'Workshops', body: HERO_FEATURE_CARDS[0]?.short ?? 'Hands-on DSA, web dev, CP' },
              { title: HERO_FEATURE_CARDS[1]?.title ?? 'Contests', body: HERO_FEATURE_CARDS[1]?.short ?? 'Compete and build with peers' },
              { title: HERO_FEATURE_CARDS[2]?.title ?? 'Placement Prep', body: HERO_FEATURE_CARDS[2]?.short ?? 'Resume reviews, mocks, prep' },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-[#bbf7d0]/70 dark:border-[#14532d]/70 bg-white/70 dark:bg-white/5 backdrop-blur p-5"
              >
                <div className="text-[#15803d] dark:text-[#4ade80] font-extrabold">{f.title}</div>
                <div className="text-[#0f2d1a]/80 dark:text-white/80 text-sm mt-2 leading-relaxed">
                  {f.body}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      <footer className="py-8">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm font-semibold text-[#0f2d1a] dark:text-white/90">
            © {new Date().getFullYear()} GeeksforGeeks Campus Club – RIT
          </div>
          <div className="text-xs text-[#0f2d1a]/70 dark:text-white/60">
            Built for the campus community. Sign in to access the full platform.
          </div>
        </div>
      </footer>
    </div>
  );
}

