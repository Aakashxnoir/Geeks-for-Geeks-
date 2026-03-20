import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Mail, Calendar, ShieldAlert } from 'lucide-react';

export default function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#000000] text-gray-900 dark:text-white pb-20">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#2F8D46] dark:hover:text-[#22C55E] transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-sm font-black uppercase tracking-widest text-gray-400">Notifications</h1>
        <div className="w-20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
        <section className="space-y-6">
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2 italic">Notification <span className="text-[#22C55E]">Center</span></h2>
            <p className="text-sm text-gray-500 mb-6">Control your alerts across events, email updates, and security notices.</p>
            <div className="space-y-3">
              {[
                { label: 'Email updates', icon: Mail, defaultChecked: true },
                { label: 'Event reminders', icon: Calendar, defaultChecked: true },
                { label: 'Security alerts', icon: ShieldAlert, defaultChecked: true },
              ].map((item) => (
                <label key={item.label} className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    <item.icon className="w-4 h-4 text-[#22C55E]" />
                    {item.label}
                  </span>
                  <input type="checkbox" defaultChecked={item.defaultChecked} className="accent-[#16a34a]" />
                </label>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm">
              <Bell className="w-4 h-4" />
              Save Notification Settings
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
