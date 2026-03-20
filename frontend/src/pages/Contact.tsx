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
  Bot,
  Send,
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
  CHATBOT_KNOWLEDGE,
} from '../utils/data/contactData';

const MESSAGE_MAX_LENGTH = 500;

const SOCIAL_ICONS = { Instagram: Image, LinkedIn: Linkedin };
const CHATBOT_FALLBACK = "I can help with: the club, events, resources, how to join, and contact info. Try asking 'What events do you have?', 'How do I join?', or 'How can I contact the club?'";

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
  const [floatOpen, setFloatOpen] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [statValues, setStatValues] = useState(CONTACT_STATS.map(() => 0));
  const [statsVisible, setStatsVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: "Hi! I'm the GFG RIT assistant. Ask me about the club, events, resources, how to join, or contact info." },
  ]);
  const [chatInput, setChatInput] = useState('');
  const keyBufferRef = useRef('');
  const statsRef = useRef(null);
  const chatEndRef = useRef(null);

  const getBotResponse = (userText) => {
    const lower = userText.trim().toLowerCase();
    if (!lower) return CHATBOT_FALLBACK;
    for (const { keywords, answer } of CHATBOT_KNOWLEDGE) {
      if (keywords.some((k) => lower.includes(k))) return answer;
    }
    return CHATBOT_FALLBACK;
  };

  const sendChatMessage = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages((prev) => [...prev, { role: 'user', text }]);
    setChatInput('');
    const reply = getBotResponse(text);
    setChatMessages((prev) => [...prev, { role: 'bot', text: reply }]);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MESSAGE_MAX_LENGTH) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      setStatValues(CONTACT_STATS.map((s, i) => Math.round((s.value || 0) * eased)));
      if (step >= steps) clearInterval(t);
    }, duration / steps);
    return () => clearInterval(t);
  }, [statsVisible]);

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const inputClass =
    'w-full pl-10 pr-4 py-3 rounded-xl border bg-[#FFFFFF] dark:bg-[#18181b] text-[#1F2937] dark:text-[#FFFFFF] placeholder:text-[#6B7280] dark:placeholder:text-[#71717a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8D46]/30 dark:focus-visible:ring-[#22C55E]/50 border-[#E5E7EB] dark:border-[#3f3f46] focus:border-[#2F8D46] dark:focus:border-[#22C55E] transition-colors';
  const inputErrorClass = 'border-red-500 dark:border-red-400';

  return (
    <PageLayout
      title="Contact"
      subtitle="Get in touch with GFG Campus Club at RIT — queries, collaborations, join the community"
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
          Reach us for queries, collaborations, and to join the club. We respond to email and WhatsApp.
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href={`mailto:${CLUB_EMAIL}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#047857] dark:text-[#4ADE80] hover:underline"
          >
            <Mail className="w-4 h-4" aria-hidden />
            {CLUB_EMAIL}
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
          {CONTACT_STATS.map((item, i) => (
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
                  {SUBJECT_OPTIONS.map((opt) => (
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
            {FAQ_ITEMS.map((item, i) => (
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
          {TEAM_CONTACTS.map((person) => (
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
            src={MAP_EMBED_URL}
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

      {/* Chatbot float — answers questions about the website */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2" aria-label="Website assistant">
        {floatOpen && (
          <div className="w-[340px] sm:w-[380px] rounded-xl border border-[#E5E7EB] dark:border-[#3f3f46] bg-white dark:bg-[#18181b] shadow-xl overflow-hidden flex flex-col max-h-[420px]">
            <div className="px-4 py-3 border-b border-[#E5E7EB] dark:border-[#3f3f46] bg-[#F9FAFB] dark:bg-[#111113] flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#2F8D46] dark:bg-[#22C55E] flex items-center justify-center text-white">
                <Bot className="w-4 h-4" aria-hidden />
              </span>
              <span className="font-semibold text-sm text-[#1F2937] dark:text-white">Website assistant</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[200px]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#2F8D46] dark:bg-[#22C55E] text-white'
                        : 'bg-[#E5E7EB] dark:bg-[#27272a] text-[#1F2937] dark:!text-[#FFFFFF]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t border-[#E5E7EB] dark:border-[#3f3f46] flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendChatMessage()}
                placeholder="Ask about the club, events, resources..."
                className="flex-1 rounded-lg border border-[#E5E7EB] dark:border-[#3f3f46] bg-[#F9FAFB] dark:bg-[#111113] text-[#1F2937] dark:!text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#71717a] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8D46] dark:focus:ring-[#22C55E]"
                aria-label="Ask a question"
              />
              <button
                type="button"
                onClick={sendChatMessage}
                className="rounded-lg bg-[#2F8D46] dark:bg-[#22C55E] text-white p-2 hover:opacity-90 transition-opacity"
                aria-label="Send"
              >
                <Send className="w-5 h-5" aria-hidden />
              </button>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setFloatOpen(!floatOpen)}
          className="w-14 h-14 rounded-xl bg-[#2F8D46] dark:bg-[#22C55E] text-white shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center"
          aria-expanded={floatOpen}
          aria-label={floatOpen ? 'Close assistant' : 'Open website assistant'}
        >
          {floatOpen ? <X className="w-6 h-6" aria-hidden /> : <Bot className="w-6 h-6" aria-hidden />}
        </button>
      </div>

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

