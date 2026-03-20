import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
  const TOKEN_KEY = 'gfg-rit-token';

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setAuthLoading(false);
      return;
    }

    const controller = new AbortController();
    fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('me failed'))))
      .then((data) => {
        setIsAuthenticated(!!data?.isAuthenticated);
        setUser(data?.user ?? null);
        setAuthLoading(false);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setIsAuthenticated(false);
        setUser(null);
        setAuthLoading(false);
      });

    return () => controller.abort();
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.message || 'Signin failed');
    }

    const data = await res.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setIsAuthenticated(true);
    setUser(data.user ?? null);
    setAuthLoading(false);
  };

  const signup = async ({ name, email, password, department, year, role }) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, department, year, role }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.message || 'Signup failed');
    }

    const data = await res.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setIsAuthenticated(true);
    setUser(data.user ?? null);
    setAuthLoading(false);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, authLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx ?? { isAuthenticated: false, user: null, authLoading: false, login: () => {}, signup: () => {}, logout: () => {} };
}

