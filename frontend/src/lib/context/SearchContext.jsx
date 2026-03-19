import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submitSearch = useCallback(() => {
    const q = query.trim();
    if (q) navigate(`/community?q=${encodeURIComponent(q)}`);
    else navigate('/community');
  }, [query, navigate]);

  const value = { query, setQuery, submitSearch };
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  return ctx ?? { query: '', setQuery: () => {}, submitSearch: () => {} };
}
