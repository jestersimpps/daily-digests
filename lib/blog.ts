import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import GithubSlugger from 'github-slugger';
import { BlogPost, BlogPostFrontmatter, TableOfContentsItem } from '@/lib/models/blog';

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(ARTICLES_DIR);

  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => getPostBySlug(file.replace('.mdx', '')))
    .filter((post): post is BlogPost => post !== null && !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as BlogPostFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: stats.text,
  };
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();
  posts.forEach((post) => categories.add(post.category));
  return Array.from(categories).sort();
}

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentPost.slug);

  const scored = allPosts.map((post) => {
    let score = 0;
    if (post.category === currentPost.category) score += 3;
    const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
    score += sharedTags.length * 2;
    return { post, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

export function generateTableOfContents(content: string): TableOfContentsItem[] {
  const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TableOfContentsItem[] = [];
  const slugger = new GithubSlugger();
  let match;

  while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = slugger.slug(text);

    toc.push({ id, text, level });
  }

  return toc;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
