'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { scoreCurricula } from '@/lib/scoring'
import type { QuizAnswers } from '@/types'
import CurriculumCard from '@/components/CurriculumCard'

type GateStatus = 'idle' | 'loading' | 'success' | 'error'

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
          <p className="font-heading text-2xl text-forest-dark mb-4">
            No quiz results found
          </p>
          <p className="font-body text-gray-600 mb-6">
            It looks like you navigated here directly. Take the quiz first to see your personalized
            curriculum matches!
          </p>
          <Link href="/quiz" className="btn-primary">
            Take the Quiz →
          </Link>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="font-heading text-2xl text-forest-dark mb-4">
            No strong matches found
          </p>
          <p className="font-body text-gray-600 mb-6">
            Your answers may have filtered out most curricula. Try retaking the quiz with slightly
            broader preferences, or browse our full directory.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quiz" className="btn-primary">
              Retake the Quiz
            </Link>
            <Link href="/directory" className="btn-secondary">
              Browse Directory
            </Link>
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
          <div className="inline-flex items-center gap-2 bg-white/10 text-green-200 font-body text-sm px-4 py-1.5 rounded-full border border-white/20 mb-4">
            <span>✓</span>
            <span>Matched to {results.length} curriculum{results.length > 1 ? 'a' : ''}</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl text-white mb-3">
            Your Top {results.length} Curriculum Match{results.length > 1 ? 'es' : ''}
          </h1>
          <p className="font-body text-green-100 text-lg max-w-xl mx-auto">
            Based on your answers, here are the curricula that fit your family best — along with
            personalized reasons why each one could work for you.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="space-y-8">

          {/* First result — always visible */}
          <CurriculumCard
            curriculum={first.curriculum}
            matchReasons={first.matchReasons}
            rank={1}
          />

          {/* Gate or remaining results */}
          {rest.length > 0 && (
            <div className="relative">
              {/* Blurred cards underneath */}
              <div className={`space-y-8 transition-all duration-500 ${unlocked ? '' : 'blur-sm pointer-events-none select-none'}`}>
                {rest.map(({ curriculum, matchReasons }, index) => (
                  <CurriculumCard
                    key={curriculum.id}
                    curriculum={curriculum}
                    matchReasons={matchReasons}
                    rank={index + 2}
                  />
                ))}
              </div>

              {/* Email gate overlay */}
              {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center px-4">
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
                      <button
                        type="submit"
                        disabled={gateStatus === 'loading' || !email.trim()}
                        className="w-full bg-forest text-cream font-body font-semibold px-6 py-3 rounded-xl hover:bg-forest-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {gateStatus === 'loading' ? 'Unlocking…' : 'Show My Full Results →'}
                      </button>
                    </form>

                    {gateStatus === 'error' && gateError && (
                      <p className="font-body text-sm text-red-600 mt-3">{gateError}</p>
                    )}

                    <p className="font-body text-xs text-gray-400 mt-4">
                      No spam — just your results. Unsubscribe anytime.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Success message after unlock */}
        {unlocked && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
            <p className="font-body text-forest-dark font-semibold">
              📬 Check your inbox — your full results are on the way!
            </p>
          </div>
        )}

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
            <Link href="/directory" className="btn-primary">
              Browse All Curricula →
            </Link>
            <Link href="/quiz" className="btn-secondary">
              Retake the Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
