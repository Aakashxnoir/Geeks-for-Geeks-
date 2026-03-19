import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PageLayout from '../components/shared/PageLayout';
import { UPCOMING_EVENTS, getEventById, getEventPosterUrl } from '../data/eventsData';

const EventDetail = () => {
  const { id } = useParams();
  const event = getEventById(id);

  if (!event) {
    return (
      <PageLayout title="Event not found" subtitle="">
        <section className="gfg-card text-center">
          <p className="text-[#4B5563] dark:text-white mb-4">The event you are looking for does not exist or has been removed.</p>
          <Link to="/events" className="text-[#2F8D46] dark:text-[#22C55E] font-medium hover:underline">Back to Events</Link>
        </section>
      </PageLayout>
    );
  }

  const isUpcoming = UPCOMING_EVENTS.some((e) => e.id === event.id);
  const regLink = event.registrationLink || 'https://docs.google.com/forms/';

  return (
    <PageLayout
      title={event.title}
      subtitle={`${event.type}${event.category ? ` · ${event.category}` : ''} — ${event.date}`}
    >
      <div className="gfg-bento-grid mb-4">
        <Link
          to="/events"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2F8D46] dark:text-[#22C55E] hover:underline"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden />
          Back to Events
        </Link>
        <img
          src={getEventPosterUrl(event)}
          alt=""
          className="w-full max-h-48 object-cover rounded-xl bg-[#E5E7EB] dark:bg-[#1c212e] gfg-bento-span-2"
        />
      </div>
      <section className="gfg-card space-y-4" aria-labelledby="event-desc-heading">
        <h2 id="event-desc-heading" className="text-base sm:text-lg font-bold text-[#111827] dark:text-[#FFFFFF]">
          About this event
        </h2>
        <p className="text-sm text-[#4B5563] dark:text-white">{event.description}</p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-[#4B5563] dark:text-white font-medium">Date & time</dt>
            <dd className="text-[#111827] dark:text-[#FFFFFF]">{event.date}{event.time ? ` · ${event.time}` : ''}</dd>
          </div>
          <div>
            <dt className="text-[#4B5563] dark:text-white font-medium">Venue</dt>
            <dd className="text-[#111827] dark:text-[#FFFFFF]">{event.venue || 'TBA'}{event.mode ? ` (${event.mode})` : ''}</dd>
          </div>
          {event.speaker && (
            <div>
              <dt className="text-[#4B5563] dark:text-white font-medium">Speaker(s)</dt>
              <dd className="text-[#111827] dark:text-[#FFFFFF]">{event.speaker}</dd>
            </div>
          )}
          <div>
            <dt className="text-[#4B5563] dark:text-white font-medium">Registration</dt>
            <dd className="text-[#111827] dark:text-[#FFFFFF]">{event.registrationStatus === 'open' ? 'Open' : 'Closed'}</dd>
          </div>
        </dl>
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md text-xs font-medium bg-[#E5E7EB] dark:bg-[#1c212e] text-[#374151] dark:text-white border border-[#E5E7EB] dark:border-[#30363d]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>
      <section className="flex flex-wrap gap-3">
        {isUpcoming && event.registrationStatus === 'open' && (
          <a
            href={regLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#2F8D46] dark:bg-[#22C55E] text-white dark:text-[#052E16] hover:opacity-90 transition-opacity"
          >
            Register for this event
          </a>
        )}
        <Link
          to="/events"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#F9FAFB] dark:bg-[#1c212e] text-[#111827] dark:text-[#FFFFFF] border border-[#E5E7EB] dark:border-[#30363d] hover:border-[#22C55E] transition-colors"
        >
          Back to Events
        </Link>
      </section>
    </PageLayout>
  );
};

export default EventDetail;
