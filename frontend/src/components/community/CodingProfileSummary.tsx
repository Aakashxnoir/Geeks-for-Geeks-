import { useMemo } from 'react';
import { Code2 } from 'lucide-react';
import { CODING_PROFILES } from '@/src/data/communityMockData';

interface CodingProfileSummaryProps {
  studentId: string;
  compact?: boolean;
}

export default function CodingProfileSummary({ studentId, compact }: CodingProfileSummaryProps) {
  const profile = useMemo(() => CODING_PROFILES.find((p) => p.studentId === studentId), [studentId]);

  if (!profile) {
    if (compact) return <span className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">—</span>;
    return (
      <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1c212e]">
        <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2 mb-2">
          <Code2 className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
          Coding Profile
        </h3>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB]">No coding stats linked yet.</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-0.5 rounded bg-[#E5E7EB] dark:bg-[#3d4a5c] text-[#1F2937] dark:text-[#FFFFFF]">
          GFG {profile.gfgScore}
        </span>
        <span className="px-2 py-0.5 rounded bg-[#E5E7EB] dark:bg-[#3d4a5c] text-[#1F2937] dark:text-[#FFFFFF]">
          LC {profile.leetcodeRank}
        </span>
        <span className="px-2 py-0.5 rounded bg-[#E5E7EB] dark:bg-[#3d4a5c] text-[#1F2937] dark:text-[#FFFFFF]">
          CC {profile.codechefRating}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1c212e] space-y-3">
      <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
        <Code2 className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
        Coding Profile (mock)
      </h3>
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-[#6B7280] dark:text-[#E5E7EB]">GFG Score</dt>
          <dd className="font-semibold text-[#1F2937] dark:text-[#FFFFFF]">{profile.gfgScore}</dd>
        </div>
        <div>
          <dt className="text-[#6B7280] dark:text-[#E5E7EB]">LeetCode Rank</dt>
          <dd className="font-semibold text-[#1F2937] dark:text-[#FFFFFF]">{profile.leetcodeRank}</dd>
        </div>
        <div>
          <dt className="text-[#6B7280] dark:text-[#E5E7EB]">CodeChef Rating</dt>
          <dd className="font-semibold text-[#1F2937] dark:text-[#FFFFFF]">{profile.codechefRating}</dd>
        </div>
      </dl>
    </div>
  );
}
