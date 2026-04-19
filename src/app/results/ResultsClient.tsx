'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'
import { scoreCurricula } from '@/lib/scoring'
import type { QuizAnswers } from '@/types'
import CurriculumCard from '@/components/CurriculumCard'
import EmailCapture from '@/components/EmailCapture'

export default function ResultsClient() {
  const searchParams = useSearchParams()
  const encoded = searchParams.get('a')

  const results = useMemo(() => {
    if (!encoded) return null
    try {
      const answers = JSON.parse(atob(encoded)) as QuizAnswers
      return scoreCurricula(answers)
    } catch {
      return null
    }
  }, [encoded])

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
            Your answers may have filtered out most curricula (such as a very specific faith and
            budget combination). Try retaking the quiz with slightly broader preferences, or browse
            our full directory.
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
          {results.map(({ curriculum, matchReasons }, index) => (
            <CurriculumCard
              key={curriculum.id}
              curriculum={curriculum}
              matchReasons={matchReasons}
              rank={index + 1}
            />
          ))}
        </div>

        {/* Email capture */}
        <div className="mt-10">
          <EmailCapture answersParam={encoded} />
        </div>

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
