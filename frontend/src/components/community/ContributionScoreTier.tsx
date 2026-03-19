import { useMemo } from 'react';
import { Award } from 'lucide-react';
import type { ContributionTier } from '@/src/data/communityMockData';
import { TIER_THRESHOLDS } from '@/src/data/communityMockData';

interface ContributionScoreTierProps {
  score: number;
  compact?: boolean;
}

function getTierAndProgress(score: number): { tier: ContributionTier; progress: number; nextTier: ContributionTier | null; nextMin: number } {
  let current = TIER_THRESHOLDS[0];
  let next = TIER_THRESHOLDS[1] ?? null;
  for (let i = TIER_THRESHOLDS.length - 1; i >= 0; i--) {
    if (score >= TIER_THRESHOLDS[i].minScore) {
      current = TIER_THRESHOLDS[i];
      next = TIER_THRESHOLDS[i + 1] ?? null;
      break;
    }
  }
  const nextMin = next ? next.minScore : current.minScore;
  const range = next ? next.minScore - current.minScore : 1;
  const progress = next ? Math.min(100, ((score - current.minScore) / range) * 100) : 100;
  return { tier: current.tier, progress, nextTier: next?.tier ?? null, nextMin };
}

const TIER_COLORS: Record<ContributionTier, string> = {
  Bronze: 'bg-amber-700 text-white dark:bg-amber-600',
  Silver: 'bg-gray-400 text-white dark:bg-gray-600 dark:text-white',
  Gold: 'bg-amber-500 text-white dark:bg-amber-400 dark:text-[#1F2937]',
  Platinum: 'bg-slate-700 text-white dark:bg-slate-600',
};

export default function ContributionScoreTier({ score, compact }: ContributionScoreTierProps) {
  const { tier, progress, nextTier, nextMin } = useMemo(() => getTierAndProgress(score), [score]);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${TIER_COLORS[tier]}`}>
          {tier}
        </span>
        <span className="text-sm font-bold text-[#2F8D46] dark:text-[#22C55E]">{score}</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1F2937]/50 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#6B7280] dark:text-[#E5E7EB]">Contribution Score</span>
        <span className={`px-2.5 py-1 rounded-lg text-sm font-semibold ${TIER_COLORS[tier]}`}>
          {tier}
        </span>
      </div>
      <p className="text-2xl font-bold text-[#1F2937] dark:text-[#FFFFFF]">{score.toLocaleString()}</p>
      {nextTier && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-[#6B7280] dark:text-[#E5E7EB]">
            <span>Progress to {nextTier}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#E5E7EB] dark:bg-[#3d4a5c] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#2F8D46] dark:bg-[#22C55E] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">
            {nextMin - score} points to {nextTier}
          </p>
        </div>
      )}
      {!nextTier && (
        <p className="text-xs text-[#2F8D46] dark:text-[#22C55E] font-medium">Top tier achieved</p>
      )}
    </div>
  );
}
