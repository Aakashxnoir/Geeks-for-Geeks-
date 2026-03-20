import React from 'react';
import { 
  Star, Zap, Code2, Trophy, Users, BookOpen, Flame, 
  Award, Shield, Cpu, Globe, Rocket, Heart, 
  Sparkles, Medal, Target, Crown 
} from 'lucide-react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'coding' | 'community' | 'events' | 'special' | 'learning';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: string;
  points: number;
  claimable: boolean;
}

export const ALL_BADGES: Badge[] = [
  // Coding
  { id: 'first-commit', name: 'First Commit', description: 'Made your very first contribution to a GFG project.', icon: <Code2 className="w-7 h-7" />, category: 'coding', rarity: 'common', requirement: 'Submit 1 solution', points: 50, claimable: true },
  { id: 'bug-hunter', name: 'Bug Hunter', description: 'Found and reported a critical bug in a club project.', icon: <Zap className="w-7 h-7" />, category: 'coding', rarity: 'rare', requirement: 'Report 3 bugs', points: 150, claimable: true },
  { id: 'algo-ace', name: 'Algo Ace', description: 'Solved 50 Data Structures & Algorithms problems on GFG.', icon: <Cpu className="w-7 h-7" />, category: 'coding', rarity: 'epic', requirement: 'Solve 50 DSA problems', points: 300, claimable: false },
  { id: 'code-wizard', name: 'Code Wizard', description: 'Reached the top 10 on the coding leaderboard.', icon: <Crown className="w-7 h-7" />, category: 'coding', rarity: 'legendary', requirement: 'Top 10 on leaderboard', points: 1000, claimable: false },

  // Community
  { id: 'welcomer', name: 'Welcomer', description: 'Helped onboard 5 new members to the club.', icon: <Users className="w-7 h-7" />, category: 'community', rarity: 'common', requirement: 'Refer 5 new members', points: 75, claimable: true },
  { id: 'mentor', name: 'Mentor', description: 'Conducted a peer mentoring session for juniors.', icon: <Heart className="w-7 h-7" />, category: 'community', rarity: 'rare', requirement: 'Host 1 mentoring session', points: 200, claimable: true },
  { id: 'club-pillar', name: 'Club Pillar', description: 'Consistently active in the community for 6 months.', icon: <Shield className="w-7 h-7" />, category: 'community', rarity: 'epic', requirement: '6 months of activity', points: 400, claimable: false },
  { id: 'legend', name: 'Legend', description: 'Top contributor of the year — recognized by all.', icon: <Star className="w-7 h-7" />, category: 'community', rarity: 'legendary', requirement: 'Top contributor of the year', points: 2000, claimable: false },

  // Events
  { id: 'first-event', name: 'Event Goer', description: 'Attended your first GFG event or workshop.', icon: <BookOpen className="w-7 h-7" />, category: 'events', rarity: 'common', requirement: 'Attend 1 event', points: 50, claimable: true },
  { id: 'hackathon-hero', name: 'Hackathon Hero', description: 'Participated in a 24-hour hackathon hosted by the club.', icon: <Rocket className="w-7 h-7" />, category: 'events', rarity: 'rare', requirement: 'Join 1 hackathon', points: 250, claimable: true },
  { id: 'speaker', name: 'Speaker', description: 'Delivered a technical talk at a club event.', icon: <Globe className="w-7 h-7" />, category: 'events', rarity: 'epic', requirement: 'Give 1 tech talk', points: 500, claimable: false },
  { id: 'event-champion', name: 'Event Champion', description: 'Won 1st place in a competitive club event.', icon: <Trophy className="w-7 h-7" />, category: 'events', rarity: 'legendary', requirement: 'Win a club competition', points: 1500, claimable: false },

  // Learning
  { id: 'learner', name: 'Eager Learner', description: 'Completed your first GFG learning module.', icon: <BookOpen className="w-7 h-7" />, category: 'learning', rarity: 'common', requirement: 'Complete 1 module', points: 50, claimable: true },
  { id: 'streak-7', name: '7-Day Streak', description: 'Maintained a 7-day learning streak on GFG.', icon: <Flame className="w-7 h-7" />, category: 'learning', rarity: 'rare', requirement: '7 consecutive days', points: 175, claimable: true },
  { id: 'course-master', name: 'Course Master', description: 'Completed 5 full courses on GFG platform.', icon: <Medal className="w-7 h-7" />, category: 'learning', rarity: 'epic', requirement: 'Complete 5 courses', points: 450, claimable: false },

  // Special
  { id: 'founding-member', name: 'Founding Member', description: 'One of the first 50 members of the GFG RIT chapter.', icon: <Award className="w-7 h-7" />, category: 'special', rarity: 'legendary', requirement: 'Be a founding member', points: 5000, claimable: false },
  { id: 'early-bird', name: 'Early Bird', description: 'Joined the community in its first semester.', icon: <Sparkles className="w-7 h-7" />, category: 'special', rarity: 'epic', requirement: 'Join in first semester', points: 600, claimable: false },
  { id: 'target-achieved', name: 'Target Achieved', description: 'Hit a personal milestone set in the progress tracker.', icon: <Target className="w-7 h-7" />, category: 'special', rarity: 'rare', requirement: 'Set & hit a milestone', points: 300, claimable: true },
];
