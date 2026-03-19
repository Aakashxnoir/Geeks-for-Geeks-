import { useState, useMemo } from 'react';
import { Calendar, ChevronRight, Clock, CheckCircle2, MapPin } from 'lucide-react';
import { UPCOMING_EVENTS, PAST_EVENTS, MY_EVENTS } from '@/src/data/communityMockData';

type Tab = 'upcoming' | 'past' | 'mine';

export default function EventManagementSection() {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [showAllEvents, setShowAllEvents] = useState(false);

  const eventsList = useMemo(() => {
    let list;
    switch (activeTab) {
      case 'upcoming': list = UPCOMING_EVENTS; break;
      case 'past': list = PAST_EVENTS; break;
      case 'mine': list = MY_EVENTS; break;
      default: list = UPCOMING_EVENTS;
    }
    return showAllEvents ? list : list.slice(0, 3);
  }, [activeTab, showAllEvents]);

  return (
    <section className="gfg-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#30363d]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1F2937] dark:text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
              Event Management
            </h2>
            <p className="text-sm text-[#6B7280] dark:text-white mt-1">
              Discover, register, and manage your GFG RIT events.
            </p>
          </div>
          <button
            onClick={() => setShowAllEvents(!showAllEvents)}
            className="px-4 py-2 bg-[#2F8D46] hover:bg-[#1F6B34] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white text-sm font-medium rounded-lg transition-colors shadow-sm self-start sm:self-auto"
          >
            {showAllEvents ? 'View Less' : 'View All Events'}
          </button>
        </div>

        <div className="flex gap-6 mt-6 border-b border-[#F3F4F6] dark:border-[#30363d]">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === 'upcoming'
                ? 'text-[#1F6B34] dark:text-[#22C55E]'
                : 'text-[#6B7280] hover:text-[#1F2937] dark:text-white dark:hover:text-white'
            }`}
          >
            Upcoming Events
            {activeTab === 'upcoming' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1F6B34] dark:bg-[#22C55E] rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === 'past'
                ? 'text-[#1F6B34] dark:text-[#22C55E]'
                : 'text-[#6B7280] hover:text-[#1F2937] dark:text-white dark:hover:text-white'
            }`}
          >
            Past Events
            {activeTab === 'past' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1F6B34] dark:bg-[#22C55E] rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('mine')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === 'mine'
                ? 'text-[#1F6B34] dark:text-[#22C55E]'
                : 'text-[#6B7280] hover:text-[#1F2937] dark:text-white dark:hover:text-white'
            }`}
          >
            My Registrations
            {activeTab === 'mine' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1F6B34] dark:bg-[#22C55E] rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {eventsList.length > 0 ? (
            eventsList.map((event) => (
              <div
                key={event.id}
                className="gfg-card-soft p-4 border border-[#E5E7EB] dark:border-[#30363d] hover:border-[#2F8D46] dark:hover:border-[#22C55E] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D1FAE5] text-[#047857] dark:bg-[#22C55E]/30 dark:text-[#A7F3D0] dark:border dark:border-[#22C55E]/50 shrink-0">
                      {event.category}
                    </span>
                    <span className="text-[#6B7280] dark:text-[#E5E7EB] text-xs font-semibold">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#1F2937] dark:text-white group-hover:text-[#2F8D46] dark:group-hover:text-[#22C55E] transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center text-sm text-[#4B5563] dark:text-[#E5E7EB]">
                      <Clock className="w-4 h-4 mr-2 shrink-0 text-[#6B7280] dark:text-[#9CA3AF]" />
                      <span className="dark:text-white">{event.date} • 10:00 AM</span>
                    </div>
                    <div className="flex items-center text-sm text-[#4B5563] dark:text-[#E5E7EB]">
                      <MapPin className="w-4 h-4 mr-2 shrink-0 text-[#6B7280] dark:text-[#9CA3AF]" />
                      <span className="dark:text-white">RIT Main Auditorium</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E7EB] dark:border-[#30363d] flex items-center justify-between">
                  {activeTab === 'past' ? (
                    <span className="text-sm font-medium text-[#6B7280] dark:text-white">Completed</span>
                  ) : activeTab === 'mine' ? (
                    <span className="text-sm font-medium flex items-center gap-1.5 text-[#22C55E] dark:text-[#4ADE80]">
                      <CheckCircle2 className="w-4 h-4" /> Registered
                    </span>
                  ) : (
                    <a
                      href={event.registrationLink || 'https://docs.google.com/forms/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#2F8D46] dark:text-[#22C55E] hover:text-[#1F6B34] dark:hover:text-[#4ADE80] flex items-center"
                    >
                      Register Now
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-[#6B7280] dark:text-white text-sm">
              No events found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
