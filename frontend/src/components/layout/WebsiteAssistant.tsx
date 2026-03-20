import { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import {
  FAQ_ITEMS,
  CHATBOT_KNOWLEDGE,
  CLUB_EMAIL,
  TEAM_CONTACTS,
} from '../../utils/data/contactData';
import { UPCOMING_EVENTS } from '../../utils/data/eventsData';
import { RESOURCES, RESOURCE_CATEGORIES } from '../../utils/data/resourcesData';
import { CLUB_OBJECTIVES, CLUB_STATS } from '../../utils/data/clubInfoData';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  text: string;
};

type AssistantSources = {
  upcomingEvents: any[];
  resources: any[];
  resourceCategories: string[];
  faqItems: any[];
  clubEmail: string;
  teamContacts: any[];
  chatbotKnowledge: any[];
};

const JOIN_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd_example/viewform';
const WHATSAPP_GROUP_URL = 'https://wa.me/917558124869';

function keywordFallbackAnswer(question: string, sources: AssistantSources): string {
  const lower = question.trim().toLowerCase();
  if (!lower) return 'Ask me anything about the club, events, resources, join process, or contact.';

  const nextEvents = Array.isArray(sources?.upcomingEvents) ? sources.upcomingEvents.slice(0, 3) : [];
  const sampleResources = Array.isArray(sources?.resources) ? sources.resources.slice(0, 6) : [];
  const resourceCategories = Array.isArray(sources?.resourceCategories) ? sources.resourceCategories : [];

  // When Gemini isn't configured, still answer using real site data (not only keyword canned responses).
  if (/(next|upcoming|event|workshop|contest|hackathon|seminar|talk)/i.test(lower)) {
    if (nextEvents.length === 0) return 'I couldn’t find upcoming events right now. Try again later or check the Events page.';
    return `Here are the next events:\n${nextEvents.map((e) => `- ${e.title} (${e.date})`).join('\n')}\n\nWant me to point you to the exact page? Try ${'/events'}.`;
  }

  if (/(resource|resources|learn|dsa|cp|competitive|web development|react|ai|ml|machine learning)/i.test(lower)) {
    return `For resources, we have tracks like: ${resourceCategories.join(', ')}.\n\nA few examples:\n${sampleResources
      .map((r) => `- ${r.title} [${r.category}]`)
      .join('\n')}\n\nBrowse everything at ${'/resources'}.`;
  }

  if (/(join|member|become|participate)/i.test(lower)) {
    return `To join the club:\n- Google Form: ${JOIN_FORM_URL}\n- WhatsApp group: ${WHATSAPP_GROUP_URL}\n\nIf you tell me your interest (DSA, web, CP, or ML), I’ll suggest what to start with.`;
  }

  if (/(contact|email|whatsapp|reach|call)/i.test(lower)) {
    const team =
      Array.isArray(sources?.teamContacts) && sources.teamContacts.length > 0
        ? sources.teamContacts.slice(0, 3).map((p) => `- ${p.name} (${p.role}) - ${p.phone}`).join('\n')
        : '- (not available)';
    return `You can contact the club at ${sources?.clubEmail || CLUB_EMAIL}.\n\nTeam:\n${team}\n\nYou can also use the Contact page form at ${'/contact'}.`;
  }

  for (const { keywords, answer } of Array.isArray(sources?.chatbotKnowledge) ? sources.chatbotKnowledge : CHATBOT_KNOWLEDGE) {
    if (keywords.some((k) => lower.includes(k))) return answer;
  }

  return 'I can help with the club, events, resources, how to join, and contact info. If you tell me what you’re looking for (for example: "next events" or "DSA resources"), I’ll guide you.';
}

function buildGeminiPrompt(question: string, conversation: ChatMessage[], sources: AssistantSources): string {
  const nextEvents = Array.isArray(sources?.upcomingEvents) ? sources.upcomingEvents.slice(0, 3) : [];
  const sampleResources = Array.isArray(sources?.resources) ? sources.resources.slice(0, 10) : [];
  const sampleFaq = Array.isArray(sources?.faqItems) ? sources.faqItems.slice(0, 6) : [];
  const sampleObjectives = Array.isArray(CLUB_OBJECTIVES) ? CLUB_OBJECTIVES.slice(0, 6) : [];
  const sampleStats = Array.isArray(CLUB_STATS) ? CLUB_STATS.slice(0, 4) : [];

  const recentTurns = conversation
    .slice(-6)
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
    .join('\n');

  return [
    'You are a friendly, human-sounding assistant for GeeksforGeeks Campus Club at RIT (GFG X RIT).',
    'Answer casually, clearly, and helpfully. Avoid robotic phrasing.',
    'You can answer questions about the website navigation and content.',
    '',
    "Do not invent facts. If something isn't in the provided knowledge, say so and point the user to the right page.",
    '',
    'Website knowledge (use this to answer):',
    '- Pages: Landing (/), App Home (/app), Club Info (/club-info), Community (/community), Events (/events and /events/:id), Resources (/resources), Join (/join), Contact (/contact), Badges (/badges).',
    `- Join: Google Form (${JOIN_FORM_URL}), WhatsApp group (${WHATSAPP_GROUP_URL}).`,
    `- Contact email: ${sources?.clubEmail || CLUB_EMAIL}`,
    `- Team contacts: ${Array.isArray(sources?.teamContacts) ? sources.teamContacts.map((p) => `${p.name} (${p.role}) - ${p.phone}`).join('; ') : ''}`,
    `- Club objectives: ${sampleObjectives.map((o) => `${o.title}: ${o.description}`).join(' | ')}`,
    `- Club stats (sample): ${sampleStats.map((s) => `${s.label} = ${s.value}`).join(' | ')}`,
    `- Upcoming events (sample): ${nextEvents.map((e) => `${e.title} (${e.date})`).join(' | ') || 'none'}`,
    '- Events page also has past events.',
    `- Resources categories: ${(Array.isArray(sources?.resourceCategories) ? sources.resourceCategories : RESOURCE_CATEGORIES).join(', ')}`,
    `- Sample resources: ${sampleResources.map((r) => `${r.title} [${r.category}/${r.type}]`).join(' | ')}`,
    `- FAQ (sample): ${sampleFaq.map((f) => `${f.q} => ${f.a}`).join(' | ')}`,
    '',
    'Conversation so far:',
    recentTurns || '(no prior conversation)',
    '',
    `User question: ${question}`,
    '',
    'Respond in a helpful conversational way. If it helps, suggest the exact page to visit next.',
  ].join('\n');
}

export default function WebsiteAssistant() {
  const geminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;
  const ai = useMemo(() => {
    if (!geminiKey) return null;
    return new GoogleGenAI({ apiKey: geminiKey });
  }, [geminiKey]);

  const [open, setOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Hi! I’m the GFG RIT website assistant. Ask me about the club, events, resources, how to join, or contact info.',
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000';
  const [backendSources, setBackendSources] = useState<AssistantSources | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [eventsRes, resourcesRes, contactRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/events/upcoming`),
          fetch(`${API_BASE_URL}/api/resources`),
          fetch(`${API_BASE_URL}/api/contact`),
        ]);
        const eventsData = await eventsRes.json();
        const resourcesData = await resourcesRes.json();
        const contactData = await contactRes.json();
        if (cancelled) return;

        setBackendSources({
          upcomingEvents: Array.isArray(eventsData?.events) ? eventsData.events : [],
          resources: Array.isArray(resourcesData?.resources) ? resourcesData.resources : [],
          resourceCategories: Array.isArray(resourcesData?.categories) ? resourcesData.categories : [],
          faqItems: Array.isArray(contactData?.faqItems) ? contactData.faqItems : [],
          clubEmail: contactData?.clubEmail || CLUB_EMAIL,
          teamContacts: Array.isArray(contactData?.teamContacts) ? contactData.teamContacts : [],
          chatbotKnowledge: Array.isArray(contactData?.chatbotKnowledge)
            ? contactData.chatbotKnowledge
            : CHATBOT_KNOWLEDGE,
        });
      } catch {
        // Keep local fallback knowledge if backend fails.
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [API_BASE_URL]);

  const send = async () => {
    const text = chatInput.trim();
    if (!text || isLoading) return;

    const sources: AssistantSources =
      backendSources || {
        upcomingEvents: UPCOMING_EVENTS,
        resources: RESOURCES,
        resourceCategories: RESOURCE_CATEGORIES,
        faqItems: FAQ_ITEMS,
        clubEmail: CLUB_EMAIL,
        teamContacts: TEAM_CONTACTS,
        chatbotKnowledge: CHATBOT_KNOWLEDGE,
      };

    setChatInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setIsLoading(true);

    try {
      let reply = '';

      if (ai) {
        const prompt = buildGeminiPrompt(text, [...messages, { role: 'user', text }], sources);
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        reply =
          typeof response.text === 'string' && response.text.trim()
            ? response.text.trim()
            : '';
      }

      if (!reply) reply = keywordFallbackAnswer(text, sources);

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: keywordFallbackAnswer(text, sources) }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [open, messages.length, isLoading]);

  return (
    <div
      className="fixed right-5 bottom-24 sm:right-6 sm:bottom-24 md:bottom-8 z-[100] flex flex-col items-end gap-3"
      aria-label="Website assistant"
    >
      {open ? (
        <div className="w-[340px] sm:w-[380px] rounded-xl border border-[#E5E7EB] dark:border-[#3f3f46] bg-white dark:bg-[#18181b] shadow-xl overflow-hidden flex flex-col max-h-[420px]">
          <div className="px-4 py-3 border-b border-[#E5E7EB] dark:border-[#3f3f46] bg-[#F9FAFB] dark:bg-[#111113] flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#2F8D46] dark:bg-[#22C55E] flex items-center justify-center text-white">
              <Bot className="w-4 h-4" aria-hidden />
            </span>
            <span className="font-semibold text-sm text-[#1F2937] dark:text-white">Website assistant</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-auto p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[200px]">
            {messages.map((msg, i) => (
              <div key={`${msg.role}-${i}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm bg-[#E5E7EB] dark:bg-[#27272a] text-[#1F2937] dark:!text-[#FFFFFF]">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 border-t border-[#E5E7EB] dark:border-[#3f3f46] flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) send();
              }}
              placeholder="Ask about the club, events, resources..."
              className="flex-1 rounded-lg border border-[#E5E7EB] dark:border-[#3f3f46] bg-[#F9FAFB] dark:bg-[#111113] text-[#1F2937] dark:!text-[#FFFFFF] placeholder-[#9CA3AF] dark:placeholder-[#71717a] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8D46] dark:focus:ring-[#22C55E]"
              aria-label="Ask a question"
            />
            <button
              type="button"
              onClick={send}
              className="rounded-lg bg-[#2F8D46] dark:bg-[#22C55E] text-white p-2 hover:opacity-90 transition-opacity"
              aria-label="Send"
              disabled={isLoading}
            >
              <Send className="w-5 h-5" aria-hidden />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-xl bg-[#2F8D46] dark:bg-[#22C55E] text-white shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center"
          aria-expanded={open}
          aria-label="Open website assistant"
        >
          <Bot className="w-6 h-6" aria-hidden />
        </button>
      )}
    </div>
  );
}

