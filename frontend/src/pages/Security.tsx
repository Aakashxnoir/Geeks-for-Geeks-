import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, ShieldCheck, KeyRound, Eye } from 'lucide-react';

export default function SecurityPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#000000] text-gray-900 dark:text-white pb-20">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#2F8D46] dark:hover:text-[#22C55E] transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-sm font-black uppercase tracking-widest text-gray-400">Security</h1>
        <div className="w-20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 lg:py-12">
        <section className="space-y-6">
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2 italic">Account <span className="text-[#22C55E]">Protection</span></h2>
            <p className="text-sm text-gray-500 mb-6">Manage password, sign-in safety, and verification options.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4">
                <ShieldCheck className="w-5 h-5 text-[#22C55E] mb-2" />
                <p className="font-semibold">Two-factor status</p>
                <p className="text-xs text-gray-500 mt-1">Recommended for stronger account safety.</p>
              </div>
              <div className="rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4">
                <Lock className="w-5 h-5 text-[#22C55E] mb-2" />
                <p className="font-semibold">Password health</p>
                <p className="text-xs text-gray-500 mt-1">Use 8+ characters with symbols and numbers.</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8">
            <h3 className="text-xl font-black uppercase tracking-tight mb-4">Security Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm">
                <KeyRound className="w-4 h-4" />
                Update Password
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 font-semibold text-sm">
                <Eye className="w-4 h-4" />
                Review Sessions
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
