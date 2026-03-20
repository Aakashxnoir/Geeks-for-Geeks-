import { Users, Activity, Calendar, Award, TrendingUp } from 'lucide-react';
import { ANALYTICS } from '../../utils/data/communityMockData';

const ITEMS = [
  { label: 'Members', value: ANALYTICS.totalMembers, icon: Users },
  { label: 'Active', value: ANALYTICS.activeThisMonth, icon: Activity },
  { label: 'Events', value: ANALYTICS.eventsConducted, icon: Calendar },
  { label: 'Participation', value: ANALYTICS.totalParticipation, icon: Award },
];

interface AnalyticsStripProps {
  onViewDetails?: () => void;
}

export default function AnalyticsStrip({ onViewDetails }: AnalyticsStripProps) {
  return (
    <div className="gfg-analytics-strip w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {ITEMS.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={onViewDetails}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F9FAFB] dark:bg-[#141922] border border-[#E5E7EB] dark:border-[#3d4a5c] shadow-sm hover:border-[#2F8D46] dark:hover:border-[#22C55E] hover:shadow transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8D46] dark:focus-visible:ring-[#22C55E] focus-visible:ring-offset-1 w-full min-h-[64px]"
          title="View detailed analytics"
        >
          <item.icon className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          <div>
            <p className="text-xs font-medium text-[#6B7280] dark:text-[#FFFFFF]">{item.label}</p>
            <p className="text-sm font-bold tabular-nums text-[#1F2937] dark:text-[#22C55E]">{item.value}</p>
          </div>
        </button>
      ))}
      <button
        type="button"
        onClick={onViewDetails}
        className="col-span-2 sm:col-span-3 lg:col-span-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#F0FDF4] dark:bg-[rgba(34,197,94,0.15)] border border-[#2F8D46]/30 dark:border-[rgba(34,197,94,0.35)] hover:bg-[#F0FDF4]/90 dark:hover:bg-[rgba(34,197,94,0.2)] transition-colors w-full min-h-[64px]"
        title="View detailed analytics"
      >
        <TrendingUp className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
        <span className="text-sm font-medium text-[#2F8D46] dark:text-[#22C55E]">+{ANALYTICS.growthPercent}%</span>
      </button>
    </div>
  );
}

