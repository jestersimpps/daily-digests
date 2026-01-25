'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogPost, CATEGORY_EMOJI } from '@/lib/models/blog';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-white/10">
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/article/${post.slug}`}
            className="group block p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <div className="text-xs text-neutral-500 mb-2">
              {CATEGORY_EMOJI[post.category]} {post.category} • {formatDate(post.publishedAt)}
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
              {post.description}
            </p>
            <span className="inline-flex items-center gap-1 text-sm text-white/70 group-hover:text-white transition-colors">
              Read more
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
