import { useMemo } from 'react';
import { Lightbulb, TrendingUp, Users, Calendar } from 'lucide-react';
import { STUDENTS, UPCOMING_EVENTS } from '../../utils/data/communityMockData';

interface SmartParticipationInsightsProps {
  studentId?: string;
}

export default function SmartParticipationInsights({ studentId }: SmartParticipationInsightsProps) {
  const insights = useMemo(() => {
    const total = STUDENTS.length;
    const sortedByPoints = [...STUDENTS].sort((a, b) => b.points - a.points);
    const student = studentId ? STUDENTS.find((s) => s.id === studentId) : sortedByPoints[0];
    if (!student) return [];

    const rank = sortedByPoints.findIndex((s) => s.id === student.id) + 1;
    const moreActiveThan = Math.round(((total - rank) / total) * 100);
    const participationIncreased = student.activityStreak > 7;
    const recommended = UPCOMING_EVENTS.slice(0, 2);

    return [
      {
        icon: Users,
        text: `You are more active than ${moreActiveThan}% of members`,
        sub: `Rank #${rank} in contribution score`,
      },
      {
        icon: TrendingUp,
        text: participationIncreased ? 'Your participation increased this month' : 'Keep going to boost your streak',
        sub: `${student.activityStreak} day streak`,
      },
      {
        icon: Calendar,
        text: 'Recommended for you',
        sub: recommended.map((e) => e.title).join(' · '),
      },
    ];
  }, [studentId]);

  return (
    <section className="glass-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Smart Participation Insights
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          Personalized from your activity
        </p>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        {insights.map((item, i) => (
          <div
            key={i}
            className="gfg-insight-card flex gap-3 p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1c212e] border border-[#E5E7EB] dark:border-[#3d4a5c]"
          >
            <div className="w-10 h-10 rounded-full bg-[#F0FDF4] dark:bg-[rgba(34,197,94,0.15)] flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#1F2937] dark:text-[#FFFFFF]">{item.text}</p>
              <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB] mt-0.5 line-clamp-2">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


