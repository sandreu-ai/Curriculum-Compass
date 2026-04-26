'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { scoreCurricula } from '@/lib/scoring'
import type { QuizAnswers } from '@/types'
import CurriculumCard from '@/components/CurriculumCard'
import DaniPicksCalloutCard from '@/components/DaniPicksCalloutCard'
import BouncyButton from '@/components/BouncyButton'

type GateStatus = 'idle' | 'loading' | 'success' | 'error'

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 26, delay: i * 0.18 },
  }),
}

export default function ResultsClient() {
  const searchParams = useSearchParams()
  const encoded = searchParams.get('a')

  const [email, setEmail] = useState('')
  const [gateStatus, setGateStatus] = useState<GateStatus>('idle')
  const [gateError, setGateError] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  const results = useMemo(() => {
    if (!encoded) return null
    try {
      const answers = JSON.parse(atob(encoded)) as QuizAnswers
      return scoreCurricula(answers)
    } catch {
      return null
    }
  }, [encoded])

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !encoded) return
    setGateStatus('loading')
    setGateError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), answers: encoded }),
      })
      const data = await res.json()
      if (!res.ok) {
        setGateStatus('error')
        setGateError(data?.error ?? 'Something went wrong. Please try again.')
        return
      }
      setGateStatus('success')
      setUnlocked(true)
    } catch {
      setGateStatus('error')
      setGateError('Something went wrong. Please check your connection and try again.')
    }
  }

  if (!encoded || !results) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="font-heading text-2xl text-forest-dark mb-4">No quiz results found</p>
          <p className="font-body text-gray-600 mb-6">
            It looks like you navigated here directly. Take the quiz first to see your personalized
            curriculum matches!
          </p>
          <BouncyButton href="/quiz" className="btn-primary">Take the Quiz →</BouncyButton>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="font-heading text-2xl text-forest-dark mb-4">No strong matches found</p>
          <p className="font-body text-gray-600 mb-6">
            Try retaking the quiz with slightly broader preferences, or browse our full directory.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BouncyButton href="/quiz" className="btn-primary">Retake the Quiz</BouncyButton>
            <BouncyButton href="/directory" className="btn-secondary">Browse Directory</BouncyButton>
          </div>
        </div>
      </div>
    )
  }

  const first = results[0]
  const rest = results.slice(1)

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-dark to-forest text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="inline-flex items-center gap-2 bg-white/10 text-green-200 font-body text-sm px-4 py-1.5 rounded-full border border-white/20 mb-4"
          >
            <span>✓</span>
            <span>Matched to {results.length} curriculum{results.length > 1 ? 'a' : ''}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl text-white mb-3"
          >
            Your Top {results.length} Curriculum Match{results.length > 1 ? 'es' : ''}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-body text-green-100 text-lg max-w-xl mx-auto"
          >
            Based on your answers, here are the curricula that fit your family best — along with
            personalized reasons why each one could work for you.
          </motion.p>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="space-y-8">
          {/* First result — always visible */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="show"
          >
            <CurriculumCard
              curriculum={first.curriculum}
              matchReasons={first.matchReasons}
              rank={1}
            />
          </motion.div>

          {/* Gate or remaining results */}
          {rest.length > 0 && (
            <div className="relative">
              <div className={`space-y-8 transition-all duration-500 ${unlocked ? '' : 'blur-sm pointer-events-none select-none'}`}>
                {rest.map(({ curriculum, matchReasons }, index) => (
                  <motion.div
                    key={curriculum.id}
                    custom={index + 1}
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                  >
                    <CurriculumCard
                      curriculum={curriculum}
                      matchReasons={matchReasons}
                      rank={index + 2}
                    />
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {!unlocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute inset-0 flex items-center justify-center px-4"
                  >
                    <div className="bg-white border border-cream-darker rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md text-center">
                      <div className="text-4xl mb-3">🔒</div>
                      <h2 className="font-heading text-2xl text-forest-dark mb-2">
                        Unlock Your Remaining Matches
                      </h2>
                      <p className="font-body text-gray-600 mb-5">
                        Enter your email to see match{rest.length > 1 ? 'es' : ''} #2
                        {rest.length > 1 ? ` and #${rest.length + 1}` : ''} — plus we&apos;ll send
                        all your results so you can come back to them later.
                      </p>

                      <form onSubmit={handleUnlock} className="space-y-3">
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={gateStatus === 'loading'}
                          className="w-full px-4 py-3 rounded-xl border border-cream-darker font-body text-base focus:outline-none focus:border-forest bg-cream disabled:opacity-50"
                        />
                        <motion.button
                          type="submit"
                          disabled={gateStatus === 'loading' || !email.trim()}
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                          className="w-full bg-forest text-cream font-body font-semibold px-6 py-3 rounded-xl hover:bg-forest-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {gateStatus === 'loading' ? 'Unlocking…' : 'Show My Full Results →'}
                        </motion.button>
                      </form>

                      {gateStatus === 'error' && gateError && (
                        <p className="font-body text-sm text-red-600 mt-3">{gateError}</p>
                      )}
                      <p className="font-body text-xs text-gray-400 mt-4">
                        No spam — just your results. Unsubscribe anytime.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Daniela picks callout */}
        <div className="mt-8">
          <DaniPicksCalloutCard />
        </div>

        {/* Success message */}
        <AnimatePresence>
          {unlocked && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5 text-center"
            >
              <p className="font-body text-forest-dark font-semibold">
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="inline-block mr-1"
                >
                  📬
                </motion.span>
                Check your inbox — your full results are on the way!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Retake / Browse */}
        <div className="mt-10 text-center bg-cream-dark rounded-2xl p-8 border border-cream-darker">
          <h2 className="font-heading text-2xl text-forest-dark mb-3">
            Want to explore more options?
          </h2>
          <p className="font-body text-gray-600 mb-6">
            Browse our full directory of 40+ reviewed curricula, or retake the quiz with different
            priorities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BouncyButton href="/directory" className="btn-primary">Browse All Curricula →</BouncyButton>
            <BouncyButton href="/quiz" className="btn-secondary">Retake the Quiz</BouncyButton>
          </div>
        </div>
      </div>
    </div>
  )
}
