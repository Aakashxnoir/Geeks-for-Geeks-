import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate('/', { replace: true });
  };

  return (
    <div className="gfg-page-module min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 items-stretch">
          {/* Left sign-up card (Create account) */}
          <section
            className="gfg-card rounded-3xl md:rounded-3xl transition-opacity duration-200 order-2 md:order-1 flex items-center justify-center"
            aria-label="Sign up form"
          >
            <form className="w-full max-w-sm space-y-4" noValidate onSubmit={handleSubmit}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#111827] dark:text-white">
                    Create account
                  </h2>
                  <p className="text-xs text-[#4B5563] dark:text-[#E5E7EB] mt-1 font-semibold">
                    Register for access to the GFG Campus Club platform.
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#4B5563] dark:text-[#E5E7EB] mb-2 font-semibold">
                Enter your details to get started with GFG Campus Club at RIT.
              </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium text-[#111827] dark:text-white mb-1">
                Full name
              </label>
              <input
                id="signup-name"
                type="text"
                className="gfg-input"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="signup-roll" className="block text-sm font-medium text-[#111827] dark:text-white mb-1">
                Roll number (optional)
              </label>
              <input
                id="signup-roll"
                type="text"
                className="gfg-input"
                placeholder="RIT roll number"
              />
            </div>
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-[#111827] dark:text:white mb-1">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              className="gfg-input"
              placeholder="college-email@rit.edu"
              autoComplete="email"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-[#111827] dark:text:white mb-1">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                className="gfg-input"
                placeholder="Create a password"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="signup-password-confirm" className="block text-sm font-medium text-[#111827] dark:text:white mb-1">
                Confirm password
              </label>
              <input
                id="signup-password-confirm"
                type="password"
                className="gfg-input"
                placeholder="Re-enter password"
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="text-xs text-[#4B5563] dark:text-[#E5E7EB] space-y-1">
            <label className="inline-flex items-start gap-2">
              <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 rounded border-[#D1D5DB]" />
              <span>
                I agree to the club&apos;s communication policy and understand that event updates may be sent to my email or WhatsApp.
              </span>
            </label>
          </div>
              <button type="submit" className="gfg-btn gfg-btn-primary w-full">
                <UserPlus className="w-4 h-4" />
                <span>Create account</span>
              </button>
              <div className="flex items-center gap-2 text-[11px] text-[#6B7280] dark:text-[#D1D5DB]">
                <div className="h-px flex-1 bg-[#E5E7EB] dark:bg-[#4B5563]" />
                <span>OR</span>
                <div className="h-px flex-1 bg-[#E5E7EB] dark:bg-[#4B5563]" />
              </div>
              <p className="text-xs text-center text-[#4B5563] dark:text-[#E5E7EB]">
                Already have an account?{' '}
                <Link to="/signin" className="text-[#2F8D46] dark:text-[#22C55E] font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </section>

          {/* Right accent panel (info) */}
          <div className="hidden md:flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#22c55e] via-[#16a34a] to-[#065f46] text-white p-10 shadow-2xl order-1 md:order-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-xs font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-[#bbf7d0]" />
                Join GFG Campus Club · RIT
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                Create your <span className="text-white">club account</span>
              </h1>
              <p className="mt-4 text-base font-semibold text-white max-w-md drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
                Sign up to save your interests, track participation, and receive curated learning resources from the club.
              </p>
            </div>
            <p className="text-sm font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Already a member? Use your campus email so we can link your activity to events and resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

