'use client'

import { track } from '@vercel/analytics'
import type { ReactNode } from 'react'
import type { Curriculum } from '@/types'

interface OutboundCurriculumLinkProps {
  curriculum: Pick<Curriculum, 'id' | 'name' | 'affiliateUrl' | 'websiteUrl'>
  linkContext: string
  className?: string
  children: ReactNode
}

function getDestinationDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'unknown'
  }
}

function isAffiliateLink(url: string, websiteUrl: string): boolean {
  try {
    const destination = new URL(url)
    const official = new URL(websiteUrl)
    const hostname = destination.hostname.toLowerCase()
    const query = destination.search.toLowerCase()

    return (
      hostname !== official.hostname.toLowerCase() ||
      hostname.includes('affiliate') ||
      hostname.includes('idevaffiliate') ||
      hostname.includes('shareasale') ||
      hostname.includes('impact') ||
      hostname.includes('grin') ||
      query.includes('acc=') ||
      query.includes('aff') ||
      query.includes('ref=') ||
      query.includes('utm_') ||
      query.includes('tag=')
    )
  } catch {
    return false
  }
}

export default function OutboundCurriculumLink({
  curriculum,
  linkContext,
  className,
  children,
}: OutboundCurriculumLinkProps) {
  const destinationDomain = getDestinationDomain(curriculum.affiliateUrl)
  const isAffiliate = isAffiliateLink(curriculum.affiliateUrl, curriculum.websiteUrl)

  return (
    <a
      href={curriculum.affiliateUrl}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={className}
      onClick={() => {
        track('curriculum_outbound_click', {
          curriculum_id: curriculum.id,
          curriculum_name: curriculum.name,
          destination_domain: destinationDomain,
          is_affiliate: isAffiliate,
          link_context: linkContext,
        })
      }}
    >
      {children}
    </a>
  )
}
