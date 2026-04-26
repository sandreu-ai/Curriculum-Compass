import type { Metadata } from 'next'
import Link from 'next/link'
import { curricula } from '@/data/curricula'
import CurriculumCard from '@/components/CurriculumCard'
import HeroSection from '@/components/HeroSection'
import FAQAccordion from '@/components/FAQAccordion'
import DanielaSiteSection from '@/components/DanielaSiteSection'
import AnimatedSection from '@/components/AnimatedSection'
import BouncyButton from '@/components/BouncyButton'

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

export default function HomePage() {
  const featured = curricula.filter((c) =>
    ['sonlight', 'good-and-beautiful', 'teaching-textbooks'].includes(c.id)
  )
  const faqs = FAQ_JSONLD.mainEntity

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />

      {/* Hero + Stats — animated client component */}
      <HeroSection stats={stats} />

      {/* How it works */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-forest-dark mb-4">
            How It Works
          </h2>
          <p className="font-body text-gray-500 text-lg max-w-xl mx-auto">
            Our matching quiz was built by homeschool parents, for homeschool parents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ step, title, description }, i) => (
            <AnimatedSection key={step} delay={i * 0.12} className="text-center">
              <div className="w-14 h-14 rounded-full bg-forest text-cream font-heading text-2xl flex items-center justify-center mx-auto mb-4">
                {step}
              </div>
              <h3 className="font-heading text-xl text-forest-dark mb-2">{title}</h3>
              <p className="font-body text-gray-600 leading-relaxed">{description}</p>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-10">
          <BouncyButton href="/quiz" className="btn-primary text-lg px-8 py-4">
            Start the Quiz — It&apos;s Free
          </BouncyButton>
        </div>
      </AnimatedSection>

      {/* Featured curricula */}
      {featured.length > 0 && (
        <section className="bg-cream-dark border-t border-cream-darker">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
            <AnimatedSection className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl text-forest-dark mb-4">
                A Few Families&apos; Favorites
              </h2>
              <p className="font-body text-gray-500 text-lg max-w-xl mx-auto">
                Browse a sample of the curricula we review — or take the quiz to find your personal matches.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {featured.map((curriculum, i) => (
                <AnimatedSection key={curriculum.id} delay={i * 0.1}>
                  <CurriculumCard curriculum={curriculum} compact />
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center">
              <BouncyButton href="/directory" className="btn-secondary">
                Browse All 40+ Curricula →
              </BouncyButton>
            </div>
          </div>
        </section>
      )}

      {/* Meet Daniela cross-link section */}
      <section className="bg-cream border-t border-cream-darker">
        <DanielaSiteSection />
      </section>

      {/* FAQ */}
      <section className="bg-cream-dark border-t border-cream-darker">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl text-forest-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-gray-500">
              Everything you need to know before taking the quiz.
            </p>
          </AnimatedSection>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Trust section */}
      <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="bg-forest rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            Built for Homeschool Moms, By Homeschool Moms
          </h2>
          <p className="font-body text-green-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            We know how overwhelming curriculum research can be. That&apos;s why we reviewed 40+
            curricula across every approach, budget, faith orientation, and learning style — so you
            don&apos;t have to spend weeks in Facebook groups trying to figure it out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BouncyButton
              href="/quiz"
              className="bg-white text-forest font-body font-bold px-8 py-4 rounded-xl"
            >
              Find My Curriculum Match →
            </BouncyButton>
            <BouncyButton
              href="/directory#state-laws"
              className="border-2 border-white/60 text-white font-body font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors duration-200"
            >
              Check My State&apos;s Laws
            </BouncyButton>
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
