import { useState, useMemo } from 'react';
import {
  BookOpen,
  Calendar,
  User,
  Tag,
  Heart,
  MessageCircle,
  ChevronRight,
  Star,
} from 'lucide-react';
import type { BlogPost } from '../../utils/data/communityMockData';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../../utils/data/communityMockData';

function PostCard({
  post,
  featured,
  onSearchQuery,
}: {
  post: BlogPost;
  featured?: boolean;
  onSearchQuery?: (q: string) => void;
}) {
  const [liked, setLiked] = useState(false);
  const likeCount = liked ? post.likes + 1 : post.likes;

  return (
    <article
      className={`gfg-post-card ${featured
        ? 'rounded-xl border-2 border-[#2F8D46] dark:border-[#22C55E] bg-white dark:bg-[#141922] overflow-hidden shadow-sm transition-colors duration-200'
        : 'rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] bg-white dark:bg-[#141922] overflow-hidden hover:border-[#57B46E] dark:hover:border-[#22C55E] transition-colors duration-200'
      }`}
    >
      <div className="relative aspect-[2/1] bg-[#F9FAFB] dark:bg-[#1c212e] overflow-hidden">
        <img
          src={post.coverImage}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {post.featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#2F8D46] dark:bg-[#57B46E] text-white text-xs font-medium">
            <Star className="w-3.5 h-3.5 shrink-0" />
            Featured
          </span>
        )}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/90 dark:bg-[#1c212e] dark:text-[#FFFFFF] text-[#1F2937] text-xs font-medium border border-[#E5E7EB] dark:border-[#3d4a5c]">
          {post.category}
        </span>
      </div>
      <div className="gfg-post-card-content p-4 sm:p-5 space-y-3 bg-white dark:bg-[#141922]">
        <h3 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-[#6B7280] dark:text-[#FFFFFF] line-clamp-2">
          {post.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#6B7280] dark:text-[#FFFFFF]">
          <span className="flex items-center gap-1 truncate">
            <User className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{post.author}</span>
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.publishDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onSearchQuery?.(t)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#F9FAFB] dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] text-xs font-medium border border-[#E5E7EB] dark:border-[#3d4a5c] hover:border-[#2F8D46] dark:hover:border-[#22C55E] hover:text-[#2F8D46] dark:hover:text-[#22C55E] transition-colors duration-200"
            >
              <Tag className="w-3 h-3 shrink-0" />
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB] dark:border-[#3d4a5c] gap-2 flex-wrap">
          <div className="flex items-center gap-3 sm:gap-4 text-sm font-medium text-[#6B7280] dark:text-[#FFFFFF]">
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className={liked ? 'text-red-500 dark:text-red-400' : 'text-[#6B7280] dark:text-[#FFFFFF] hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200'}
              aria-label={liked ? 'Unlike' : 'Like'}
            >
              <Heart className={liked ? 'fill-current' : ''} size={18} />
            </button>
            <span>{likeCount}</span>
            <span className="flex items-center gap-1">
              <MessageCircle size={18} />
              {post.commentCount}
            </span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#2F8D46] dark:text-[#22C55E] hover:text-[#1F6B34] dark:hover:text-[#4ade80] transition-colors duration-200 shrink-0"
          >
            Read More
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function CommunityBlog({
  searchQuery,
  onSearchQueryChange,
}: {
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
}) {
  const [category, setCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState('');
  const query = searchQuery ?? localSearch;

  const filtered = useMemo(() => {
    let list = [...BLOG_POSTS];
    if (category !== 'All') list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.author.toLowerCase().includes(q)
      );
    }
    return list;
  }, [category, query]);

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section className="bg-white dark:bg-[#141922] rounded-xl border border-[#E5E7EB] dark:border-[#3d4a5c] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#3d4a5c]">
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] dark:text-[#FFFFFF] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#2F8D46] dark:text-[#22C55E] shrink-0" />
          Community Blog & Updates
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#E5E7EB] mt-1">
          Articles, recaps, and updates from the club
        </p>
      </div>

      <div className="p-4 space-y-4 sm:space-y-6 dark:bg-[#141922]">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="search"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setLocalSearch(v);
              onSearchQueryChange?.(v);
            }}
            className="flex-1 min-w-[180px] sm:min-w-[200px] px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#3d4a5c] bg-[#FFFFFF] dark:bg-[#0d1117] text-[#1F2937] dark:text-[#FFFFFF] placeholder:text-[#6B7280] dark:placeholder:text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#2F8D46]/30 dark:focus:ring-[#22C55E]/50 focus:border-[#2F8D46] dark:focus:border-[#22C55E] transition-colors duration-200"
            aria-label="Search posts"
          />
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-active={category === cat}
                onClick={() => setCategory(cat)}
                className={`gfg-blog-cat-btn px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  category === cat
                    ? 'bg-[#2F8D46] text-white dark:bg-[#22C55E] dark:text-[#052E16]'
                    : 'bg-[#E5E7EB] dark:bg-[#1c212e] text-[#1F2937] dark:text-[#FFFFFF] border border-[#D1D5DB] dark:border-[#3d4a5c] hover:border-[#2F8D46] dark:hover:border-[#22C55E] hover:text-[#2F8D46] dark:hover:text-[#22C55E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {featured && (
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-[#6B7280] dark:text-[#E5E7EB] mb-3">Featured</h3>
              <PostCard
                post={featured}
                featured
                onSearchQuery={onSearchQueryChange}
              />
            </div>
          )}
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 min-w-0">
            {rest.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSearchQuery={onSearchQueryChange}
              />
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-12 text-[#6B7280] dark:text-[#E5E7EB]">No posts match your search.</p>
        )}
      </div>
    </section>
  );
}

