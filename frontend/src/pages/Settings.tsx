import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { useAuth } from '../lib/context/AuthContext';
import { User, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/signin', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <PageLayout title="Account Settings" subtitle="Choose a settings function to continue.">
      <div className="max-w-5xl mx-auto mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <aside className="space-y-2">
            <button
              type="button"
              onClick={() => navigate('/settings/profile')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#16a34a]/10 dark:bg-[#22c55e]/10 text-[#15803d] dark:text-[#22c55e] font-semibold text-base transition-colors"
            >
              <User className="w-5 h-5" />
              Profile
            </button>
            <button
              type="button"
              onClick={() => navigate('/settings/security')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#71717a] dark:text-[#a1a1aa] hover:bg-[#f4f4f5] dark:hover:bg-[#27272a]/50 font-semibold text-base transition-colors"
            >
              <Shield className="w-5 h-5" />
              Security
            </button>
            <button
              type="button"
              onClick={() => navigate('/settings/notifications')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#71717a] dark:text-[#a1a1aa] hover:bg-[#f4f4f5] dark:hover:bg-[#27272a]/50 font-semibold text-base transition-colors"
            >
              <Bell className="w-5 h-5" />
              Notifications
            </button>
          </aside>

          <section className="glass-card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#111827] dark:text-white">Settings Workspace</h2>
            <p className="text-sm text-[#6B7280] dark:text-[#a1a1aa] mt-2">
              Use the left-side functions to open Profile, Security, and Notifications pages.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}

