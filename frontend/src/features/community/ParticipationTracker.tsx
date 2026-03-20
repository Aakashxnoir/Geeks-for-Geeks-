import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  X,
  Award,
  Calendar,
  Code2,
  BookOpen,
  Clock,
  Flame,
  ChevronDown,
  Trophy,
  User,
} from 'lucide-react';
import type { Student } from '../../utils/data/communityMockData';
import {
  STUDENTS,
  DEPARTMENTS,
  YEARS,
} from '../../utils/data/communityMockData';
import { useCardDetail } from '../../lib/context/CardDetailContext';
import { clsx } from 'clsx';
import ResumeAchievementProfile from './ResumeAchievementProfile';

const MAX_EVENTS = 20;
const MAX_WORKSHOPS = 15;
const MAX_PROBLEMS = 600;
const MAX_HOURS = 80;

function ProgressBar({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-[#6B7280] dark:text-[#E5E7EB]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[#E5E7EB] dark:bg-[#3d4a5c] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#2F8D46] dark:bg-[#22C55E] transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StudentModal({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-modal-title"
    >
      <div
        className="bg-white dark:bg-[#141922] rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E5E7EB] dark:border-[#3d4a5c]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-[#141922] border-b border-[#E5E7EB] dark:border-[#3d4a5c] px-4 sm:px-6 py-4 flex items-center justify-between z-10">
          <h2 id="student-modal-title" className="text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] truncate pr-2">
            Resume-Ready Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#3d4a5c] text-[#6B7280] dark:text-[#E5E7EB] transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <img
              src={student.profileImage}
              alt=""
              loading="lazy"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#E5E7EB] dark:border-[#3d4a5c]"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-[#1F2937] dark:text-[#FFFFFF] truncate">{student.name}</h3>
              <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB]">{student.rollNumber} · {student.department} · Year {student.year}</p>
              <span
                className={clsx(
                  'inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                  student.statusBadge === 'core' && 'bg-[#2F8D46] text-white',
                  student.statusBadge === 'active' && 'bg-[#57B46E] text-white',
                  student.statusBadge === 'volunteer' && 'bg-[#1F6B34] text-white',
                  student.statusBadge === 'new' && 'bg-[#E5E7EB] dark:bg-[#3d4a5c] text-[#1F2937] dark:text-[#FFFFFF]'
                )}
              >
                {student.statusBadge}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <ProgressBar label="Problems solved" value={student.problemsSolved} max={MAX_PROBLEMS} />
            <ProgressBar label="Events attended" value={student.eventsAttended} max={MAX_EVENTS} />
            <ProgressBar label="Contribution hours" value={student.contributionHours} max={MAX_HOURS} />
          </div>
          <ResumeAchievementProfile student={student} />
        </div>
      </div>
    </div>
  );
}

export default function ParticipationTracker({
  onSearchQueryChange,
  searchQuery,
}: {
  onSearchQueryChange?: (q: string) => void;
  searchQuery?: string;
}) {
  const { showDetails } = useCardDetail();
  const [deptFilter, setDeptFilter] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<'activity' | 'problems' | 'streak' | 'points'>('points');
  const [localSearch, setLocalSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const query = searchQuery ?? localSearch;

  const filteredAndSorted = useMemo(() => {
    let list = [...STUDENTS];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rollNumber.toLowerCase().includes(q)
      );
    }
    if (deptFilter) list = list.filter((s) => s.department === deptFilter);
    if (yearFilter !== '') list = list.filter((s) => s.year === yearFilter);
    if (sortBy === 'activity') {
      list.sort((a, b) => b.eventsAttended + b.workshopsAttended - (a.eventsAttended + a.workshopsAttended));
    } else if (sortBy === 'problems') {
      list.sort((a, b) => b.problemsSolved - a.problemsSolved);
    } else if (sortBy === 'streak') {
      list.sort((a, b) => b.activityStreak - a.activityStreak);
    } else {
      list.sort((a, b) => b.points - a.points);
    }
    return list;
  }, [query, deptFilter, yearFilter, sortBy]);

  const topContributors = useMemo(
    () => [...STUDENTS].sort((a, b) => b.points - a.points).slice(0, 3),
    []
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchQueryChange?.(value);
  };

  const handleCardClick = (e: React.MouseEvent) => {
     if ((e.target as HTMLElement).closest('input, select, button')) return;
     
     showDetails({
       title: "Participation Tracker Analysis",
       subtitle: "Student Contribution Metrics",
       functionality: "Aggregates and filters student performance data across academic years and departments. It tracks problem-solving progress, event attendance, and contribution hours.",
       description: "This tracker provides a transparent view of member engagement. It allows the Core Team to identify top performers and help students build 'Resume-Ready' profiles by documenting their verified club contributions.",
       stats: [
         { label: "Tracked Students", value: STUDENTS.length },
         { label: "Total Points", value: STUDENTS.reduce((acc, s) => acc + s.points, 0).toLocaleString() },
         { label: "Avg. Problems", value: Math.round(STUDENTS.reduce((acc, s) => acc + s.problemsSolved, 0) / STUDENTS.length) }
       ],
       exportData: filteredAndSorted,
       componentName: "ParticipationTracker"
     });
  };

  return (
    <section 
      onClick={handleCardClick}
      className="glass-card overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-green-500/5 transition-all"
    >
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c] pointer-events-none">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <User className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Student Participation Tracker
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          View activity records and contributions
        </p>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[180px] sm:min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-[#E5E7EB]" />
            <input
              type="search"
              placeholder="Search by name or roll number..."
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="gfg-tracker-search w-full pl-10 pr-4 py-2.5 md:py-2 rounded-lg border border-[#E5E7EB] dark:border-[#3d4a5c] bg-white dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] placeholder:text-[#6B7280] dark:placeholder:text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#2F8D46]/30 dark:focus:ring-[#22C55E]/50 focus:border-[#2F8D46] transition-colors duration-200"
              aria-label="Search students"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-[#6B7280] dark:text-[#E5E7EB] shrink-0" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="gfg-tracker-select py-2.5 md:py-2 px-3 rounded-lg border border-[#E5E7EB] dark:border-[#3d4a5c] bg-white dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8D46]/30 dark:focus:ring-[#22C55E]/50 transition-colors duration-200"
              aria-label="Filter by department"
            >
              <option value="">All departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={yearFilter === '' ? '' : yearFilter}
              onChange={(e) => setYearFilter(e.target.value === '' ? '' : Number(e.target.value))}
              className="gfg-tracker-select py-2.5 md:py-2 px-3 rounded-lg border border-[#E5E7EB] dark:border-[#3d4a5c] bg-white dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8D46]/30 dark:focus:ring-[#22C55E]/50 transition-colors duration-200"
              aria-label="Filter by year"
            >
              <option value="">All years</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>Year {y}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="gfg-tracker-sort-btn flex items-center gap-2 py-2.5 md:py-2 px-3 rounded-lg border border-[#E5E7EB] dark:border-[#3d4a5c] bg-white dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] text-sm hover:bg-[#F9FAFB] dark:hover:bg-[#1c212e] transition-colors duration-200"
              aria-expanded={showSortDropdown}
              aria-haspopup="listbox"
            >
              <span className="whitespace-nowrap">Sort: {sortBy === 'activity' ? 'Activity' : sortBy === 'problems' ? 'Problems' : sortBy === 'streak' ? 'Streak' : 'Points'}</span>
              <ChevronDown className="w-4 h-4 shrink-0" />
            </button>
            {showSortDropdown && (
              <div
                className="absolute right-0 mt-1 w-44 py-1 bg-white dark:bg-[#141922] rounded-lg border border-[#E5E7EB] dark:border-[#3d4a5c] shadow-lg z-10"
                role="listbox"
              >
                {(['points', 'activity', 'problems', 'streak'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="option"
                    onClick={() => {
                      setSortBy(opt);
                      setShowSortDropdown(false);
                    }}
                    className={clsx(
                      'w-full text-left px-4 py-2 text-sm transition-colors duration-200',
                      sortBy === opt ? 'bg-[#F9FAFB] dark:bg-[#1F2937] text-[#2F8D46] dark:text-[#22C55E] font-medium' : 'text-[#1F2937] dark:text-[#FFFFFF] hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]'
                    )}
                  >
                    {opt === 'activity' ? 'Activity' : opt === 'problems' ? 'Problems solved' : opt === 'streak' ? 'Streak' : 'Points'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {topContributors.length > 0 && (
          <div className="gfg-top-contributors flex flex-wrap gap-2 sm:gap-3 p-3 rounded-lg bg-[#F9FAFB] dark:bg-[#1c212e] border border-[#E5E7EB] dark:border-[#3d4a5c]">
            <span className="text-sm font-medium text-[#6B7280] dark:text-[#E5E7EB] self-center w-full sm:w-auto">Top contributors:</span>
            {topContributors.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedStudent(s)}
                className="gfg-top-contributor-btn flex items-center gap-2 px-3 py-2 md:py-1.5 rounded-lg bg-[#FFFFFF] dark:bg-[#141922] border border-[#E5E7EB] dark:border-[#3d4a5c] hover:border-[#2F8D46] dark:hover:border-[#22C55E] hover:shadow-sm transition-colors duration-200 min-w-0"
              >
                <span className="inline-flex items-center justify-center min-w-[2rem] px-1.5 py-0.5 rounded-full text-xs font-bold bg-[#E5E7EB] dark:bg-[#1c212e] dark:border dark:border-[#22C55E]/60 text-[#1F2937] dark:text-[#22C55E] shrink-0">#{i + 1}</span>
                <img src={s.profileImage} alt="" loading="lazy" className="w-6 h-6 rounded-full shrink-0" />
                <span className="text-sm text-[#1F2937] dark:text-[#FFFFFF] truncate">{s.name}</span>
                <span className="text-xs text-[#6B7280] dark:text-[#E5E7EB] shrink-0">{s.points} pts</span>
              </button>
            ))}
          </div>
        )}

        {/* Mobile: cards. Tablet/Desktop: table */}
        {filteredAndSorted.length > 0 && (
        <>
        <div className="md:hidden space-y-3">
          {filteredAndSorted.map((s) => (
            <article
              key={s.id}
              className="rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] bg-white dark:bg-[#141922] p-4"
            >
              <div className="flex items-start gap-3">
                <img
                  src={s.profileImage}
                  alt=""
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#E5E7EB] dark:border-[#3d4a5c] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[#1F2937] dark:text-[#FFFFFF] truncate">{s.name}</h3>
                  <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">{s.rollNumber} · {s.department} · Year {s.year}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">Events {s.eventsAttended}</span>
                    <span className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">·</span>
                    <span className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">Problems {s.problemsSolved}</span>
                    <span className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">·</span>
                    <span className="inline-flex items-center gap-0.5 text-xs text-[#1F2937] dark:text-[#FFFFFF]">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      {s.activityStreak} streak
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                    <span
                      className={clsx(
                        'px-2 py-0.5 rounded-full text-xs font-medium capitalize',
                        s.statusBadge === 'core' && 'bg-[#2F8D46] text-white',
                        s.statusBadge === 'active' && 'bg-[#57B46E] text-white',
                        s.statusBadge === 'volunteer' && 'bg-[#1F6B34] text-white',
                        s.statusBadge === 'new' && 'bg-[#E5E7EB] dark:bg-[#3d4a5c] text-[#1F2937] dark:text-[#FFFFFF]'
                      )}
                    >
                      {s.statusBadge}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedStudent(s)}
                      className="text-sm font-medium text-[#2F8D46] dark:text-[#22C55E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8D46] dark:focus-visible:ring-[#22C55E] focus-visible:ring-offset-2 rounded px-2 py-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      View profile
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto -mx-4 lg:mx-0">
          <table className="w-full text-sm min-w-[640px] lg:min-w-0">
            <thead>
              <tr className="border-b border-[#E5E7EB] dark:border-[#3d4a5c] text-left text-[#6B7280] dark:text-[#E5E7EB]">
                <th className="pb-3 pr-2 sm:pr-4 font-medium">Student</th>
                <th className="pb-3 pr-2 sm:pr-4 font-medium">Dept</th>
                <th className="pb-3 pr-2 sm:pr-4 font-medium">Events</th>
                <th className="pb-3 pr-2 sm:pr-4 font-medium">Workshops</th>
                <th className="pb-3 pr-2 sm:pr-4 font-medium">Contests</th>
                <th className="pb-3 pr-2 sm:pr-4 font-medium">Problems</th>
                <th className="pb-3 pr-2 sm:pr-4 font-medium">Hours</th>
                <th className="pb-3 pr-2 sm:pr-4 font-medium">Streak</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-[#E5E7EB] dark:border-[#3d4a5c] hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937]/50 transition-colors duration-200"
                >
                  <td className="py-3 pr-2 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setSelectedStudent(s)}
                      className="flex items-center gap-2 text-left group min-w-0"
                    >
                      <img
                        src={s.profileImage}
                        alt=""
                        loading="lazy"
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-medium text-[#1F2937] dark:text-[#FFFFFF] group-hover:text-[#2F8D46] dark:group-hover:text-[#22C55E] block truncate">{s.name}</span>
                        <span className="block text-xs text-[#6B7280] dark:text-[#E5E7EB]">{s.rollNumber}</span>
                      </div>
                    </button>
                  </td>
                  <td className="py-3 pr-2 sm:pr-4 text-[#1F2937] dark:text-[#FFFFFF]">{s.department}</td>
                  <td className="py-3 pr-2 sm:pr-4 text-[#1F2937] dark:text-[#FFFFFF]">{s.eventsAttended}</td>
                  <td className="py-3 pr-2 sm:pr-4 text-[#1F2937] dark:text-[#FFFFFF]">{s.workshopsAttended}</td>
                  <td className="py-3 pr-2 sm:pr-4 text-[#1F2937] dark:text-[#FFFFFF]">{s.contestsParticipated}</td>
                  <td className="py-3 pr-2 sm:pr-4 text-[#1F2937] dark:text-[#FFFFFF]">{s.problemsSolved}</td>
                  <td className="py-3 pr-2 sm:pr-4 text-[#1F2937] dark:text-[#FFFFFF]">{s.contributionHours}</td>
                  <td className="py-3 pr-2 sm:pr-4">
                    <span className="inline-flex items-center gap-1 text-[#1F2937] dark:text-[#FFFFFF]">
                      <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                      {s.activityStreak}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={clsx(
                        'px-2 py-0.5 rounded-full text-xs font-medium capitalize',
                        s.statusBadge === 'core' && 'bg-[#2F8D46] text-white',
                        s.statusBadge === 'active' && 'bg-[#57B46E] text-white',
                        s.statusBadge === 'volunteer' && 'bg-[#1F6B34] text-white',
                        s.statusBadge === 'new' && 'bg-[#E5E7EB] dark:bg-[#3d4a5c] text-[#1F2937] dark:text-[#FFFFFF]'
                      )}
                    >
                      {s.statusBadge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
        )}
        {filteredAndSorted.length === 0 && (
          <p className="text-center py-8 text-[#6B7280] dark:text-[#E5E7EB]">No students match your filters.</p>
        )}
      </div>

      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </section>
  );
}


