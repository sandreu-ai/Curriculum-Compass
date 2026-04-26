'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { questions } from '@/data/questions'
import type { QuizAnswers } from '@/types'

const optionVariants = {
  hidden: { opacity: 0, x: 16 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 28, delay: i * 0.06 },
  }),
}

export default function QuizPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [direction, setDirection] = useState(1)

  const currentQuestion = questions[currentIndex]
  const total = questions.length
  const progress = (currentIndex / total) * 100
  const selectedOption = answers[currentQuestion.id]
  const isLast = currentIndex === total - 1

  const selectOption = useCallback(
    (optionId: string) => {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }))
    },
    [currentQuestion.id]
  )

  const goNext = useCallback(() => {
    if (!selectedOption) return
    setDirection(1)
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      const encoded = btoa(JSON.stringify(answers))
      router.push(`/results?a=${encoded}`)
    }
  }, [selectedOption, currentIndex, total, answers, router])

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((i) => i - 1)
    }
  }, [currentIndex])

  return (
    <div className="min-h-screen bg-cream py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="font-body text-sm text-gray-500 mb-2">
            Question {currentIndex + 1} of {total}
          </p>
          <div className="w-full bg-cream-darker rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="bg-forest h-2.5 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        {/* Question card — slides in/out */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="bg-white rounded-2xl shadow-sm border border-cream-darker p-6 sm:p-8"
          >
            <h2 className="font-heading text-2xl sm:text-3xl text-forest-dark leading-tight mb-2">
              {currentQuestion.text}
            </h2>
            {currentQuestion.subtext && (
              <p className="font-body text-sm text-gray-500 mb-6">{currentQuestion.subtext}</p>
            )}
            {!currentQuestion.subtext && <div className="mb-6" />}

            {/* Options with stagger */}
            <motion.div
              key={`options-${currentIndex}`}
              className="space-y-3"
              initial="hidden"
              animate="show"
            >
              {currentQuestion.options.map((option, i) => {
                const isSelected = selectedOption === option.id
                return (
                  <motion.button
                    key={option.id}
                    custom={i}
                    variants={optionVariants}
                    onClick={() => selectOption(option.id)}
                    animate={isSelected ? { scale: 1.01 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 font-body text-base transition-colors duration-150 min-h-[56px] ${
                      isSelected
                        ? 'border-forest bg-green-50 text-forest-dark font-semibold shadow-sm'
                        : 'border-cream-darker bg-white text-gray-700 hover:border-forest-light hover:bg-green-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors duration-150 ${
                          isSelected ? 'border-forest bg-forest' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                      <span>{option.text}</span>
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <motion.button
                onClick={goBack}
                disabled={currentIndex === 0}
                whileHover={currentIndex > 0 ? { x: -3 } : {}}
                whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="font-body text-sm text-gray-500 hover:text-forest disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
              >
                ← Back
              </motion.button>

              <motion.button
                onClick={goNext}
                disabled={!selectedOption}
                whileHover={selectedOption ? { scale: 1.04, y: -1 } : {}}
                whileTap={selectedOption ? { scale: 0.96 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={`font-body font-semibold px-8 py-3 rounded-xl min-h-[48px] transition-colors duration-200 ${
                  selectedOption
                    ? 'bg-forest text-cream hover:bg-forest-light shadow-sm'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLast ? 'See My Matches →' : 'Next →'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="font-body text-xs text-gray-400 text-center mt-4">
          Select an answer to continue · Your results are free and instant
        </p>
      </div>
    </div>
  )
}
