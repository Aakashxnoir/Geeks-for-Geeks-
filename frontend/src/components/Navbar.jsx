import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, Settings, User, Bell } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Home' },
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
  const { isAuthenticated, logout } = useAuth();
  const isAuthPage = pathname === '/signin';
  const activePath = pathname === '/' ? 'home' : pathname.slice(1);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false);
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

        <Link to="/" className="gfg-navbar-brand" onClick={handleNavClick}>
          <img src={SITE_LOGO} alt="GFG Campus Club RIT" className="gfg-navbar-logo" width="40" height="40" />
          <span className="gfg-navbar-brand-text">GfG Campus Club</span>
          <span className="gfg-navbar-rit">RIT</span>
        </Link>

        {!isAuthPage && (
        <div className="gfg-navbar-search-after-logo">
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

        {/* Desktop: nav links + dark toggle + settings */}
        <div className="gfg-navbar-right">
          {!isAuthPage && (
          <ul className="gfg-navbar-links">
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
          <button
            type="button"
            className="gfg-navbar-dark-toggle ml-1"
            aria-label="Notifications"
            title="Notifications"
            onClick={() => setNotificationsOpen((o) => !o)}
          >
            <Bell className="gfg-navbar-toggle-icon" />
          </button>
          )}
          {notificationsOpen && !isAuthPage && (
            <div className="gfg-navbar-settings-dropdown mr-2 mt-2 w-80 text-left" role="dialog" aria-label="Notifications">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#111827] dark:text-white">Notifications</span>
                <button
                  type="button"
                  className="text-xs text-[#2F8D46] dark:text-[#22C55E] font-medium"
                  onClick={() => setNotificationsOpen(false)}
                >
                  Mark all as read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2 text-sm">
                <div className="p-2 rounded-lg bg-[#F9FAFB] dark:bg-[#1c212e]">
                  <p className="font-medium text-[#111827] dark:text-white">Upcoming event: DSA Workshop</p>
                  <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">Tomorrow · 5:00 PM · Lab 3</p>
                </div>
                <div className="p-2 rounded-lg bg-[#F9FAFB] dark:bg-[#1c212e]">
                  <p className="font-medium text-[#111827] dark:text:white">New resources added</p>
                  <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">Check Learning Resources for fresh DSA sets.</p>
                </div>
                <div className="p-2 rounded-lg bg-[#F9FAFB] dark:bg-[#1c212e]">
                  <p className="font-medium text-[#111827] dark:text:white">Community leaderboard updated</p>
                  <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">See this week&apos;s top contributors.</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Notifications are mock data for UI preview.
              </p>
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
