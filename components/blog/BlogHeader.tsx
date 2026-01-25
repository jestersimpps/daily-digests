'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import { BlogPost, CATEGORY_EMOJI, CATEGORY_COLORS } from '@/lib/models/blog';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface BlogHeaderProps {
  post: BlogPost;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  const emoji = CATEGORY_EMOJI[post.category] || '';
  const colorClass = CATEGORY_COLORS[post.category] || 'bg-white/10 text-neutral-300';

  return (
    <header>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to articles
      </Link>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}>
          {emoji} {post.category}
        </span>
        <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
          <Calendar className="w-4 h-4" />
          {formatDate(post.publishedAt)}
        </div>
        <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
          <Clock className="w-4 h-4" />
          {post.readingTime}
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
        {post.title}
      </h1>

      <p className="text-lg text-neutral-400 mb-6">
        {post.description}
      </p>

      {post.source && (
        <a
          href={`https://youtube.com/watch?v=${post.source.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors mb-6"
        >
          <ExternalLink className="w-4 h-4" />
          Watch on YouTube: @{post.source.handle}
        </a>
      )}

      {post.coverImage && (
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/5 rounded-full text-sm text-neutral-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </header>
  );
}
