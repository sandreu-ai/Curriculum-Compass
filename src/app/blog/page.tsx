import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Blog — Guides, Reviews & Comparisons',
  description:
    'Honest guides, deep curriculum comparisons, and practical advice for homeschool families. Written by parents who have done the research so you don\'t have to.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Homeschool Curriculum Blog — Guides, Reviews & Comparisons',
    description:
      'Honest guides, deep curriculum comparisons, and practical advice for homeschool families.',
    url: '/blog',
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-gradient-to-br from-forest-dark to-forest text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl text-white mb-3">
            The Curriculum Compass Blog
          </h1>
          <p className="font-body text-green-100 text-lg max-w-2xl mx-auto">
            Honest guides, deep comparisons, and practical advice — written by homeschool parents
            who have done the research so you don&apos;t have to.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {posts.length === 0 ? (
          <p className="font-body text-center text-gray-500 py-10">
            New posts coming soon.
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white border border-cream-darker rounded-2xl p-6 sm:p-7 hover:border-forest hover:shadow-sm transition-all"
              >
                <div className="flex flex-wrap items-center gap-3 font-body text-xs text-gray-400 mb-2">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="font-heading text-2xl text-forest-dark mb-2 leading-tight">
                  {post.title}
                </h2>
                <p className="font-body text-gray-600 leading-relaxed">{post.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs text-forest bg-green-50 border border-green-100 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center bg-cream-dark rounded-2xl p-8 border border-cream-darker">
          <h2 className="font-heading text-2xl text-forest-dark mb-3">
            Not sure which curriculum is right?
          </h2>
          <p className="font-body text-gray-600 mb-5">
            Skip the weeks of research — our 20-question quiz matches you to your top 3 in minutes.
          </p>
          <Link href="/quiz" className="btn-primary">
            Take the Free Quiz →
          </Link>
        </div>
      </div>
    </div>
  )
}
