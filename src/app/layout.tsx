import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'The Curriculum Compass — Find Your Perfect Homeschool Curriculum',
    template: '%s | The Curriculum Compass',
  },
  description:
    'Answer 20 questions about your family and get your top 3 homeschool curriculum matches — personalized, free, and in minutes. 40+ curricula reviewed, 50 state laws covered.',
  keywords: [
    'homeschool curriculum',
    'homeschool quiz',
    'best homeschool curriculum',
    'curriculum comparison',
    'homeschool resources',
  ],
  metadataBase: new URL('https://thecurriculumcompass.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thecurriculumcompass.com',
    siteName: 'The Curriculum Compass',
    title: 'The Curriculum Compass — Find Your Perfect Homeschool Curriculum',
    description:
      'Answer 20 questions about your family and get your top 3 homeschool curriculum matches — personalized, free, and in minutes.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-cream flex flex-col font-body antialiased">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
