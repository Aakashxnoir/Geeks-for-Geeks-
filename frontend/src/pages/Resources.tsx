import { useEffect, useState } from 'react';
import { Award, BookOpen, Briefcase, Code2, FileText, Target, Wrench } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

function getResourceIcon(category: string, type: string) {
  // Visuals are deterministic (no random imagery) and roughly match the resource track.
  if (type === 'Course') return BookOpen;
  if (type === 'Roadmap') return Target;

  switch (category) {
    case 'DSA':
      return Code2;
    case 'Programming Languages':
      return FileText;
    case 'Interview Preparation':
      return Award;
    case 'Web Development':
      return Wrench;
    case 'Competitive Programming':
      return Target;
    case 'AI/ML':
      return Award;
    case 'Careers':
      return Briefcase;
    default:
      return FileText;
  }
}

const Resources = () => {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [resourcesList, setResourcesList] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/resources`);
        const data = await res.json();
        if (cancelled) return;
        setResourcesList(Array.isArray(data?.resources) ? data.resources : []);
      } catch {
        if (cancelled) return;
        setResourcesList([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [API_BASE_URL]);

  const filtered = resourcesList.filter((r) => {
    const matchCategory = category === 'All' || r.category === category;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q ||
      (r.title && r.title.toLowerCase().includes(q)) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.category && r.category.toLowerCase().includes(q));
    return matchCategory && matchSearch;
  });

  return (
    <PageLayout
      title="Learning Resources"
      subtitle="DSA, web dev, CP, and career materials curated for the club"
    >
      <section className="col-span-12 glass-panel min-h-[280px] p-4 sm:p-6" aria-label="Filters and resources">
        {/* ... existing header and Category buttons ... */}
        {isLoading ? (
          <p className="text-sm text-[#4B5563] dark:!text-[#FFFFFF] py-8 text-center">Loading resources...</p>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => {
              const Icon = getResourceIcon(r.category, r.type);
              return (
                <a
                  key={r.id}
                  href={r.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 cursor-pointer hover:ring-2 hover:ring-[color:var(--gfg-accent)] active:scale-[0.98] transition-all overflow-hidden"
                  aria-label={`Open resource: ${r.title}`}
                >
                  <div className="flex flex-wrap gap-2 items-center pointer-events-none">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--gfg-accent)]/10 border border-[color:var(--gfg-accent)]/20">
                      <Icon className="w-5 h-5 text-[color:var(--gfg-accent)]" aria-hidden />
                    </span>
                    <span className="gfg-badge">{r.type}</span>
                    <span className="text-xs gfg-text-muted">{r.category}</span>
                    {r.difficulty && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[#E5E7EB] dark:bg-[#1c212e] text-[#1F2937] dark:!text-[#FFFFFF] border border-transparent dark:border-[#3d4a5c]">
                        {r.difficulty}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-[#111827] dark:!text-[#FFFFFF] mt-1.5 pointer-events-none">
                    {r.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] dark:!text-[#FFFFFF] mt-0.5 line-clamp-2 pointer-events-none">
                    {r.description}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-xs text-[#6B7280] dark:!text-[#FFFFFF] pointer-events-none">
                    {r.estimatedTime && <span>⏱ {r.estimatedTime}</span>}
                  </div>
                  <div className="mt-2 pointer-events-none">
                    <span className="text-sm font-medium text-[#2F8D46] dark:text-[#22C55E]">
                      Learn more →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-[#4B5563] dark:!text-[#FFFFFF] py-6 text-center col-span-2 lg:col-span-3">
            No resources match your filters. Try another category or search term.
          </p>
        )}
      </section>
    </PageLayout>
  );
};

export default Resources;
