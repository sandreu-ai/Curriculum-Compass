import type { Metadata } from 'next'
import { Suspense } from 'react'
import ResultsClient from './ResultsClient'

export const metadata: Metadata = {
  title: 'Your Curriculum Matches',
  description: 'Your personalized homeschool curriculum recommendations based on your family\'s needs.',
  alternates: { canonical: '/results' },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-body text-gray-500">Finding your matches...</p>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultsClient />
    </Suspense>
  )
}
