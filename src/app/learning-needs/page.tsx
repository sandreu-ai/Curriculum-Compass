import type { Metadata } from 'next'
import TopicHubPage from '@/components/TopicHubPage'
import { getTopicHubBySlug } from '@/data/topicalMap'

const hub = getTopicHubBySlug('learning-needs')!

export const metadata: Metadata = {
  title: hub.title,
  description: hub.description,
  alternates: { canonical: hub.path },
  openGraph: { title: hub.title, description: hub.description, url: hub.path, type: 'website', images: ['/og-image.png'] },
}

export default function Page() {
  return <TopicHubPage hub={hub} />
}
