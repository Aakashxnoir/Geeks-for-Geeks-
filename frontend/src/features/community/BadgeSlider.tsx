import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Medal, ArrowRight, CheckCircle, Lock } from 'lucide-react';
import { ALL_BADGES } from '../../pages/BadgesPage';

const RARITY_GRADIENT = {
  common: 'from-slate-400 to-slate-600',
  rare: 'from-blue-400 to-blue-700',
  epic: 'from-purple-400 to-purple-700',
  legendary: 'from-amber-400 via-orange-400 to-yellow-500',
};

const RARITY_GLOW = {
  common: 'shadow-slate-400/30',
  rare: 'shadow-blue-400/40',
  epic: 'shadow-purple-500/40',
  legendary: 'shadow-amber-400/60',
};

const RARITY_LABEL_COLOR = {
  common: 'text-slate-500 dark:text-slate-400',
  rare: 'text-blue-600 dark:text-blue-400',
  epic: 'text-purple-600 dark:text-purple-400',
  legendary: 'text-amber-600 dark:text-amber-400',
};

export default function BadgeSlider() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get saved claimed badges
  let claimed: string[] = [];
  try { claimed = JSON.parse(localStorage.getItem('gfg-claimed-badges') || '[]'); } catch {}

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  // Sort: claimable first, then locked
  const sorted = [...ALL_BADGES].sort((a, b) => {
    if (a.claimable && !b.claimable) return -1;
    if (!a.claimable && b.claimable) return 1;
    return 0;
  });

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d1117] overflow-hidden shadow-sm">

      {/* Section Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md text-white">
            <Medal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Badges</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{claimed.length} / {ALL_BADGES.length} claimed</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/badges')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#2F8D46] dark:text-[#22C55E] hover:underline"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Claimed Progress Bar */}
      <div className="px-5 pb-3">
        <div className="h-1.5 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#2F8D46] to-[#22C55E] transition-all duration-700"
            style={{ width: `${(claimed.length / ALL_BADGES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Slider Controls */}
      <div className="flex items-center gap-2 px-5 pb-2">
        <button
          onClick={() => scroll('left')}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Scrollable Badge Row */}
      <div
        ref={scrollRef}
        className="flex gap-3 px-5 pb-5 overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {sorted.map(badge => {
          const isClaimed = claimed.includes(badge.id);
          return (
            <button
              key={badge.id}
              onClick={() => navigate('/badges')}
              className={`flex-shrink-0 w-[120px] flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-200 hover:scale-105 hover:shadow-lg text-center
                ${isClaimed
                  ? 'border-green-400/40 bg-green-50 dark:bg-green-900/10'
                  : badge.claimable
                    ? 'border-[#2F8D46]/30 dark:border-[#22C55E]/20 bg-[#f0fdf4] dark:bg-[#2F8D46]/5 hover:border-[#2F8D46]'
                    : 'border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 opacity-60'
                }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${RARITY_GRADIENT[badge.rarity]} shadow-md ${RARITY_GLOW[badge.rarity]} flex items-center justify-center text-white relative`}>
                {badge.icon}
                {isClaimed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
                {!badge.claimable && !isClaimed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                    <Lock className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>

              {/* Name */}
              <p className="text-[11px] font-bold text-gray-800 dark:text-white leading-tight">{badge.name}</p>

              {/* Rarity */}
              <p className={`text-[9px] font-bold uppercase tracking-wider ${RARITY_LABEL_COLOR[badge.rarity]}`}>{badge.rarity}</p>

              {/* Status */}
              {isClaimed ? (
                <span className="text-[9px] font-bold text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30">Claimed</span>
              ) : badge.claimable ? (
                <span className="text-[9px] font-bold text-[#2F8D46] dark:text-[#22C55E] px-1.5 py-0.5 rounded-full bg-[#2F8D46]/10">Claimable</span>
              ) : (
                <span className="text-[9px] font-bold text-gray-400 px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5">Locked</span>
              )}
            </button>
          );
        })}

        {/* "See All" Card */}
        <button
          onClick={() => navigate('/badges')}
          className="flex-shrink-0 w-[120px] flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border-2 border-dashed border-[#2F8D46]/30 dark:border-[#22C55E]/20 text-[#2F8D46] dark:text-[#22C55E] hover:border-[#2F8D46] hover:bg-[#2F8D46]/5 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-[#2F8D46]/10 flex items-center justify-center">
            <ArrowRight className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-bold">All Badges</p>
          <p className="text-[9px] text-gray-400">{ALL_BADGES.length} total</p>
        </button>
      </div>
    </div>
  );
}
