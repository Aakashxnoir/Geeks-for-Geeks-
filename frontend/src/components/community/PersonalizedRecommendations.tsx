import { useMemo } from 'react';
import { Lightbulb, BookOpen, Code2, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '@/src/data/communityMockData';

/** Mock personalized recommendations based on "current" interest (e.g. DSA). */
export default function PersonalizedRecommendations() {
  const recommendations = useMemo(() => {
    const dsa = BLOG_POSTS.filter((p) => p.tags.some((t) => t.toLowerCase().includes('dsa') || t === 'DSA'));
    const career = BLOG_POSTS.filter((p) => p.category === 'Careers');
    return [
      { title: 'For you: DSA', items: dsa.slice(0, 2), icon: Code2 },
      { title: 'Career tips', items: career.slice(0, 2), icon: BookOpen },
    ].filter((g) => g.items.length > 0);
  }, []);

  if (recommendations.length === 0) return null;

  return (
    <section className="bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#E5E7EB] dark:border-[#3d4a5c] flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
        <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#FFFFFF]">Recommended for you</h3>
      </div>
      <div className="p-4 space-y-4 dark:bg-[#141922]">
        {recommendations.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-medium text-[#6B7280] dark:text-[#E5E7EB] mb-2 flex items-center gap-1">
              <group.icon className="w-3.5 h-3.5 shrink-0 text-[#6B7280] dark:text-[#22C55E]" />
              {group.title}
            </p>
            <ul className="space-y-2">
              {group.items.map((post) => (
                <li key={post.id}>
                  <a
                    href="#"
                    className="block py-2 px-3 rounded-lg hover:bg-[#F9FAFB] dark:hover:bg-[#1c212e] text-sm font-medium text-[#1F2937] dark:text-[#FFFFFF] border border-transparent hover:border-[#E5E7EB] dark:hover:border-[#3d4a5c] transition-colors duration-200 break-words"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
