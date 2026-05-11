import { curricula } from './curricula'
import type { Curriculum } from '@/types'

export type ScoreDimension =
  | 'parentPrep'
  | 'structure'
  | 'independence'
  | 'faithAlignment'
  | 'handsOnLevel'
  | 'readingLoad'
  | 'cost'
  | 'flexibility'
  | 'specialNeedsFriendliness'

export interface CurriculumScorecard {
  curriculumId: string
  curriculumName: string
  scores: Record<ScoreDimension, number>
  bestFor: string
  avoidIf: string
}

export const scoreDimensions: Array<{ key: ScoreDimension; label: string; description: string }> = [
  { key: 'parentPrep', label: 'Parent prep', description: 'Higher means easier to run with less planning.' },
  { key: 'structure', label: 'Structure', description: 'Higher means clearer sequence, routines, and lesson plans.' },
  { key: 'independence', label: 'Independence', description: 'Higher means students can do more without direct parent teaching.' },
  { key: 'faithAlignment', label: 'Faith alignment', description: 'Higher means stronger explicit faith/worldview integration.' },
  { key: 'handsOnLevel', label: 'Hands-on level', description: 'Higher means more tactile, project, or manipulative-based work.' },
  { key: 'readingLoad', label: 'Reading load', description: 'Higher means more book-heavy or literature-rich work.' },
  { key: 'cost', label: 'Cost friendliness', description: 'Higher means more budget-friendly relative to alternatives.' },
  { key: 'flexibility', label: 'Flexibility', description: 'Higher means easier to adapt, slow down, skip, or combine.' },
  { key: 'specialNeedsFriendliness', label: 'Special-needs friendliness', description: 'Higher means stronger fit for dyslexia, ADHD, sensory, or pacing needs.' },
]

const clamp = (value: number) => Math.max(1, Math.min(10, value))
const has = (curriculum: Curriculum, tag: string) => curriculum.tags.includes(tag)

export function buildCurriculumScorecard(curriculum: Curriculum): CurriculumScorecard {
  const avgPrice = (curriculum.price.low + curriculum.price.high) / 2
  const scores: Record<ScoreDimension, number> = {
    parentPrep: 5,
    structure: 5,
    independence: 4,
    faithAlignment: curriculum.faithOrientation === 'neutral' || curriculum.faithOrientation === 'secular' ? 2 : 8,
    handsOnLevel: 4,
    readingLoad: 4,
    cost: avgPrice <= 150 ? 9 : avgPrice <= 350 ? 7 : avgPrice <= 700 ? 5 : 3,
    flexibility: 5,
    specialNeedsFriendliness: 4,
  }

  if (has(curriculum, 'minimal-prep')) scores.parentPrep += 3
  if (has(curriculum, 'teacher-intensive')) scores.parentPrep -= 3
  if (has(curriculum, 'parent-led')) scores.parentPrep -= 1
  if (has(curriculum, 'online') || has(curriculum, 'self-directed')) scores.parentPrep += 2

  if (has(curriculum, 'highly-structured') || has(curriculum, 'traditional') || has(curriculum, 'textbook-based')) scores.structure += 3
  if (has(curriculum, 'flexible') || has(curriculum, 'eclectic') || has(curriculum, 'unit-study')) scores.structure -= 1

  if (has(curriculum, 'self-directed') || has(curriculum, 'online')) scores.independence += 4
  if (has(curriculum, 'teacher-intensive')) scores.independence -= 2
  if (has(curriculum, 'parent-led')) scores.independence -= 1

  if (has(curriculum, 'christian')) scores.faithAlignment = Math.max(scores.faithAlignment, 8)
  if (has(curriculum, 'catholic')) scores.faithAlignment = Math.max(scores.faithAlignment, 9)
  if (has(curriculum, 'faith-neutral') || curriculum.faithOrientation === 'neutral') scores.faithAlignment = Math.min(scores.faithAlignment, 4)
  if (curriculum.faithOrientation === 'secular') scores.faithAlignment = 1

  if (has(curriculum, 'hands-on') || has(curriculum, 'kinesthetic')) scores.handsOnLevel += 4
  if (has(curriculum, 'textbook-based') || has(curriculum, 'online')) scores.handsOnLevel -= 2

  if (has(curriculum, 'literature-based') || has(curriculum, 'living-books') || has(curriculum, 'strong-reading')) scores.readingLoad += 4
  if (has(curriculum, 'online') || has(curriculum, 'hands-on')) scores.readingLoad -= 1

  if (has(curriculum, 'budget-friendly')) scores.cost += 2
  if (has(curriculum, 'premium')) scores.cost -= 2

  if (has(curriculum, 'flexible') || has(curriculum, 'eclectic') || has(curriculum, 'multi-age')) scores.flexibility += 3
  if (has(curriculum, 'highly-structured') || has(curriculum, 'traditional')) scores.flexibility -= 1

  if (has(curriculum, 'dyslexia-friendly') || has(curriculum, 'kinesthetic') || has(curriculum, 'visual') || has(curriculum, 'auditory')) scores.specialNeedsFriendliness += 3
  if (has(curriculum, 'teacher-intensive')) scores.specialNeedsFriendliness -= 1

  for (const key of Object.keys(scores) as ScoreDimension[]) scores[key] = clamp(scores[key])

  const bestFor = [
    has(curriculum, 'online') ? 'families needing independence' : '',
    has(curriculum, 'literature-based') ? 'book-loving families' : '',
    has(curriculum, 'hands-on') ? 'hands-on learners' : '',
    has(curriculum, 'dyslexia-friendly') ? 'struggling readers or dyslexic learners' : '',
    has(curriculum, 'highly-structured') ? 'parents who want clear structure' : '',
    has(curriculum, 'budget-friendly') ? 'budget-conscious families' : '',
  ].filter(Boolean).slice(0, 2).join(' and ') || 'families whose priorities match its teaching style'

  const avoidIf = [
    has(curriculum, 'teacher-intensive') ? 'you need parent-light independence' : '',
    has(curriculum, 'online') ? 'you want minimal screen time' : '',
    has(curriculum, 'textbook-based') ? 'your child shuts down with workbook-heavy days' : '',
    has(curriculum, 'premium') ? 'you need the lowest possible cost' : '',
    has(curriculum, 'literature-based') ? 'your family cannot sustain a heavy reading load' : '',
  ].filter(Boolean)[0] || 'you need a very different worldview, format, or subject scope'

  return { curriculumId: curriculum.id, curriculumName: curriculum.name, scores, bestFor, avoidIf }
}

export const curriculumScorecards = curricula.map(buildCurriculumScorecard)

export function getScorecard(curriculumId: string) {
  return curriculumScorecards.find((scorecard) => scorecard.curriculumId === curriculumId)
}
