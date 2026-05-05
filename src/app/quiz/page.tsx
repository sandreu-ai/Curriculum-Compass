import type { Metadata } from 'next'
import QuizClient from './QuizClient'
import { SITE_URL } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Quiz — Find Your Match in 5 Minutes',
  description:
    'Answer 20 questions about your family, learning style, faith, and budget. Get your top 3 personalized homeschool curriculum matches — free, no email required.',
  alternates: { canonical: '/quiz' },
  openGraph: {
    title: 'Homeschool Curriculum Quiz — Find Your Match in 5 Minutes',
    description:
      'Free 20-question quiz matches your family to the right homeschool curriculum. Personalized results in minutes.',
    url: '/quiz',
    type: 'website',
    images: ['/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Homeschool Curriculum Quiz — Find Your Match in 5 Minutes',
    description: 'Free 20-question quiz matches your family to the right homeschool curriculum.',
    images: ['/og-image.svg'],
  },
}

const quizFaqs = [
  {
    question: 'How does the homeschool curriculum quiz work?',
    answer:
      'The quiz asks about your child’s grade range, learning style, faith preference, parent involvement, budget, and structure needs, then compares your answers against reviewed curriculum options.',
  },
  {
    question: 'Is the homeschool curriculum quiz free?',
    answer:
      'Yes. The Curriculum Compass quiz is free, gives instant matches, and does not require an email to see your results.',
  },
  {
    question: 'Can it recommend Christian and secular curriculum?',
    answer:
      'Yes. The quiz includes Christian, secular, Catholic, faith-neutral, online, literature-based, classical, traditional, and hands-on homeschool curriculum options.',
  },
  {
    question: 'How many curricula are included?',
    answer:
      'The current directory includes 40 reviewed homeschool curriculum options, with comparison and best-fit guides being added over time.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: quizFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function QuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="bg-cream px-4 pt-10 sm:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-forest-light">
            Free homeschool curriculum finder
          </p>
          <h1 className="mt-3 font-heading text-4xl text-forest-dark sm:text-5xl">
            Homeschool Curriculum Quiz
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-gray-700">
            Answer 20 practical questions and get personalized curriculum matches based on your child’s learning style, your teaching preferences, faith fit, structure needs, and budget.
          </p>
        </div>
      </section>
      <QuizClient />
      <section className="bg-cream px-4 pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-cream-darker bg-white p-6 sm:p-8">
          <h2 className="font-heading text-2xl text-forest-dark">Homeschool Curriculum Quiz FAQ</h2>
          <div className="mt-5 space-y-4">
            {quizFaqs.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-cream-darker p-4">
                <summary className="cursor-pointer font-body font-semibold text-forest-dark">
                  {faq.question}
                </summary>
                <p className="mt-3 font-body text-sm leading-relaxed text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-5 font-body text-xs text-gray-500">
            Prefer browsing manually? Visit the <a href={`${SITE_URL}/directory`} className="text-forest underline">homeschool curriculum directory</a>.
          </p>
        </div>
      </section>
    </>
  )
}
