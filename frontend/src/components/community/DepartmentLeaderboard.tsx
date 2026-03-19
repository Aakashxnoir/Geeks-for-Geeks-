import { useMemo } from 'react';
import { Trophy, Users } from 'lucide-react';
import { getDepartmentLeaderboard } from '@/src/data/communityMockData';

function Medal({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-xl" aria-hidden>🥇</span>;
  if (rank === 2) return <span className="text-xl" aria-hidden>🥈</span>;
  if (rank === 3) return <span className="text-xl" aria-hidden>🥉</span>;
  return <span className="text-[#6B7280] dark:text-[#E5E7EB] font-semibold w-6 text-center">{rank}</span>;
}

export default function DepartmentLeaderboard() {
  const leaderboard = useMemo(() => getDepartmentLeaderboard(), []);

  return (
    <section className="bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Department Leaderboard
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          Rankings by aggregated participation score
        </p>
      </div>
      <div className="p-4 sm:p-6">
        <div className="space-y-3">
          {leaderboard.map((row) => (
            <div
              key={row.department}
              className="gfg-dept-row flex items-center gap-4 p-3 rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] bg-[#F9FAFB] dark:bg-[#1c212e] hover:border-[#2F8D46] dark:hover:border-[#22C55E]/60 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Medal rank={row.rank} />
                <div>
                  <p className="font-semibold text-[#1F2937] dark:text-[#FFFFFF]">{row.department}</p>
                  <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {row.memberCount} members
                  </p>
                </div>
              </div>
              <p className="text-lg font-bold text-[#2F8D46] dark:text-[#22C55E] shrink-0">
                {row.totalScore.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
