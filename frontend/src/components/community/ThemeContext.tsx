import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'gfg-community-theme';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return null;
}

export function CommunityThemeProvider({
  children,
  defaultTheme,
  controlledTheme,
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  /** When set, theme is driven by the parent (e.g. site navbar); no internal toggle. */
  controlledTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (controlledTheme !== undefined) return controlledTheme;
    const stored = getStoredTheme();
    if (stored) return stored;
    return defaultTheme ?? 'light';
  });

  useEffect(() => {
    if (controlledTheme !== undefined) {
      setThemeState(controlledTheme);
      return;
    }
    const stored = getStoredTheme();
    if (stored) return;
    setThemeState(getSystemTheme());
  }, [controlledTheme]);

  useEffect(() => {
    if (controlledTheme !== undefined) return;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }, [theme, controlledTheme]);

  useEffect(() => {
    if (controlledTheme !== undefined) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!getStoredTheme()) setThemeState(mq.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [controlledTheme]);

  const effectiveTheme = controlledTheme !== undefined ? controlledTheme : theme;
  const setTheme = useCallback((t: Theme) => { if (controlledTheme === undefined) setThemeState(t); }, [controlledTheme]);
  const toggleTheme = useCallback(() => { if (controlledTheme === undefined) setThemeState((p) => (p === 'dark' ? 'light' : 'dark')); }, [controlledTheme]);

  const value: ThemeContextValue = {
    theme: effectiveTheme,
    isDark: effectiveTheme === 'dark',
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useCommunityTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    return {
      theme: 'light' as Theme,
      isDark: false,
      setTheme: () => {},
      toggleTheme: () => {},
    };
  return ctx;
}
