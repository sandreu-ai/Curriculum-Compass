const TAG_STYLES: Record<string, string> = {
  // Faith
  christian: 'bg-amber-100 text-amber-800',
  catholic: 'bg-purple-100 text-purple-800',
  secular: 'bg-blue-100 text-blue-800',
  'faith-neutral': 'bg-gray-100 text-gray-700',
  // Approach
  classical: 'bg-indigo-100 text-indigo-800',
  'charlotte-mason': 'bg-green-100 text-green-800',
  'literature-based': 'bg-emerald-100 text-emerald-800',
  'living-books': 'bg-teal-100 text-teal-800',
  'unit-study': 'bg-cyan-100 text-cyan-800',
  traditional: 'bg-slate-100 text-slate-700',
  online: 'bg-sky-100 text-sky-800',
  eclectic: 'bg-violet-100 text-violet-800',
  // Budget
  'budget-friendly': 'bg-lime-100 text-lime-800',
  'mid-range': 'bg-yellow-100 text-yellow-800',
  premium: 'bg-orange-100 text-orange-800',
  // Special
  'dyslexia-friendly': 'bg-rose-100 text-rose-800',
  'gifted-friendly': 'bg-fuchsia-100 text-fuchsia-800',
  'multi-age': 'bg-pink-100 text-pink-800',
  // Subjects
  'strong-math': 'bg-blue-100 text-blue-800',
  'strong-science': 'bg-green-100 text-green-700',
  'strong-writing': 'bg-purple-100 text-purple-700',
  'strong-history': 'bg-amber-100 text-amber-700',
}

const TAG_LABELS: Record<string, string> = {
  'charlotte-mason': 'Charlotte Mason',
  'literature-based': 'Literature-Based',
  'living-books': 'Living Books',
  'unit-study': 'Unit Study',
  'budget-friendly': 'Budget-Friendly',
  'mid-range': 'Mid-Range',
  'dyslexia-friendly': 'Dyslexia-Friendly',
  'gifted-friendly': 'Gifted-Friendly',
  'multi-age': 'Multi-Age',
  'highly-structured': 'Structured',
  'self-directed': 'Self-Directed',
  'parent-led': 'Parent-Led',
  'minimal-prep': 'Low-Prep',
  'strong-math': 'Strong Math',
  'strong-science': 'Strong Science',
  'strong-writing': 'Strong Writing',
  'strong-reading': 'Strong Reading',
  'strong-history': 'Strong History',
  'faith-neutral': 'Faith-Neutral',
  'stem-focused': 'STEM',
  'arts-focused': 'Arts',
}

interface TagBadgeProps {
  tag: string
  size?: 'sm' | 'md'
}

export default function TagBadge({ tag, size = 'sm' }: TagBadgeProps) {
  const style = TAG_STYLES[tag] ?? 'bg-gray-100 text-gray-600'
  const label =
    TAG_LABELS[tag] ??
    tag
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')

  const sizeClass = size === 'md' ? 'text-sm px-3 py-1' : 'text-xs px-2.5 py-0.5'

  return (
    <span className={`inline-block font-body font-medium rounded-full ${sizeClass} ${style}`}>
      {label}
    </span>
  )
}
