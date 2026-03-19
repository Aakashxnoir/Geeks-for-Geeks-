import { useState } from 'react';
import PageLayout from '../components/shared/PageLayout';
import { RESOURCES, RESOURCE_CATEGORIES } from '../data/resourcesData';

const resourcesList = Array.isArray(RESOURCES) ? RESOURCES : [];
const categoriesList = Array.isArray(RESOURCE_CATEGORIES) ? RESOURCE_CATEGORIES : ['All'];

const Resources = () => {
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

  return (
    <PageLayout
      title="Learning Resources"
      subtitle="DSA, web dev, CP, and career materials curated for the club"
    >
      <section className="gfg-card min-h-[280px]" aria-label="Filters and resources">
        <p className="text-sm text-[color:var(--gfg-text-secondary)] mb-3">
          <span className="font-semibold gfg-text-accent">Curated DSA, web dev, CP, and career materials.</span>{' '}
          {resourcesList.length > 0 && (
            <span className="font-medium text-[color:var(--gfg-text-primary)] dark:text-white">
              ({resourcesList.length} resources)
            </span>
          )}
        </p>
        <div className="mb-4">
          <label htmlFor="resources-search" className="sr-only">Search resources</label>
          <input
            id="resources-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, category..."
            className="w-full max-w-sm pl-9 pr-4 py-2 gfg-input"
            aria-label="Search resources"
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-medium text-[#4B5563] dark:!text-[#FFFFFF] self-center">Category:</span>
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              category === 'all'
                ? 'bg-[#2F8D46] text-white dark:bg-[#22C55E] dark:text-white'
                : 'bg-[#F9FAFB] dark:bg-[#1c212e] text-[#111827] dark:!text-[#FFFFFF] border border-[#E5E7EB] dark:!border-[#3d4a5c] hover:border-[#22C55E]'
            }`}
          >
            All
          </button>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-[#2F8D46] text-white dark:bg-[#22C55E] dark:text-white'
                  : 'bg-[#F9FAFB] dark:bg-[#1c212e] text-[#111827] dark:!text-[#FFFFFF] border border-[#E5E7EB] dark:!border-[#3d4a5c] hover:border-[#22C55E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((r) => (
              <article
                key={r.id}
                className="gfg-card-soft hover:border-[color:var(--gfg-accent)] transition-colors"
              >
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="gfg-badge">{r.type}</span>
                  <span className="text-xs gfg-text-muted">{r.category}</span>
                  {r.difficulty && (
                    <span className="text-xs px-2 py-0.5 rounded bg-[#E5E7EB] dark:bg-[#1c212e] text-[#1F2937] dark:!text-[#FFFFFF] border border-transparent dark:border-[#3d4a5c]">
                      {r.difficulty}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-[#111827] dark:!text-[#FFFFFF] mt-1.5">{r.title}</h3>
                <p className="text-xs text-[#4B5563] dark:!text-[#FFFFFF] mt-0.5 line-clamp-2">{r.description}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-xs text-[#6B7280] dark:!text-[#FFFFFF]">
                  {r.estimatedTime && <span>⏱ {r.estimatedTime}</span>}
                  {r.recommendedFor && (
                    <span className="capitalize">For: {r.recommendedFor}</span>
                  )}
                </div>
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-[#2F8D46] dark:text-[#22C55E] hover:underline"
                >
                  Open resource →
                </a>
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
