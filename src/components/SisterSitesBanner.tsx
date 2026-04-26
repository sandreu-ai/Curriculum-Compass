'use client'

import { motion } from 'framer-motion'

export default function SisterSitesBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-forest py-8 mb-8"
    >
      <p className="font-body text-xs text-green-500 uppercase tracking-widest text-center mb-4">
        Also from us
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-start gap-3 bg-forest/20 rounded-xl p-4"
        >
          <span className="text-2xl">🧭</span>
          <div>
            <p className="font-heading text-white text-sm">The Curriculum Compass</p>
            <p className="font-body text-green-300 text-xs mt-0.5">
              You&apos;re here — free curriculum matching quiz
            </p>
          </div>
        </motion.div>
        <motion.a
          href="https://danielacerrato.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-start gap-3 bg-forest/20 rounded-xl p-4 hover:bg-forest/30 transition-colors"
        >
          <span className="text-2xl">🌿</span>
          <div>
            <p className="font-heading text-white text-sm">Daniela Cerrato</p>
            <p className="font-body text-green-300 text-xs mt-0.5">
              Real encouragement · Blog · Printables → danielacerrato.com
            </p>
          </div>
        </motion.a>
      </div>
    </motion.div>
  )
}
