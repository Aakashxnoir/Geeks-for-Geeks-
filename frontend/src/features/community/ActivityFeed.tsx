import { useState, useEffect } from 'react';
import { Trophy, Code2, BookOpen, Calendar, Wrench } from 'lucide-react';
import { ACTIVITY_FEED, type ActivityItem } from '../../utils/data/communityMockData';
import { useCardDetail } from '../../lib/context/CardDetailContext';

const ICON_MAP: Record<ActivityItem['type'], typeof Trophy> = {
  achievement: Trophy,
  contest: Code2,
  blog: BookOpen,
  event: Calendar,
  workshop: Wrench,
};

function FeedItem({ item }: { item: ActivityItem }) {
  const Icon = ICON_MAP[item.type];
  return (
    <div className="flex gap-3 py-3 border-b border-[#E5E7EB] dark:border-[#3d4a5c] last:border-0 transition-colors duration-200">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#F0FDF4] dark:bg-[rgba(34,197,94,0.15)] flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#1F2937] dark:text-[#FFFFFF] break-words">{item.title}</p>
        <p className="text-xs text-[#6B7280] dark:text-[#E5E7EB] mt-0.5">{item.timestamp}</p>
      </div>
    </div>
  );
}

/** Mock real-time: rotate items every few seconds to simulate new activity */
const MOCK_ROTATE_INTERVAL_MS = 5000;

export default function ActivityFeed() {
  const { showDetails } = useCardDetail();
  const [items, setItems] = useState<ActivityItem[]>(ACTIVITY_FEED);

  const handleCardClick = () => {
    showDetails({
      title: "Live Activity Feed",
      subtitle: "Campus-wide events & updates",
      functionality: "Provides a real-time stream of significant accomplishments, recently joined events, and content updates across the RIT GFG Campus Club. Items are automatically pushed to the feed as they occur.",
      description: "The live feed aggregates data from achievement unlocks, contest participations, new blog posts, and official club events. It's designed to keep members informed about community momentum and provide inspiration through peer successes.",
      stats: [
        { label: "Daily Updates", value: "40+" },
        { label: "Categories", value: "5" },
        { label: "Active Buffer", value: items.length }
      ],
      exportData: items,
      componentName: "ActivityFeed"
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const last = next.pop()!;
        next.unshift(last);
        return next;
      });
    }, MOCK_ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section 
      onClick={handleCardClick}
      className="glass-card overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-green-500/5 active:scale-[0.995] transition-all"
    >
      <div className="px-4 py-3 border-b border-[#E5E7EB] dark:border-[#3d4a5c] flex items-center justify-between pointer-events-none">
        <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF]">Live activity</h3>
        <span className="flex h-2 w-2 rounded-full bg-green-500 dark:bg-[#22C55E] animate-pulse" aria-hidden />
      </div>
      <div className="p-4 max-h-72 sm:max-h-80 overflow-y-auto dark:bg-[#141922] pointer-events-none">
        {items.map((item) => (
          <FeedItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

