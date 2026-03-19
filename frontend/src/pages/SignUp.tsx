import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, Code2 } from 'lucide-react';
import { useAuth } from '../lib/context/AuthContext';
import { motion } from 'motion/react';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      login();
      navigate('/', { replace: true });
    }, 600);
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
              Start your journey today.
            </h1>
            <p className="mt-6 text-lg text-[#a1a1aa] leading-relaxed font-medium">
              Create a free club account to save your interests, track participation milestones, and access premium curated resources.
            </p>
          </motion.div>
          
          {/* Testimonial / Features Pill */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md"
          >
            <div className="w-10 h-10 rounded-full bg-[#18181b] border-2 border-[#0a2514] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#22c55e]" />
            </div>
            <div className="text-sm font-medium text-[#d4d4d8]">
              "The platform helped me track my workshop participation and boosted my placement readiness scoring."
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel: Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 hidden sm:block">
          <p className="text-sm font-medium text-[#71717a] dark:text-[#a1a1aa]">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#16a34a] hover:text-[#15803d] dark:hover:text-[#22c55e] transition-colors font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px] my-auto"
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
              Create an account
            </h2>
            <p className="text-sm text-[#71717a] dark:text-[#a1a1aa] mt-2 font-medium">
              Enter your details below to set up your profile.
            </p>
          </div>

          <form className="space-y-4" noValidate onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label htmlFor="signup-name" className="block text-sm font-medium text-[#09090b] dark:text-[#f4f4f5]">
                Full name
              </label>
              <input
                id="signup-name"
                type="text"
                className="w-full bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#09090b] dark:text-[#f4f4f5] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all shadow-sm"
                placeholder="John Doe"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup-email" className="block text-sm font-medium text-[#09090b] dark:text-[#f4f4f5]">
                University Email
              </label>
              <input
                id="signup-email"
                type="email"
                className="w-full bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#09090b] dark:text-[#f4f4f5] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all shadow-sm"
                placeholder="you@rit.edu.in"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="signup-password" className="block text-sm font-medium text-[#09090b] dark:text-[#f4f4f5]">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-xl px-4 py-3 text-sm text-[#09090b] dark:text-[#f4f4f5] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all shadow-sm pr-11"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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
              disabled={isLoading || !email || !password || !name}
              className="w-full mt-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold flex items-center justify-center px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Create account'
              )}
            </button>
            
            <p className="text-xs text-center text-[#71717a] dark:text-[#a1a1aa] mt-4 max-w-xs mx-auto">
              By clicking continue, you agree to our Terms of Service and Privacy Policy.
            </p>
            
            <p className="lg:hidden text-center text-sm font-medium text-[#71717a] dark:text-[#a1a1aa] mt-8">
              Already have an account?{' '}
              <Link to="/signin" className="text-[#16a34a] hover:text-[#15803d] dark:hover:text-[#22c55e] transition-colors font-semibold">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
