import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/context/AuthContext';
import { STUDENTS } from '../utils/data/communityMockData';
import { ALL_BADGES } from '../utils/data/badgesData';
import { 
  Trophy, 
  Flame, 
  Target, 
  Award, 
  Users, 
  Calendar, 
  Code2, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Star,
  Zap,
  ArrowLeft,
  Medal,
  Dna
} from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Find the detailed student data matching the logged-in user (or demo user)
  const student = useMemo(() => {
    if (!user) return STUDENTS[0];
    return STUDENTS.find(s => s.name === user.name) || STUDENTS[0]; 
  }, [user]);

  // Get claimed badges from localStorage
  const claimedBadgeIds = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('gfg-claimed-badges') || '[]');
    } catch {
      return [];
    }
  }, []);

  const earnedBadges = useMemo(() => {
    return ALL_BADGES.filter(b => claimedBadgeIds.includes(b.id));
  }, [claimedBadgeIds]);

  // Calculate Level based on points (simplistic: every 1000 points is a level)
  const level = Math.floor(student.points / 1000) + 1;
  const nextLevelProgress = (student.points % 1000) / 10; // percentage to next level

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#000000] text-gray-900 dark:text-white pb-20">
      {/* Header / Navigation */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#2F8D46] dark:hover:text-[#22C55E] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-sm font-black uppercase tracking-widest text-gray-400">User Profile Node</h1>
        <div className="w-20" /> {/* Spacer */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Player Card (eFootball Style) */}
          <div className="lg:col-span-4">
            <div className="relative group perspective-1000">
              {/* eFootball-style Player Card */}
              <div className="relative z-10 overflow-hidden rounded-[2.5rem] border-4 border-[#22C55E]/30 bg-gradient-to-br from-[#0d1117] via-[#1c212e] to-[#052e16] shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:rotate-y-5">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#22C55E] blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2F8D46] blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30" />
                </div>

                {/* Card Content */}
                <div className="relative p-8 flex flex-col items-center">
                  {/* Rating Badge */}
                  <div className="absolute top-6 left-6 flex flex-col items-center">
                    <span className="text-[10px] font-black text-[#22C55E] uppercase tracking-[0.2em] mb-1">RATING</span>
                    <div className="w-16 h-16 rounded-full border-2 border-[#22C55E]/50 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,150,0.3)]">
                      <span className="text-3xl font-black text-white italic">{Math.floor(student.points/50)}</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 mt-2">LV.{level}</span>
                  </div>

                  {/* Position/Role Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-1 rounded-full bg-[#22C55E] text-black text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                      {student.statusBadge}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="mt-12 mb-6 relative">
                    <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-[#22C55E]/20 bg-gradient-to-b from-[#1c212e] to-[#0d1117] relative z-10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                      <img 
                        src={student.profileImage} 
                        alt={student.name} 
                        className="w-full h-full object-cover grayscale-[0.2] contrast-125"
                      />
                    </div>
                    {/* Shadow behind avatar */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/40 blur-xl rounded-full" />
                  </div>

                  {/* Name & Title */}
                  <div className="text-center">
                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-1">
                      {student.name.split(' ')[0]} <span className="text-[#22C55E]">{student.name.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">{student.department} · {student.rollNumber}</p>
                  </div>

                  {/* Main Stats Summary in Card */}
                  <div className="w-full grid grid-cols-3 gap-2 mt-8 py-4 border-y border-white/5">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-gray-500 uppercase">SOLVED</p>
                      <p className="text-lg font-black text-white">{student.problemsSolved}</p>
                    </div>
                    <div className="text-center border-x border-white/5">
                      <p className="text-[10px] font-black text-gray-500 uppercase">POINTS</p>
                      <p className="text-lg font-black text-[#22C55E]">{student.points}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-gray-500 uppercase">EVENTS</p>
                      <p className="text-lg font-black text-white">{student.eventsAttended}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">GFG Verified Campus Member</span>
                  </div>
                </div>
              </div>

              {/* Card Holographic Overlay (CSS Only) */}
              <div className="absolute inset-x-4 top-4 bottom-4 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
            </div>

            {/* Quick Actions/Links */}
            <div className="mt-8 space-y-3">
              <button 
                onClick={() => navigate('/badges')}
                className="w-full group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#22C55E] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#22C55E]/10 text-[#22C55E]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase text-gray-400">Badge Collection</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{earnedBadges.length} Active Badges</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#22C55E] transition-colors" />
              </button>

              <button className="w-full group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#22C55E] transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase text-gray-400">Activity Level</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Professional Rank</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#22C55E] transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Column: In-depth Analysis & Badges */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Level Progress Section */}
            <div className="glass-card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-1 italic">
                    Performance <span className="text-[#22C55E]">Analysis</span>
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">Detailed breakdown of your campus contributions.</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">XP PROGRESS</span>
                  <p className="text-lg font-black text-white italic">
                    {student.points} <span className="text-gray-500 font-bold">/ {(level) * 1000}</span>
                  </p>
                </div>
              </div>

              <div className="relative h-4 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden mb-10 border border-white/5 shadow-inner">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2F8D46] via-[#22C55E] to-[#4ADE80] transition-all duration-1000 shadow-[0_0_15px_rgba(34,197,150,0.5)]"
                  style={{ width: `${nextLevelProgress}%` }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] opacity-50" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Workshops', val: student.workshopsAttended, icon: Calendar, color: 'text-blue-500' },
                  { label: 'Contests', val: student.contestsParticipated, icon: Code2, color: 'text-rose-500' },
                  { label: 'Certificates', val: student.certificatesEarned, icon: Award, color: 'text-amber-500' },
                  { label: 'Hours', val: student.contributionHours, icon: Target, color: 'text-cyan-500' },
                ].map(stat => (
                  <div key={stat.label} className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-white/10 transition-colors">
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white italic">{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges Display Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
                  <Medal className="w-6 h-6 text-[#22C55E]" />
                  Earned <span className="text-[#22C55E]">Badges</span>
                </h3>
                <button 
                  onClick={() => navigate('/badges')}
                  className="text-xs font-black text-[color:var(--gfg-accent)] hover:underline uppercase tracking-widest"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {earnedBadges.length > 0 ? (
                  earnedBadges.map(badge => (
                    <div 
                      key={badge.id}
                      className="group relative flex flex-col items-center p-4 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden hover:border-[#22C55E]/50 transition-all duration-300"
                    >
                      {/* Glow effect */}
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#22C55E]/10 blur-2xl rounded-full group-hover:bg-[#22C55E]/20 transition-all" />
                      
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2F8D46] to-[#22C55E] flex items-center justify-center text-white shadow-lg mb-3 relative z-10 group-hover:scale-110 transition-transform">
                        {badge.icon}
                      </div>
                      
                      <h4 className="text-[11px] font-black text-gray-900 dark:text-white text-center uppercase leading-tight mb-1 relative z-10">
                        {badge.name}
                      </h4>
                      <div className="flex items-center gap-1 relative z-10">
                        <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">Verified</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl opacity-50">
                    <Award className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm font-bold text-gray-500 uppercase">No badges earned yet</p>
                    <button 
                      onClick={() => navigate('/badges')}
                      className="mt-4 text-xs font-black text-[#22C55E] uppercase hover:underline"
                    >
                      Start earning now
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Achievement Timeline Teaser */}
            <div className="glass-card p-6 sm:p-8 bg-gradient-to-r from-[#0d1117] to-[#1c212e] border-[#22C55E]/10">
              <h3 className="text-xl font-black uppercase italic tracking-tight mb-6 flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                Latest <span className="text-orange-500">Activity</span>
              </h3>
              
              <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-white/5">
                {[
                  { event: 'March Coding Contest', result: 'Top 5% Finish', icon: Code2, date: '2 days ago' },
                  { event: 'Web Dev Workshop', result: 'Completed Module', icon: Zap, date: '1 week ago' },
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-8 group">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#1c212e] border-2 border-white/10 flex items-center justify-center z-10 group-hover:border-[#22C55E] transition-colors">
                      <item.icon className="w-3 h-3 text-gray-400 group-hover:text-[#22C55E] transition-colors" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{item.date}</p>
                        <p className="text-sm font-bold text-white uppercase">{item.event}</p>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#22C55E] uppercase tracking-tighter">
                        {item.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
