import { Users, Activity, Calendar, TrendingUp, Award, Lightbulb } from 'lucide-react';
import { ANALYTICS } from '../../utils/data/communityMockData';

const METRICS = [
  {
    key: 'totalMembers',
    label: 'Total Members',
    value: ANALYTICS.totalMembers,
    icon: Users,
    color: 'text-[#2F8D46]',
    bg: 'bg-[#F0FDF4]',
  },
  {
    key: 'activeThisMonth',
    label: 'Active This Month',
    value: ANALYTICS.activeThisMonth,
    icon: Activity,
    color: 'text-[#1F6B34]',
    bg: 'bg-[#F9FAFB]',
  },
  {
    key: 'eventsConducted',
    label: 'Events Conducted',
    value: ANALYTICS.eventsConducted,
    icon: Calendar,
    color: 'text-[#2F8D46]',
    bg: 'bg-[#F9FAFB]',
  },
  {
    key: 'totalParticipation',
    label: 'Total Participation',
    value: ANALYTICS.totalParticipation,
    icon: Award,
    color: 'text-[#57B46E]',
    bg: 'bg-[#F9FAFB]',
  },
];

function MiniBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs items-baseline">
        <span className="text-[#6B7280] dark:text-[#E5E7EB]">{label}</span>
        <span className="gfg-minibar-value font-bold tabular-nums text-[#1F2937] dark:text-[#22C55E]">{value}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[#E5E7EB] dark:bg-[#3d4a5c] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#2F8D46] dark:bg-[#22C55E] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function AnalyticsSummary() {
  const maxMembers = Math.max(
    ANALYTICS.totalMembers,
    ANALYTICS.activeThisMonth,
    ANALYTICS.eventsConducted,
    ANALYTICS.totalParticipation
  );

  return (
    <section className="bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Community Analytics
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#FFFFFF] mt-1">
          Key metrics at a glance (non-admin view)
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="gfg-analytics-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F0FDF4] dark:bg-[#1c212e] text-[#2F8D46] dark:text-[#22C55E] text-sm font-medium border border-[#2F8D46]/30 dark:border-[#22C55E]/50">
            <TrendingUp className="w-4 h-4 shrink-0" />
            Growth: +{ANALYTICS.growthPercent}% this month
          </span>
          <span className="gfg-analytics-top-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F9FAFB] dark:bg-[#1c212e] dark:text-[#FFFFFF] text-[#1F2937] text-sm font-medium border border-[#E5E7EB] dark:border-[#3d4a5c]">
            <Award className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
            Top Department: {ANALYTICS.topDepartment} ({ANALYTICS.topDepartmentCount} members)
          </span>
        </div>

        <div className="gfg-insight-box flex items-start gap-2 p-3 rounded-xl bg-[#F0FDF4] dark:bg-[#1c212e] border border-[#57B46E]/30 dark:border-[#3d4a5c]">
          <Lightbulb className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E] flex-shrink-0 mt-0.5" />
          <div className="gfg-insights-text text-sm min-w-0">
            <p className="font-medium text-[#1F2937] dark:text-[#FFFFFF]">Smart participation insights</p>
            <p className="text-[#6B7280] dark:text-[#E5E7EB] mt-0.5">
              {ANALYTICS.topDepartment} has the highest event turnout. Consider cross-department workshops to boost IT and ECE participation.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.key}
              className={`gfg-analytics-metric-card rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1c212e]`}
            >
              <div className={`flex items-center gap-2 ${m.color} dark:text-[#22C55E]`}>
                <m.icon className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium text-[#6B7280] dark:text-[#FFFFFF]">{m.label}</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-[#1F2937] dark:text-[#FFFFFF] mt-2">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 space-y-4">
          <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF]">Participation overview</h3>
          <MiniBar
            label="Members"
            value={ANALYTICS.totalMembers}
            max={maxMembers}
          />
          <MiniBar
            label="Active this month"
            value={ANALYTICS.activeThisMonth}
            max={maxMembers}
          />
          <MiniBar
            label="Events"
            value={ANALYTICS.eventsConducted}
            max={maxMembers}
          />
          <MiniBar
            label="Total participation count"
            value={ANALYTICS.totalParticipation}
            max={maxMembers * 3}
          />
        </div>
      </div>
    </section>
  );
}

