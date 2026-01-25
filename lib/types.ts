export interface Article {
  title: string;
  content: string;
  category: 'AI' | 'Crypto' | 'World';
}

export interface DigestFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  sources: {
    channel: string;
    handle: string;
    videoId: string;
    videoTitle: string;
    category: 'AI' | 'Crypto' | 'World';
  }[];
}

export interface Digest extends DigestFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

export interface DigestSource {
  channel: string;
  handle: string;
  videoId: string;
  videoTitle: string;
  category: 'AI' | 'Crypto' | 'World';
}
