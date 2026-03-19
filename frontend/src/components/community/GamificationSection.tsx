import { useMemo } from 'react';
import { Trophy, Zap, Flame, Award, Star } from 'lucide-react';
import { STUDENTS } from '../../data/communityMockData';

const BADGES_DEF = [
  { id: 'top-coder', name: 'Top Coder', icon: Trophy, desc: 'Rank in top 5 coders' },
  { id: 'streak-master', name: 'Streak Master', icon: Flame, desc: '30-day activity streak' },
  { id: 'event-champion', name: 'Event Champion', icon: Award, desc: 'Win a club event' },
  { id: 'volunteer', name: 'Volunteer', icon: Star, desc: 'Contribute as volunteer' },
  { id: 'rising-star', name: 'Rising Star', icon: Zap, desc: 'Top newcomer' },
];

interface GamificationSectionProps {
  searchQuery?: string;
}

export default function GamificationSection({ searchQuery = '' }: GamificationSectionProps) {
  const allBadges = useMemo(
    () => Array.from(new Set(STUDENTS.flatMap((s) => s.badges))),
    []
  );
  const q = searchQuery.trim().toLowerCase();
  const filteredBadgesDef = q
    ? BADGES_DEF.filter((b) => b.name.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q))
    : BADGES_DEF;
  const filteredRecentBadges = q
    ? allBadges.filter((name) => name.toLowerCase().includes(q))
    : allBadges;

  return (
    <section className="bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Achievements & Gamification
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          Badges, points, and streaks
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] mb-3">Achievement badges</h3>
          <div className="flex flex-wrap gap-3">
            {filteredBadgesDef.map((b) => (
              <div
                key={b.id}
                className="gfg-achievement-card flex items-center gap-3 px-4 py-3 rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] bg-[#F9FAFB] dark:bg-[#1c212e] hover:border-[#2F8D46] dark:hover:border-[#22C55E] transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-[#F0FDF4] dark:bg-[rgba(34,197,94,0.15)] flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E]" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-[#1F2937] dark:text-[#FFFFFF]">{b.name}</p>
                  <p className="text-xs text-[#6B7280] dark:text-[#FFFFFF]">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 text-center">
            <p className="text-xl sm:text-2xl font-bold text-[#2F8D46] dark:text-[#22C55E]">
              {Math.max(...STUDENTS.map((s) => s.points))}
            </p>
            <p className="text-sm text-[#6B7280] dark:text-[#FFFFFF]">Top points</p>
          </div>
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 text-center">
            <p className="text-xl sm:text-2xl font-bold text-[#1F2937] dark:text-[#FFFFFF] flex items-center justify-center gap-1">
              <Flame className="w-6 h-6 text-orange-500 dark:text-orange-400 shrink-0" />
              {Math.max(...STUDENTS.map((s) => s.activityStreak))}
            </p>
            <p className="text-sm text-[#6B7280] dark:text-[#FFFFFF]">Longest streak (days)</p>
          </div>
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 text-center">
            <p className="text-xl sm:text-2xl font-bold text-[#1F2937] dark:text-[#FFFFFF]">{allBadges.length}</p>
            <p className="text-sm text-[#6B7280] dark:text-[#FFFFFF]">Badge types</p>
          </div>
        </div>

        <div className="gfg-recent-badges-card rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1c212e]">
          <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] mb-2">Recent badges earned</h3>
          <div className="flex flex-wrap gap-2">
            {filteredRecentBadges.slice(0, 8).map((name) => (
              <span
                key={name}
                className="gfg-badge-pill inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E5E7EB] dark:bg-[#0d1117] border border-[#D1D5DB] dark:border-[#3d4a5c] text-sm font-medium text-[#1F2937] dark:text-[#FFFFFF]"
              >
                <Award className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
