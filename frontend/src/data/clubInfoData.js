/**
 * Club Information page mock data — GFG Campus Club RIT.
 * Single source for team, objectives, stats, activities; ready for API swap.
 */

export const CLUB_TEAM = [
  { name: 'Dr. A. Ramesh Kumar', role: 'Faculty Advisor', roleIcon: '🎓', deptYear: 'Associate Professor, Dept. of CSE', bio: 'Guiding with academic expertise.' },
  { name: 'Aravind Renganathan', role: 'President', roleIcon: '👑', deptYear: 'Final Year, CSE', bio: 'Leading competitive programming with passion.' },
  { name: 'Priya S', role: 'Vice President', roleIcon: '⭐', deptYear: 'Third Year, IT', bio: 'Building an inclusive community.' },
  { name: 'Nidhin G', role: 'Technical Head', roleIcon: '⚙️', deptYear: 'Second Year, CSBS', bio: 'ML/DSA mentor.' },
];

export const CLUB_OBJECTIVES = [
  { icon: '📚', title: 'DSA & Problem-Solving', description: 'Promote data structures, algorithms, and problem-solving through regular practice and contests.' },
  { icon: '🏆', title: 'Hackathons & Workshops', description: 'Organize hackathons, workshops, and tech talks to build practical and industry-relevant skills.' },
  { icon: '🤝', title: 'Inclusive Community', description: 'Create an environment where students of all levels can learn and mentor each other.' },
  { icon: '💼', title: 'Industry Connections', description: 'Connect members with industry experts and career opportunities in tech.' },
  { icon: '🇮🇳', title: 'National Presence', description: 'Represent RIT at national coding platforms and foster a culture of continuous learning.' },
  { icon: '✍️', title: 'Open Source & GfG', description: 'Encourage contributions to GeeksforGeeks articles and open-source projects.' },
];

export const CLUB_STATS = [
  { label: 'Members', value: 120 },
  { label: 'Workshops Conducted', value: 24 },
  { label: 'Hackathons', value: 12 },
  { label: 'Coding Problems Solved', value: 3500 },
];

export const CLUB_ACTIVITIES = [
  { icon: '📅', label: 'Workshops', text: 'DSA, web dev & emerging tech' },
  { icon: '🏆', label: 'Coding Contests', text: 'Regular practice & competitions' },
  { icon: '🤝', label: 'Mentorship', text: 'Peer learning & guidance' },
];
