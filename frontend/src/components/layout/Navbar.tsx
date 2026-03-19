import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, Settings, User, Bell } from 'lucide-react';
import { useSearch } from '../../lib/context/SearchContext';
import { useAuth } from '../../lib/context/AuthContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/join', label: 'Join' },
  { to: '/club-info', label: 'Club Info' },
  { to: '/community', label: 'Community' },
  { to: '/events', label: 'Events' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

const SITE_LOGO = '/logo.png';

const Navbar = ({ darkMode, onToggleDarkMode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { query, setQuery, submitSearch } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const settingsRef = useRef(null);
  const notificationsRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Update', message: 'Welcome to the new Liquid Glass UI interface. Check out the new packed panels.', time: 'Just now', read: false },
    { id: 2, title: 'Event Reminder', message: 'DSA Workshop starts tomorrow at 5:00 PM in Lab 3.', time: '2h ago', read: false },
    { id: 3, title: 'New Resources', message: 'Fresh DSA question sets have been added.', time: '1d ago', read: true }
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const isAuthPage = pathname === '/signin';
  const activePath = pathname === '/' ? 'home' : pathname.slice(1);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) setNotificationsOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    submitSearch();
    setMenuOpen(false);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  return (
    <nav className="gfg-navbar" aria-label="Main navigation">
      <div className="gfg-navbar-inner">
        {/* Mobile only: hamburger on the left */}
        <button
          type="button"
          className="gfg-navbar-menu-btn"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="gfg-navbar-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-6 h-6" aria-hidden /> : <Menu className="w-6 h-6" aria-hidden />}
        </button>

        <Link to="/" className="gfg-navbar-brand flex items-center gap-3" onClick={handleNavClick}>
          <img src={SITE_LOGO} alt="GFG X RIT" className="gfg-navbar-logo" width="40" height="40" />
          <div className="flex items-center text-xl font-cal font-bold tracking-tight uppercase transition-colors">
            <span className="text-gray-900 dark:text-white">GFG X</span>
            <span className="ml-1.5 text-[color:var(--gfg-accent)]">RIT</span>
          </div>
        </Link>

        {!isAuthPage && (
        <div className="gfg-navbar-search-after-logo ml-1">
          <form onSubmit={handleSearchSubmit} role="search" className="gfg-navbar-search-wrap">
            <Search className="gfg-navbar-search-icon" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="gfg-navbar-search-input"
              aria-label="Search"
            />
          </form>
        </div>
        )}

        {/* Desktop: nav links outside the right icon group */}
        {!isAuthPage && (
          <ul className="gfg-navbar-links hidden lg:flex items-center list-none m-0 p-0 gap-1 ml-4 mr-auto">
            {navItems.map(({ to, label }) => {
              const path = to === '/' ? 'home' : to.slice(1);
              const isActive = activePath === path;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={isActive ? 'gfg-navbar-link active' : 'gfg-navbar-link'}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {/* Desktop: dark toggle + notifications + settings */}
        <div className="gfg-navbar-right ml-auto flex items-center gap-2">
          {!isAuthPage && (
          <button
            type="button"
            className="gfg-navbar-dark-toggle"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? <Sun className="gfg-navbar-toggle-icon" /> : <Moon className="gfg-navbar-toggle-icon" />}
          </button>
          )}
          {!isAuthPage && (
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              className="gfg-navbar-dark-toggle ml-1 relative"
              aria-label="Notifications"
              title="Notifications"
              onClick={() => { setNotificationsOpen((o) => !o); setSettingsOpen(false); }}
            >
              <Bell className="gfg-navbar-toggle-icon" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-[#141922]">
                  {unreadCount}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel overflow-hidden z-50 text-left origin-top-right transition-all">
                <div className="px-5 py-4 border-b border-[#e5e7eb]/50 dark:border-[#374151]/50 flex items-center justify-between bg-white/30 dark:bg-black/20">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                     <button onClick={markAllAsRead} className="text-xs font-semibold text-[#2F8D46] dark:text-[#22C55E] hover:underline">
                        Mark all as read
                     </button>
                  )}
                </div>
                <div className="max-h-[360px] overflow-y-auto overscroll-contain">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-200/50 dark:divide-white/10">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 transition-colors hover:bg-gray-50/50 dark:hover:bg-white/5 ${!notification.read ? 'bg-[#2F8D46]/5 dark:bg-[#22C55E]/10' : ''}`}>
                           <div className="flex gap-3">
                              <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${!notification.read ? 'bg-[#2F8D46] dark:bg-[#22C55E]' : 'bg-transparent'}`} />
                              <div>
                                <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-medium">
                                  {notification.time}
                                </p>
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                       You're all caught up!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          )}
          {!isAuthPage && (
          <div className="gfg-navbar-settings-wrap" ref={settingsRef}>
            <button
              type="button"
              className="gfg-navbar-settings-btn"
              onClick={(e) => { e.stopPropagation(); setSettingsOpen((o) => !o); }}
              aria-expanded={settingsOpen}
              aria-haspopup="true"
              aria-label="User details and settings"
              title="User details"
            >
              <Settings className="gfg-navbar-settings-icon" aria-hidden />
            </button>
            {settingsOpen && (
              <div className="gfg-navbar-settings-dropdown" role="menu">
                <div className="gfg-navbar-settings-header">
                  <User className="gfg-navbar-settings-user-icon" aria-hidden />
                  <span>{isAuthenticated ? 'Member' : 'Guest'}</span>
                </div>
                <button
                  type="button"
                  className="gfg-navbar-settings-link w-full text-left"
                  onClick={() => {
                    setSettingsOpen(false);
                    navigate('/settings');
                  }}
                >
                  View profile & settings
                </button>
                <button
                  type="button"
                  className="gfg-navbar-settings-link w-full text-left mt-1"
                  onClick={() => {
                    setSettingsOpen(false);
                    if (isAuthenticated) {
                      logout();
                    }
                    navigate('/signin');
                  }}
                >
                  {isAuthenticated ? 'Logout' : 'Sign in'}
                </button>
              </div>
            )}
          </div>
          )}
        </div>
      </div>

      {/* Mobile menu panel: links + search + dark toggle */}
      <div
        id="gfg-navbar-menu"
        className={`gfg-navbar-menu ${menuOpen ? 'gfg-navbar-menu-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {menuOpen && (
          <>
            <div className="gfg-navbar-menu-backdrop" onClick={() => setMenuOpen(false)} aria-hidden />
            <div className="gfg-navbar-menu-panel">
              <ul className="gfg-navbar-menu-links">
                {navItems.map(({ to, label }) => {
                  const path = to === '/' ? 'home' : to.slice(1);
                  const isActive = activePath === path;
                  return (
                    <li key={to}>
                      <Link
                        to={to}
                        className={isActive ? 'gfg-navbar-menu-link active' : 'gfg-navbar-menu-link'}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={handleNavClick}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <form onSubmit={handleSearchSubmit} role="search" className="gfg-navbar-menu-search">
                <Search className="gfg-navbar-menu-search-icon" aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="gfg-navbar-menu-search-input"
                  aria-label="Search"
                />
              </form>
              <div className="gfg-navbar-menu-actions">
                <button
                  type="button"
                  className="gfg-navbar-dark-toggle gfg-navbar-menu-toggle"
                  onClick={onToggleDarkMode}
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? <Sun className="gfg-navbar-toggle-icon" /> : <Moon className="gfg-navbar-toggle-icon" />}
                  <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
                </button>
              </div>
              <div className="gfg-navbar-menu-user">
                <span className="gfg-navbar-menu-user-title">User details</span>
                <p className="gfg-navbar-menu-user-line">Guest</p>
                <Link to="/contact" className="gfg-navbar-settings-link" onClick={handleNavClick}>Contact</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
