import { createContext, useContext } from 'react';

const SiteThemeContext = createContext(null);

export function SiteThemeProvider({ children, isDark, onToggle }) {
  return (
    <SiteThemeContext.Provider value={{ isDark: !!isDark, toggleTheme: onToggle }}>
      {children}
    </SiteThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const ctx = useContext(SiteThemeContext);
  return ctx ?? { isDark: false, toggleTheme: () => {} };
}
