'use client'

import { motion } from 'framer-motion'
import BouncyButton from './BouncyButton'

export default function DaniPicksCalloutCard() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-cream-dark border border-cream-darker rounded-2xl p-6 sm:p-8 text-center"
    >
      <div className="text-4xl mb-3">🌿</div>
      <h3 className="font-heading text-xl text-forest-dark mb-2">
        Want picks from a real homeschool mom?
      </h3>
      <p className="font-body text-gray-600 text-sm leading-relaxed mb-5 max-w-sm mx-auto">
        Daniela Cerrato curates her favorite homeschool books, supplies, and resources — personally
        tried and loved.
      </p>
      <BouncyButton
        href="https://danielacerrato.com/library"
        external
        className="inline-block bg-forest text-cream font-body font-semibold px-6 py-3 rounded-xl text-sm"
      >
        See Daniela&apos;s Picks →
      </BouncyButton>
    </motion.div>
  )
}
