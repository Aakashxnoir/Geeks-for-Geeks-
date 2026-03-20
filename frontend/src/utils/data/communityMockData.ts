/**
 * Mock data for Community Features module.
 * GFG Campus Club — Rajalakshmi Institute of Technology (RIT).
 * Structure ready for API replacement — swap this file or add API calls later.
 */

// ─── GFG RIT Campus Club — Team / Member list (mock data) ───────────────────
/** Display names for GFG RIT team (use for labels, spotlights, etc.). */
export const GFG_RIT_MEMBER_NAMES = [
  'Austin Joshua M',
  'Christopher J',
  'Aakash B K',
  'Aseema S',
  'Avineshwaran A',
  'Abishek',
  'Abimanue M',
  'Arvind N',
  'Darshan B',
  'Darshan A R',
  'Aditya Parthasarathy',
  'Aravind Raj',
] as const;
// ───────────────────────────────────────────────────────────────────────────

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  profileImage: string;
  department: string;
  year: number;
  eventsAttended: number;
  workshopsAttended: number;
  contestsParticipated: number;
  problemsSolved: number;
  contributionHours: number;
  certificatesEarned: number;
  activityStreak: number;
  longestStreak?: number;
  statusBadge: 'active' | 'core' | 'new' | 'volunteer';
  points: number;
  badges: string[];
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  profileImage: string;
  department: string;
  score: number;
  badges: string[];
  trend: 'up' | 'down' | 'same';
  previousRank?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  tags: string[];
  description: string;
  coverImage: string;
  category: string;
  likes: number;
  commentCount: number;
  featured?: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'event' | 'contest' | 'workshop' | 'achievement' | 'blog';
  title: string;
  user?: string;
  timestamp: string;
  icon: string;
}

export interface AnalyticsSummary {
  totalMembers: number;
  activeThisMonth: number;
  eventsConducted: number;
  totalParticipation: number;
  growthPercent: number;
  topDepartment: string;
  topDepartmentCount: number;
}

/** Student/member records — GFG RIT team (Austin Joshua M, Christopher J, Aakash B K, Aseema S, Avineshwaran A, Abishek, Abimanue M, Arvind N, Darshan B, Darshan A R, Aditya Parthasarathy, Aravind Raj). */
export const STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Austin Joshua M',
    rollNumber: '21CS001',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Austin',
    department: 'CSE',
    year: 3,
    eventsAttended: 12,
    workshopsAttended: 8,
    contestsParticipated: 15,
    problemsSolved: 340,
    contributionHours: 45,
    certificatesEarned: 6,
    activityStreak: 14,
    longestStreak: 21,
    statusBadge: 'core',
    points: 2850,
    badges: ['Top Coder', 'Event Champion', 'Streak Master'],
  },
  {
    id: '2',
    name: 'Christopher J',
    rollNumber: '21CS002',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher',
    department: 'CSE',
    year: 3,
    eventsAttended: 10,
    workshopsAttended: 6,
    contestsParticipated: 12,
    problemsSolved: 420,
    contributionHours: 38,
    certificatesEarned: 5,
    activityStreak: 21,
    longestStreak: 28,
    statusBadge: 'active',
    points: 3120,
    badges: ['Problem Solver', 'Consistent'],
  },
  {
    id: '3',
    name: 'Aakash B K',
    rollNumber: '22IT001',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aakash',
    department: 'IT',
    year: 2,
    eventsAttended: 8,
    workshopsAttended: 5,
    contestsParticipated: 9,
    problemsSolved: 180,
    contributionHours: 22,
    certificatesEarned: 3,
    activityStreak: 7,
    statusBadge: 'volunteer',
    points: 1650,
    badges: ['Volunteer', 'Rising Star'],
  },
  {
    id: '4',
    name: 'Avineshwaran A',
    rollNumber: '20CS015',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avineshwaran',
    department: 'CSE',
    year: 4,
    eventsAttended: 18,
    workshopsAttended: 12,
    contestsParticipated: 22,
    problemsSolved: 520,
    contributionHours: 68,
    certificatesEarned: 9,
    activityStreak: 30,
    longestStreak: 35,
    statusBadge: 'core',
    points: 4100,
    badges: ['Top Coder', 'Event Champion', 'Mentor', 'Streak Master'],
  },
  {
    id: '5',
    name: 'Aseema S',
    rollNumber: '23ECE001',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aseema',
    department: 'ECE',
    year: 1,
    eventsAttended: 3,
    workshopsAttended: 2,
    contestsParticipated: 4,
    problemsSolved: 45,
    contributionHours: 8,
    certificatesEarned: 1,
    activityStreak: 5,
    statusBadge: 'new',
    points: 420,
    badges: ['Newcomer'],
  },
  {
    id: '6',
    name: 'Abishek',
    rollNumber: '21CS010',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abishek',
    department: 'CSE',
    year: 3,
    eventsAttended: 9,
    workshopsAttended: 7,
    contestsParticipated: 11,
    problemsSolved: 290,
    contributionHours: 32,
    certificatesEarned: 4,
    activityStreak: 12,
    statusBadge: 'active',
    points: 2180,
    badges: ['Problem Solver'],
  },
  {
    id: '7',
    name: 'Abimanue M',
    rollNumber: '22CS005',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abimanue',
    department: 'CSE',
    year: 2,
    eventsAttended: 7,
    workshopsAttended: 6,
    contestsParticipated: 8,
    problemsSolved: 210,
    contributionHours: 28,
    certificatesEarned: 4,
    activityStreak: 9,
    statusBadge: 'active',
    points: 1890,
    badges: ['Rising Star'],
  },
  {
    id: '8',
    name: 'Aditya Parthasarathy',
    rollNumber: '20IT008',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaP',
    department: 'IT',
    year: 4,
    eventsAttended: 14,
    workshopsAttended: 10,
    contestsParticipated: 18,
    problemsSolved: 380,
    contributionHours: 52,
    certificatesEarned: 7,
    activityStreak: 18,
    statusBadge: 'core',
    points: 2980,
    badges: ['Event Champion', 'Top Coder'],
  },
  {
    id: '9',
    name: 'Arvind N',
    rollNumber: '21CS011',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind',
    department: 'CSE',
    year: 3,
    eventsAttended: 8,
    workshopsAttended: 5,
    contestsParticipated: 10,
    problemsSolved: 220,
    contributionHours: 26,
    certificatesEarned: 3,
    activityStreak: 8,
    statusBadge: 'active',
    points: 1720,
    badges: ['Rising Star'],
  },
  {
    id: '10',
    name: 'Darshan B',
    rollNumber: '22CS006',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarshanB',
    department: 'CSE',
    year: 2,
    eventsAttended: 6,
    workshopsAttended: 4,
    contestsParticipated: 7,
    problemsSolved: 165,
    contributionHours: 18,
    certificatesEarned: 2,
    activityStreak: 6,
    statusBadge: 'active',
    points: 1380,
    badges: ['Active Member'],
  },
  {
    id: '11',
    name: 'Darshan A R',
    rollNumber: '21CS012',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarshanAR',
    department: 'CSE',
    year: 3,
    eventsAttended: 7,
    workshopsAttended: 5,
    contestsParticipated: 9,
    problemsSolved: 195,
    contributionHours: 24,
    certificatesEarned: 3,
    activityStreak: 10,
    statusBadge: 'active',
    points: 1590,
    badges: ['Problem Solver'],
  },
  {
    id: '12',
    name: 'Aravind Raj',
    rollNumber: '22IT002',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aravind',
    department: 'IT',
    year: 2,
    eventsAttended: 5,
    workshopsAttended: 4,
    contestsParticipated: 6,
    problemsSolved: 140,
    contributionHours: 16,
    certificatesEarned: 2,
    activityStreak: 5,
    statusBadge: 'active',
    points: 1210,
    badges: ['Active Member'],
  },
  // ── AIDS ──────────────────────────────────────
  {
    id: '13',
    name: 'Priya Nair',
    rollNumber: '22AIDS001',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    department: 'AIDS',
    year: 2,
    eventsAttended: 9,
    workshopsAttended: 6,
    contestsParticipated: 10,
    problemsSolved: 230,
    contributionHours: 30,
    certificatesEarned: 4,
    activityStreak: 11,
    statusBadge: 'active',
    points: 2040,
    badges: ['Rising Star', 'Problem Solver'],
  },
  {
    id: '14',
    name: 'Kiran Mohan',
    rollNumber: '23AIDS002',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiran',
    department: 'AIDS',
    year: 1,
    eventsAttended: 4,
    workshopsAttended: 3,
    contestsParticipated: 5,
    problemsSolved: 80,
    contributionHours: 10,
    certificatesEarned: 1,
    activityStreak: 4,
    statusBadge: 'new',
    points: 680,
    badges: ['Newcomer'],
  },
  {
    id: '15',
    name: 'Sneha Ramesh',
    rollNumber: '21AIDS003',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    department: 'AIDS',
    year: 3,
    eventsAttended: 11,
    workshopsAttended: 7,
    contestsParticipated: 13,
    problemsSolved: 310,
    contributionHours: 40,
    certificatesEarned: 5,
    activityStreak: 15,
    statusBadge: 'core',
    points: 2650,
    badges: ['Top Coder', 'Mentor'],
  },
  // ── AIML ──────────────────────────────────────
  {
    id: '16',
    name: 'Rajan Krishnan',
    rollNumber: '21AIML001',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajan',
    department: 'AIML',
    year: 3,
    eventsAttended: 13,
    workshopsAttended: 9,
    contestsParticipated: 14,
    problemsSolved: 360,
    contributionHours: 48,
    certificatesEarned: 6,
    activityStreak: 19,
    statusBadge: 'core',
    points: 3050,
    badges: ['Top Coder', 'Event Champion'],
  },
  {
    id: '17',
    name: 'Divya Suresh',
    rollNumber: '22AIML002',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divya',
    department: 'AIML',
    year: 2,
    eventsAttended: 7,
    workshopsAttended: 5,
    contestsParticipated: 8,
    problemsSolved: 195,
    contributionHours: 24,
    certificatesEarned: 3,
    activityStreak: 8,
    statusBadge: 'active',
    points: 1740,
    badges: ['Active Member'],
  },
  {
    id: '18',
    name: 'Nikhil Varma',
    rollNumber: '22AIML003',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nikhil',
    department: 'AIML',
    year: 2,
    eventsAttended: 6,
    workshopsAttended: 4,
    contestsParticipated: 7,
    problemsSolved: 155,
    contributionHours: 18,
    certificatesEarned: 2,
    activityStreak: 6,
    statusBadge: 'active',
    points: 1320,
    badges: ['Rising Star'],
  },
  // ── VLSI ──────────────────────────────────────
  {
    id: '19',
    name: 'Harish Kumar',
    rollNumber: '21VLSI001',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harish',
    department: 'VLSI',
    year: 3,
    eventsAttended: 7,
    workshopsAttended: 5,
    contestsParticipated: 8,
    problemsSolved: 160,
    contributionHours: 20,
    certificatesEarned: 3,
    activityStreak: 7,
    statusBadge: 'active',
    points: 1480,
    badges: ['Active Member'],
  },
  {
    id: '20',
    name: 'Meena Selvam',
    rollNumber: '22VLSI002',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meena',
    department: 'VLSI',
    year: 2,
    eventsAttended: 5,
    workshopsAttended: 3,
    contestsParticipated: 5,
    problemsSolved: 110,
    contributionHours: 13,
    certificatesEarned: 2,
    activityStreak: 4,
    statusBadge: 'active',
    points: 1050,
    badges: ['Active Member'],
  },
  // ── CCE ──────────────────────────────────────
  {
    id: '21',
    name: 'Tharun Raj',
    rollNumber: '21CCE001',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tharun',
    department: 'CCE',
    year: 3,
    eventsAttended: 10,
    workshopsAttended: 8,
    contestsParticipated: 11,
    problemsSolved: 260,
    contributionHours: 34,
    certificatesEarned: 4,
    activityStreak: 12,
    statusBadge: 'active',
    points: 2210,
    badges: ['Problem Solver', 'Active Member'],
  },
  {
    id: '22',
    name: 'Lavanya Prabhu',
    rollNumber: '22CCE002',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lavanya',
    department: 'CCE',
    year: 2,
    eventsAttended: 6,
    workshopsAttended: 4,
    contestsParticipated: 7,
    problemsSolved: 140,
    contributionHours: 17,
    certificatesEarned: 2,
    activityStreak: 6,
    statusBadge: 'active',
    points: 1160,
    badges: ['Rising Star'],
  },
  // ── ECE ──────────────────────────────────────
  {
    id: '23',
    name: 'Vishnu Anand',
    rollNumber: '21ECE001',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vishnu',
    department: 'ECE',
    year: 3,
    eventsAttended: 8,
    workshopsAttended: 6,
    contestsParticipated: 9,
    problemsSolved: 200,
    contributionHours: 26,
    certificatesEarned: 3,
    activityStreak: 9,
    statusBadge: 'active',
    points: 1800,
    badges: ['Active Member'],
  },
  {
    id: '24',
    name: 'Santhiya G',
    rollNumber: '22ECE002',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Santhiya',
    department: 'ECE',
    year: 2,
    eventsAttended: 5,
    workshopsAttended: 4,
    contestsParticipated: 6,
    problemsSolved: 120,
    contributionHours: 15,
    certificatesEarned: 2,
    activityStreak: 5,
    statusBadge: 'active',
    points: 1050,
    badges: ['Active Member'],
  },
  // ── MECH ──────────────────────────────────────
  {
    id: '25',
    name: 'Bharath Kumar',
    rollNumber: '21MECH001',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bharath',
    department: 'MECH',
    year: 3,
    eventsAttended: 6,
    workshopsAttended: 4,
    contestsParticipated: 6,
    problemsSolved: 130,
    contributionHours: 16,
    certificatesEarned: 2,
    activityStreak: 6,
    statusBadge: 'active',
    points: 1100,
    badges: ['Active Member'],
  },
  {
    id: '26',
    name: 'Pooja Shankar',
    rollNumber: '22MECH002',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja',
    department: 'MECH',
    year: 2,
    eventsAttended: 4,
    workshopsAttended: 3,
    contestsParticipated: 4,
    problemsSolved: 80,
    contributionHours: 10,
    certificatesEarned: 1,
    activityStreak: 3,
    statusBadge: 'new',
    points: 720,
    badges: ['Newcomer'],
  },
  // ── CSBS ──────────────────────────────────────
  {
    id: '27',
    name: 'Anand Raj',
    rollNumber: '21CSBS001',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnandRaj',
    department: 'CSBS',
    year: 3,
    eventsAttended: 11,
    workshopsAttended: 8,
    contestsParticipated: 12,
    problemsSolved: 290,
    contributionHours: 36,
    certificatesEarned: 5,
    activityStreak: 13,
    statusBadge: 'active',
    points: 2400,
    badges: ['Problem Solver', 'Rising Star'],
  },
  {
    id: '28',
    name: 'Keerthana V',
    rollNumber: '22CSBS002',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Keerthana',
    department: 'CSBS',
    year: 2,
    eventsAttended: 8,
    workshopsAttended: 5,
    contestsParticipated: 9,
    problemsSolved: 185,
    contributionHours: 22,
    certificatesEarned: 3,
    activityStreak: 8,
    statusBadge: 'active',
    points: 1620,
    badges: ['Active Member'],
  },
];

/** Leaderboards reference STUDENTS by id — names match GFG RIT team. */
export const LEADERBOARD_TOP_CODERS: LeaderboardEntry[] = [
  { rank: 1, id: '4', name: 'Avineshwaran A', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avineshwaran', department: 'CSE', score: 4100, badges: ['Top Coder', 'Event Champion'], trend: 'same', previousRank: 1 },
  { rank: 2, id: '2', name: 'Christopher J', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher', department: 'CSE', score: 3120, badges: ['Problem Solver'], trend: 'up', previousRank: 3 },
  { rank: 3, id: '8', name: 'Aditya Parthasarathy', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaP', department: 'IT', score: 2980, badges: ['Event Champion'], trend: 'down', previousRank: 2 },
  { rank: 4, id: '1', name: 'Austin Joshua M', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Austin', department: 'CSE', score: 2850, badges: ['Top Coder'], trend: 'same', previousRank: 4 },
  { rank: 5, id: '6', name: 'Abishek', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abishek', department: 'CSE', score: 2180, badges: [], trend: 'up', previousRank: 6 },
];

export const LEADERBOARD_MOST_ACTIVE: LeaderboardEntry[] = [
  { rank: 1, id: '4', name: 'Avineshwaran A', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avineshwaran', department: 'CSE', score: 98, badges: ['Streak Master'], trend: 'up' },
  { rank: 2, id: '2', name: 'Christopher J', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher', department: 'CSE', score: 92, badges: [], trend: 'same' },
  { rank: 3, id: '1', name: 'Austin Joshua M', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Austin', department: 'CSE', score: 88, badges: ['Streak Master'], trend: 'down' },
  { rank: 4, id: '8', name: 'Aditya Parthasarathy', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaP', department: 'IT', score: 85, badges: [], trend: 'up' },
  { rank: 5, id: '6', name: 'Abishek', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abishek', department: 'CSE', score: 82, badges: [], trend: 'same' },
];

export const LEADERBOARD_EVENT_CHAMPIONS: LeaderboardEntry[] = [
  { rank: 1, id: '4', name: 'Avineshwaran A', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avineshwaran', department: 'CSE', score: 18, badges: ['Event Champion'], trend: 'same' },
  { rank: 2, id: '1', name: 'Austin Joshua M', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Austin', department: 'CSE', score: 12, badges: ['Event Champion'], trend: 'up' },
  { rank: 3, id: '8', name: 'Aditya Parthasarathy', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaP', department: 'IT', score: 14, badges: ['Event Champion'], trend: 'down' },
  { rank: 4, id: '2', name: 'Christopher J', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher', department: 'CSE', score: 10, badges: [], trend: 'same' },
  { rank: 5, id: '3', name: 'Aakash B K', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aakash', department: 'IT', score: 8, badges: [], trend: 'up' },
];

export const LEADERBOARD_MONTHLY: LeaderboardEntry[] = [
  { rank: 1, id: '2', name: 'Christopher J', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher', department: 'CSE', score: 650, badges: ['Member of the Month'], trend: 'up' },
  { rank: 2, id: '4', name: 'Avineshwaran A', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avineshwaran', department: 'CSE', score: 620, badges: [], trend: 'down' },
  { rank: 3, id: '1', name: 'Austin Joshua M', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Austin', department: 'CSE', score: 580, badges: [], trend: 'same' },
  { rank: 4, id: '7', name: 'Abimanue M', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abimanue', department: 'CSE', score: 420, badges: [], trend: 'up' },
  { rank: 5, id: '6', name: 'Abishek', profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abishek', department: 'CSE', score: 390, badges: [], trend: 'up' },
];

/** Blog authors — GFG RIT team members. */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'bp1',
    title: 'Getting Started with DSA: A Complete Roadmap for Beginners',
    author: 'Austin Joshua M',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Austin',
    publishDate: '2025-03-10',
    tags: ['DSA', 'Beginners', 'Roadmap'],
    description: 'A step-by-step guide to mastering Data Structures and Algorithms, from arrays to advanced graph algorithms.',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    category: 'DSA',
    likes: 124,
    commentCount: 18,
    featured: true,
  },
  {
    id: 'bp2',
    title: 'Recap: GFG RIT Coding Contest March 2025',
    author: 'Avineshwaran A',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avineshwaran',
    publishDate: '2025-03-08',
    tags: ['Contest', 'Recap', 'Events'],
    description: 'Highlights and problem solutions from our monthly coding contest. See who topped the leaderboard!',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    category: 'Events',
    likes: 89,
    commentCount: 12,
  },
  {
    id: 'bp3',
    title: 'Web Development Workshop: React Hooks Deep Dive',
    author: 'Aditya Parthasarathy',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaP',
    publishDate: '2025-03-05',
    tags: ['React', 'Web Dev', 'Workshop'],
    description: 'Notes and resources from our React Hooks workshop. Learn useState, useEffect, and custom hooks.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    category: 'Workshops',
    likes: 67,
    commentCount: 9,
  },
  {
    id: 'bp4',
    title: 'How to Build a Strong GFG Profile as a Student',
    author: 'Aakash B K',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aakash',
    publishDate: '2025-03-01',
    tags: ['GFG', 'Profile', 'Tips'],
    description: 'Practical tips to maximize your GeeksforGeeks profile visibility and land internship opportunities.',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    category: 'Careers',
    likes: 156,
    commentCount: 24,
  },
  {
    id: 'bp5',
    title: 'CP vs Development: Finding Your Path',
    author: 'Christopher J',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher',
    publishDate: '2025-02-28',
    tags: ['Career', 'CP', 'Development'],
    description: 'Should you focus on Competitive Programming or Software Development? A balanced perspective.',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    category: 'Careers',
    likes: 98,
    commentCount: 15,
  },
  {
    id: 'bp6',
    title: 'Git & GitHub: First Steps for Campus Projects',
    author: 'Darshan B',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarshanB',
    publishDate: '2025-02-25',
    tags: ['Git', 'Tools', 'Collaboration'],
    description: 'How we use Git and GitHub in our club projects. Branches, PRs, and code review tips.',
    coverImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800',
    category: 'Other',
    likes: 72,
    commentCount: 11,
  },
  {
    id: 'bp7',
    title: 'Placement Season Tips from Seniors',
    author: 'Aditya Parthasarathy',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdityaP',
    publishDate: '2025-02-20',
    tags: ['Placement', 'Interview', 'Tips'],
    description: 'What worked for us: test series, mock interviews, and staying consistent with DSA.',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    category: 'Careers',
    likes: 203,
    commentCount: 31,
  },
];

/** Activity feed — GFG RIT members. Enough records for leaderboards, insights, and activity feed. */
export const ACTIVITY_FEED: ActivityItem[] = [
  { id: 'a1', type: 'achievement', title: 'Austin Joshua M unlocked "Streak Master"', user: 'Austin', timestamp: '2 min ago', icon: 'trophy' },
  { id: 'a2', type: 'contest', title: 'March Coding Contest registration opened', timestamp: '15 min ago', icon: 'code' },
  { id: 'a3', type: 'blog', title: 'New post: Getting Started with DSA', user: 'Austin Joshua M', timestamp: '1 hour ago', icon: 'book' },
  { id: 'a4', type: 'event', title: 'Christopher J attended "DSA Workshop"', user: 'Christopher', timestamp: '2 hours ago', icon: 'calendar' },
  { id: 'a5', type: 'workshop', title: 'React Hooks Workshop completed', timestamp: '3 hours ago', icon: 'wrench' },
  { id: 'a6', type: 'achievement', title: 'Avineshwaran A reached 500 problems solved', user: 'Avineshwaran', timestamp: '5 hours ago', icon: 'trophy' },
  { id: 'a7', type: 'event', title: 'Aakash B K registered for Monthly Coding Contest', user: 'Aakash', timestamp: '6 hours ago', icon: 'calendar' },
  { id: 'a8', type: 'achievement', title: 'Aditya Parthasarathy earned "Event Champion"', user: 'Aditya', timestamp: 'Yesterday', icon: 'trophy' },
  { id: 'a9', type: 'blog', title: 'New post: Recap GFG RIT Coding Contest March 2025', user: 'Avineshwaran A', timestamp: 'Yesterday', icon: 'book' },
  { id: 'a10', type: 'workshop', title: 'DSA Workshop: Trees & Graphs — 45 participants', timestamp: 'Yesterday', icon: 'wrench' },
  { id: 'a11', type: 'contest', title: 'Weekly practice contest results published', timestamp: '2 days ago', icon: 'code' },
  { id: 'a12', type: 'achievement', title: 'Abimanue M completed 7-day streak', user: 'Abimanue', timestamp: '2 days ago', icon: 'trophy' },
  { id: 'a13', type: 'event', title: 'Darshan B and Darshan A R joined Placement Prep Session', user: 'Darshan', timestamp: '3 days ago', icon: 'calendar' },
  { id: 'a14', type: 'blog', title: 'New post: How to Build a Strong GFG Profile', user: 'Aakash B K', timestamp: '3 days ago', icon: 'book' },
  { id: 'a15', type: 'workshop', title: 'Git & GitHub Basics workshop scheduled', timestamp: '4 days ago', icon: 'wrench' },
];

export const ANALYTICS: AnalyticsSummary = {
  totalMembers: 156,
  activeThisMonth: 89,
  eventsConducted: 24,
  totalParticipation: 412,
  growthPercent: 12.5,
  topDepartment: 'CSE',
  topDepartmentCount: 72,
};

export const DEPARTMENTS = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'AIDS', 'AIML', 'VLSI', 'CCE', 'CSBS'];

export const YEARS = [1, 2, 3, 4];
export const BLOG_CATEGORIES = ['All', 'DSA', 'Events', 'Workshops', 'Careers'];

// ─── Innovation: Extended mock data ─────────────────────────────────────────

export type ContributionTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export const TIER_THRESHOLDS: { tier: ContributionTier; minScore: number }[] = [
  { tier: 'Bronze', minScore: 0 },
  { tier: 'Silver', minScore: 1000 },
  { tier: 'Gold', minScore: 2500 },
  { tier: 'Platinum', minScore: 4000 },
];

export interface CertificateRecord {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  skill: string;
  issuedDate: string;
  issuer: string;
}

export const CERTIFICATES: CertificateRecord[] = [
  { id: 'GFG-RIT-2025-001', studentId: '1', studentName: 'Austin Joshua M', title: 'DSA Completion', skill: 'Data Structures', issuedDate: '2025-02-15', issuer: 'GFG RIT' },
  { id: 'GFG-RIT-2025-002', studentId: '4', studentName: 'Avineshwaran A', title: 'Coding Champion', skill: 'Competitive Programming', issuedDate: '2025-03-01', issuer: 'GFG RIT' },
  { id: 'GFG-RIT-2025-003', studentId: '2', studentName: 'Christopher J', title: 'Problem Solver', skill: 'Algorithms', issuedDate: '2025-02-20', issuer: 'GFG RIT' },
  { id: 'GFG-RIT-2024-012', studentId: '8', studentName: 'Aditya Parthasarathy', title: 'Workshop Lead', skill: 'Web Development', issuedDate: '2024-12-10', issuer: 'GFG RIT' },
  { id: 'GFG-RIT-2025-004', studentId: '3', studentName: 'Aakash B K', title: 'Volunteer Star', skill: 'Community', issuedDate: '2025-02-28', issuer: 'GFG RIT' },
  { id: 'GFG-RIT-2025-005', studentId: '6', studentName: 'Abishek', title: 'DSA Basics', skill: 'Data Structures', issuedDate: '2025-02-10', issuer: 'GFG RIT' },
  { id: 'GFG-RIT-2025-006', studentId: '10', studentName: 'Darshan B', title: 'Participation Certificate', skill: 'Events', issuedDate: '2025-01-15', issuer: 'GFG RIT' },
  { id: 'GFG-RIT-2025-007', studentId: '12', studentName: 'Aravind Raj', title: 'CP Beginner', skill: 'Competitive Programming', issuedDate: '2025-02-05', issuer: 'GFG RIT' },
];

export interface CodingProfile {
  studentId: string;
  gfgScore: number;
  leetcodeRank: string;
  codechefRating: number;
}

export const CODING_PROFILES: CodingProfile[] = [
  { studentId: '1', gfgScore: 1850, leetcodeRank: 'Guardian', codechefRating: 1650 },
  { studentId: '2', gfgScore: 2100, leetcodeRank: 'Knight', codechefRating: 1820 },
  { studentId: '4', gfgScore: 3200, leetcodeRank: 'Legend', codechefRating: 2100 },
  { studentId: '8', gfgScore: 2400, leetcodeRank: 'Knight', codechefRating: 1750 },
  { studentId: '6', gfgScore: 1500, leetcodeRank: 'Guardian', codechefRating: 1420 },
  { studentId: '3', gfgScore: 980, leetcodeRank: 'Guardian', codechefRating: 1200 },
  { studentId: '5', gfgScore: 320, leetcodeRank: 'Apprentice', codechefRating: 850 },
  { studentId: '7', gfgScore: 1250, leetcodeRank: 'Guardian', codechefRating: 1380 },
  { studentId: '9', gfgScore: 1100, leetcodeRank: 'Guardian', codechefRating: 1280 },
  { studentId: '10', gfgScore: 890, leetcodeRank: 'Apprentice', codechefRating: 1150 },
  { studentId: '11', gfgScore: 1050, leetcodeRank: 'Guardian', codechefRating: 1320 },
  { studentId: '12', gfgScore: 760, leetcodeRank: 'Apprentice', codechefRating: 1080 },
];

export interface Kudos {
  studentId: string;
  helpfulMentor: number;
  problemSolver: number;
  risingStar: number;
  teamPlayer: number;
}

export const KUDOS: Kudos[] = STUDENTS.map((s) => ({
  studentId: s.id,
  helpfulMentor: Math.floor(Math.random() * 5) + (s.statusBadge === 'core' ? 3 : 0),
  problemSolver: Math.floor(Math.random() * 8) + (s.problemsSolved > 200 ? 2 : 0),
  risingStar: Math.floor(Math.random() * 4) + (s.statusBadge === 'new' ? 2 : 0),
  teamPlayer: Math.floor(Math.random() * 6) + (s.contributionHours > 30 ? 2 : 0),
}));

export interface DepartmentScore {
  department: string;
  totalScore: number;
  memberCount: number;
  rank: number;
}

export function getDepartmentLeaderboard(): DepartmentScore[] {
  const byDept: Record<string, { total: number; count: number }> = {};
  STUDENTS.forEach((s) => {
    if (!byDept[s.department]) byDept[s.department] = { total: 0, count: 0 };
    byDept[s.department].total += s.points;
    byDept[s.department].count += 1;
  });
  return Object.entries(byDept)
    .map(([department, { total, count }]) => ({ department, totalScore: total, memberCount: count, rank: 0 }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((row, i) => ({ ...row, rank: i + 1 }));
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  category: string;
  registrationLink?: string;
}

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  { id: 'e1', title: 'DSA Workshop: Trees & Graphs', date: 'Mar 18, 2025', type: 'Workshop', category: 'DSA', registrationLink: 'https://docs.google.com/forms/' },
  { id: 'e2', title: 'Monthly Coding Contest', date: 'Mar 22, 2025', type: 'Contest', category: 'CP', registrationLink: 'https://docs.google.com/forms/' },
  { id: 'e3', title: 'Placement Prep Session', date: 'Mar 25, 2025', type: 'Talk', category: 'Careers', registrationLink: 'https://docs.google.com/forms/' },
  { id: 'e4', title: 'React Workshop', date: 'Mar 28, 2025', type: 'Workshop', category: 'Web', registrationLink: 'https://docs.google.com/forms/' },
  { id: 'e5', title: 'System Design Talk', date: 'Apr 2, 2025', type: 'Talk', category: 'Careers', registrationLink: 'https://docs.google.com/forms/' },
  { id: 'e6', title: 'Git & GitHub Basics', date: 'Apr 8, 2025', type: 'Workshop', category: 'Tools', registrationLink: 'https://docs.google.com/forms/' },
];

export const PAST_EVENTS: UpcomingEvent[] = [
  { id: 'p1', title: 'Intro to Competitive Programming', date: 'Feb 15, 2025', type: 'Workshop', category: 'CP' },
  { id: 'p2', title: 'GFG RIT Hackathon 2025', date: 'Feb 20, 2025', type: 'Hackathon', category: 'Development' },
  { id: 'p3', title: 'Resume Building Session', date: 'Feb 28, 2025', type: 'Seminar', category: 'Careers' },
  { id: 'p4', title: 'Python for Data & Automation', date: 'Feb 10, 2025', type: 'Workshop', category: 'Programming' },
];

export const MY_EVENTS: UpcomingEvent[] = [
  { id: 'e1', title: 'DSA Workshop: Trees & Graphs', date: 'Mar 18, 2025', type: 'Workshop', category: 'DSA' },
  { id: 'p2', title: 'GFG RIT Hackathon 2025', date: 'Feb 20, 2025', type: 'Hackathon', category: 'Development' },
];

/** Activity heatmap: 12 weeks, 7 days. Value 0-4 for intensity. Key: YYYY-MM-DD */
export type HeatmapData = Record<string, number>;
export function getHeatmapForStudent(studentId: string): HeatmapData {
  const s = STUDENTS.find((x) => x.id === studentId);
  if (!s) return {};
  const out: HeatmapData = {};
  const now = new Date();
  for (let w = 0; w < 12; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      const key = date.toISOString().slice(0, 10);
      const base = s.activityStreak > 20 ? 3 : s.activityStreak > 10 ? 2 : 1;
      out[key] = Math.min(4, Math.floor(Math.random() * 2) + base);
    }
  }
  return out;
}

export type PlacementLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Placement Ready';
export const PLACEMENT_THRESHOLDS: { level: PlacementLevel; minPoints: number }[] = [
  { level: 'Beginner', minPoints: 0 },
  { level: 'Intermediate', minPoints: 800 },
  { level: 'Advanced', minPoints: 2000 },
  { level: 'Placement Ready', minPoints: 3500 },
];

export const ACHIEVEMENT_BADGE_DEFS: { id: string; name: string; description: string; condition: string }[] = [
  { id: 'event-explorer', name: 'Event Explorer', description: 'Attended 10+ events', condition: 'events >= 10' },
  { id: 'coding-enthusiast', name: 'Coding Enthusiast', description: 'Solved 200+ problems', condition: 'problems >= 200' },
  { id: 'consistency-pro', name: 'Consistency Pro', description: 'Long activity streak', condition: 'streak >= 14' },
  { id: 'community-helper', name: 'Community Helper', description: 'Volunteer contributions', condition: 'volunteer' },
  { id: 'top-coder', name: 'Top Coder', description: 'Rank in top 5 coders', condition: 'leaderboard' },
  { id: 'streak-master', name: 'Streak Master', description: '30-day streak', condition: 'streak >= 30' },
  { id: 'mentor', name: 'Helpful Mentor', description: 'Kudos from peers', condition: 'kudos' },
  { id: 'rising-star', name: 'Rising Star', description: 'Top newcomer', condition: 'newcomer' },
];

export function getLeaderboardRankByPoints(studentId: string): number {
  const sorted = [...STUDENTS].sort((a, b) => b.points - a.points);
  const idx = sorted.findIndex((s) => s.id === studentId);
  return idx === -1 ? 0 : idx + 1;
}

export function getCertificatesForStudent(studentId: string): CertificateRecord[] {
  return CERTIFICATES.filter((c) => c.studentId === studentId);
}
