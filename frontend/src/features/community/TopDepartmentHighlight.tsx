import { Award, Users } from 'lucide-react';
import { ANALYTICS } from '../../utils/data/communityMockData';
import { useCardDetail } from '../../lib/context/CardDetailContext';

export default function TopDepartmentHighlight() {
  const { showDetails } = useCardDetail();

  const handleCardClick = () => {
    showDetails({
      title: "Top Department Insights",
      subtitle: ANALYTICS.topDepartment,
      functionality: "This module identifies the most active academic department within the GFG Campus Club. It aggregates member counts, participation rates in workshops, and total coding points earned by students in that department.",
      description: `${ANALYTICS.topDepartment} is currently the leading department with ${ANALYTICS.topDepartmentCount} active members. This includes a high participation rate in the recent DSA workshop and the highest average coding points per student compared to ECE and IT departments.`,
      stats: [
        { label: "Members", value: ANALYTICS.topDepartmentCount },
        { label: "Engagement", value: "94%" },
        { label: "Workshops", value: "12" }
      ],
      exportData: ANALYTICS,
      componentName: "TopDepartmentHighlight"
    });
  };

  return (
    <section 
      onClick={handleCardClick}
      className="rounded-xl border-2 border-[#2F8D46] dark:border-[#22C55E] bg-[#F0FDF4] dark:bg-[rgba(34,197,94,0.15)] p-4 sm:p-5 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-[color:var(--gfg-accent)]/10 active:scale-[0.99]"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2F8D46] dark:bg-[#22C55E] flex items-center justify-center shrink-0">
          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-[#052E16]" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#6B7280] dark:text-[#E5E7EB]">Top Department</h3>
          <p className="text-lg sm:text-xl font-bold text-[#1F6B34] dark:text-[#22C55E] flex items-center gap-2 truncate">
            <Users className="w-5 h-5 shrink-0" />
            <span className="truncate">{ANALYTICS.topDepartment} — {ANALYTICS.topDepartmentCount} members</span>
          </p>
          <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB] mt-0.5">
            Leading in participation and events
          </p>
        </div>
      </div>
    </section>
  );
}
