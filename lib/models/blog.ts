export interface BlogPostFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
  draft?: boolean;
  source?: {
    channel: string;
    handle: string;
    videoId: string;
    videoTitle: string;
  };
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  readingTime: string;
  content: string;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export type BlogCategory = 'AI' | 'Crypto' | 'World';

export const BLOG_CATEGORIES: BlogCategory[] = ['AI', 'Crypto', 'World'];

export const CATEGORY_EMOJI: Record<BlogCategory, string> = {
  AI: '🤖',
  Crypto: '💰',
  World: '🌍',
};

export const CATEGORY_COLORS: Record<BlogCategory, string> = {
  AI: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Crypto: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  World: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};
