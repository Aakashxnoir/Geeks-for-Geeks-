/**
 * Home page mock data — GFG Campus Club RIT.
 * Central overview content; no duplication of full Community module.
 */

export const HERO = {
  title: 'GeeksforGeeks Campus Club',
  tagline: 'Learn, compete, and grow together',
  subtitle: 'Rajalakshmi Institute of Technology (RIT)',
  description: 'A student-led tech community powered by GeeksforGeeks. Master DSA, build projects, and get placement-ready with workshops, contests, and peer support.',
};

/** Rotating / moving card titles for hero (modern strip) */
export const HERO_MOVING_TITLES = [
  'Workshops',
  'Contests',
  'DSA',
  'Placement',
  'Community',
  'Hackathons',
  'Peer Support',
  'Industry Ready',
];

/** Short feature cards replacing long "About" block */
export const HERO_FEATURE_CARDS = [
  { title: 'Workshops & Sessions', short: 'Hands-on DSA, web dev, CP' },
  { title: 'Contests & Hackathons', short: 'Compete and build with peers' },
  { title: 'Placement Prep', short: 'Resume reviews, mocks, prep' },
  { title: 'Community & Mentorship', short: 'Learn and grow together' },
];

export const ABOUT_SNAPSHOT = {
  what: 'We run workshops on DSA and web development, coding contests, hackathons, and placement prep sessions. Our members collaborate on projects and learn from industry experts.',
  collaboration: 'As an official GeeksforGeeks Campus Chapter, we get access to curated content, practice portals, and events that help students become industry-ready.',
  benefits: 'Structured learning paths, peer mentoring, contest practice, resume reviews, and a supportive network of like-minded coders.',
  impact: 'Members have cracked placements at top companies and consistently perform in coding competitions. Join to be part of the journey.',
};

export const STATS = [
  { label: 'Club Members', value: '120+', icon: 'members' },
  { label: 'Events Conducted', value: '24', icon: 'events' },
  { label: 'Workshops Organized', value: '18', icon: 'workshops' },
  { label: 'Problems Solved', value: '3500+', icon: 'problems' },
  { label: 'Active Contributors', value: '45+', icon: 'contributors' },
];

/** Displayed as "As of [date]" under stats for transparency. */
export const STATS_AS_OF = 'March 2025';

export const WHY_JOIN = [
  {
    title: 'Skill development',
    description: 'Structured DSA, web dev, and CP tracks with hands-on workshops and practice.',
    icon: 'skills',
  },
  {
    title: 'Networking',
    description: 'Connect with seniors, peers, and industry mentors. Collaborate on projects and form teams.',
    icon: 'network',
  },
  {
    title: 'Placement preparation',
    description: 'Resume reviews, mock interviews, and company-specific prep sessions.',
    icon: 'placement',
  },
  {
    title: 'Real-world exposure',
    description: 'Hackathons, open source, and live projects that look great on your profile.',
    icon: 'exposure',
  },
];

export const CTA_BANNER = {
  title: 'Ready to level up?',
  subtitle: 'Join the club, participate in events, and start your learning journey with GFG RIT.',
  primaryLabel: 'Join the club',
  secondaryLabel: 'View events',
};

export const COMMUNITY_TEASER = {
  topContributors: [
    { name: 'Christopher J', department: 'CSE', badge: 'Member of the Month' },
    { name: 'Avineshwaran A', department: 'CSE', badge: 'Top Coder' },
    { name: 'Austin Joshua M', department: 'CSE', badge: 'Event Champion' },
  ],
  memberSpotlight: {
    name: 'Christopher J',
    role: 'Member of the Month',
    highlight: 'Leading contributions in contests and workshops this month.',
  },
  recentAchievement: 'Avineshwaran A reached 500 problems solved',
};

export const FEATURED_BLOG = [
  { title: 'Getting Started with DSA: A Complete Roadmap', author: 'Austin Joshua M', category: 'DSA' },
  { title: 'Placement Season Tips from Seniors', author: 'Aditya Parthasarathy', category: 'Careers' },
  { title: 'Recap: GFG RIT Coding Contest March 2025', author: 'Avineshwaran A', category: 'Events' },
];

export const CONTACT_PREVIEW = {
  email: 'gfg.ritclub@gmail.com',
  tagline: 'Questions? Want to collaborate? Reach out.',
};
