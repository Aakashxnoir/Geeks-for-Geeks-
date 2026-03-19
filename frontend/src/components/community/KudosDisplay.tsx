import { useMemo } from 'react';
import { Heart } from 'lucide-react';
import { KUDOS } from '@/src/data/communityMockData';

const KUDOS_LABELS: { key: keyof Omit<typeof KUDOS[0], 'studentId'>; label: string }[] = [
  { key: 'helpfulMentor', label: 'Helpful Mentor' },
  { key: 'problemSolver', label: 'Problem Solver' },
  { key: 'risingStar', label: 'Rising Star' },
  { key: 'teamPlayer', label: 'Team Player' },
];

interface KudosDisplayProps {
  studentId: string;
  compact?: boolean;
}

export default function KudosDisplay({ studentId, compact }: KudosDisplayProps) {
  const kudos = useMemo(() => KUDOS.find((k) => k.studentId === studentId), [studentId]);
  const total = useMemo(() => kudos ? KUDOS_LABELS.reduce((s, { key }) => s + kudos[key], 0) : 0, [kudos]);

  if (!kudos) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-sm text-[#6B7280] dark:text-[#E5E7EB]">
        <Heart className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
        <span>{total} kudos</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1F2937]/50 space-y-2">
      <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
        <Heart className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
        Peer Recognition ({total})
      </h3>
      <div className="flex flex-wrap gap-2">
        {KUDOS_LABELS.filter(({ key }) => kudos[key] > 0).map(({ key, label }) => (
          <span
            key={key}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-[#141922] border border-[#E5E7EB] dark:border-[#3d4a5c] text-xs text-[#1F2937] dark:text-[#FFFFFF]"
          >
            {label}
            <span className="font-semibold text-[#2F8D46] dark:text-[#22C55E]">{kudos[key]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
