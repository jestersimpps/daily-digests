import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getDigestBySlug, getAllDigests, formatDate } from '@/lib/digests';
import { Calendar, Clock, Youtube, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface DigestPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const digests = getAllDigests();
  return digests.map((digest) => ({ slug: digest.slug }));
}

export async function generateMetadata({ params }: DigestPageProps) {
  const { slug } = await params;
  const digest = getDigestBySlug(slug);

  if (!digest) return { title: 'Digest Not Found' };

  return {
    title: digest.title,
    description: digest.description,
    keywords: digest.tags,
    openGraph: {
      title: digest.title,
      description: digest.description,
      type: 'article',
      publishedTime: digest.date,
    },
  };
}

const categoryColors = {
  AI: 'category-ai',
  Crypto: 'category-crypto',
  World: 'category-world',
};

const categoryEmoji = {
  AI: '🤖',
  Crypto: '💰',
  World: '🌍',
};

export default async function DigestPage({ params }: DigestPageProps) {
  const { slug } = await params;
  const digest = getDigestBySlug(slug);

  if (!digest) notFound();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="relative py-16 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to digests
          </Link>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
              <Calendar className="w-4 h-4" />
              {formatDate(digest.date)}
            </div>
            <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
              <Clock className="w-4 h-4" />
              {digest.readingTime}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {digest.title}
          </h1>

          <p className="text-xl text-neutral-400 mb-6">
            {digest.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {digest.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  categoryColors[tag as keyof typeof categoryColors] || 'bg-white/10 text-neutral-300'
                }`}
              >
                {categoryEmoji[tag as keyof typeof categoryEmoji] || ''} {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-invert prose-lg max-w-none">
            <MDXRemote
              source={digest.content}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                  ],
                },
              }}
            />
          </article>

          {/* Sources */}
          {digest.sources && digest.sources.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                Sources
              </h2>
              <div className="grid gap-4">
                {digest.sources.map((source, index) => (
                  <a
                    key={index}
                    href={`https://www.youtube.com/watch?v=${source.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Youtube className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-1 ${
                        categoryColors[source.category]
                      }`}>
                        {categoryEmoji[source.category]} {source.category}
                      </span>
                      <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
                        {source.videoTitle}
                      </h3>
                      <p className="text-sm text-neutral-400">
                        @{source.handle} • {source.channel}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
