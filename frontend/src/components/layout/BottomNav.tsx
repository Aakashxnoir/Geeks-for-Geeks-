import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, BookOpen, UserPlus } from 'lucide-react';

const bottomNavItems = [
  { to: '/app', label: 'Home', icon: Home },
  { to: '/community', label: 'Community', icon: Users },
  { to: '/events', label: 'Events', icon: Calendar },
  { to: '/resources', label: 'Vault', icon: BookOpen },
  { to: '/join', label: 'Join', icon: UserPlus },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-t border-gray-100 dark:border-white/5 lg:hidden pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {bottomNavItems.map(({ to, label, icon: Icon }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all relative ${
                isActive ? 'text-[color:var(--gfg-accent)]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-[color:var(--gfg-accent)]/10 scale-110' : ''}`}>
                <Icon size={20} className={isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'} />
              </div>
              <span className={`text-[10px] font-extrabold uppercase tracking-wide ${isActive ? 'opacity-100 scale-100' : 'opacity-80 scale-100'}`}>
                {label}
              </span>
              {isActive && (
                <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[color:var(--gfg-accent)] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
