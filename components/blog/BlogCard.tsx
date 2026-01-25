'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { BlogPost, CATEGORY_EMOJI, CATEGORY_COLORS } from '@/lib/models/blog';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const emoji = CATEGORY_EMOJI[post.category] || '';
  const colorClass = CATEGORY_COLORS[post.category] || 'bg-white/10 text-neutral-300';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/article/${post.slug}`} className="block">
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300">
          {post.coverImage && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
                {emoji} {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </div>
            </div>

            <h2 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
              {post.title}
            </h2>

            <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
              {post.description}
            </p>

            {post.source && (
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <ExternalLink className="w-3 h-3" />
                <span>@{post.source.handle}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-white/5 rounded text-xs text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
