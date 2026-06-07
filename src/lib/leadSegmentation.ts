import { questions } from '@/data/questions'
import type { QuizAnswers, ScoredCurriculum } from '@/types'

export interface LeadSegments {
  worldview: 'faith' | 'secular' | 'neutral'
  budget: 'budget' | 'mid-range' | 'premium' | 'unknown'
  gradeRange: 'early-elementary' | 'elementary' | 'middle-school' | 'high-school' | 'mixed-or-unknown'
  learningNeeds: string[]
  topMatch: string
  topMatchSlug: string
  topTags: string[]
}

const optionTextById = new Map<string, string>()
const optionTagsById = new Map<string, string[]>()

for (const question of questions) {
  for (const option of question.options) {
    optionTextById.set(option.id, option.text)
    optionTagsById.set(option.id, option.tags.map((tag) => tag.tag))
  }
}

function getAnswer(answers: QuizAnswers, questionId: number): string | undefined {
  return answers[questionId] ?? answers[String(questionId) as unknown as number]
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)))
}

function getTopTags(answers: QuizAnswers, matches: ScoredCurriculum[]): string[] {
  const quizTags = Object.values(answers).flatMap((answerId) => optionTagsById.get(answerId) ?? [])
  const matchTags = matches.slice(0, 3).flatMap((match) => match.curriculum.tags.slice(0, 4))
  return unique([...quizTags, ...matchTags]).slice(0, 12)
}

export function deriveLeadSegments(answers: QuizAnswers, matches: ScoredCurriculum[]): LeadSegments {
  const worldviewAnswer = getAnswer(answers, 2)
  const budgetAnswer = getAnswer(answers, 3)
  const gradeAnswer = getAnswer(answers, 4)

  const worldview: LeadSegments['worldview'] =
    worldviewAnswer === 'secular'
      ? 'secular'
      : worldviewAnswer === 'christian' || worldviewAnswer === 'catholic'
        ? 'faith'
        : 'neutral'

  const budget: LeadSegments['budget'] =
    budgetAnswer === 'under-500'
      ? 'budget'
      : budgetAnswer === '500-1500'
        ? 'mid-range'
        : budgetAnswer === 'over-1500'
          ? 'premium'
          : 'unknown'

  const gradeRange: LeadSegments['gradeRange'] =
    gradeAnswer === 'q4-early'
      ? 'early-elementary'
      : gradeAnswer === 'q4-elementary'
        ? 'elementary'
        : gradeAnswer === 'q4-middle'
          ? 'middle-school'
          : gradeAnswer === 'q4-high'
            ? 'high-school'
            : 'mixed-or-unknown'

  const topTags = getTopTags(answers, matches)
  const learningNeeds = unique(
    topTags.filter((tag) =>
      [
        'hands-on',
        'kinesthetic',
        'visual',
        'auditory',
        'strong-writing',
        'strong-math',
        'self-directed',
        'minimal-prep',
        'teacher-intensive',
        'online',
      ].includes(tag)
    )
  )

  return {
    worldview,
    budget,
    gradeRange,
    learningNeeds: learningNeeds.length ? learningNeeds : ['general-fit'],
    topMatch: matches[0]?.curriculum.name ?? 'Unknown',
    topMatchSlug: matches[0]?.curriculum.id ?? 'unknown',
    topTags,
  }
}

export function buildLeadProperties(segments: LeadSegments): Record<string, string | number | null> {
  return {
    source: 'quiz-results-gate',
    worldview: segments.worldview,
    budget: segments.budget,
    grade_range: segments.gradeRange,
    learning_needs: segments.learningNeeds.join(','),
    top_match: segments.topMatch,
    top_match_slug: segments.topMatchSlug,
    top_tags: segments.topTags.join(','),
  }
}

export function buildEmailTags(segments: LeadSegments): { name: string; value: string }[] {
  return [
    { name: 'source', value: 'quiz-results' },
    { name: 'worldview', value: segments.worldview },
    { name: 'budget', value: segments.budget },
    { name: 'grade', value: segments.gradeRange },
    { name: 'top-match', value: segments.topMatchSlug },
  ]
}

export function summarizeAnswers(answers: QuizAnswers): string {
  return Object.entries(answers)
    .map(([questionId, optionId]) => `Q${questionId}: ${optionTextById.get(optionId) ?? optionId}`)
    .join('\n')
}
