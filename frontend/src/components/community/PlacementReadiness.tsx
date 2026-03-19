import { useMemo } from 'react';
import { Briefcase } from 'lucide-react';
import type { PlacementLevel } from '@/src/data/communityMockData';
import { PLACEMENT_THRESHOLDS } from '@/src/data/communityMockData';

interface PlacementReadinessProps {
  points: number;
  compact?: boolean;
}

function getLevelAndProgress(points: number): { level: PlacementLevel; progress: number; nextLevel: PlacementLevel | null; nextMin: number } {
  let current = PLACEMENT_THRESHOLDS[0];
  let next = PLACEMENT_THRESHOLDS[1] ?? null;
  for (let i = PLACEMENT_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= PLACEMENT_THRESHOLDS[i].minPoints) {
      current = PLACEMENT_THRESHOLDS[i];
      next = PLACEMENT_THRESHOLDS[i + 1] ?? null;
      break;
    }
  }
  const nextMin = next ? next.minPoints : current.minPoints;
  const range = next ? next.minPoints - current.minPoints : 1;
  const progress = next ? Math.min(100, ((points - current.minPoints) / range) * 100) : 100;
  return { level: current.level, progress, nextLevel: next?.level ?? null, nextMin };
}

const LEVEL_STYLES: Record<PlacementLevel, string> = {
  Beginner: 'bg-[#E5E7EB] dark:bg-[#3d4a5c] text-[#1F2937] dark:text-[#FFFFFF]',
  Intermediate: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
  Advanced: 'bg-[#2F8D46] text-white dark:bg-[#22C55E] dark:text-[#052E16]',
  'Placement Ready': 'bg-[#1F6B34] text-white dark:bg-[#22C55E] dark:text-white',
};

export default function PlacementReadiness({ points, compact }: PlacementReadinessProps) {
  const { level, progress, nextLevel, nextMin } = useMemo(() => getLevelAndProgress(points), [points]);

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${LEVEL_STYLES[level]}`}>
        <Briefcase className="w-3.5 h-3.5" />
        {level}
      </span>
    );
  }

  return (
    <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1c212e] space-y-3">
      <div className="flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
        <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF]">Placement Readiness</h3>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${LEVEL_STYLES[level]}`}>
          {level}
        </span>
        <span className="text-sm text-[#6B7280] dark:text-[#E5E7EB]">{points} pts</span>
      </div>
      {nextLevel && (
        <div className="space-y-1">
          <div className="h-2 w-full rounded-full bg-[#E5E7EB] dark:bg-[#3d4a5c] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#2F8D46] dark:bg-[#22C55E] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">
            {nextMin - points} pts to {nextLevel}
          </p>
        </div>
      )}
    </div>
  );
}
