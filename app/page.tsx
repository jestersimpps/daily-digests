import { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogPageClient from '@/components/blog/BlogPageClient';
import GradientOrbs from '@/components/ui/GradientOrbs';
import GridLines from '@/components/ui/GridLines';

export const metadata: Metadata = {
  title: "Jo's Daily Digests",
  description:
    'Curated summaries of the most important AI, Crypto, and World news — distilled from hours of YouTube content into readable articles.',
  keywords: ['AI', 'Crypto', 'World News', 'Daily Digest', 'YouTube Summaries'],
};

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden">
        <GradientOrbs variant="cyan" />
        <GridLines />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Jo&apos;s Daily Digests
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl">
            Curated summaries of the most important AI, Crypto, and World news — 
            distilled from hours of YouTube content into readable articles.
          </p>
          <div className="flex gap-4 mt-8">
            <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30">🤖 AI</span>
            <span className="px-3 py-1 rounded-full text-sm bg-amber-500/20 text-amber-300 border border-amber-500/30">💰 Crypto</span>
            <span className="px-3 py-1 rounded-full text-sm bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">🌍 World</span>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogPageClient posts={posts} tags={tags} />
        </div>
      </section>
    </div>
  );
}
