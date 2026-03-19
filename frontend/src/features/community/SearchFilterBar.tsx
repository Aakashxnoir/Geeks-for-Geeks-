import { useState } from 'react';
import { Search } from 'lucide-react';

export type SearchCategory = 'all' | 'students' | 'posts' | 'achievements';

interface SearchFilterBarProps {
  onSearch: (query: string, category: SearchCategory) => void;
  /** When set, the bar shows this category as active (page view follows this). */
  activeCategory?: SearchCategory;
  /** When set, the search input is controlled by the parent so the same query is used across all views. */
  searchQuery?: string;
  /** Called when the user types in the search box (keeps global search in sync). */
  onSearchQueryChange?: (query: string) => void;
  placeholder?: string;
}

export default function SearchFilterBar({
  onSearch,
  activeCategory: controlledCategory,
  searchQuery: controlledQuery,
  onSearchQueryChange,
  placeholder = 'Search students, posts, achievements...',
}: SearchFilterBarProps) {
  const [localQuery, setLocalQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const effectiveCategory = controlledCategory !== undefined ? controlledCategory : category;
  const query = controlledQuery !== undefined ? controlledQuery : localQuery;
  const setQuery = (value: string) => {
    if (onSearchQueryChange) onSearchQueryChange(value);
    else setLocalQuery(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim(), effectiveCategory);
  };

  const handleCategoryClick = (cat: SearchCategory) => {
    onSearch(query.trim(), cat);
    if (controlledCategory === undefined) setCategory(cat);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-3 items-center"
      role="search"
    >
      <div className="relative flex-1 min-w-[240px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-[#E5E7EB]"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] bg-[#FFFFFF] dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] placeholder:text-[#6B7280] dark:placeholder:text-[#FFFFFF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8D46]/30 dark:focus-visible:ring-[#22C55E]/50 focus:border-[#2F8D46] transition-colors duration-200"
          aria-label="Search students, posts, and achievements"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {(['all', 'students', 'posts', 'achievements'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            data-active={effectiveCategory === cat}
            onClick={() => handleCategoryClick(cat)}
            className={`gfg-filter-btn px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors duration-200 ${
              effectiveCategory === cat
                ? 'bg-[#2F8D46] text-white dark:bg-[#22C55E] dark:text-[#052E16]'
                : 'bg-[#F9FAFB] dark:bg-[#1c212e] text-[#1F2937] dark:text-[#FFFFFF] border border-[#E5E7EB] dark:border-[#3d4a5c] hover:border-[#22C55E] dark:hover:border-[#22C55E] hover:text-[#22C55E] dark:hover:text-[#22C55E]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <button
        type="submit"
        className="w-full md:w-auto px-5 py-3 rounded-xl bg-[#2F8D46] dark:bg-[#22C55E] dark:text-[#052E16] text-white font-medium hover:bg-[#1F6B34] dark:hover:bg-[#16A34A] transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8D46] dark:focus-visible:ring-[#22C55E] dark:focus-visible:ring-[rgba(34,197,94,0.5)] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#000000]"
      >
        Search
      </button>
    </form>
  );
}
