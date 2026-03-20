import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SiteThemeProvider } from './lib/context/SiteThemeContext';
import { AuthProvider, useAuth } from './lib/context/AuthContext';
import { SearchProvider } from './lib/context/SearchContext';
import { AnimatePresence, motion } from 'motion/react';
import TopBar from './components/layout/TopBar';
import Footer from './components/layout/Footer';
import BackToTop from './components/layout/BackToTop';
import WebsiteAssistant from './components/layout/WebsiteAssistant';
import ClubInfo from './components/layout/ClubInfo';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Resources from './pages/Resources';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SettingsPage from './pages/Settings';
import CommunityPage from './pages/CommunityPage';
import Join from './pages/Join';
import NotFound from './pages/NotFound';
import BadgesPage from './pages/BadgesPage';
import ProfilePage from './pages/Profile';
import { CardDetailModal } from './components/ui/CardDetailModal';
import { CardDetailProvider } from './lib/context/CardDetailContext';
import BottomNav from './components/layout/BottomNav';

function AppRoutes({ darkMode, toggleTheme }: { darkMode: boolean; toggleTheme: () => void }) {
  const { isAuthenticated, logout, authLoading } = useAuth();
  const location = useLocation();
  const isAuthRoute = location.pathname === '/signin' || location.pathname === '/signup';
  const isStandaloneRoute = location.pathname === '/badges';
  const showAppChrome = !authLoading && isAuthenticated && !isStandaloneRoute && !isAuthRoute && location.pathname !== '/';
  const showAssistant = !authLoading && isAuthenticated && !isAuthRoute && location.pathname !== '/';

  const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    if (authLoading) return null;
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen w-full relative">
      {showAppChrome && (
        <>
          <TopBar 
            darkMode={darkMode} 
            onToggleDarkMode={toggleTheme} 
          />
          <BottomNav />
        </>
      )}
      {showAssistant && <WebsiteAssistant />}
      <main className={`gfg-main flex-grow w-full transition-all duration-300 ${showAppChrome ? 'pt-14 sm:pt-16' : ''}`} id="gfg-main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route
                path="/signin"
                element={authLoading ? null : isAuthenticated ? <Navigate to="/app" replace /> : <SignIn />}
              />
              <Route
                path="/signup"
                element={authLoading ? null : isAuthenticated ? <Navigate to="/app" replace /> : <SignUp />}
              />
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/app"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/club-info"
                element={
                  <RequireAuth>
                    <ClubInfo />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Navigate to="/app" replace />
                  </RequireAuth>
                }
              />
              <Route
                path="/community"
                element={
                  <RequireAuth>
                    <CommunityPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/contact"
                element={
                  <RequireAuth>
                    <Contact />
                  </RequireAuth>
                }
              />
              <Route
                path="/events"
                element={
                  <RequireAuth>
                    <Events />
                  </RequireAuth>
                }
              />
              <Route
                path="/events/:id"
                element={
                  <RequireAuth>
                    <EventDetail />
                  </RequireAuth>
                }
              />
              <Route
                path="/resources"
                element={
                  <RequireAuth>
                    <Resources />
                  </RequireAuth>
                }
              />
              <Route
                path="/join"
                element={
                  <RequireAuth>
                    <Join />
                  </RequireAuth>
                }
              />
              <Route
                path="/settings"
                element={
                  <RequireAuth>
                    <SettingsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/badges"
                element={
                  <RequireAuth>
                    <BadgesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {showAppChrome && <Footer />}
      {showAppChrome && <div className="h-16 lg:hidden w-full shrink-0" />}

      {showAppChrome && <BackToTop />}
    </div>
  );
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('gfg-dark');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('gfg-dark', JSON.stringify(darkMode));
    } catch {}
  }, [darkMode]);

  useEffect(() => {
    const handler = (e: CustomEvent) => setDarkMode(e.detail);
    window.addEventListener('gfg-theme-toggle', handler as EventListener);
    return () => window.removeEventListener('gfg-theme-toggle', handler as EventListener);
  }, []);

  const toggleTheme = () => setDarkMode((v) => !v);

  return (
    <CardDetailProvider>
      <SiteThemeProvider isDark={darkMode} onToggle={toggleTheme}>
        <AuthProvider>
          <SearchProvider>
            <AppRoutes darkMode={darkMode} toggleTheme={toggleTheme} />
            <CardDetailModal />
          </SearchProvider>
        </AuthProvider>
      </SiteThemeProvider>
    </CardDetailProvider>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
