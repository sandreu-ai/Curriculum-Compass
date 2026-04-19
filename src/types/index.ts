export interface CurriculumPrice {
  low: number
  high: number
  note: string
}

export type FaithOrientation = 'secular' | 'christian' | 'catholic' | 'jewish' | 'neutral'

export interface Curriculum {
  id: string
  name: string
  description: string
  approach: string
  gradeRange: string
  price: CurriculumPrice
  tags: string[]
  pros: string[]
  cons: string[]
  faithOrientation: FaithOrientation
  affiliateUrl: string
  websiteUrl: string
  stateAccepted: string[] | 'all'
  lastVerified: string
}

export interface QuizOption {
  id: string
  text: string
  tags: { tag: string; weight: number }[]
}

export interface QuizQuestion {
  id: number
  text: string
  subtext?: string
  options: QuizOption[]
}

export interface QuizAnswers {
  [questionId: number]: string
}

export interface ScoredCurriculum {
  curriculum: Curriculum
  score: number
  matchReasons: string[]
}

export type RequirementLevel = 'low' | 'medium' | 'high'

export interface StateLaw {
  state: string
  abbreviation: string
  requirementLevel: RequirementLevel
  requirements: string
  noticeRequired: boolean
  portfolioRequired: boolean
  assessmentRequired: boolean
  teacherQualifications: string
  reportingUrl: string
  lastVerified: string
}
