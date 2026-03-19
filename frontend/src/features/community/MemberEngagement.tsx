import { Users, HandHeart, MessageCircle, Calendar, Star } from 'lucide-react';

const DISCORD_URL = '#';
const WHATSAPP_URL = '#';
const GFG_URL = 'https://www.geeksforgeeks.org';

const UPCOMING = [
  { title: 'DSA Workshop: Trees & Graphs', date: 'Mar 18, 2025', type: 'Workshop' },
  { title: 'Monthly Coding Contest', date: 'Mar 22, 2025', type: 'Contest' },
  { title: 'Placement Prep Session', date: 'Mar 25, 2025', type: 'Event' },
];

const SPOTLIGHT = {
  name: 'Christopher J',
  role: 'Member of the Month',
  image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher',
  quote: 'Consistent practice and club events helped me improve my problem-solving. Great community!',
  department: 'CSE',
  year: 3,
};

export default function MemberEngagement() {
  return (
    <section className="bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Member Engagement
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          Join the community and get involved
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="#join"
            className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl border-2 border-[#2F8D46] dark:border-[#22C55E] bg-[#2F8D46] dark:bg-[#22C55E] dark:text-[#052E16] text-white font-semibold hover:bg-[#1F6B34] dark:hover:bg-[#16A34A] hover:border-[#1F6B34] dark:hover:border-[#16A34A] transition-colors duration-200"
          >
            <Users className="w-5 h-5 shrink-0" />
            Join Community
          </a>
          <a
            href="#volunteer"
            className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl border-2 border-[#E5E7EB] dark:border-[#3d4a5c] bg-white dark:bg-[#1c212e] text-[#1F2937] dark:text-[#FFFFFF] font-semibold hover:border-[#2F8D46] dark:hover:border-[#22C55E] hover:text-[#2F8D46] dark:hover:text-[#22C55E] transition-colors duration-200"
          >
            <HandHeart className="w-5 h-5 shrink-0" />
            Volunteer Signup
          </a>
        </div>

        <div className="gfg-discussion-card rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1c212e]">
          <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] mb-3 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
            Discussion Platforms
          </h3>
          <div className="flex flex-wrap gap-3">
            <a
              href={DISCORD_URL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Discord
            </a>
            <a
              href={WHATSAPP_URL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              WhatsApp
            </a>
            <a
              href={GFG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gfg-gfg-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9FAFB] dark:bg-[#1c212e] border border-[#E5E7EB] dark:border-[#3d4a5c] text-[#1F2937] dark:text-[#FFFFFF] text-sm font-medium hover:border-[#2F8D46] dark:hover:border-[#22C55E] hover:text-[#2F8D46] dark:hover:text-[#22C55E] transition-colors duration-200"
            >
              GeeksforGeeks
            </a>
          </div>
        </div>

        <div className="gfg-upcoming-card rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] p-4 bg-[#F9FAFB] dark:bg-[#1c212e]">
          <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
            Upcoming Activities
          </h3>
          <ul className="space-y-2">
            {UPCOMING.map((item) => (
              <li
                key={item.title}
                className="flex items-center justify-between py-2 border-b border-[#E5E7EB] dark:border-[#3d4a5c] last:border-0"
              >
                <div className="min-w-0">
                  <p className="font-medium text-[#1F2937] dark:text-[#FFFFFF] text-sm truncate">{item.title}</p>
                  <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB]">{item.date} · {item.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="gfg-spotlight-card rounded-xl border-2 border-[#2F8D46] dark:border-[#22C55E] bg-[#F9FAFB] dark:bg-[#1c212e] p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF] mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
            Member Spotlight
          </h3>
          <div className="flex gap-3 sm:gap-4 min-w-0">
            <img
              src={SPOTLIGHT.image}
              alt=""
              loading="lazy"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#2F8D46] dark:border-[#22C55E] shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#1F2937] dark:text-[#FFFFFF] truncate">{SPOTLIGHT.name}</p>
              <span className="gfg-spotlight-role-badge inline-block mt-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#2F8D46] dark:bg-[#1c212e] text-white dark:text-[#FFFFFF] border border-[#2F8D46]/50 dark:border-[#3d4a5c]">
                {SPOTLIGHT.role}
              </span>
              <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB] mt-0.5">{SPOTLIGHT.department} · Year {SPOTLIGHT.year}</p>
              <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-2 italic break-words">&ldquo;{SPOTLIGHT.quote}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
