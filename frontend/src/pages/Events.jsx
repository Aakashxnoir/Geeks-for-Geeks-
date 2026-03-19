import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/shared/PageLayout';
import { UPCOMING_EVENTS, PAST_EVENTS, EVENT_TABS, EVENT_TYPE_FILTERS, getEventPosterUrl } from '../data/eventsData';

const upcomingList = Array.isArray(UPCOMING_EVENTS) ? UPCOMING_EVENTS : [];
const pastList = Array.isArray(PAST_EVENTS) ? PAST_EVENTS : [];

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

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

  return (
    <PageLayout
      title="Events"
      subtitle="Workshops, contests, and hackathons by GFG Campus Club at RIT"
    >
      <section className="gfg-card min-h-[280px]" aria-label="Event list">
        <p className="text-sm text-[color:var(--gfg-text-secondary)] mb-3">
          <span className="font-semibold gfg-text-accent">Browse upcoming and past events.</span>{' '}
          {list.length > 0 && (
            <span className="font-medium text-[color:var(--gfg-text-primary)] dark:text-white">
              ({activeTab === 'upcoming' ? upcomingList.length : pastList.length}{' '}
              {activeTab === 'upcoming' ? 'upcoming' : 'past'})
            </span>
          )}
        </p>
        <div className="mb-4">
          <label htmlFor="events-search" className="sr-only">Search events</label>
          <input
            id="events-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by title, type..."
            className="w-full max-w-sm pl-9 pr-4 py-2 gfg-input"
            aria-label="Search events"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4" role="tablist">
          {EVENT_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#2F8D46] text-white dark:bg-[#22C55E] dark:text-white'
                  : 'bg-[#F9FAFB] dark:bg-[#1c212e] text-[#111827] dark:!text-[#FFFFFF] border border-[#E5E7EB] dark:!border-[#3d4a5c] hover:border-[#22C55E]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-medium text-[#4B5563] dark:!text-[#FFFFFF] self-center">Type:</span>
          {EVENT_TYPE_FILTERS.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                typeFilter === type
                  ? 'bg-[#2F8D46] text-white dark:bg-[#22C55E] dark:text-white'
                  : 'bg-[#F9FAFB] dark:bg-[#1c212e] text-[#111827] dark:!text-[#FFFFFF] border border-[#E5E7EB] dark:!border-[#3d4a5c] hover:border-[#22C55E]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.length > 0 ? (
            filtered.map((event) => {
              const poster = getEventPosterUrl(event);
              return (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="gfg-card-soft overflow-hidden block hover:no-underline"
                  aria-label={`View details for ${event.title}`}
                >
                  {poster ? (
                    <img
                      src={poster}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-lg mb-3 bg-[#E5E7EB] dark:bg-[#1c212e]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-40 rounded-lg mb-3 bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] dark:from-[#111827] dark:to-[#1F2937] flex items-center justify-center text-xs text-[#4B5563] dark:text-[#E5E7EB]">
                      Event poster coming soon
                    </div>
                  )}
                  <span className="text-xs font-medium text-[#2F8D46] dark:text-[#22C55E]">{event.type}</span>
                  {event.category && (
                    <span className="ml-2 text-xs text-[#4B5563] dark:!text-[#FFFFFF]">{event.category}</span>
                  )}
                  <h2 className="text-sm font-semibold text-[#111827] dark:!text-[#FFFFFF] mt-1">{event.title}</h2>
                  <p className="text-xs text-[#4B5563] dark:!text-[#FFFFFF] mt-0.5">{event.date}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-sm font-medium text-[#2F8D46] dark:text-[#22C55E]">
                      View details →
                    </span>
                    {activeTab === 'upcoming' && event.registrationLink && (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#2F8D46] dark:text-[#22C55E] hover:underline"
                      >
                        Register
                      </a>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="col-span-full text-sm text-[#4B5563] dark:!text-[#FFFFFF] py-6 text-center">
              No events match your search or filter.
            </p>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Events;
