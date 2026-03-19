/**
 * Events page data — single source from eventsMockData.
 * Ready for API swap later.
 */

import { UPCOMING_EVENTS, PAST_EVENTS, getEventById } from './eventsMockData';

export { UPCOMING_EVENTS, PAST_EVENTS, getEventById };

/** Returns a unique poster image URL per event for varied demo visuals. */
export function getEventPosterUrl(event) {
  if (!event) return '/placeholder-event.svg';
  if (event.posterUrl && !String(event.posterUrl).includes('placeholder')) return event.posterUrl;
  return `https://picsum.photos/seed/${event.id}/400/240`;
}

export const EVENT_TABS = [
  { id: 'upcoming', label: 'Upcoming Events' },
  { id: 'past', label: 'Past Events' },
];

export const EVENT_TYPE_FILTERS = ['All', 'Workshop', 'Contest', 'Event', 'Hackathon', 'Talk', 'Seminar'];
