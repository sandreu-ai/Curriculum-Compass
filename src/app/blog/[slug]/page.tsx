import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPostSlugs, getAllPosts, getPost } from '@/lib/blog'
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="bg-cream min-h-screen">
        <div className="bg-forest-dark text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <div className="font-body text-sm text-green-300 mb-3">
              <Link href="/blog" className="hover:text-white transition-colors">
                ← All articles
              </Link>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl text-white leading-tight mb-3">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-body text-sm text-green-200">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
              <span>·</span>
              <span>{post.author}</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div
            className="blog-content font-body text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-12 bg-forest rounded-2xl p-8 text-center text-white">
            <h2 className="font-heading text-2xl mb-3">
              Ready to find your curriculum?
            </h2>
            <p className="font-body text-green-100 mb-5 max-w-md mx-auto">
              Our free 20-question quiz matches you to your top 3 in minutes.
            </p>
            <Link
              href="/quiz"
              className="inline-block bg-white text-forest font-body font-bold px-6 py-3 rounded-xl hover:bg-cream transition-colors"
            >
              Take the Free Quiz →
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="font-heading text-2xl text-forest-dark mb-5">
                Keep Reading
              </h2>
              <div className="space-y-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="block bg-white border border-cream-darker rounded-xl p-5 hover:border-forest transition-colors"
                  >
                    <h3 className="font-heading text-lg text-forest-dark mb-1">{r.title}</h3>
                    <p className="font-body text-sm text-gray-600">{r.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
