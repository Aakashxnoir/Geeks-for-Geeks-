import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SiteThemeProvider } from './lib/context/SiteThemeContext';
import { AuthProvider, useAuth } from './lib/context/AuthContext';
import { SearchProvider } from './lib/context/SearchContext';
import TopBar from './components/layout/TopBar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import BackToTop from './components/layout/BackToTop';
import ClubInfo from './components/layout/ClubInfo';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Resources from './pages/Resources';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SettingsPage from './pages/Settings';
import CommunityPage from './pages/CommunityPage';
import Join from './pages/Join';
import NotFound from './pages/NotFound';
import { CardDetailModal } from './components/ui/CardDetailModal';
import { CardDetailProvider } from './lib/context/CardDetailContext';
import BottomNav from './components/layout/BottomNav';

function AppRoutes({ darkMode, toggleTheme }: { darkMode: boolean; toggleTheme: () => void }) {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isAuthRoute = location.pathname === '/signin' || location.pathname === '/signup';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen w-full relative">
      {!isAuthRoute && (
        <>
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            isAuthenticated={isAuthenticated}
            logout={logout}
            darkMode={darkMode}
            onToggleDarkMode={toggleTheme}
          />
          <TopBar 
            darkMode={darkMode} 
            onToggleDarkMode={toggleTheme} 
            onOpenSidebar={() => setSidebarOpen(true)}
          />
          <BottomNav />
        </>
      )}
      <main className={`gfg-main flex-grow w-full transition-all duration-300 ${!isAuthRoute ? 'pt-16 sm:pt-20' : ''}`} id="gfg-main-content">
        <Routes>
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />}
          />
          <Route
            path="/"
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
                <Navigate to="/" replace />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAuthRoute && <Footer />}
      
      {/* Spacer for mobile BottomNav to prevent obscuring the footer */}
      {!isAuthRoute && <div className="h-20 lg:hidden w-full shrink-0" />}

      <BackToTop />
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
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
