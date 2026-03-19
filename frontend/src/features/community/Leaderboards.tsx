import { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Award } from 'lucide-react';
import type { LeaderboardEntry } from '../../utils/data/communityMockData';
import {
  LEADERBOARD_TOP_CODERS,
  LEADERBOARD_MOST_ACTIVE,
  LEADERBOARD_EVENT_CHAMPIONS,
  LEADERBOARD_MONTHLY,
} from '../../utils/data/communityMockData';
import { clsx } from 'clsx';

const TABS = [
  { id: 'coders', label: 'Top Coders', data: LEADERBOARD_TOP_CODERS, scoreLabel: 'Points' },
  { id: 'active', label: 'Most Active', data: LEADERBOARD_MOST_ACTIVE, scoreLabel: 'Activity' },
  { id: 'champions', label: 'Event Champions', data: LEADERBOARD_EVENT_CHAMPIONS, scoreLabel: 'Events' },
  { id: 'monthly', label: 'Monthly Leaders', data: LEADERBOARD_MONTHLY, scoreLabel: 'Monthly pts' },
] as const;

function Medal({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-2xl" aria-hidden>🥇</span>;
  if (rank === 2) return <span className="text-2xl" aria-hidden>🥈</span>;
  if (rank === 3) return <span className="text-2xl" aria-hidden>🥉</span>;
  return <span className="text-[#6B7280] dark:text-[#E5E7EB] font-semibold w-8 text-center">{rank}</span>;
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'same' }) {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600 dark:text-emerald-400" aria-hidden />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500 dark:text-red-400" aria-hidden />;
  return <Minus className="w-4 h-4 text-[#6B7280] dark:text-[#E5E7EB]" aria-hidden />;
}

function LeaderboardTable({
  entries,
  scoreLabel,
}: {
  entries: LeaderboardEntry[];
  scoreLabel: string;
}) {
  const memberOfMonth = entries.find((e) => e.badges.includes('Member of the Month'));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E5E7EB] dark:border-[#3d4a5c] text-left text-[#6B7280] dark:text-[#E5E7EB]">
            <th className="pb-3 pr-2 sm:pr-4 font-medium w-14">Rank</th>
            <th className="pb-3 pr-2 sm:pr-4 font-medium">Member</th>
            <th className="pb-3 pr-2 sm:pr-4 font-medium">Department</th>
            <th className="pb-3 pr-2 sm:pr-4 font-medium">{scoreLabel}</th>
            <th className="pb-3 font-medium">Badges</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((row) => (
            <tr
              key={`${row.id}-${row.rank}`}
              className={clsx(
                'gfg-leaderboard-row border-b border-[#E5E7EB] dark:border-[#3d4a5c] hover:bg-[#E5E7EB] dark:hover:bg-[rgba(34,197,94,0.14)] transition-colors duration-200',
                memberOfMonth && row.id === memberOfMonth.id &&
                  'bg-[#EAF7EF] dark:bg-[#1c212e] dark:ring-1 dark:ring-inset dark:ring-[#22C55E]/50'
              )}
            >
              <td className="py-3 pr-2 sm:pr-4">
                <div className="flex items-center gap-2">
                  <Medal rank={row.rank} />
                  {row.trend && (
                    <TrendIcon trend={row.trend} />
                  )}
                </div>
              </td>
              <td className="py-3 pr-2 sm:pr-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <img
                    src={row.profileImage}
                    alt=""
                    loading="lazy"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-[#E5E7EB] dark:border-[#3d4a5c] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-[#1F2937] dark:text-[#FFFFFF] truncate">{row.name}</span>
                      {row.badges.includes('Member of the Month') && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2F8D46] dark:bg-[#22C55E] text-white text-xs font-medium">
                          <Crown className="w-3.5 h-3.5" />
                          MoM
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-2 sm:pr-4 text-[#1F2937] dark:text-[#FFFFFF]">{row.department}</td>
              <td className="py-3 pr-2 sm:pr-4">
                <span className="font-semibold text-[#2F8D46] dark:text-[#22C55E]">{row.score}</span>
              </td>
              <td className="py-3">
                <div className="flex flex-wrap gap-1">
                  {row.badges.filter((b) => b !== 'Member of the Month').slice(0, 3).map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F9FAFB] dark:bg-[#1c212e] text-xs text-[#1F2937] dark:text-[#FFFFFF] border border-[#E5E7EB] dark:border-[#3d4a5c]"
                    >
                      <Award className="w-3 h-3 text-[#2F8D46] dark:text-[#22C55E]" />
                      {b}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Leaderboards() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('coders');
  const current = TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Leaderboards
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          Top performers and monthly spotlight
        </p>
      </div>

      <div className="border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <div className="flex overflow-x-auto scrollbar-thin" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'px-4 sm:px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200',
                activeTab === tab.id
                  ? 'border-[#2F8D46] text-[#2F8D46] dark:text-[#22C55E] dark:border-[#22C55E]'
                  : 'border-transparent text-[#6B7280] dark:text-[#E5E7EB] hover:text-[#1F2937] dark:hover:text-[#FFFFFF] hover:border-[#E5E7EB] dark:hover:border-[#3d4a5c]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 overflow-x-auto" role="tabpanel">
        {current && (
          <LeaderboardTable entries={current.data} scoreLabel={current.scoreLabel} />
        )}
      </div>
    </section>
  );
}

