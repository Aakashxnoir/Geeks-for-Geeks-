import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { useAuth } from '../lib/context/AuthContext';
import { LogOut, User, Bell, Shield, Laptop } from 'lucide-react';

export default function SettingsPage() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/signin', { replace: true });
  };

  return (
    <PageLayout
      title="Account Settings"
      subtitle="Manage your personal details and account preferences."
    >
      <div className="max-w-5xl mx-auto mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          
          {/* Left Sidebar: Navigation (Visual Only) */}
          <aside className="hidden lg:block space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#16a34a]/10 dark:bg-[#22c55e]/10 text-[#15803d] dark:text-[#22c55e] font-semibold text-sm transition-colors">
              <User className="w-4 h-4" />
              Profile Details
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#71717a] dark:text-[#a1a1aa] hover:bg-[#f4f4f5] dark:hover:bg-[#27272a]/50 font-medium text-sm transition-colors cursor-not-allowed opacity-50">
              <Shield className="w-4 h-4" />
              Security
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#71717a] dark:text-[#a1a1aa] hover:bg-[#f4f4f5] dark:hover:bg-[#27272a]/50 font-medium text-sm transition-colors cursor-not-allowed opacity-50">
              <Bell className="w-4 h-4" />
              Notifications
            </button>
          </aside>

          {/* Right Content: Settings Forms */}
          <div className="space-y-6">
            
            {/* Personal Details Section */}
            <section className="bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#e4e4e7] dark:border-[#27272a] bg-[#fcfcfc] dark:bg-[#18181b]">
                <h2 className="text-lg font-bold text-[#09090b] dark:text-white">Personal Information</h2>
                <p className="text-sm text-[#71717a] dark:text-[#a1a1aa] mt-0.5 font-medium">
                  Update your details. These will be displayed on your digital ID.
                </p>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#16a34a] to-[#22c55e] border-2 border-white dark:border-[#18181b] shadow-sm flex items-center justify-center text-white text-xl font-bold">
                    JD
                  </div>
                  <div>
                    <button className="px-4 py-2 text-sm font-semibold text-[#09090b] dark:text-white bg-white dark:bg-[#27272a] border border-[#e4e4e7] dark:border-[#3f3f46] rounded-lg hover:bg-[#f4f4f5] dark:hover:bg-[#3f3f46]/80 transition-colors shadow-sm">
                      Change avatar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="settings-name" className="block text-sm font-semibold text-[#09090b] dark:text-[#f4f4f5]">
                      Full Name
                    </label>
                    <input id="settings-name" className="w-full bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-xl px-4 py-2.5 text-sm text-[#09090b] dark:text-[#f4f4f5] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all shadow-sm" placeholder="John Doe" defaultValue="Demo User" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="settings-email" className="block text-sm font-semibold text-[#09090b] dark:text-[#f4f4f5]">
                      University Email
                    </label>
                    <input id="settings-email" type="email" className="w-full bg-[#f4f4f5] dark:bg-[#27272a] border border-[#e4e4e7] dark:border-[#3f3f46] rounded-xl px-4 py-2.5 text-sm text-[#71717a] dark:text-[#a1a1aa] cursor-not-allowed opacity-80" placeholder="you@example.com" defaultValue="demo@gfg-rit.in" readOnly disabled />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="settings-dept" className="block text-sm font-semibold text-[#09090b] dark:text-[#f4f4f5]">
                      Department
                    </label>
                    <select id="settings-dept" className="w-full bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-xl px-4 py-2.5 text-sm text-[#09090b] dark:text-[#f4f4f5] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all shadow-sm">
                      <option>Computer Science</option>
                      <option>Information Technology</option>
                      <option>Electronics</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="settings-year" className="block text-sm font-semibold text-[#09090b] dark:text-[#f4f4f5]">
                      Year of Study
                    </label>
                    <select id="settings-year" className="w-full bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-xl px-4 py-2.5 text-sm text-[#09090b] dark:text-[#f4f4f5] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all shadow-sm">
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button type="button" className="px-5 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                    Save changes
                  </button>
                </div>
              </div>
            </section>

            {/* Active Sessions Section */}
            <section className="bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-2xl shadow-sm overflow-hidden">
               <div className="px-6 py-5 border-b border-[#e4e4e7] dark:border-[#27272a] bg-[#fcfcfc] dark:bg-[#18181b]">
                <h2 className="text-lg font-bold text-[#09090b] dark:text-white">Active Sessions</h2>
                <p className="text-sm text-[#71717a] dark:text-[#a1a1aa] mt-0.5 font-medium">
                  Manage devices currently logged into your account.
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between p-4 bg-[#f4f4f5] dark:bg-[#27272a]/30 border border-[#e4e4e7] dark:border-[#27272a] rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-[#18181b] flex items-center justify-center border border-[#e4e4e7] dark:border-[#3f3f46] shadow-sm">
                      <Laptop className="w-5 h-5 text-[#71717a] dark:text-[#a1a1aa]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#09090b] dark:text-white">Windows PC · Chrome</p>
                      <p className="text-xs font-medium text-[#16a34a] mt-0.5">Current session</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#71717a]">Active now</span>
                </div>
              </div>
            </section>

            {/* Account Actions Section */}
            <section className="bg-white dark:bg-[#18181b] border border-red-200 dark:border-red-900/30 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-red-100 dark:border-red-900/20 bg-red-50/50 dark:bg-red-950/10">
                <h2 className="text-lg font-bold text-red-600 dark:text-red-500">Danger Zone</h2>
                <p className="text-sm text-red-500/80 dark:text-red-400/80 mt-0.5 font-medium">
                  Irreversible and destructive account actions.
                </p>
              </div>
              <div className="p-6">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-[#09090b] dark:text-white">Sign out completely</h3>
                      <p className="text-xs text-[#71717a] dark:text-[#a1a1aa] mt-1 max-w-sm">
                        You will be logged out of this session. You will need your credentials to sign back in and access the dashboard.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold text-sm rounded-xl border border-red-200 dark:border-red-500/20 transition-colors shadow-sm whitespace-nowrap"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                 </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
