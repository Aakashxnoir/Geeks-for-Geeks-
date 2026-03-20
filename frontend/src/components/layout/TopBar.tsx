import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Menu, Bell, Settings, X } from 'lucide-react';
import { useSearch } from '../../lib/context/SearchContext';

interface TopBarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSidebar: () => void;
}

const TopBar = ({ darkMode, onToggleDarkMode, onOpenSidebar }: TopBarProps) => {
  const { pathname } = useLocation();
  const { query, setQuery, submitSearch } = useSearch();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Optimized', message: 'CIVIQ-strict navigation applied.', time: 'Just now', read: false },
    { id: 2, title: 'Event Reminder', message: 'DSA Workshop starts tomorrow.', time: '2h ago', read: false },
    { id: 3, title: 'New Resources', message: 'Fresh DSA question sets added.', time: '1d ago', read: true }
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const isAuthPage = pathname === '/signin';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearch();
    setIsMobileSearchOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 h-16 sm:h-20 flex items-center ${darkMode ? 'bg-[#111113]/85 border-b border-[#3f3f46]/50' : 'bg-white/70 border-b border-[#e2e8f0]/50'} w-full backdrop-blur-xl backdrop-saturate-150 transition-colors duration-200`}>
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 w-full max-w-[1440px] mx-auto">
        
        <div className="flex items-center gap-2 sm:gap-4 flex-1">
          {/* Mobile Hamburger (Only visible on mobile) */}
          <button
            type="button"
            className="flex sm:hidden p-2 -ml-1 rounded-xl text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            onClick={onOpenSidebar}
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 group whitespace-nowrap">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform" />
            <span className="text-sm sm:text-base font-black tracking-tight dark:text-white uppercase transition-colors">
              GFG <span className="text-[color:var(--gfg-accent)]">X RIT</span>
            </span>
          </Link>

          {/* Universal Search Bar - Next to Logo */}
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block group w-48 lg:w-64 ml-4 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[color:var(--gfg-accent)] transition-colors" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-gray-50/60 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium focus:ring-2 focus:ring-[color:var(--gfg-accent)]/30 focus:border-[color:var(--gfg-accent)] focus:bg-white dark:focus:bg-white/10 transition-all outline-none"
            />
          </form>

          {/* Desktop-only Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 ml-auto justify-end overflow-hidden">
            {[
              { to: '/', label: 'Home' },
              { to: '/community', label: 'Community' },
              { to: '/events', label: 'Events' },
              { to: '/club-info', label: 'About Club' },
              { to: '/resources', label: 'Knowledge Base' },
              { to: '/join', label: 'Join RIT' },
              { to: '/contact', label: 'Connect' }
            ].map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`px-3 py-2 rounded-xl text-[11px] xl:text-xs font-black uppercase tracking-tight transition-all whitespace-nowrap ${
                  pathname === link.to 
                    ? 'text-[color:var(--gfg-accent)] bg-[color:var(--gfg-accent)]/10' 
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Actions (Icons) - Visible on ALL viewports as requested */}
        {!isAuthPage && (
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle (Visible on tiny screens) */}
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="sm:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              {darkMode ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            <div className="relative" ref={notificationsRef}>
              <button
                className="p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black/80" />
                )}
              </button>

              {notificationsOpen && (
                <div className={`absolute right-0 mt-3 w-80 p-0 overflow-hidden shadow-lg z-50 origin-top-right gfg-modal-enter rounded-xl ${darkMode ? 'bg-[#111113] border border-[#27272a]' : 'bg-white border border-[#e2e8f0]'}`}>
                  <div className={`px-5 py-4 border-b flex items-center justify-between ${darkMode ? 'border-[#27272a] bg-[#18181b]' : 'border-[#e2e8f0] bg-[#f8fafc]'}`}>
                    <span className="text-sm font-black dark:text-white uppercase tracking-widest">Global Alerts</span>
                    <button onClick={markAllAsRead} className="text-[10px] text-[color:var(--gfg-accent)] font-black uppercase hover:underline">
                      Dismiss All
                    </button>
                  </div>
                  <div className="max-h-[360px] overflow-y-auto custom-scrollbar p-1">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-4 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/2 transition-all mb-1 last:mb-0 ${!n.read ? 'bg-[color:var(--gfg-accent)]/5' : ''}`}>
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-xs font-black dark:text-white uppercase tracking-tight">{n.title}</p>
                          <span className="text-[9px] font-bold text-gray-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/settings" className="p-2 inset-y-0 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Search Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} ${darkMode ? 'bg-[#09090b]' : 'bg-white'}`}>
        <div className="p-4 flex items-center gap-4 border-b border-gray-100 dark:border-white/5">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--gfg-accent)]" />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search zones..."
              className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium focus:ring-0 outline-none"
              autoFocus={isMobileSearchOpen}
            />
          </form>
          <button 
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
