import { Moon, Sun } from 'lucide-react';
import { useCommunityTheme } from './ThemeContext';

export default function DarkModeToggle() {
  const { isDark, toggleTheme } = useCommunityTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="
        absolute top-4 right-4 z-[60] p-3 rounded-xl min-w-[44px] min-h-[44px]
        bg-white dark:bg-[#141922] border border-[#E5E7EB] dark:border-[#3d4a5c]
        text-[#1F2937] dark:text-[#FFFFFF]
        shadow-sm hover:shadow-md
        transition-all duration-200 ease-out
        hover:border-[#2F8D46] dark:hover:border-[#22C55E] active:scale-95
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8D46] focus-visible:ring-offset-2
        dark:focus-visible:ring-[#22C55E] dark:focus-visible:ring-offset-[#000000]
      "
    >
      <span className="inline-block transition-transform duration-300 ease-out" aria-hidden>
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </span>
    </button>
  );
}
