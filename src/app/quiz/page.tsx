import type { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: 'Homeschool Curriculum Quiz — Find Your Match in 5 Minutes',
  description:
    'Answer 20 questions about your family, learning style, faith, and budget. Get your top 3 personalized homeschool curriculum matches — free, no email required.',
  alternates: { canonical: '/quiz' },
  openGraph: {
    title: 'Homeschool Curriculum Quiz — Find Your Match in 5 Minutes',
    description:
      'Free 20-question quiz matches your family to the right homeschool curriculum. Personalized results in minutes.',
    url: '/quiz',
    type: 'website',
  },
}

export default function QuizPage() {
  return <QuizClient />
}
