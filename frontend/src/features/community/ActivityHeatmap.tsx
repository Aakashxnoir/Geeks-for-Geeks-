import { useMemo, useState } from 'react';
import { Calendar } from 'lucide-react';
import { getHeatmapForStudent, STUDENTS } from '../../utils/data/communityMockData';
import { useCardDetail } from '../../lib/context/CardDetailContext';

const INTENSITY = ['bg-[#EBEDF0] dark:bg-[#374151]', 'bg-[#9BE9A8] dark:bg-[#166534]', 'bg-[#40C463] dark:bg-[#15803d]', 'bg-[#30A14E] dark:bg-[#14532d]', 'bg-[#216E39] dark:bg-[#052e16]'];

function HeatmapGrid({ data }: { data: Record<string, number> }) {
  const { weeks, weekDays } = useMemo(() => {
    const now = new Date();
    const weeks: { date: Date; days: number[] }[] = [];
    for (let w = 0; w < 12; w++) {
      const days: number[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (w * 7 + (6 - d)));
        const key = date.toISOString().slice(0, 10);
        days.push(data[key] ?? 0);
      }
      weeks.push({ date: new Date(now.getTime() - w * 7 * 24 * 60 * 60 * 1000), days });
    }
    return { weeks, weekDays: [0, 1, 2, 3, 4, 5, 6] };
  }, [data]);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.days.map((value, di) => (
              <div
                key={di}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${INTENSITY[Math.min(value, 4)]}`}
                title={`Level ${value}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs font-medium text-[#6B7280] dark:text-[#FFFFFF]">
        <span>Less</span>
        <div className="flex gap-1">
          {INTENSITY.map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

interface ActivityHeatmapProps {
  studentId?: string;
}

export default function ActivityHeatmap({ studentId }: ActivityHeatmapProps) {
  const { showDetails } = useCardDetail();
  const [selectedId, setSelectedId] = useState(studentId ?? STUDENTS[0].id);
  const heatmapData = useMemo(() => getHeatmapForStudent(selectedId), [selectedId]);
  const student = useMemo(() => STUDENTS.find((s) => s.id === selectedId), [selectedId]);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent trigger when interacting with the select dropdown
    if ((e.target as HTMLElement).closest('select')) return;

    showDetails({
      title: "Activity Heatmap Analysis",
      subtitle: student?.name || "Member Stats",
      functionality: "Visualizes coding and participation consistency over a rolling 12-week period. Darker green squares represent days with higher contribution volume.",
      description: `This report details the activity profile for ${student?.name}. It tracks daily updates across the platform, providing a visual 'streak' indicator that helps members maintain momentum and identify their most productive coding days.`,
      stats: [
        { label: "Active Weeks", value: "12" },
        { label: "Max Intensity", value: "Lvl 4" },
        { label: "Consistency", value: "High" }
      ],
      exportData: heatmapData,
      componentName: "ActivityHeatmap"
    });
  };

  return (
    <section 
      onClick={handleCardClick}
      className="glass-card overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-green-500/5 transition-all"
    >
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c] pointer-events-none">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Activity Heatmap
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          Contribution calendar (last 12 weeks)
        </p>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#6B7280] dark:text-[#FFFFFF] mb-2">Member</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#3d4a5c] bg-white dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8D46]/30 dark:focus:ring-[#22C55E]/50"
          >
            {STUDENTS.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        {student && <HeatmapGrid data={heatmapData} />}
      </div>
    </section>
  );
}


