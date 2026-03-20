import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Rocket, BookOpen } from 'lucide-react';
import PageLayout from './PageLayout';
import TeamCard from '../TeamCard';
import { CLUB_TEAM, CLUB_OBJECTIVES, CLUB_STATS, CLUB_ACTIVITIES } from '../../utils/data/clubInfoData';

const ClubInfo = () => {
  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000';
  const [team, setTeam] = useState(CLUB_TEAM);
  const [objectives, setObjectives] = useState(CLUB_OBJECTIVES);
  const [stats, setStats] = useState(CLUB_STATS);
  const [activities, setActivities] = useState(CLUB_ACTIVITIES);

  const [searchQuery, setSearchQuery] = useState('');
  const [statValues, setStatValues] = useState(CLUB_STATS.map(() => 0));
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const q = searchQuery.trim().toLowerCase();
  // Filtered views are derived from backend-loaded state (team/objectives/stats).

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/club-info`);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data?.team)) setTeam(data.team);
        if (Array.isArray(data?.objectives)) setObjectives(data.objectives);
        if (Array.isArray(data?.stats)) setStats(data.stats);
        if (Array.isArray(data?.activities)) setActivities(data.activities);
        // Reset animated values when content changes.
        if (Array.isArray(data?.stats)) setStatValues(data.stats.map(() => 0));
      } catch {
        // Keep mock data.
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [API_BASE_URL]);

  const effectiveFilteredTeam = useMemo(() => {
    if (!q) return team;
    return team.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.deptYear.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q)
    );
  }, [q, team]);

  const effectiveFilteredObjectives = useMemo(() => {
    if (!q) return objectives;
    return objectives.filter(
      (o) => o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q)
    );
  }, [q, objectives]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const duration = 1600;
    const steps = 50;
    let step = 0;
    const t = setInterval(() => {
      step += 1;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - (1 - progress) ** 2;
      setStatValues(stats.map((s) => Math.round(s.value * eased)));
      if (step >= steps) clearInterval(t);
    }, duration / steps);
    return () => clearInterval(t);
  }, [statsVisible, stats]);

  return (
    <PageLayout
      title="Club Information"
      subtitle="Learn, build, and compete at RIT"
    >
      {/* About + Activities — Community-style card */}
      <section className="gfg-card" aria-labelledby="about-heading">
        <div className="mb-4">
          <label htmlFor="club-info-search" className="sr-only">Search team, objectives</label>
          <input
            id="club-info-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team, objectives..."
            className="w-full max-w-sm pl-9 pr-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#3d4a5c] bg-[#F9FAFB] dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] text-sm placeholder:text-[#6B7280] dark:placeholder:text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#2F8D46]/30 dark:focus:ring-[#22C55E]/50"
            aria-label="Search team, objectives"
          />
        </div>
        <h2 id="about-heading" className="text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF] mb-3">
          About Us
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-2">
            <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB]">
              The <strong className="text-[#1F2937] dark:text-[#FFFFFF]">GeeksforGeeks Campus Club</strong> at{' '}
              <span className="text-[#2F8D46] dark:text-[#22C55E] font-medium">Rajalakshmi Institute of Technology</span> is a{' '}
              student-led community dedicated to fostering technical growth and competitive programming culture on campus.
            </p>
            <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB]">
              We organize regular <strong className="text-[#1F2937] dark:text-[#FFFFFF]">workshops</strong> on DSA, web development, and emerging
              technologies; host <strong className="text-[#1F2937] dark:text-[#FFFFFF]">coding contests</strong> and hackathons; and provide a platform for
              peer learning and mentorship.
            </p>
            <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB]">
              Ready to join? Reach out via <Link to="/contact" className="text-[#2F8D46] dark:text-[#22C55E] font-medium hover:underline">Contact</Link> or join our WhatsApp group!
            </p>
          </div>
          <div className="space-y-2">
            {activities.map((a) => (
              <div key={a.label} className="flex gap-3 p-3 rounded-lg bg-[#F9FAFB] dark:bg-[#1c212e] border border-[#E5E7EB] dark:border-[#3d4a5c]">
                <span className="text-xl shrink-0" aria-hidden>{a.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF]">{a.label}</h3>
                  <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Objectives, Impact — bento layout */}
      <section className="gfg-card gfg-bento-grid" aria-labelledby="mission-heading" ref={statsRef}>
        <div className="gfg-bento-span-4">
          <h2 id="mission-heading" className="text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF] mb-3">
            Mission & Objectives
          </h2>
          <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mb-4">
            Empower every <span className="text-[#2F8D46] dark:text-[#22C55E] font-medium">RIT</span> student to excel in technology and
            competitive programming through skills, confidence, and a vibrant community.
          </p>
        </div>
        <div className="gfg-bento-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {effectiveFilteredObjectives.length > 0 ? (
            effectiveFilteredObjectives.map((obj, index) => {
              const Icon =
                index === 0 ? Target :
                index === 1 ? Users :
                index === 2 ? Rocket :
                BookOpen;
              return (
                <div
                  key={obj.title}
                  className="p-3 rounded-lg bg-[#F9FAFB] dark:bg-[#1c212e] border border-[#E5E7EB] dark:border-[#3d4a5c]"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#DCFCE7] dark:bg-[#14532d]" aria-hidden>
                    <Icon className="w-4 h-4 text-[#15803D] dark:text-[#4ADE80]" />
                  </span>
                  <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] mt-1">{obj.title}</h3>
                  <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB] mt-0.5">{obj.description}</p>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-sm text-[#6B7280] dark:text-[#E5E7EB]">No objectives match your search.</p>
          )}
        </div>
        <div className="gfg-bento-span-1">
          <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] mb-2">Our Impact</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          {stats.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col items-center p-3 rounded-lg bg-[#F9FAFB] dark:bg-[#1c212e] border border-[#E5E7EB] dark:border-[#3d4a5c]"
            >
              <span className="text-lg font-bold tabular-nums text-[#2F8D46] dark:text-[#22C55E]">
                {statValues[i].toLocaleString()}{item.label === 'Coding Problems Solved' ? '+' : ''}
              </span>
              <span className="text-xs font-medium text-[#6B7280] dark:text-[#E5E7EB] mt-0.5">{item.label}</span>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Team — Community-style grid */}
      <section className="gfg-card" aria-labelledby="team-heading">
        <h2 id="team-heading" className="text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF] mb-2">
          Our Team
        </h2>
        <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB] mb-4">Core Team & Faculty Advisor (2025–2026)</p>
        {effectiveFilteredTeam.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {effectiveFilteredTeam.map((member) => (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.role}
                roleIcon={member.roleIcon}
                deptYear={member.deptYear}
                bio={member.bio}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB]">No team members match your search.</p>
        )}
      </section>

    </PageLayout>
  );
};

export default ClubInfo;
