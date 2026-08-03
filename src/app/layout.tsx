import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/siteConfig'

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
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Curriculum Compass — Find Your Perfect Homeschool Curriculum',
    description:
      'Free 20-question quiz matches your family to the best homeschool curriculum. 40+ reviewed.',
    images: ['/og-image.png'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  email: SITE_CONTACT_EMAIL,
  description:
    'A homeschool curriculum comparison and decision-support site that helps families choose curriculum by learning style, worldview, grade level, parent involvement, budget, and state requirements.',
  knowsAbout: [
    'homeschool curriculum',
    'curriculum comparison',
    'Christian homeschool curriculum',
    'secular homeschool curriculum',
    'homeschool curriculum for ADHD',
    'homeschool curriculum for dyslexia',
    'state homeschool laws',
  ],
  publishingPrinciples: `${SITE_URL}/editorial-policy`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'editorial and reader support',
    email: SITE_CONTACT_EMAIL,
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: 'Answer-first homeschool curriculum guides, comparison tables, free decision tools, and curriculum reviews for parents.',
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
