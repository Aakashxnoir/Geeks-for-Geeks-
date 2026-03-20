import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_BADGES, type Badge } from '../utils/data/badgesData';
import { ArrowLeft, CheckCircle, Lock, Medal } from 'lucide-react';

const RARITY_CONFIG = {
  common: {
    label: 'Common',
    gradient: 'from-slate-400 to-slate-600',
    glow: 'shadow-slate-400/30',
    border: 'border-slate-400/40',
    bg: 'bg-slate-50 dark:bg-slate-900/40',
    text: 'text-slate-600 dark:text-slate-300',
    badge: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
  },
  rare: {
    label: 'Rare',
    gradient: 'from-blue-400 to-blue-700',
    glow: 'shadow-blue-400/40',
    border: 'border-blue-400/50',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-300',
    badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  },
  epic: {
    label: 'Epic',
    gradient: 'from-purple-400 to-purple-700',
    glow: 'shadow-purple-500/40',
    border: 'border-purple-400/50',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-300',
    badge: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
  },
  legendary: {
    label: 'Legendary',
    gradient: 'from-amber-400 via-orange-400 to-yellow-500',
    glow: 'shadow-amber-400/50',
    border: 'border-amber-400/60',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-600 dark:text-amber-300',
    badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  },
};

const CATEGORIES = ['all', 'coding', 'community', 'events', 'learning', 'special'] as const;
type Category = typeof CATEGORIES[number];

function BadgeCard({ badge, claimed, onClaim }: { badge: Badge; claimed: boolean; onClaim: (id: string) => void }) {
  const r = RARITY_CONFIG[badge.rarity];
  const [animate, setAnimate] = useState(false);

  const handleClaim = () => {
    if (!badge.claimable || claimed) return;
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
    onClaim(badge.id);
  };

  return (
    <div className={`relative flex flex-col rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${r.bg} ${r.border} ${claimed ? 'ring-2 ring-green-400/50' : ''} ${!badge.claimable && !claimed ? 'opacity-70' : ''}`}>
      {/* Rarity Tag */}
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${r.badge}`}>{r.label}</span>
        <span className="text-xs font-bold text-gray-400 dark:text-gray-500">+{badge.points} pts</span>
      </div>

      {/* Icon */}
      <div className={`flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-4 bg-gradient-to-br ${r.gradient} shadow-lg ${r.glow} text-white ${animate ? 'animate-bounce' : ''}`}>
        {badge.icon}
      </div>

      {/* Info */}
      <h3 className="text-center font-bold text-gray-900 dark:text-white text-sm mb-1">{badge.name}</h3>
      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{badge.description}</p>

      {/* Requirement */}
      <div className="mt-auto rounded-lg px-3 py-2 bg-white/60 dark:bg-black/20 border border-gray-200/50 dark:border-white/5 text-center mb-3">
        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Requirement</p>
        <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">{badge.requirement}</p>
      </div>

      {/* Claim Button */}
      {claimed ? (
        <div className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-500/10 border border-green-400/30 text-green-600 dark:text-green-400 text-xs font-bold">
          <CheckCircle className="w-4 h-4" /> Claimed
        </div>
      ) : badge.claimable ? (
        <button
          onClick={handleClaim}
          className="py-2 rounded-xl bg-gradient-to-r from-[#2F8D46] to-[#22C55E] text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all w-full shadow-md"
        >
          Claim Badge
        </button>
      ) : (
        <div className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-400 text-xs font-bold">
          <Lock className="w-4 h-4" /> Locked
        </div>
      )}
    </div>
  );
}

export default function BadgesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [claimed, setClaimed] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('gfg-claimed-badges') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('gfg-claimed-badges', JSON.stringify(claimed));
  }, [claimed]);

  const handleClaim = (id: string) => {
    setClaimed(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const filtered = activeCategory === 'all' ? ALL_BADGES : ALL_BADGES.filter(b => b.category === activeCategory);
  const totalClaimed = claimed.length;
  const totalPoints = claimed.reduce((sum, id) => {
    const b = ALL_BADGES.find(b => b.id === id);
    return sum + (b?.points ?? 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#09090b] text-gray-900 dark:text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 px-4 sm:px-8 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/community')}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#2F8D46] dark:hover:text-[#22C55E] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Community
        </button>
        <div className="ml-auto flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-500">Claimed</p>
            <p className="font-bold text-[#2F8D46] dark:text-[#22C55E]">{totalClaimed} / {ALL_BADGES.length}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Badge Points</p>
            <p className="font-bold text-[#2F8D46] dark:text-[#22C55E]">{totalPoints.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2F8D46]/10 border border-[#2F8D46]/20 text-[#2F8D46] dark:text-[#22C55E] text-sm font-semibold mb-4">
            <Medal className="w-4 h-4" /> Badge Collection
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            Earn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F8D46] to-[#22C55E]">Badges</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            Complete challenges, attend events, and contribute to the community to unlock and claim exclusive badges.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-5">
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span className="text-gray-600 dark:text-gray-300">Collection Progress</span>
            <span className="text-[#2F8D46] dark:text-[#22C55E]">{Math.round(totalClaimed / ALL_BADGES.length * 100)}%</span>
          </div>
          <div className="h-3 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2F8D46] to-[#22C55E] transition-all duration-700"
              style={{ width: `${(totalClaimed / ALL_BADGES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all capitalize ${
                activeCategory === cat
                  ? 'bg-[#2F8D46] text-white border-[#2F8D46] shadow-md'
                  : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-[#2F8D46] hover:text-[#2F8D46] dark:hover:text-[#22C55E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(badge => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              claimed={claimed.includes(badge.id)}
              onClaim={handleClaim}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
