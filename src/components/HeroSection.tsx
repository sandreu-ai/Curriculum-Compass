'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import BouncyButton from './BouncyButton'

interface Stat { number: string; label: string }

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 22 } },
}

const slideDown = {
  hidden: { opacity: 0, y: -16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 280, damping: 28 } },
}

export default function HeroSection({ stats }: { stats: Stat[] }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0e3528] via-forest to-forest-light">
        {/* Subtle decorative circles */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #fdfcf8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fdfcf8 0%, transparent 40%)',
          }}
        />
        {/* Glassmorphism ring accent */}
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border border-white/10 opacity-40" />
        <div className="absolute -left-16 bottom-0 w-64 h-64 rounded-full border border-white/10 opacity-30" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-28 text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            {/* Logo */}
            <motion.div variants={slideDown} className="mb-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto relative">
                <Image
                  src="/logo.png"
                  alt="The Curriculum Compass"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div variants={slideDown}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-green-100 font-body text-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <span>🌿</span>
                <span>Free curriculum matching for homeschool families</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl sm:text-5xl md:text-6xl text-white leading-tight max-w-3xl mx-auto mb-6"
            >
              Find the Perfect Curriculum for{' '}
              <span className="text-green-200 italic">Your</span> Family
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="font-body text-lg sm:text-xl text-green-100 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Answer 20 questions about your child, your teaching style, and your family values —
              and we&apos;ll match you with your top 3 homeschool curricula. Free. In minutes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <BouncyButton
                href="/quiz"
                className="bg-white text-forest font-body font-bold text-lg px-8 py-4 rounded-xl shadow-lg"
              >
                Take the Free Quiz →
              </BouncyButton>
              <BouncyButton
                href="/directory"
                className="border-2 border-white/60 text-white font-body font-semibold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition-colors duration-200"
              >
                Browse All Curricula
              </BouncyButton>
            </motion.div>

            <motion.p variants={fadeUp} className="font-body text-sm text-green-300 mt-6">
              Takes about 5 minutes · No email required · 100% free
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-cream-dark border-y border-cream-darker">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ number, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, delay: i * 0.08 }}
                whileHover={{ scale: 1.05 }}
                className="text-center cursor-default"
              >
                <div className="font-heading text-3xl text-forest">{number}</div>
                <div className="font-body text-sm text-gray-500 mt-0.5">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
