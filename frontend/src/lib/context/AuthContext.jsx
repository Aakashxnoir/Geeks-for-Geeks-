import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('gfg-rit-auth');
    setIsAuthenticated(stored === 'true');
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('gfg-rit-auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('gfg-rit-auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx ?? { isAuthenticated: false, login: () => {}, logout: () => {} };
}

