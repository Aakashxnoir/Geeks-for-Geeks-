import { Link } from 'react-router-dom';
import { MessageCircle, FileText, Users, ChevronRight } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

const JOIN_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd_example/viewform';
const WHATSAPP_GROUP_URL = 'https://wa.me/917558124869';

export default function Join() {
  return (
    <PageLayout
      title="Join the Club"
      subtitle="Become part of GeeksforGeeks Campus Club at RIT — workshops, contests, and a supportive tech community"
    >
      <section className="gfg-bento-grid" aria-labelledby="join-intro-heading">
        <div className="gfg-card gfg-bento-span-2">
          <h2 id="join-intro-heading" className="text-lg font-bold text-[#111827] dark:text-white mb-3">
          How to join
        </h2>
        <p className="text-sm text-[#4B5563] dark:text-white/90 mb-6">
          We welcome all RIT students interested in coding, DSA, and tech. Choose one of the options below to get started. Our team will get in touch with event updates and community access.
        </p>

        <div className="space-y-4">
          <a
            href={JOIN_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card-soft flex items-center gap-4 p-4 border border-white/10 hover:border-[color:var(--gfg-accent)] transition-all group"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2F8D46]/10 dark:bg-[#22C55E]/20 text-[#2F8D46] dark:text-[#22C55E]">
              <FileText className="w-6 h-6" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-[#111827] dark:text-white group-hover:text-[#2F8D46] dark:group-hover:text-[#22C55E] transition-colors">
                Join via Google Form
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] dark:text-white/80 mt-0.5">
                Register with your name, email, and department. We&apos;ll add you to the community.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6B7280] dark:text-white/60 shrink-0" aria-hidden />
          </a>

          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card-soft flex items-center gap-4 p-4 border border-white/10 hover:border-[color:var(--gfg-accent)] transition-all group"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2F8D46]/10 dark:bg-[#22C55E]/20 text-[#2F8D46] dark:text-[#22C55E]">
              <MessageCircle className="w-6 h-6" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-[#111827] dark:text-white group-hover:text-[#2F8D46] dark:group-hover:text-[#22C55E] transition-colors">
                Join WhatsApp Group
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] dark:text-white/80 mt-0.5">
                Get instant updates, event reminders, and connect with members.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#6B7280] dark:text-white/60 shrink-0" aria-hidden />
          </a>
        </div>

        <p className="text-xs text-[#6B7280] dark:text-white/70 mt-6 gfg-text-accent">
          You can also reach out via the <Link to="/contact" className="text-[#2F8D46] dark:text-[#22C55E] font-medium hover:underline">Contact</Link> page for any questions.
        </p>

        <Link
          to="/events"
          className="inline-flex items-center gap-2 mt-6 text-sm font-medium gfg-text-accent hover:underline"
        >
          <Users className="w-4 h-4" aria-hidden />
          View upcoming events
          <ChevronRight className="w-4 h-4" aria-hidden />
        </Link>
        </div>

        <div className="gfg-card gfg-bento-span-2">
          <h2 className="text-lg font-bold text-[#111827] dark:text-white mb-3">
            Quick interest (preview)
          </h2>
          <p className="text-sm text-[#4B5563] dark:text-white/90 mb-4">
            Share your interest and preferences. Data stays on this device and is cleared automatically after a week.
          </p>
          <form className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#111827] dark:text-white mb-1">
                Name
              </label>
              <input className="gfg-input" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#111827] dark:text-white mb-1">
                Email
              </label>
              <input className="gfg-input" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#111827] dark:text-white mb-1">
                Area of interest
              </label>
              <input className="gfg-input" placeholder="DSA, Web, CP, ML..." />
            </div>
            <button type="button" className="gfg-btn gfg-btn-primary w-full">
              Save interest (local only)
            </button>
            <p className="text-[10px] gfg-text-muted">
              This mock form demonstrates the design. Use the official Google Form for real registrations.
            </p>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}

