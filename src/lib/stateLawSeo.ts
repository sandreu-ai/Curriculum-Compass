import type { StateLaw } from '@/types'

export function getStateSlug(stateName: string): string {
  return stateName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function getComplianceChecklist(state: StateLaw): string[] {
  const items = [
    state.noticeRequired
      ? `Confirm the ${state.state} notice or registration deadline before withdrawing or beginning homeschool.`
      : `${state.state} does not require routine homeschool notice in this quick-reference data, but keep your own start date records.`,
    state.portfolioRequired
      ? 'Choose curriculum with printable assignments, writing samples, quizzes, or projects that can be saved in a portfolio.'
      : 'Keep simple attendance, reading, work samples, and purchase records even if a portfolio is not routinely submitted.',
    state.assessmentRequired
      ? 'Pick programs with trackable progress, grade-level scope, and review materials that make annual evaluation easier.'
      : 'Use parent checklists or periodic reviews to document progress even when standardized assessment is not required.',
    `Review teacher qualification language: ${state.teacherQualifications}.`,
    'Verify current rules with the official state source before filing, buying, or making legal decisions.',
  ]

  return items
}

export function getRequirementLevelLabel(state: StateLaw): string {
  if (state.requirementLevel === 'low') return 'Low-regulation'
  if (state.requirementLevel === 'high') return 'High-regulation'
  return 'Moderate-regulation'
}

export function getStateCurriculumFitSummary(state: StateLaw): string {
  if (state.requirementLevel === 'high') {
    return `${state.state} families should favor structured curriculum with clear lesson records, grading support, samples, and progress evidence. That does not mean every subject must be traditional, but record keeping should be easy.`
  }

  if (state.requirementLevel === 'medium') {
    return `${state.state} families have enough compliance work that curriculum organization matters. Look for clear weekly plans, saved work samples, and a simple way to show progress without making homeschool feel bureaucratic.`
  }

  return `${state.state} families have more flexibility, so the curriculum decision can focus heavily on child fit, budget, worldview, parent workload, and consistency. Keep basic records anyway so transitions stay easy.`
}
