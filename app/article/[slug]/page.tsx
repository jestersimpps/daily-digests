import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {
  getPostBySlug,
  getAllPosts,
  getRelatedPosts,
  generateTableOfContents,
} from '@/lib/blog';
import {
  MDXComponents,
  BlogHeader,
  TableOfContents,
  RelatedPosts,
} from '@/components/blog';
import GradientOrbs from '@/components/ui/GradientOrbs';
import GridLines from '@/components/ui/GridLines';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: 'Article Not Found' };

  const siteUrl = 'https://digests.jovweb.dev';
  const postUrl = `${siteUrl}/article/${slug}`;
  const coverImageUrl = post.coverImage ? `${siteUrl}${post.coverImage}` : null;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: postUrl,
      siteName: "Jo's Daily Digests",
      locale: 'en_US',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      section: post.category,
      images: coverImageUrl
        ? [{ url: coverImageUrl, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: coverImageUrl ? [{ url: coverImageUrl, alt: post.title }] : [],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const toc = generateTableOfContents(post.content);
  const relatedPosts = getRelatedPosts(post);

  const siteUrl = 'https://digests.jovweb.dev';
  const postUrl = `${siteUrl}/article/${slug}`;
  const coverImageUrl = post.coverImage ? `${siteUrl}${post.coverImage}` : null;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: coverImageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: "Jo's Daily Digests",
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      
      {/* Header */}
      <section className="relative pt-24 pb-12 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden">
        <GradientOrbs variant="cyan" />
        <GridLines />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BlogHeader post={post} />
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-gradient-to-b from-black via-neutral-950 to-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-4 gap-12">
            <article className="lg:col-span-3 prose prose-invert max-w-none overflow-hidden">
              <MDXRemote
                source={post.content}
                components={MDXComponents}
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

            <aside className="hidden lg:block">
              <TableOfContents items={toc} />
            </aside>
          </div>

          {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </div>
      </section>
    </div>
  );
}
