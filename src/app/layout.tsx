import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig'

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
    'Christian homeschool',
    'secular homeschool',
    'classical homeschool',
    'Charlotte Mason',
  ],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'The Curriculum Compass — Find Your Perfect Homeschool Curriculum',
    description:
      'Answer 20 questions about your family and get your top 3 homeschool curriculum matches — personalized, free, and in minutes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Curriculum Compass — Find Your Perfect Homeschool Curriculum',
    description:
      'Free 20-question quiz matches your family to the best homeschool curriculum. 40+ reviewed.',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description:
    'A free homeschool curriculum matching service — helping families find the right fit through a personalized 20-question quiz and reviews of 40+ curricula.',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/directory?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-cream flex flex-col font-body antialiased">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
