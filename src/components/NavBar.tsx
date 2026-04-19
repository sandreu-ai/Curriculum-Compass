'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function NavBar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/quiz', label: 'Take the Quiz' },
    { href: '/directory', label: 'Browse All' },
    { href: '/directory#state-laws', label: 'State Laws' },
  ]

  return (
    <header className="bg-white border-b border-cream-darker sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl" aria-hidden="true">🧭</span>
          <div>
            <span className="font-heading text-lg text-forest-dark leading-none">
              The Curriculum Compass
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-body text-sm font-medium transition-colors duration-200 ${
                pathname === href
                  ? 'text-forest'
                  : 'text-gray-600 hover:text-forest'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/quiz"
            className="bg-forest text-cream font-body font-semibold text-sm px-4 py-2 rounded-lg hover:bg-forest-light transition-colors duration-200"
          >
            Find My Curriculum
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-forest"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-cream-darker px-4 py-4 space-y-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block font-body text-sm font-medium text-gray-700 hover:text-forest py-1"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/quiz"
            onClick={() => setMenuOpen(false)}
            className="block bg-forest text-cream font-body font-semibold text-sm px-4 py-2.5 rounded-lg text-center hover:bg-forest-light transition-colors duration-200 mt-2"
          >
            Find My Curriculum
          </Link>
        </div>
      )}
    </header>
  )
}
