'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OurSitesDropdown from './OurSitesDropdown'

const links = [
  { href: '/quiz', label: 'Take the Quiz' },
  { href: '/directory', label: 'Browse All' },
  { href: '/blog', label: 'Blog' },
  { href: '/directory#state-laws', label: 'State Laws' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-cream-darker sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-11 h-11 shrink-0">
            <Image
              src="/logo.png"
              alt="The Curriculum Compass"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-base text-forest-dark leading-tight">
              The Curriculum Compass
            </span>
            <span className="font-body text-[10px] text-gray-400 tracking-wide hidden sm:block">
              Guiding your path in education
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
                pathname === href ? 'text-forest' : 'text-gray-600 hover:text-forest'
              }`}
            >
              {label}
            </Link>
          ))}
          <OurSitesDropdown />
          <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            <Link
              href="/quiz"
              className="bg-forest text-cream font-body font-semibold text-sm px-4 py-2 rounded-lg hover:bg-forest-light transition-colors duration-200"
            >
              Find My Curriculum
            </Link>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-forest min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="block w-6 h-0.5 bg-current origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block w-6 h-0.5 bg-current"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="block w-6 h-0.5 bg-current origin-center"
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="md:hidden bg-white border-t border-cream-darker overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center font-body text-sm font-medium text-gray-700 hover:text-forest py-3 min-h-[48px] transition-colors"
                >
                  {label}
                </Link>
              ))}
              <div className="border-t border-cream-darker pt-3 mt-2">
                <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-2">Our Sites</p>
                <a href="https://danielacerrato.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-gray-700 hover:text-forest py-2 transition-colors">
                  🌿 Daniela Cerrato
                </a>
                <a href="https://statehomeschoollaws.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-gray-700 hover:text-forest py-2 transition-colors">
                  📋 State Homeschool Laws
                </a>
              </div>
              <Link
                href="/quiz"
                onClick={() => setMenuOpen(false)}
                className="block bg-forest text-cream font-body font-semibold text-sm px-4 py-3 rounded-lg text-center hover:bg-forest-light transition-colors duration-200 mt-3"
              >
                Find My Curriculum
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
