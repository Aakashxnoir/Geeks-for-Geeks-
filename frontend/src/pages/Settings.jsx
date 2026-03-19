import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/shared/PageLayout';
import { useAuth } from '../context/AuthContext';

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
      subtitle="Manage your personal details and account actions"
    >
      <section className="gfg-card max-w-3xl mx-auto space-y-6" aria-label="Account settings">
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white">
            Personal details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="settings-name" className="block text-sm font-medium text-[#111827] dark:text-white mb-1">
                Name
              </label>
              <input id="settings-name" className="gfg-input" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="settings-email" className="block text-sm font-medium text-[#111827] dark:text:white mb-1">
                Email
              </label>
              <input id="settings-email" type="email" className="gfg-input" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="settings-dept" className="block text-sm font-medium text-[#111827] dark:text:white mb-1">
                Department
              </label>
              <input id="settings-dept" className="gfg-input" placeholder="CSE / IT / ECE ..." />
            </div>
            <div>
              <label htmlFor="settings-year" className="block text-sm font-medium text-[#111827] dark:text:white mb-1">
                Year of study
              </label>
              <input id="settings-year" className="gfg-input" placeholder="1 / 2 / 3 / 4" />
            </div>
          </div>
          <button type="button" className="gfg-btn gfg-btn-primary">
            Save changes
          </button>
        </div>

        <div className="border-t border-[#E5E7EB] dark:border-[#30363d] pt-4">
          <h2 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white mb-2">
            Account actions
          </h2>
          <p className="text-sm text-[#4B5563] dark:text-[#E5E7EB] mb-3">
            You can sign out from this browser. You will need to sign in again to access personalized features.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="gfg-btn w-full sm:w-auto border-red-500 text-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-500"
          >
            Logout
          </button>
        </div>
      </section>
    </PageLayout>
  );
}

