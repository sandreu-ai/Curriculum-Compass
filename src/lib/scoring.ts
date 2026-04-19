import type { QuizAnswers, ScoredCurriculum, Curriculum } from '@/types'
import { questions } from '@/data/questions'
import { curricula } from '@/data/curricula'

const TAG_REASON_MAP: Record<string, string> = {
  visual: 'Uses visual instruction that works beautifully for visual learners',
  auditory: 'Includes audio-based lessons perfect for auditory learners',
  kinesthetic: 'Features hands-on activities ideal for kinesthetic learners',
  'reading-writing': 'Reading and writing-intensive approach matches your child\'s strengths',
  'hands-on': 'Emphasizes hands-on, project-based learning your family values',
  secular: 'Fully secular — no religious content, matching your preference',
  christian: 'Integrates a Christian worldview throughout, just as you prefer',
  catholic: 'Integrates a Catholic perspective and rich Catholic content',
  jewish: 'Incorporates Jewish values and worldview throughout',
  'faith-neutral': 'Faith-flexible content works beautifully for families of any background',
  classical: 'Follows the classical education model you\'re drawn to',
  'charlotte-mason': 'Uses beloved Charlotte Mason methods — living books, narration, and nature study',
  'literature-based': 'Built around rich literature, matching your love of books',
  'living-books': 'Uses living books that make learning come alive and spark curiosity',
  'unit-study': 'Teaches multiple subjects together through rich, integrated unit studies',
  traditional: 'Provides the structured, traditional approach your family prefers',
  'textbook-based': 'Clear, sequential textbook instruction with a proven academic structure',
  online: 'Available fully online — perfect for tech-forward families',
  eclectic: 'Flexible and adaptable to your family\'s unique needs and style',
  'budget-friendly': 'Fits comfortably within your budget at under $500/year',
  'mid-range': 'Excellent value within your $500–$1,500/year budget',
  premium: 'A premium, comprehensive option worth the investment',
  'parent-led': 'Designed for an engaged, involved parent who loves to teach',
  'self-directed': 'Empowers your child to learn independently with minimal parent instruction',
  'teacher-intensive': 'Provides detailed teaching scripts and guides for a hands-on teaching parent',
  'minimal-prep': 'Requires minimal planning and prep — everything is laid out for you',
  'highly-structured': 'Provides the clear, predictable structure your family thrives in',
  flexible: 'Flexible enough to fit your family\'s unique rhythm and lifestyle',
  relaxed: 'A gentle, unhurried approach that protects your child\'s natural love of learning',
  'multi-age': 'Specifically designed to teach multiple children of different ages together',
  'dyslexia-friendly': 'Uses dyslexia-friendly, multi-sensory methods for struggling readers',
  'gifted-friendly': 'Offers the depth, challenge, and acceleration gifted learners need',
  'special-needs': 'Designed to support and adapt to learners with special needs',
  'strong-math': 'Recognized for its exceptionally strong math instruction and results',
  'strong-reading': 'Highly regarded for building confident, fluent readers',
  'strong-writing': 'Develops skilled, confident writers through a proven approach',
  'strong-science': 'Provides thorough, engaging science instruction at every level',
  'strong-history': 'Teaches history in a rich, memorable, and engaging way',
  'arts-focused': 'Weaves arts and creativity throughout the curriculum',
  'stem-focused': 'Strong emphasis on science, technology, and mathematics',
}

const FAITH_EXCLUSIONS: Record<string, string[]> = {
  secular: ['christian', 'catholic', 'jewish'],
  christian: ['secular', 'catholic', 'jewish'],
  catholic: ['secular', 'christian', 'jewish'],
  jewish: ['secular', 'christian', 'catholic'],
}

const BUDGET_LIMITS: Record<string, number> = {
  'under-500': 500,
  '500-1500': 1500,
  'over-1500': Infinity,
}

export function scoreCurricula(answers: QuizAnswers): ScoredCurriculum[] {
  // Step 1: Build tag score map from all answers
  const tagScores: Record<string, number> = {}

  for (const [qIdStr, selectedOptionId] of Object.entries(answers)) {
    const qId = Number(qIdStr)
    const question = questions.find((q) => q.id === qId)
    if (!question) continue
    const option = question.options.find((o) => o.id === selectedOptionId)
    if (!option) continue
    for (const { tag, weight } of option.tags) {
      tagScores[tag] = (tagScores[tag] ?? 0) + weight
    }
  }

  // Step 2: Determine hard constraints
  const faithAnswer = answers[2] as string | undefined
  const budgetAnswer = answers[3] as string | undefined

  const excludedFaithOrientations =
    faithAnswer && faithAnswer !== 'faith-neutral'
      ? FAITH_EXCLUSIONS[faithAnswer] ?? []
      : []

  const budgetMax =
    budgetAnswer && BUDGET_LIMITS[budgetAnswer] !== undefined
      ? BUDGET_LIMITS[budgetAnswer]
      : Infinity

  // Step 3: Score each curriculum
  const results: ScoredCurriculum[] = []

  for (const curriculum of curricula) {
    // Hard filter: faith
    if (excludedFaithOrientations.includes(curriculum.faithOrientation)) continue

    // Hard filter: budget (check if even cheapest tier is over limit)
    if (curriculum.price.low > budgetMax) continue

    // Score by tag overlap
    let score = 0
    const matchedTagsWithScores: { tag: string; score: number }[] = []

    for (const tag of curriculum.tags) {
      if (tagScores[tag]) {
        score += tagScores[tag]
        matchedTagsWithScores.push({ tag, score: tagScores[tag] })
      }
    }

    // Bonus: exact faith match
    if (faithAnswer && curriculum.faithOrientation === faithAnswer) {
      score += 15
    }

    // Bonus: multi-age alignment
    if ((tagScores['multi-age'] ?? 0) > 0 && curriculum.tags.includes('multi-age')) {
      score += 10
    }

    if (score === 0) continue

    // Step 4: Generate match reasons
    const sortedMatches = matchedTagsWithScores.sort((a, b) => b.score - a.score)

    const reasons: string[] = []
    for (const { tag } of sortedMatches) {
      const reason = TAG_REASON_MAP[tag]
      if (reason && !reasons.includes(reason)) {
        reasons.push(reason)
      }
      if (reasons.length >= 4) break
    }

    if (reasons.length === 0) {
      reasons.push('Matches your overall homeschool approach and priorities')
    }

    results.push({ curriculum, score, matchReasons: reasons })
  }

  // Step 5: Sort and return top 3
  return results.sort((a, b) => b.score - a.score).slice(0, 3)
}

export { curricula }
