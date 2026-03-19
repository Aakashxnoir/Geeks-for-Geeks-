/**
 * Contact page mock data — GFG Campus Club RIT.
 * Single source for stats, team contacts, social links, FAQ; ready for API swap.
 */

export const CONTACT_STATS = [
  { label: 'Club Members', value: 120, suffix: '+' },
  { label: 'Events Conducted', value: 24, suffix: '' },
  { label: 'Coding Problems Solved', value: 3500, suffix: '+' },
];

export const TEAM_CONTACTS = [
  { name: 'Nidhin G', role: 'Club Lead', phone: '+91 75581 24869', wa: '917558124869', email: null },
  { name: 'Praveen M', role: 'Tech Lead', phone: '+91 94447 13860', wa: '919444713860', email: null },
  { name: 'Rajaram S', role: 'Core Team', phone: '+91 72007 39397', wa: '917200739397', email: null },
  { name: 'Monish S', role: 'Core Team', phone: '+91 63833 65117', wa: '916383365117', email: null },
];

export const CLUB_EMAIL = 'gfg.ritclub@gmail.com';

export const SOCIAL_CARDS = [
  { label: 'Instagram', href: 'https://www.instagram.com/geeksforgeeks.rit', icon: '📷', color: '#E4405F', description: 'Follow our coding journey, events, and campus updates.' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gfg-rit/', icon: '💼', color: '#0A66C2', description: 'Connect professionally and stay updated on opportunities.' },
];

export const FAQ_ITEMS = [
  { q: 'How to join the GFG club?', a: 'Reach out via the contact form, WhatsApp, or email. You can also connect with us at our events and workshops on campus.' },
  { q: 'When are events conducted?', a: 'We conduct workshops, coding sessions, and hackathons throughout the semester. Follow our social media and check the Events page for the calendar.' },
  { q: 'Who can participate?', a: 'Any student from RIT (all years and branches) can join. We welcome beginners and advanced coders alike.' },
];

export const SUBJECT_OPTIONS = ['General Query', 'Event Registration', 'Resource Request', 'Collaboration', 'Bug Report', 'Other'];

export const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.977764!2d80.038456!3d12.834567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRajalakshmi%20Institute%20of%20Technology!5e0!3m2!1sen!2sin';

/** Chatbot: keywords (lowercase) -> answer about the website */
export const CHATBOT_KNOWLEDGE = [
  { keywords: ['what is', 'about', 'club', 'gfg rit', 'who are'], answer: 'GeeksforGeeks Campus Club at RIT is a student-led tech community powered by GeeksforGeeks. We run workshops on DSA and web development, coding contests, hackathons, and placement prep. We help you master DSA, build projects, and get placement-ready.' },
  { keywords: ['event', 'events', 'workshop', 'contest', 'hackathon'], answer: 'We run workshops (DSA, React, etc.), monthly coding contests, hackathons, and placement prep sessions. Check the Events page for upcoming dates and registration. Events are held on campus and sometimes online.' },
  { keywords: ['resource', 'resources', 'learn', 'dsa', 'material'], answer: 'The Resources page has curated learning materials: DSA, programming languages, interview prep, web development, and competitive programming. Each resource has difficulty, estimated time, and links to get started.' },
  { keywords: ['join', 'how to join', 'become member', 'participate'], answer: 'You can join by reaching out via the Contact form, WhatsApp, or email (gfg.ritclub@gmail.com). You can also connect with us at events and workshops on campus. Any RIT student (all years and branches) can join.' },
  { keywords: ['contact', 'email', 'phone', 'reach', 'where'], answer: 'Contact us via the Contact page: use the form, or email gfg.ritclub@gmail.com. Team contacts (Club Lead, Tech Lead) are listed on the Contact page with phone and WhatsApp. We are at Rajalakshmi Institute of Technology, Chennai.' },
  { keywords: ['community', 'members'], answer: 'The Community page shows member activity, leaderboards, top contributors, Member of the Month, and blog posts. You can explore events, achievements, and learning resources there.' },
  { keywords: ['home', 'homepage'], answer: 'The Home page gives an overview: about the club, key stats, upcoming events preview, learning resources preview, community highlights, and why join. Use the navigation to go to any section.' },
  { keywords: ['hello', 'hi', 'hey'], answer: 'Hi! I\'m the GFG RIT website assistant. Ask me about the club, events, resources, how to join, or contact info.' },
];
