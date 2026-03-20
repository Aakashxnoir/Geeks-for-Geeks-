/**
 * Events page data — single source from eventsMockData.
 * Ready for API swap later.
 */

import { UPCOMING_EVENTS, PAST_EVENTS, getEventById } from './eventsMockData';

export { UPCOMING_EVENTS, PAST_EVENTS, getEventById };

function escapeXml(input) {
  return String(input ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function svgDataUrlForEvent(event) {
  const id = String(event?.id ?? '');
  const title = escapeXml(event?.title ?? 'Event');
  const type = escapeXml(event?.type ?? event?.category ?? 'Event');
  const date = escapeXml(event?.date ?? '');

  // Deterministic hashing to vary shapes slightly per event.
  const hash = Array.from(id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const offsetA = hash % 40;
  const offsetB = (hash * 7) % 50;
  const r = 52 + (hash % 18);

  // Keep palette consistent (brand green) but vary layout slightly per event.
  const safeType = type.length > 18 ? `${type.slice(0, 18)}…` : type;
  const safeTitle = title.length > 26 ? `${title.slice(0, 26)}…` : title;
  const safeDate = date.length > 26 ? `${date.slice(0, 26)}…` : date;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16a34a" stop-opacity="1"/>
      <stop offset="100%" stop-color="#0f2d1a" stop-opacity="1"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <rect x="18" y="18" width="364" height="204" rx="22" fill="url(#g)" filter="url(#shadow)"/>
  <circle cx="${60 + offsetA}" cy="${70 + offsetB / 2}" r="${r}" fill="rgba(255,255,255,0.10)"/>
  <circle cx="${330 - offsetA}" cy="${58 + offsetB / 3}" r="${45 + (hash % 12)}" fill="rgba(0,0,0,0.16)"/>

  <text x="40" y="92" fill="#ffffff" font-family="Arial, sans-serif" font-size="18" font-weight="700">${safeType}</text>
  <text x="40" y="130" fill="#ffffff" font-family="Arial, sans-serif" font-size="22" font-weight="800">${safeTitle}</text>
  <text x="40" y="168" fill="rgba(255,255,255,0.85)" font-family="Arial, sans-serif" font-size="14" font-weight="600">${safeDate}</text>

  <text x="380" y="206" text-anchor="end" fill="rgba(255,255,255,0.45)" font-family="Arial, sans-serif" font-size="12">${escapeXml(id)}</text>
</svg>
`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Returns a deterministic poster image URL per event (no random images). */
export function getEventPosterUrl(event) {
  if (!event) return '/placeholder-event.svg';
  if (event.posterUrl && !String(event.posterUrl).includes('placeholder')) return event.posterUrl;
  return svgDataUrlForEvent(event);
}

export const EVENT_TABS = [
  { id: 'upcoming', label: 'Upcoming Events' },
  { id: 'past', label: 'Past Events' },
];

export const EVENT_TYPE_FILTERS = ['All', 'Workshop', 'Contest', 'Event', 'Hackathon', 'Talk', 'Seminar'];
