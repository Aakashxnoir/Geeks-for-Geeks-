import { useMemo } from 'react';
import { Crown, Award, Calendar, Code2 } from 'lucide-react';
import { LEADERBOARD_MONTHLY, STUDENTS } from '../../utils/data/communityMockData';
import { useCardDetail } from '../../lib/context/CardDetailContext';

export default function MemberOfTheMonthCard() {
  const { showDetails } = useCardDetail();
  const member = useMemo(() => {
    const top = LEADERBOARD_MONTHLY[0];
    if (!top) return null;
    return { ...top, student: STUDENTS.find((s) => s.id === top.id) };
  }, []);

  if (!member?.student) return null;

  const handleCardClick = () => {
    showDetails({
      title: `${member.name} — Member of the Month`,
      subtitle: `Department: ${member.department}`,
      functionality: "Recognizes the highest-contributing student each month based on a combination of event attendance, problem solving on GFG, and community engagement scores.",
      description: `This detailed report showcases ${member.name}'s performance. They have solved ${member.student?.problemsSolved} problems and attended ${member.student?.eventsAttended} events this month alone. Their total contribution score of ${member.score} points places them at the peak of the RIT club rankings.`,
      stats: [
        { label: "Points", value: member.score },
        { label: "Problems", value: member.student?.problemsSolved || 0 },
        { label: "Events", value: member.student?.eventsAttended || 0 },
        { label: "Rank", value: "#1" }
      ],
      exportData: member,
      componentName: "MemberOfTheMonthCard"
    });
  };

  return (
    <section 
      onClick={handleCardClick}
      className="gfg-mom-card glass-card overflow-hidden cursor-pointer hover:ring-2 hover:ring-[color:var(--gfg-accent)] active:scale-[0.99] transition-all"
    >
      <div className="gfg-mom-card-header px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c] flex items-center gap-2 bg-[#F9FAFB] dark:bg-[#1c212e]">
        <Crown className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
        <h2 className="gfg-mom-title text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF]">
          Member of the Month
        </h2>
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
              <span className="gfg-top-contributor-badge px-2 py-0.5 rounded-full text-xs font-medium bg-[#2F8D46] dark:bg-[#1c212e] text-white dark:text-[#FFFFFF] border border-[#2F8D46]/50 dark:border-[#3d4a5c]">
                Top contributor
              </span>
            </div>
            <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-0.5">{member.department}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm gfg-mom-stats-wrap">
              <span className="gfg-mom-stats flex items-center gap-1.5 text-[#6B7280] dark:text-[#E5E7EB]">
                <Award className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
                {member.score} pts this month
              </span>
              <span className="gfg-mom-stats flex items-center gap-1.5 text-[#6B7280] dark:text-[#E5E7EB]">
                <Code2 className="w-4 h-4 text-[#6B7280] dark:text-[#E5E7EB]" />
                {member.student.problemsSolved} problems
              </span>
              <span className="gfg-mom-stats flex items-center gap-1.5 text-[#6B7280] dark:text-[#E5E7EB]">
                <Calendar className="w-4 h-4 text-[#6B7280] dark:text-[#E5E7EB]" />
                {member.student.eventsAttended} events
              </span>
            </div>
            {member.badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {member.badges.map((b) => (
                  <span
                    key={b}
                    className="gfg-mom-badge-pill px-2 py-0.5 rounded bg-[#E5E7EB] dark:bg-[#1c212e] text-xs font-medium text-[#1F2937] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#3d4a5c]"
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


