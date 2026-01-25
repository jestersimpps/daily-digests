import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Digest, DigestFrontmatter } from './types';

const DIGESTS_DIR = path.join(process.cwd(), 'content/digests');

export function getAllDigests(): Digest[] {
  if (!fs.existsSync(DIGESTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(DIGESTS_DIR);

  const digests = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => getDigestBySlug(file.replace('.mdx', '')))
    .filter((digest): digest is Digest => digest !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return digests;
}

export function getDigestBySlug(slug: string): Digest | null {
  const filePath = path.join(DIGESTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as DigestFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: stats.text,
  };
}

export function getAllTags(): string[] {
  const digests = getAllDigests();
  const tags = new Set<string>();
  digests.forEach((digest) => digest.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getDigestsByTag(tag: string): Digest[] {
  return getAllDigests().filter((digest) => digest.tags.includes(tag));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
