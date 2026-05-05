import type { Curriculum } from '@/types'

export const FAITH_LABELS: Record<string, string> = {
  christian: 'Christian',
  catholic: 'Catholic',
  secular: 'Secular',
  jewish: 'Jewish',
  neutral: 'Faith-Neutral',
}

export function buildCurriculumMetaDescription(curriculum: Curriculum): string {
  return `${curriculum.name} homeschool curriculum review: cost, grades ${curriculum.gradeRange}, faith fit, parent prep, strengths, drawbacks, and best alternatives.`
}

export function getRelatedCurricula(current: Curriculum, all: Curriculum[], limit = 3): Curriculum[] {
  const scored = all
    .filter((c) => c.id !== current.id)
    .map((c) => {
      const sharedTags = c.tags.filter((t) => current.tags.includes(t)).length
      const sameFaith = c.faithOrientation === current.faithOrientation ? 2 : 0
      const similarApproach = current.approach
        .toLowerCase()
        .split(/[,-]/)
        .some((part) => part.trim().length > 5 && c.approach.toLowerCase().includes(part.trim()))
        ? 2
        : 0
      return { c, score: sharedTags + sameFaith + similarApproach }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((x) => x.c)
}

export function getFitSummary(curriculum: Curriculum): string {
  const faith = FAITH_LABELS[curriculum.faithOrientation] ?? curriculum.faithOrientation
  const style = curriculum.tags.includes('highly-structured')
    ? 'want a clear, structured plan with fewer daily decisions'
    : curriculum.tags.includes('flexible')
      ? 'want room to customize pacing, subjects, and day-to-day flow'
      : curriculum.tags.includes('online')
        ? 'want more independent, screen-based lessons with built-in grading or instruction'
        : 'want the curriculum approach and teaching style to match their family rhythm'

  return `${curriculum.name} is strongest for ${faith.toLowerCase()} families covering ${curriculum.gradeRange} who ${style}. It is especially worth considering if your priorities include ${curriculum.pros.slice(0, 2).join(' and ').toLowerCase()}.`
}

export function getAlternativeSummary(curriculum: Curriculum): string {
  return `Consider an alternative if ${curriculum.cons.slice(0, 2).join(' or ').toLowerCase()}. Families who need a very different teaching format, budget level, or faith orientation should compare ${curriculum.name} against the alternatives below before buying.`
}

export function getTypicalDay(curriculum: Curriculum): string {
  if (curriculum.tags.includes('online')) {
    return `A typical day with ${curriculum.name} usually centers on a student logging in, completing assigned lessons, and moving through the sequence with parent check-ins. Parents should still review progress, discuss difficult concepts, and make sure the online format is producing real understanding rather than box-checking.`
  }
  if (curriculum.tags.includes('literature-based') || curriculum.tags.includes('living-books')) {
    return `A typical day with ${curriculum.name} often includes read-aloud time, discussion, narration or written response, and follow-up work in history, literature, or related subjects. The rhythm is relational and book-heavy, so it works best when a parent can protect consistent reading time.`
  }
  if (curriculum.tags.includes('hands-on') || curriculum.tags.includes('kinesthetic')) {
    return `A typical day with ${curriculum.name} leans on activities, manipulatives, projects, or visual practice rather than only workbook pages. It rewards families who can tolerate some setup and cleanup in exchange for more concrete learning.`
  }
  return `A typical day with ${curriculum.name} usually follows the teacher guide or lesson sequence: introduce the concept, work examples together, assign independent practice, and review mistakes. The exact workload varies by grade, but most families should plan for steady parent oversight.`
}

export function getParentPrep(curriculum: Curriculum): string {
  if (curriculum.tags.includes('teacher-intensive')) {
    return `${curriculum.name} is parent-involved. Expect to preview lessons, read or teach directly, and keep the weekly plan moving. It can be very effective, but it is not a true hands-off option.`
  }
  if (curriculum.tags.includes('open-and-go') || curriculum.tags.includes('highly-structured')) {
    return `${curriculum.name} keeps parent prep manageable because the sequence is already laid out. Parents still need to check work and adjust pacing, but the planning burden is lower than a fully custom curriculum.`
  }
  if (curriculum.tags.includes('online')) {
    return `${curriculum.name} can reduce daily teaching time, but parent oversight still matters. Plan to monitor progress, help when lessons stall, and decide whether the pacing is serving your child.`
  }
  return `${curriculum.name} requires moderate parent prep. Read the next lesson, gather any materials, and decide what to skip, slow down, or supplement based on your child.`
}

export function getReviewDateLabel(curriculum: Curriculum): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
    new Date(curriculum.lastVerified),
  )
}
