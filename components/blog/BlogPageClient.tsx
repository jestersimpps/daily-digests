'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost, BLOG_CATEGORIES, CATEGORY_EMOJI, CATEGORY_COLORS } from '@/lib/models/blog';
import BlogCard from './BlogCard';

interface BlogPageClientProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogPageClient({ posts, tags }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory && post.category !== selectedCategory) return false;
    if (selectedTag && !post.tags.includes(selectedTag)) return false;
    return true;
  });

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          All
        </button>
        {BLOG_CATEGORIES.map((category) => {
          const emoji = CATEGORY_EMOJI[category];
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(isActive ? null : category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {emoji} {category}
            </button>
          );
        })}
      </div>

      {/* Tag Filter */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                selectedTag === tag
                  ? 'bg-cyan-500 text-black'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      <motion.div
        layout
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </motion.div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          No articles found matching your filters.
        </div>
      )}
    </div>
  );
}
