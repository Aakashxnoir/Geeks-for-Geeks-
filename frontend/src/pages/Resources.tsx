import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { RESOURCES, RESOURCE_CATEGORIES } from '../utils/data/resourcesData';
import { useCardDetail } from '../lib/context/CardDetailContext';

const resourcesList = Array.isArray(RESOURCES) ? RESOURCES : [];
const categoriesList = Array.isArray(RESOURCE_CATEGORIES) ? RESOURCE_CATEGORIES : ['All'];

const Resources = () => {
  const { showDetails } = useCardDetail();
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = resourcesList.filter((r) => {
    const matchCategory = category === 'all' || r.category === category;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q ||
      (r.title && r.title.toLowerCase().includes(q)) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.category && r.category.toLowerCase().includes(q));
    return matchCategory && matchSearch;
  });

  const handleResourceClick = (_r: typeof RESOURCES[0]) => {
     // Info displayed directly in card — no popup
  };

  return (
    <PageLayout
      title="Learning Resources"
      subtitle="DSA, web dev, CP, and career materials curated for the club"
    >
      <section className="col-span-12 glass-panel min-h-[280px] p-4 sm:p-6" aria-label="Filters and resources">
        {/* ... existing header and Category buttons ... */}
        {filtered.length > 0 ? (
          <div className="gfg-grid">
            {filtered.map((r) => (
              <article
                key={r.id}
                onClick={() => handleResourceClick(r)}
                className="col-span-12 sm:col-span-6 lg:col-span-4 glass-card p-4 cursor-pointer hover:ring-2 hover:ring-[color:var(--gfg-accent)] active:scale-[0.98] transition-all"
              >
                <div className="flex flex-wrap gap-2 items-center pointer-events-none">
                  <span className="gfg-badge">{r.type}</span>
                  <span className="text-xs gfg-text-muted">{r.category}</span>
                  {r.difficulty && (
                    <span className="text-xs px-2 py-0.5 rounded bg-[#E5E7EB] dark:bg-[#1c212e] text-[#1F2937] dark:!text-[#FFFFFF] border border-transparent dark:border-[#3d4a5c]">
                      {r.difficulty}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-[#111827] dark:!text-[#FFFFFF] mt-1.5 pointer-events-none">{r.title}</h3>
                <p className="text-xs text-[#4B5563] dark:!text-[#FFFFFF] mt-0.5 line-clamp-2 pointer-events-none">{r.description}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-xs text-[#6B7280] dark:!text-[#FFFFFF] pointer-events-none">
                  {r.estimatedTime && <span>⏱ {r.estimatedTime}</span>}
                </div>
                <div className="mt-2 pointer-events-none">
                   <span className="text-sm font-medium text-[#2F8D46] dark:text-[#22C55E]">
                     Learn more →
                   </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#4B5563] dark:!text-[#FFFFFF] py-6 text-center">
            No resources match your filters. Try another category or search term.
          </p>
        )}
      </section>
    </PageLayout>
  );
};

export default Resources;
