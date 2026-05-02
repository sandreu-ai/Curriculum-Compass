'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Curriculum } from '@/types'
import TagBadge from './TagBadge'

interface CurriculumCardProps {
  curriculum: Curriculum
  matchReasons?: string[]
  rank?: number
  compact?: boolean
}

const PRIORITY_TAGS = [
  'christian', 'catholic', 'secular', 'faith-neutral',
  'classical', 'charlotte-mason', 'literature-based', 'unit-study',
  'budget-friendly', 'mid-range', 'premium',
  'dyslexia-friendly', 'gifted-friendly', 'multi-age',
  'online', 'hands-on',
]

function getDisplayTags(tags: string[], max = 5): string[] {
  const priority = tags.filter((t) => PRIORITY_TAGS.includes(t))
  const rest = tags.filter((t) => !PRIORITY_TAGS.includes(t))
  return [...priority, ...rest].slice(0, max)
}

export default function CurriculumCard({
  curriculum,
  matchReasons,
  rank,
  compact = false,
}: CurriculumCardProps) {
  const displayTags = getDisplayTags(curriculum.tags)

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(31,106,79,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-white rounded-2xl shadow-sm border border-cream-darker overflow-hidden"
    >
      {rank && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.1 }}
          className="bg-forest px-4 py-2 flex items-center gap-2"
        >
          <span className="text-cream font-body font-bold text-sm">
            #{rank} Match
          </span>
          <span className="text-green-200 text-xs font-body">for your family</span>
        </motion.div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-heading text-xl text-forest-dark leading-tight">
              {curriculum.name}
            </h3>
            <p className="font-body text-sm text-gray-500 mt-0.5">{curriculum.approach}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="font-body font-semibold text-forest text-sm">
              ${curriculum.price.low.toLocaleString()}
              {curriculum.price.high !== curriculum.price.low && (
                <>–${curriculum.price.high.toLocaleString()}</>
              )}
            </div>
            <div className="font-body text-xs text-gray-400">/year</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {displayTags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {curriculum.gradeRange && (
            <span className="text-xs font-body font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
              Grades: {curriculum.gradeRange}
            </span>
          )}
        </div>

        {!compact && (
          <p className="font-body text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {curriculum.description}
          </p>
        )}

        {matchReasons && matchReasons.length > 0 && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
            <p className="font-body font-semibold text-forest text-xs uppercase tracking-wide mb-2">
              Why this fits your family
            </p>
            <ul className="space-y-1">
              {matchReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-gray-700">
                  <span className="text-forest mt-0.5 shrink-0">✓</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!compact && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="font-body font-semibold text-xs text-gray-500 uppercase tracking-wide mb-1">
                Strengths
              </p>
              <ul className="space-y-0.5">
                {curriculum.pros.slice(0, 3).map((pro, i) => (
                  <li key={i} className="font-body text-xs text-gray-600 flex gap-1.5">
                    <span className="text-forest">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-body font-semibold text-xs text-gray-500 uppercase tracking-wide mb-1">
                Consider
              </p>
              <ul className="space-y-0.5">
                {curriculum.cons.slice(0, 2).map((con, i) => (
                  <li key={i} className="font-body text-xs text-gray-600 flex gap-1.5">
                    <span className="text-amber-500">–</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Link
              href={`/curriculum/${curriculum.id}`}
              className="block text-center border border-forest text-forest font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-forest hover:text-cream transition-colors duration-200"
            >
              Learn More
            </Link>
          </motion.div>
          <motion.a
            href={curriculum.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="flex-1 text-center bg-forest text-cream font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-forest-light transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Visit Website →
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
