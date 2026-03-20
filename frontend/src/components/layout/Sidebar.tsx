import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  UserPlus, 
  Info, 
  Users, 
  Calendar, 
  BookOpen, 
  Mail, 
  Settings, 
  LogOut,
  X,
  User,
  Search,
  Moon,
  Sun,
  Bell,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../lib/context/AuthContext';
import { useSearch } from '../../lib/context/SearchContext';

const navigationGroups = [
  {
    title: 'OVERVIEW',
    items: [
      { to: '/app', label: 'Home', icon: Home },
    ]
  },
  {
    title: 'CAMPUS',
    items: [
      { to: '/community', label: 'Community', icon: Users },
      { to: '/events', label: 'Events Hub', icon: Calendar },
      { to: '/club-info', label: 'About Club', icon: Info },
      { to: '/resources', label: 'Knowledge Base', icon: BookOpen },
    ]
  },
  {
    title: 'PARTICIPATE',
    items: [
      { to: '/join', label: 'Join RIT', icon: UserPlus },
      { to: '/contact', label: 'Connect', icon: Mail },
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  logout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Sidebar({ 
  isOpen, 
  onClose, 
  isAuthenticated, 
  logout,
  darkMode,
  onToggleDarkMode
}: SidebarProps) {
  const { pathname } = useLocation();
  const { query, setQuery, submitSearch } = useSearch();
  const activePath = pathname;

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearch();
    handleLinkClick();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-40 lg:hidden transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container - Persistent on Desktop */}
      <aside 
        className={`fixed left-0 top-0 h-full w-72 bg-white/75 dark:bg-[#111113]/80 backdrop-blur-xl backdrop-saturate-150 border-r border-[#e2e8f0]/50 dark:border-[#3f3f46]/40 z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Header - CIVIQ Branding Style */}
          <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 relative z-10">
            <Link to="/app" className="flex items-center gap-3" onClick={handleLinkClick}>
              <div className="p-1.5 rounded-xl bg-[color:var(--gfg-accent)] shadow-lg shadow-[color:var(--gfg-accent)]/20">
                <img src="/logo.png" alt="GFG" className="w-7 h-7 brightness-0 invert" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-widest dark:text-white uppercase leading-none">GFG <span className="text-[color:var(--gfg-accent)]">X RIT</span></span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-gray-500 font-black mt-1">RIT Campus Node</span>
              </div>
            </Link>
            <button 
              onClick={onClose} 
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Navigation Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 relative z-10 custom-scrollbar">
            {/* Mobile-only Search (matches CIVIQ's sidebar-search capability) */}
            <div className="lg:hidden">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[color:var(--gfg-accent)] transition-colors" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Command..."
                  className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-gray-900 dark:text-white focus:ring-1 focus:ring-[color:var(--gfg-accent)] transition-all outline-none placeholder-gray-500 dark:placeholder-gray-400"
                />
              </form>
            </div>

            {/* Categorized Navigation */}
            {navigationGroups.map((group) => (
              <nav key={group.title} className="space-y-1.5">
                <span className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-300 mb-2 block">
                  {group.title}
                </span>
                {group.items.map(({ to, label, icon: Icon }) => {
                  const isActive = activePath === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 group ${
                        isActive 
                          ? 'bg-[color:var(--gfg-accent)] text-white shadow-lg shadow-[color:var(--gfg-accent)]/20 translate-x-1' 
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'} />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            ))}
          </div>

          {/* Sidebar Footer - CIVIQ Online Status Style - Hidden on Mobile */}
          <div className="hidden lg:block p-4 border-t border-gray-100 dark:border-white/5 relative z-10">
            <div className="bg-gray-100/50 dark:bg-white/5 backdrop-blur-md rounded-3xl p-4 flex flex-col gap-4 border border-gray-100 dark:border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest dark:text-white uppercase">GFG X RIT ONLINE</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 dark:text-gray-300 px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10">v4.0.2</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[color:var(--gfg-accent)] to-[color:var(--gfg-accent-strong)] flex items-center justify-center text-white shadow-md">
                  <User size={18} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-black dark:text-white truncate">{isAuthenticated ? 'Demo User' : 'Campus Node'}</span>
                  <span className="text-[9px] text-gray-400 dark:text-gray-300 font-bold uppercase truncate">Authorized Access</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={onToggleDarkMode}
                  className="flex items-center justify-center p-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 hover:border-[color:var(--gfg-accent)] transition-all"
                  title="Toggle Theme"
                >
                  {darkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-gray-500" />}
                </button>
                <Link
                  to="/settings"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center p-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 hover:border-[color:var(--gfg-accent)] transition-all"
                  title="Settings"
                >
                  <Settings size={16} className="text-gray-500 dark:text-gray-300" />
                </Link>
                <button
                  onClick={() => {
                    if (isAuthenticated) logout();
                    handleLinkClick();
                  }}
                  className="flex items-center justify-center p-2 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all group"
                  title="Logout"
                >
                  <LogOut size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
