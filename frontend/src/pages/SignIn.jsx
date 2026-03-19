import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEMO_EMAIL = 'demo@gfg-rit.in';
const DEMO_PASSWORD = 'Gfg@1234';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      login();
      navigate('/', { replace: true });
    } else {
      setError('Invalid credentials. Use the demo account shown on this page.');
    }
  };

  return (
    <div className="gfg-page-module min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-10 items-stretch">
          {/* Left accent panel */}
          <div className="hidden md:flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#22c55e] via-[#16a34a] to-[#065f46] text-white p-10 shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-xs font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-[#bbf7d0]" />
                GFG Campus Club · RIT
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                Welcome back to <span className="text-white">GfG Campus Club</span>
              </h1>
              <p className="mt-4 text-base font-semibold text-white max-w-md drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
                Sign in to access events, resources, community analytics, and your personalized campus tech journey.
              </p>
            </div>
            <div className="space-y-1 text-xs font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <p>Use your campus account to continue.</p>
            </div>
          </div>

          {/* Right sign-in card (tight card like reference) */}
          <section
            className="gfg-card rounded-3xl md:rounded-3xl transition-opacity duration-200 flex items-center justify-center"
            aria-label="Sign in form"
          >
            <form className="w-full max-w-sm space-y-4" noValidate onSubmit={handleSubmit}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#111827] dark:text-white">
                    Institutional access
                  </h2>
                  <p className="text-xs text-[#4B5563] dark:text-[#E5E7EB] mt-1 font-semibold">
                    Authenticate to access the Smart Campus platform.
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#4B5563] dark:text-[#E5E7EB] mb-2 font-semibold">
                Enter your email or username and password to continue.
              </p>
              {error && (
                <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/40 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <div>
                <label
                  htmlFor="signin-email"
                  className="block text-sm font-medium text-[#111827] dark:text-white mb-1"
                >
                  Email or username
                </label>
                <input
                  id="signin-email"
                  type="email"
                  className="gfg-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="signin-password"
                  className="block text-sm font-medium text-[#111827] dark:text-white mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    className="gfg-input pr-10"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center justify-center px-1 text-[#6B7280] dark:text-[#E5E7EB]"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#4B5563] dark:text-[#E5E7EB]">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-[#D1D5DB]" />
                <span>Keep me signed in on this device</span>
                </label>
                <button type="button" className="text-[#2F8D46] dark:text-[#22C55E] font-medium">
                  Forgot password?
                </button>
              </div>
              <button type="submit" className="gfg-btn gfg-btn-primary w-full">
                <LogIn className="w-4 h-4" />
                <span>Sign in</span>
              </button>
              <div className="flex items-center gap-2 text-[11px] text-[#6B7280] dark:text-[#D1D5DB]">
                <div className="h-px flex-1 bg-[#E5E7EB] dark:bg-[#4B5563]" />
                <span>OR</span>
                <div className="h-px flex-1 bg-[#E5E7EB] dark:bg-[#4B5563]" />
              </div>
              <p className="text-xs text-center text-[#4B5563] dark:text-[#E5E7EB]">
                New to the platform?{' '}
                <Link to="/signup" className="text-[#2F8D46] dark:text-[#22C55E] font-medium">
                  Request access
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

