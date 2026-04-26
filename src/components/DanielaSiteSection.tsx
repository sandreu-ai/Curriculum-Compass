'use client'

import { motion } from 'framer-motion'
import BouncyButton from './BouncyButton'
import AnimatedSection from './AnimatedSection'

const picks = [
  { emoji: '📚', label: 'Favorite curriculum supplements' },
  { emoji: '🖊️', label: 'Tried-and-loved printables' },
  { emoji: '💚', label: 'Real encouragement for homeschool moms' },
]

export default function DanielaSiteSection() {
  return (
    <AnimatedSection className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: info card */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          className="bg-forest rounded-2xl p-8 sm:p-10 text-white"
        >
          <div className="text-4xl mb-4">🌿</div>
          <h2 className="font-heading text-2xl sm:text-3xl text-white mb-3 leading-snug">
            Real Advice From a Real Homeschool Mom
          </h2>
          <p className="font-body text-green-100 leading-relaxed mb-6 text-sm sm:text-base">
            Daniela Cerrato shares the books, supplies, and printables she actually uses — plus
            honest encouragement for the hard days.
          </p>
          <ul className="space-y-3 mb-8">
            {picks.map(({ emoji, label }) => (
              <li key={label} className="flex items-center gap-3 font-body text-sm text-green-100">
                <span className="text-xl">{emoji}</span>
                {label}
              </li>
            ))}
          </ul>
          <BouncyButton
            href="https://danielacerrato.com"
            external
            className="inline-block bg-white text-forest font-body font-bold px-6 py-3 rounded-xl text-sm"
          >
            Visit Daniela&apos;s Site →
          </BouncyButton>
        </motion.div>

        {/* Right: blog CTA card */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="bg-cream-dark border border-cream-darker rounded-2xl p-6">
            <p className="font-heading text-lg text-forest-dark mb-1">📖 Homeschool Blog</p>
            <p className="font-body text-sm text-gray-500 leading-relaxed">
              Honest posts about curriculum, rhythms, and figuring it all out one day at a time.
            </p>
            <a
              href="https://danielacerrato.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 font-body text-sm text-forest font-semibold hover:underline"
            >
              Read the blog →
            </a>
          </div>
          <div className="bg-cream-dark border border-cream-darker rounded-2xl p-6">
            <p className="font-heading text-lg text-forest-dark mb-1">🛍️ Homeschool Shop</p>
            <p className="font-body text-sm text-gray-500 leading-relaxed">
              Digital printables, planning pages, and curriculum guides made for real families.
            </p>
            <a
              href="https://danielacerrato.com/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 font-body text-sm text-forest font-semibold hover:underline"
            >
              Browse the shop →
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
