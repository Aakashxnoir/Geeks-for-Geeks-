import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, Code2 } from 'lucide-react';
import { useAuth } from '../lib/context/AuthContext';
import { motion } from 'motion/react';

const DEMO_EMAIL = 'demo@gfg-rit.in';
const DEMO_PASSWORD = 'Gfg@1234';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email.trim() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        login();
        navigate('/', { replace: true });
      } else {
        setError('Invalid credentials. Use the demo account to log in.');
        setIsLoading(false);
      }
    }, 600);
  };

  const handleDemoFill = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-[#09090b]">
      {/* Left panel: Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0a2514] text-white p-12 lg:p-16 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#16a34a]/20 to-transparent opacity-50 z-0" />
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-[#16a34a]" />
            </div>
            <span className="text-xl font-bold tracking-tight">GeeksforGeeks RIT</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
              Accelerate your tech career.
            </h1>
            <p className="mt-6 text-lg text-[#a1a1aa] leading-relaxed font-medium">
              Join the official campus platform to track your learning progress, manage events, and engage with the community seamlessly.
            </p>
          </motion.div>
          
          {/* Testimonial / Features Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md"
          >
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22c55e] to-[#15803d] border-2 border-[#0a2514] flex items-center justify-center text-xs font-bold text-white shadow-sm">+99</div>
              <div className="w-10 h-10 rounded-full bg-[#18181b] border-2 border-[#0a2514] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#22c55e]" />
              </div>
            </div>
            <div className="text-sm font-medium text-[#d4d4d8]">
              Join over <span className="text-white font-bold">1,200</span> active student members.
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel: Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 hidden sm:block">
          <p className="text-sm font-medium text-[#71717a] dark:text-[#a1a1aa]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#16a34a] hover:text-[#15803d] dark:hover:text-[#22c55e] transition-colors font-semibold">
              Sign up
            </Link>
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px]"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[#16a34a] shadow-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#09090b] dark:text-white">GFG RIT</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#09090b] dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-[#71717a] dark:text-[#a1a1aa] mt-2 font-medium">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <form className="space-y-5" noValidate onSubmit={handleSubmit}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl p-3"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="signin-email" className="block text-sm font-medium text-[#09090b] dark:text-[#f4f4f5]">
                Email address
              </label>
              <input
                id="signin-email"
                type="email"
                className="w-full bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#09090b] dark:text-[#f4f4f5] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all shadow-sm"
                placeholder="you@university.edu"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="signin-password" className="block text-sm font-medium text-[#09090b] dark:text-[#f4f4f5]">
                  Password
                </label>
                <button type="button" className="text-xs font-medium text-[#16a34a] hover:text-[#15803d] dark:hover:text-[#22c55e] transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="signin-password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#09090b] dark:text-[#f4f4f5] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all shadow-sm pr-11"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center justify-center p-3 text-[#a1a1aa] hover:text-[#71717a] dark:hover:text-[#d4d4d8] transition-colors"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold flex items-center justify-center px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign in'
              )}
            </button>

            {/* Quick Demo Fill - Helper for Evaluators */}
            <div className="pt-4 mt-4 border-t border-[#e4e4e7] dark:border-[#27272a]">
              <button
                type="button"
                onClick={handleDemoFill}
                className="w-full bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#27272a] dark:hover:bg-[#3f3f46] text-[#09090b] dark:text-white font-medium text-sm px-4 py-3 rounded-xl transition-colors"
              >
                Use Demo Credentials
              </button>
            </div>
            
            <p className="lg:hidden text-center text-sm font-medium text-[#71717a] dark:text-[#a1a1aa] mt-8">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#16a34a] hover:text-[#15803d] dark:hover:text-[#22c55e] transition-colors font-semibold">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
