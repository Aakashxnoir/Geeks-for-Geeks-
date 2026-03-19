import type { Student } from '../../utils/data/communityMockData';
import { getCertificatesForStudent, getLeaderboardRankByPoints } from '../../utils/data/communityMockData';
import ContributionScoreTier from './ContributionScoreTier';
import PlacementReadiness from './PlacementReadiness';
import CodingProfileSummary from './CodingProfileSummary';
import KudosDisplay from './KudosDisplay';
import { Award, Calendar, Flame, BookOpen, Code2, Clock, Trophy } from 'lucide-react';

interface ResumeAchievementProfileProps {
  student: Student;
  /** If true, renders compact inline sections; if false, full card sections */
  compact?: boolean;
}

export default function ResumeAchievementProfile({ student, compact }: ResumeAchievementProfileProps) {
  const rank = getLeaderboardRankByPoints(student.id);
  const certificates = getCertificatesForStudent(student.id);
  const longestStreak = student.longestStreak ?? student.activityStreak;

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-[#6B7280] dark:text-[#E5E7EB]">
            <Trophy className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
            Rank: <span className="font-medium text-[#1F2937] dark:text-[#FFFFFF]">#{rank}</span>
          </div>
          <div className="flex items-center gap-2 text-[#6B7280] dark:text-[#E5E7EB]">
            <Flame className="w-4 h-4 shrink-0" />
            Streak: <span className="font-medium text-[#1F2937] dark:text-[#FFFFFF]">{student.activityStreak}d (max {longestStreak}d)</span>
          </div>
        </div>
        <ContributionScoreTier score={student.points} compact />
        <PlacementReadiness points={student.points} compact />
        <CodingProfileSummary studentId={student.id} compact />
        <KudosDisplay studentId={student.id} compact />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-profile="resume-ready">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ContributionScoreTier score={student.points} />
        <PlacementReadiness points={student.points} />
      </div>

      <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1F2937]/50">
        <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
          Leaderboard &amp; Streak
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[#6B7280] dark:text-[#E5E7EB]">Contribution rank</p>
            <p className="font-semibold text-[#1F2937] dark:text-[#FFFFFF]">#{rank} of members</p>
          </div>
          <div>
            <p className="text-[#6B7280] dark:text-[#E5E7EB]">Current streak</p>
            <p className="font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-1">
              <Flame className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
              {student.activityStreak} days
            </p>
          </div>
          <div>
            <p className="text-[#6B7280] dark:text-[#E5E7EB]">Longest streak</p>
            <p className="font-semibold text-[#1F2937] dark:text-[#FFFFFF]">{longestStreak} days</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1F2937]/50">
          <h3 className="font-semibold text-[#1F2937] dark:text-[#FFFFFF] mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
            Participation
          </h3>
            <dl className="space-y-1">
              <div className="flex justify-between"><dt className="text-[#6B7280] dark:text-[#E5E7EB]">Events</dt><dd className="font-medium">{student.eventsAttended}</dd></div>
              <div className="flex justify-between"><dt className="text-[#6B7280] dark:text-[#E5E7EB]">Workshops</dt><dd className="font-medium">{student.workshopsAttended}</dd></div>
              <div className="flex justify-between"><dt className="text-[#6B7280] dark:text-[#E5E7EB]">Contests</dt><dd className="font-medium">{student.contestsParticipated}</dd></div>
              <div className="flex justify-between"><dt className="text-[#6B7280] dark:text-[#E5E7EB]">Hours</dt><dd className="font-medium">{student.contributionHours}</dd></div>
            </dl>
        </div>
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1F2937]/50">
          <h3 className="font-semibold text-[#1F2937] dark:text-[#FFFFFF] mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
            Skills &amp; Certs
          </h3>
          <p className="text-[#6B7280] dark:text-[#E5E7EB] text-xs mb-2">Certificates: {student.certificatesEarned}</p>
          {certificates.length > 0 ? (
            <ul className="space-y-1">
              {certificates.map((c) => (
                <li key={c.id} className="text-xs">
                  <span className="font-medium text-[#1F2937] dark:text-[#FFFFFF]">{c.title}</span>
                  <span className="text-[#6B7280] dark:text-[#E5E7EB]"> · {c.skill}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">No certificates in system yet.</p>
          )}
        </div>
      </div>

      <CodingProfileSummary studentId={student.id} />
      <KudosDisplay studentId={student.id} />

      <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1F2937]/50">
        <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] mb-2 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
          Badges
        </h3>
        <div className="flex flex-wrap gap-2">
          {student.badges.length > 0 ? (
            student.badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1c212e] border border-[#E5E7EB] dark:border-[#3d4a5c] text-sm font-medium text-[#1F2937] dark:text-[#FFFFFF]"
              >
                <Trophy className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
                {b}
              </span>
            ))
          ) : (
            <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB]">No badges yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

