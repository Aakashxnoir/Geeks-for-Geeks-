import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { EVENT_TABS, EVENT_TYPE_FILTERS, getEventPosterUrl } from '../utils/data/eventsData';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [upcomingList, setUpcomingList] = useState<Array<any>>([]);
  const [pastList, setPastList] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/events/upcoming`),
          fetch(`${API_BASE_URL}/api/events/past`),
        ]);

        const upcomingData = await upcomingRes.json();
        const pastData = await pastRes.json();

        if (cancelled) return;
        setUpcomingList(Array.isArray(upcomingData?.events) ? upcomingData.events : []);
        setPastList(Array.isArray(pastData?.events) ? pastData.events : []);
      } catch {
        if (cancelled) return;
        setUpcomingList([]);
        setPastList([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [API_BASE_URL]);

  const list = activeTab === 'upcoming' ? upcomingList : pastList;
  const q = searchQuery.trim().toLowerCase();
  const bySearch = q
    ? list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.type && e.type.toLowerCase().includes(q)) ||
          (e.category && e.category.toLowerCase().includes(q))
      )
    : list;
  const filtered =
    typeFilter === 'All'
      ? bySearch
      : bySearch.filter((e) => e.type && e.type.toLowerCase() === typeFilter.toLowerCase());

  const handleEventClick = (_e: React.MouseEvent, _event: any) => {
    // Navigate directly to event detail page — no popup overlay
  };

  return (
    <PageLayout
      title="Events"
      subtitle="Workshops, contests, and hackathons by GFG Campus Club at RIT"
    >
      <section className="col-span-12 glass-panel min-h-[280px] p-4 sm:p-6" aria-label="Event list">
        {/* ... existing search and tabs ... */}
        {isLoading ? (
          <p className="text-sm text-[#4B5563] dark:!text-[#FFFFFF] py-8 text-center">Loading events...</p>
        ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map((event) => {
              const poster = getEventPosterUrl(event);
              return (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  onClick={(e) => handleEventClick(e, event)}
                  className="glass-card overflow-hidden block hover:no-underline p-4 cursor-pointer hover:ring-2 hover:ring-[color:var(--gfg-accent)] active:scale-[0.98] transition-all"
                  aria-label={`View details for ${event.title}`}
                >
                  {poster ? (
                    <img
                      src={poster}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-lg mb-3 bg-[#E5E7EB] dark:bg-[#1c212e] pointer-events-none"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-40 rounded-lg mb-3 bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] dark:from-[#111827] dark:to-[#1F2937] flex items-center justify-center text-xs text-[#4B5563] dark:text-[#E5E7EB] pointer-events-none">
                      Event poster coming soon
                    </div>
                  )}
                  <span className="text-xs font-medium text-[#2F8D46] dark:text-[#22C55E] pointer-events-none">{event.type}</span>
                  {event.category && (
                    <span className="ml-2 text-xs text-[#4B5563] dark:!text-[#FFFFFF] pointer-events-none">{event.category}</span>
                  )}
                  <h2 className="text-sm font-semibold text-[#111827] dark:!text-[#FFFFFF] mt-1 pointer-events-none">{event.title}</h2>
                  <p className="text-xs text-[#4B5563] dark:!text-[#FFFFFF] mt-0.5 pointer-events-none">{event.date}</p>
                  <div className="flex flex-wrap gap-2 mt-3 pointer-events-none">
                    <span className="text-sm font-medium text-[#2F8D46] dark:text-[#22C55E]">
                      View details →
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-sm text-[#4B5563] dark:!text-[#FFFFFF] py-6 text-center col-span-2 lg:col-span-3">
              No events match your search or filter.
            </p>
          )}
        </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Events;
