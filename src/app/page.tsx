import type { Metadata } from 'next'
import Link from 'next/link'
import { curricula } from '@/data/curricula'
import CurriculumCard from '@/components/CurriculumCard'

export const metadata: Metadata = {
  title: 'Find Your Perfect Homeschool Curriculum — Free Quiz',
  description:
    'Answer 20 questions about your family and get your top 3 personalized homeschool curriculum matches — free, in minutes. 40+ curricula reviewed.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Find Your Perfect Homeschool Curriculum — Free Quiz',
    description:
      'Free 20-question quiz matches your family to the best homeschool curriculum. 40+ reviewed across every approach, faith, and budget.',
    url: '/',
    type: 'website',
  },
}

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the homeschool curriculum quiz work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You answer 20 questions about your child\'s learning style, your family\'s faith orientation, budget, teaching style, and priorities. Our matching engine scores your answers against 40+ reviewed curricula and returns your top 3 personalized matches with specific reasons why each one fits your family.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the quiz really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — the quiz and your personalized matches are 100% free, with no email required to see your results. We may earn affiliate commissions if you purchase a curriculum through our links, at no cost to you.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many homeschool curricula do you review?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We review 40+ homeschool curricula spanning classical, Charlotte Mason, literature-based, traditional, online, and unit-study approaches — covering Christian, Catholic, Jewish, secular, and faith-neutral options across every budget.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you cover state homeschool laws?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our directory includes a quick-reference guide to homeschool requirements in all 50 states and DC — covering notice requirements, portfolio or assessment rules, and teacher qualifications.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know which curriculum is right for my family?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The right curriculum depends on your child\'s learning style, your teaching availability, your family\'s values, and your budget. Our quiz considers all of these factors and ranks matches by fit — then explains why each curriculum was chosen for you.',
      },
    },
  ],
}

const FEATURED_IDS = ['sonlight', 'the-good-and-the-beautiful', 'teaching-textbooks']

export default function HomePage() {
  const featured = curricula.filter((c) =>
    ['sonlight', 'good-and-beautiful', 'teaching-textbooks'].includes(c.id)
  )

  const stats = [
    { number: '40+', label: 'Curricula Reviewed' },
    { number: '20', label: 'Question Quiz' },
    { number: '50', label: 'State Laws Covered' },
    { number: 'Free', label: 'Always Free' },
  ]

  const steps = [
    {
      step: '1',
      title: 'Answer 20 Questions',
      description:
        'Tell us about your child\'s learning style, your family\'s faith, budget, teaching style, and what matters most to you.',
    },
    {
      step: '2',
      title: 'We Match You',
      description:
        'Our matching engine scores your answers against 40+ carefully reviewed curricula to find your top fits.',
    },
    {
      step: '3',
      title: 'Get Your Top 3',
      description:
        'Receive personalized curriculum recommendations with specific reasons why each one is right for your family.',
    },
  ]

  const faqs = FAQ_JSONLD.mainEntity

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-dark via-forest to-forest-light">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #fdfcf8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fdfcf8 0%, transparent 40%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-green-100 font-body text-sm px-4 py-2 rounded-full border border-white/20 mb-6">
            <span>🌿</span>
            <span>Free curriculum matching for homeschool families</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white leading-tight max-w-3xl mx-auto mb-6">
            Find the Perfect Curriculum for{' '}
            <span className="text-green-200 italic">Your</span> Family
          </h1>

          <p className="font-body text-lg sm:text-xl text-green-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Answer 20 questions about your child, your teaching style, and your family values —
            and we&apos;ll match you with your top 3 homeschool curricula. Free. In minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-white text-forest font-body font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors duration-200 shadow-lg"
            >
              Take the Free Quiz →
            </Link>
            <Link
              href="/directory"
              className="border-2 border-white/60 text-white font-body font-semibold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition-colors duration-200"
            >
              Browse All Curricula
            </Link>
          </div>

          <p className="font-body text-sm text-green-300 mt-6">
            Takes about 5 minutes · No email required · 100% free
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-cream-dark border-y border-cream-darker">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ number, label }) => (
              <div key={label} className="text-center">
                <div className="font-heading text-3xl text-forest">{number}</div>
                <div className="font-body text-sm text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-forest-dark mb-4">
            How It Works
          </h2>
          <p className="font-body text-gray-500 text-lg max-w-xl mx-auto">
            Our matching quiz was built by homeschool parents, for homeschool parents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ step, title, description }) => (
            <div key={step} className="text-center">
              <div className="w-14 h-14 rounded-full bg-forest text-cream font-heading text-2xl flex items-center justify-center mx-auto mb-4">
                {step}
              </div>
              <h3 className="font-heading text-xl text-forest-dark mb-2">{title}</h3>
              <p className="font-body text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/quiz" className="btn-primary text-lg px-8 py-4">
            Start the Quiz — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* Featured curricula */}
      {featured.length > 0 && (
        <section className="bg-cream-dark border-t border-cream-darker">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl text-forest-dark mb-4">
                A Few Families&apos; Favorites
              </h2>
              <p className="font-body text-gray-500 text-lg max-w-xl mx-auto">
                Browse a sample of the curricula we review — or take the quiz to find your personal matches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {featured.map((curriculum) => (
                <CurriculumCard key={curriculum.id} curriculum={curriculum} compact />
              ))}
            </div>

            <div className="text-center">
              <Link href="/directory" className="btn-secondary">
                Browse All 40+ Curricula →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-cream-dark border-t border-cream-darker">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl text-forest-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-gray-500">
              Everything you need to know before taking the quiz.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-cream-darker p-5 open:shadow-sm"
              >
                <summary className="font-heading text-lg text-forest-dark cursor-pointer list-none flex justify-between items-center gap-4">
                  {item.name}
                  <span className="text-forest text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="font-body text-gray-600 leading-relaxed mt-3">
                  {item.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="bg-forest rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            Built for Homeschool Moms, By Homeschool Moms
          </h2>
          <p className="font-body text-green-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            We know how overwhelming curriculum research can be. That&apos;s why we reviewed 40+
            curricula across every approach, budget, faith orientation, and learning style — so you
            don&apos;t have to spend weeks in Facebook groups trying to figure it out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-white text-forest font-body font-bold px-8 py-4 rounded-xl hover:bg-cream transition-colors duration-200"
            >
              Find My Curriculum Match →
            </Link>
            <Link
              href="/directory#state-laws"
              className="border-2 border-white/60 text-white font-body font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors duration-200"
            >
              Check My State&apos;s Laws
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
