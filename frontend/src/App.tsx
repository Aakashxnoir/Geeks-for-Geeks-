import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SiteThemeProvider } from './lib/context/SiteThemeContext';
import { AuthProvider, useAuth } from './lib/context/AuthContext';
import { SearchProvider } from './lib/context/SearchContext';
import Navbar from './components/layout/Navbar';
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
import Dashboard from './pages/Dashboard';
import Join from './pages/Join';
import NotFound from './pages/NotFound';

function AppRoutes({ darkMode, toggleTheme }: { darkMode: boolean; toggleTheme: () => void }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isAuthRoute = location.pathname === '/signin' || location.pathname === '/signup';

  const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  return (
    <>
      {!isAuthRoute && <Navbar darkMode={darkMode} onToggleDarkMode={toggleTheme} />}
      <main className="gfg-main" id="gfg-main-content" style={{ flex: 1 }}>
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
                <Dashboard />
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
    </>
  );
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gfg-dark') ?? 'false');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
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
    <SiteThemeProvider isDark={darkMode} onToggle={toggleTheme}>
      <AuthProvider>
        <SearchProvider>
          <AppRoutes darkMode={darkMode} toggleTheme={toggleTheme} />
        </SearchProvider>
      </AuthProvider>
    </SiteThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
