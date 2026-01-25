import Link from 'next/link';
import { getAllDigests, formatDate } from '@/lib/digests';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

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

export default function HomePage() {
  const digests = getAllDigests();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden">
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
            <span className="px-3 py-1 rounded-full text-sm category-ai">🤖 AI</span>
            <span className="px-3 py-1 rounded-full text-sm category-crypto">💰 Crypto</span>
            <span className="px-3 py-1 rounded-full text-sm category-world">🌍 World</span>
          </div>
        </div>
      </section>

      {/* Digests List */}
      <section className="py-12 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {digests.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-lg">No digests yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {digests.map((digest) => (
                <Link
                  key={digest.slug}
                  href={`/digest/${digest.slug}`}
                  className="block group"
                >
                  <article className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(digest.date)}
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                        <Clock className="w-4 h-4" />
                        {digest.readingTime}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {digest.title}
                    </h2>
                    
                    <p className="text-neutral-400 mb-4">
                      {digest.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {digest.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              categoryColors[tag as keyof typeof categoryColors] || 'bg-white/10 text-neutral-300'
                            }`}
                          >
                            {categoryEmoji[tag as keyof typeof categoryEmoji] || ''} {tag}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-sm text-white/70 group-hover:text-white transition-colors">
                        Read digest
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
