'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/data/questions'
import type { QuizAnswers } from '@/types'

export default function QuizPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})

  const currentQuestion = questions[currentIndex]
  const total = questions.length
  const progress = ((currentIndex) / total) * 100

  const selectedOption = answers[currentQuestion.id]

  const selectOption = useCallback(
    (optionId: string) => {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }))
    },
    [currentQuestion.id]
  )

  const goNext = useCallback(() => {
    if (!selectedOption) return
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      // Encode answers and navigate to results
      const encoded = btoa(JSON.stringify(answers))
      router.push(`/results?a=${encoded}`)
    }
  }, [selectedOption, currentIndex, total, answers, router])

  const goBack = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }, [currentIndex])

  const isLast = currentIndex === total - 1

  return (
    <div className="min-h-screen bg-cream py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="font-body text-sm text-gray-500 mb-1">
            Question {currentIndex + 1} of {total}
          </p>
          <div className="w-full bg-cream-darker rounded-full h-2 overflow-hidden">
            <div
              className="bg-forest h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-sm border border-cream-darker p-6 sm:p-8">
          <h2 className="font-heading text-2xl sm:text-3xl text-forest-dark leading-tight mb-2">
            {currentQuestion.text}
          </h2>
          {currentQuestion.subtext && (
            <p className="font-body text-sm text-gray-500 mb-6">{currentQuestion.subtext}</p>
          )}
          {!currentQuestion.subtext && <div className="mb-6" />}

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id
              return (
                <button
                  key={option.id}
                  onClick={() => selectOption(option.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 font-body text-base transition-all duration-150 ${
                    isSelected
                      ? 'border-forest bg-green-50 text-forest-dark font-semibold shadow-sm'
                      : 'border-cream-darker bg-white text-gray-700 hover:border-forest-light hover:bg-green-50/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        isSelected ? 'border-forest bg-forest' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </span>
                    <span>{option.text}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={goBack}
              disabled={currentIndex === 0}
              className="font-body text-sm text-gray-500 hover:text-forest disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
            >
              ← Back
            </button>

            <button
              onClick={goNext}
              disabled={!selectedOption}
              className={`font-body font-semibold px-8 py-3 rounded-xl transition-all duration-200 ${
                selectedOption
                  ? 'bg-forest text-cream hover:bg-forest-light shadow-sm'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLast ? 'See My Matches →' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Skip hint */}
        <p className="font-body text-xs text-gray-400 text-center mt-4">
          Select an answer to continue · Your results are free and instant
        </p>
      </div>
    </div>
  )
}
