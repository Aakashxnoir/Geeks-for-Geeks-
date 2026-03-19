import { useMemo } from 'react';
import { Crown, Award, Calendar, Code2 } from 'lucide-react';
import { LEADERBOARD_MONTHLY, STUDENTS } from '../../data/communityMockData';
import { Link } from 'react-router-dom';

/**
 * Member of the Month card — same data and style as Community module.
 * Uses Tailwind dark: so parent must have class "dark" when in dark mode (PageLayout provides this).
 */
export default function MomPreviewCard() {
  const member = useMemo(() => {
    const top = LEADERBOARD_MONTHLY[0];
    if (!top) return null;
    return { ...top, student: STUDENTS.find((s) => s.id === top.id) };
  }, []);

  if (!member?.student) return null;

  return (
    <section className="gfg-mom-card bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="gfg-mom-card-header px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c] flex items-center justify-between bg-[#F9FAFB] dark:bg-[#1c212e]">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          <h2 className="gfg-mom-title text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF]">
            Member of the Month
          </h2>
        </div>
        <Link
          to="/community"
          className="text-xs font-semibold text-[#2F8D46] dark:text-[#22C55E] hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <img
            src={member.profileImage}
            alt=""
            loading="lazy"
            className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 dark:border-amber-500 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF]">{member.name}</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#2F8D46] dark:bg-[#1c212e] text-white dark:text-[#FFFFFF] border border-[#2F8D46]/50 dark:border-[#3d4a5c]">
                Top contributor
              </span>
            </div>
            <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-0.5">{member.department}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1.5 text-[#6B7280] dark:text-[#E5E7EB]">
                <Award className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
                {member.score} pts this month
              </span>
              <span className="flex items-center gap-1.5 text-[#6B7280] dark:text-[#E5E7EB]">
                <Code2 className="w-4 h-4" />
                {member.student.problemsSolved} problems
              </span>
              <span className="flex items-center gap-1.5 text-[#6B7280] dark:text-[#E5E7EB]">
                <Calendar className="w-4 h-4" />
                {member.student.eventsAttended} events
              </span>
            </div>
            {member.badges?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {member.badges.map((b) => (
                  <span
                    key={b}
                    className="px-2 py-0.5 rounded bg-[#E5E7EB] dark:bg-[#1c212e] text-xs font-medium text-[#1F2937] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#3d4a5c]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
