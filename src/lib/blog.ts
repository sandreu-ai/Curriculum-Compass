import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  readingTime: string
}

export interface BlogPost extends BlogPostMeta {
  html: string
}

function readPostFile(slug: string): { data: Record<string, unknown>; content: string } | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return matter(raw)
}

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 220))
  return `${minutes} min read`
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): BlogPostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    author: String(data.author ?? 'The Curriculum Compass'),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    readingTime: estimateReadingTime(content),
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map((slug) => {
      const parsed = readPostFile(slug)
      if (!parsed) return null
      return toMeta(slug, parsed.data, parsed.content)
    })
    .filter((p): p is BlogPostMeta => p !== null)
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const parsed = readPostFile(slug)
  if (!parsed) return null
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(parsed.content)
  return {
    ...toMeta(slug, parsed.data, parsed.content),
    html: processed.toString(),
  }
}
