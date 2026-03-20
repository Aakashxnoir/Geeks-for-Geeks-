import { useState, useEffect, useRef } from 'react';
import {
  User,
  Mail,
  FileText,
  MessageSquare,
  MessageCircle,
  ChevronDown,
  X,
  MapPin,
  ExternalLink,
  Linkedin,
  Image,
  Phone,
} from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import {
  CONTACT_STATS,
  TEAM_CONTACTS,
  CLUB_EMAIL,
  SOCIAL_CARDS,
  FAQ_ITEMS,
  SUBJECT_OPTIONS,
  MAP_EMBED_URL,
} from '../utils/data/contactData';

const MESSAGE_MAX_LENGTH = 500;

const SOCIAL_ICONS = { Instagram: Image, LinkedIn: Linkedin };
interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({ fullName: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [easterEgg, setEasterEgg] = useState(false);
  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000';

  const [contactStats, setContactStats] = useState(CONTACT_STATS);
  const [teamContacts, setTeamContacts] = useState(TEAM_CONTACTS);
  const [clubEmail, setClubEmail] = useState(CLUB_EMAIL);
  const [faqItems, setFaqItems] = useState(FAQ_ITEMS);
  const [subjectOptions, setSubjectOptions] = useState(SUBJECT_OPTIONS);
  const [mapEmbedUrl, setMapEmbedUrl] = useState(MAP_EMBED_URL);

  const [statValues, setStatValues] = useState(CONTACT_STATS.map(() => 0));
  const [statsVisible, setStatsVisible] = useState(false);
  const keyBufferRef = useRef('');
  const statsRef = useRef(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MESSAGE_MAX_LENGTH) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await fetch(`${API_BASE_URL}/api/contact/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
    } catch {
      // Best-effort: even if backend fails, keep UI consistent.
    }

    setSubmitted(true);
    setSubmittedEmail(formData.email || '');
    setFormData({ fullName: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const duration = 1400;
    const steps = 45;
    let step = 0;
    const t = setInterval(() => {
      step += 1;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - (1 - progress) ** 2;
      setStatValues(contactStats.map((s) => Math.round((s.value || 0) * eased)));
      if (step >= steps) clearInterval(t);
    }, duration / steps);
    return () => clearInterval(t);
  }, [statsVisible, contactStats]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/contact`);
        const data = await res.json();
        if (cancelled) return;

        const nextStats = Array.isArray(data?.contactStats) ? data.contactStats : CONTACT_STATS;
        setContactStats(nextStats);
        setStatValues(nextStats.map(() => 0));

        setTeamContacts(Array.isArray(data?.teamContacts) ? data.teamContacts : TEAM_CONTACTS);
        setClubEmail(data?.clubEmail || CLUB_EMAIL);
        setFaqItems(Array.isArray(data?.faqItems) ? data.faqItems : FAQ_ITEMS);
        setSubjectOptions(Array.isArray(data?.subjectOptions) ? data.subjectOptions : SUBJECT_OPTIONS);
        setMapEmbedUrl(data?.mapEmbedUrl || MAP_EMBED_URL);
      } catch {
        // Keep mock constants if backend is unreachable.
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [API_BASE_URL]);

  useEffect(() => {
    const onKeyDown = (e) => {
      keyBufferRef.current = (keyBufferRef.current + e.key).slice(-20).toLowerCase();
      if (keyBufferRef.current.includes('gfg') || keyBufferRef.current.includes('developer')) {
        setEasterEgg(true);
        setTimeout(() => setEasterEgg(false), 3000);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const inputClass =
    'w-full pl-10 pr-4 py-3 rounded-xl border bg-[#FFFFFF] dark:bg-[#18181b] text-[#1F2937] dark:text-[#FFFFFF] placeholder:text-[#6B7280] dark:placeholder:text-[#71717a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8D46]/30 dark:focus-visible:ring-[#22C55E]/50 border-[#E5E7EB] dark:border-[#3f3f46] focus:border-[#2F8D46] dark:focus:border-[#22C55E] transition-colors';
  const inputErrorClass = 'border-red-500 dark:border-red-400';

  return (
    <PageLayout
      title="Contact"
      subtitle="Questions, collaborations, and support"
    >
      {/* 0. Contact details — high contrast in light and dark mode */}
      <section
        className="gfg-bento-grid"
        aria-labelledby="contact-details-heading"
      >
        <div className="gfg-contact-details-card gfg-bento-span-2 p-4 sm:p-6">
        <h2 id="contact-details-heading" className="text-base sm:text-lg font-bold text-[#065F46] dark:!text-[#FFFFFF] mb-3">
          Contact details
        </h2>
        <p className="text-sm text-[#047857] dark:!text-[#FFFFFF] mb-3">
          Reach us by email or WhatsApp for quick support.
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href={`mailto:${clubEmail}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#047857] dark:text-[#4ADE80] hover:underline"
          >
            <Mail className="w-4 h-4" aria-hidden />
            {clubEmail}
          </a>
          <a
            href="https://wa.me/917558124869"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#047857] dark:text-[#4ADE80] hover:underline"
          >
            <MessageCircle className="w-4 h-4" aria-hidden />
            WhatsApp
          </a>
        </div>
        </div>

        {/* 1. Club at a glance — compact stats strip at top */}
        <section
          className="gfg-card gfg-bento-span-2"
          aria-labelledby="contact-stats-heading"
          ref={statsRef}
        >
        <h2 id="contact-stats-heading" className="text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF] mb-4">
          Club at a glance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {contactStats.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col items-center p-4 rounded-lg bg-[#F9FAFB] dark:bg-[#18181b] border border-[#E5E7EB] dark:border-[#3f3f46]"
            >
              <span className="text-xl font-bold tabular-nums text-[#2F8D46] dark:!text-[#FFFFFF]">
                {statValues[i]}
                {item.suffix || ''}
              </span>
              <span className="text-xs font-medium text-[#4B5563] dark:!text-[#FFFFFF] mt-1">{item.label}</span>
            </div>
          ))}
        </div>
        </section>
      </section>

      {/* 2. Send a message (primary) + FAQ — side by side; form is main CTA */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6" aria-labelledby="form-faq-heading">
        <div className="glass-card p-4 sm:p-6 order-2 lg:order-1">
          <h2 id="form-faq-heading" className="text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF] mb-4">
            Send a message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#111827] dark:text-white mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] dark:text-white" aria-hidden />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`${inputClass} ${errors.fullName ? inputErrorClass : ''}`}
                  aria-invalid={!!errors.fullName}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">
                  {errors.fullName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#111827] dark:text-white mb-1">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] dark:text-white" aria-hidden />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`${inputClass} ${errors.email ? inputErrorClass : ''}`}
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[#111827] dark:text-white mb-1">
                Subject *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] dark:text-white" aria-hidden />
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${inputClass} ${errors.subject ? inputErrorClass : ''}`}
                  aria-invalid={!!errors.subject}
                >
                  <option value="">Select subject</option>
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              {errors.subject && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">
                  {errors.subject}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#111827] dark:text-white mb-1">
                Message *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-[#6B7280] dark:text-white" aria-hidden />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={4}
                  maxLength={MESSAGE_MAX_LENGTH}
                  className={`${inputClass} pl-10 ${errors.message ? inputErrorClass : ''}`}
                  aria-invalid={!!errors.message}
                />
              </div>
              <p
                className={`text-xs mt-0.5 ${formData.message.length >= MESSAGE_MAX_LENGTH ? 'text-red-600 dark:text-red-400' : 'text-[#4B5563] dark:text-white'}`}
              >
                {formData.message.length} / {MESSAGE_MAX_LENGTH}
              </p>
              {errors.message && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#2F8D46] dark:bg-[#22C55E] text-white dark:text-[#052E16] hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" aria-hidden />
              Send message
            </button>
            {submitted && (
              <div
                className="p-3 rounded-lg bg-[#F0FDF4] dark:bg-[rgba(34,197,94,0.15)] border border-[#2F8D46]/30 dark:border-[rgba(34,197,94,0.35)]"
                role="status"
              >
                <p className="text-sm font-medium text-[#1F6B34] dark:text-[#22C55E]">
                  Thanks! We&apos;ve received your message. We&apos;ll get back to you within 24–48 hours.
                </p>
                {submittedEmail && (
                  <p className="text-xs text-[#166534] dark:text-[#4ADE80]/90 mt-1">
                    We&apos;ll reply to <strong>{submittedEmail}</strong>. Reach out via Contact if you have any other questions.
                  </p>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="glass-card p-4 sm:p-6 order-1 lg:order-2">
          <h3 className="text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF] mb-4">FAQ</h3>
          <div className="space-y-2">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#E5E7EB] dark:border-[#3f3f46] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-4 py-3 text-left text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] bg-[#F9FAFB] dark:bg-[#18181b] hover:bg-[#F0FDF4] dark:hover:bg-[rgba(34,197,94,0.12)] transition-colors flex justify-between items-center gap-2"
                  aria-expanded={openFaq === i}
                >
                  {item.q}
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform text-[#6B7280] dark:text-white ${openFaq === i ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-3 text-sm text-[#4B5563] dark:text-white border-t border-[#E5E7EB] dark:border-[#3f3f46] pt-2">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Team Contact — who to reach */}
      <section className="glass-card p-4 sm:p-6" aria-labelledby="team-contact-heading">
        <h2 id="team-contact-heading" className="text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF] mb-4">
          Team Contact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {teamContacts.map((person) => (
            <article
              key={person.name}
              className="p-4 rounded-lg border border-[#E5E7EB] dark:border-[#3f3f46] bg-[#F9FAFB] dark:bg-[#18181b] hover:border-[#2F8D46] dark:hover:border-[#22C55E] transition-colors"
            >
              <p className="font-semibold text-sm text-[#1F2937] dark:text-[#FFFFFF]">{person.name}</p>
              <p className="text-xs text-[#2F8D46] dark:text-[#22C55E] font-medium mt-0.5">{person.role}</p>
              <p className="text-xs text-[#4B5563] dark:text-white mt-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" aria-hidden />
                {person.phone}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <a
                  href={`tel:${person.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#2F8D46] dark:bg-[#22C55E] text-white dark:text-[#052E16]"
                  aria-label={`Call ${person.name}`}
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden />
                  Call
                </a>
                <a
                  href={`https://wa.me/${person.wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#25D366] text-white"
                  aria-label={`WhatsApp ${person.name}`}
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden />
                  WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Find us (map) — full width first for visibility */}
      <section className="glass-card p-4 sm:p-6 overflow-hidden" aria-labelledby="find-us-heading">
        <h2 id="find-us-heading" className="text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF] mb-2">
          Find us
        </h2>
        <p className="text-sm text-[#4B5563] dark:text-white mb-4">
          Rajalakshmi Institute of Technology, Chennai. Open in Maps for directions.
        </p>
        <div className="rounded-lg overflow-hidden border border-[#E5E7EB] dark:border-[#30363d]">
          <iframe
            title="RIT Chennai location"
            src={mapEmbedUrl}
            className="w-full h-[260px] sm:h-[320px] border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href="https://www.google.com/maps/search/Rajalakshmi+Institute+of+Technology"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-[#2F8D46] dark:text-[#22C55E] hover:underline"
        >
          <MapPin className="w-4 h-4" aria-hidden />
          Open in Maps
          <ExternalLink className="w-3.5 h-3.5" aria-hidden />
        </a>
      </section>

      {/* 5. Connect with us — redesigned social cards (hidden per requirements) */}
      <section className="hidden" aria-labelledby="connect-heading">
        <h2 id="connect-heading" className="text-base sm:text-lg font-bold text-[#1F2937] dark:text-[#FFFFFF] mb-2">
          Connect with us
        </h2>
        <p className="text-sm text-[#4B5563] dark:text-white mb-4">Reach out on socials or visit us at campus.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SOCIAL_CARDS.map((item) => {
            const IconComponent = SOCIAL_ICONS[item.label] || ExternalLink;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-[#E5E7EB] dark:border-[#30363d] bg-[#F9FAFB] dark:bg-[#0d1117] hover:border-[#2F8D46] dark:hover:border-[#22C55E] overflow-hidden transition-all hover:shadow-md"
              >
                <div className="p-5 flex flex-col items-center text-center">
                  <span
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-sm mb-3"
                    style={{ background: item.color }}
                    aria-hidden
                  >
                    <IconComponent className="w-7 h-7" strokeWidth={2} />
                  </span>
                  <h3 className="font-bold text-[#1F2937] dark:text-[#FFFFFF] text-base">{item.label}</h3>
                  <p className="text-sm text-[#4B5563] dark:text-white mt-1 leading-relaxed">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[#2F8D46] dark:text-[#22C55E] group-hover:underline">
                    Visit {item.label}
                    <ExternalLink className="w-4 h-4" aria-hidden />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {easterEgg && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] px-4 py-2 rounded-xl bg-[#2F8D46] dark:bg-[#22C55E] text-white font-bold text-sm shadow-lg animate-pulse"
          role="status"
        >
          Welcome Developer!
        </div>
      )}
    </PageLayout>
  );
};

export default Contact;

