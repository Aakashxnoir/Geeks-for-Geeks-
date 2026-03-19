import { useMemo } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { UPCOMING_EVENTS, STUDENTS } from '../../utils/data/communityMockData';

interface EventRecommendationsProps {
  studentId?: string;
}

export default function EventRecommendations({ studentId }: EventRecommendationsProps) {
  const recommended = useMemo(() => {
    const student = studentId ? STUDENTS.find((s) => s.id === studentId) : STUDENTS[0];
    if (!student) return UPCOMING_EVENTS.slice(0, 3);
    const prefersDSA = student.problemsSolved > 150;
    const prefersWorkshops = student.workshopsAttended > student.eventsAttended;
    return [...UPCOMING_EVENTS]
      .sort((a, b) => {
        if (prefersDSA && a.category === 'DSA') return -1;
        if (prefersDSA && b.category === 'DSA') return 1;
        if (prefersWorkshops && a.type === 'Workshop') return -1;
        if (prefersWorkshops && b.type === 'Workshop') return 1;
        return 0;
      })
      .slice(0, 4);
  }, [studentId]);

  return (
    <section className="bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Recommended for you
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          Upcoming events based on your activity
        </p>
      </div>
      <div className="p-4 sm:p-6">
        <ul className="space-y-2">
          {recommended.map((event) => (
            <li key={event.id}>
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] hover:border-[#2F8D46] dark:hover:border-[#22C55E]/60 transition-colors group">
                <div className="min-w-0">
                  <p className="font-medium text-[#1F2937] dark:text-[#FFFFFF] truncate">{event.title}</p>
                  <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">{event.date} · {event.type}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6B7280] dark:text-[#E5E7EB] shrink-0 group-hover:text-[#2F8D46] dark:group-hover:text-[#22C55E]" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

