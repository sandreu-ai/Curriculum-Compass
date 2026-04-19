import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest-dark text-green-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl" aria-hidden="true">🧭</span>
              <span className="font-heading text-lg text-white">The Curriculum Compass</span>
            </div>
            <p className="font-body text-sm text-green-200 leading-relaxed">
              Helping homeschool families find the perfect curriculum — for free, in minutes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-body font-semibold text-white text-sm uppercase tracking-wide mb-3">
              Explore
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/quiz', label: 'Take the Quiz' },
                { href: '/directory', label: 'Browse All Curricula' },
                { href: '/directory#state-laws', label: 'State Law Requirements' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-green-300 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-body font-semibold text-white text-sm uppercase tracking-wide mb-3">
              About
            </h3>
            <p className="font-body text-sm text-green-200 leading-relaxed">
              The Curriculum Compass reviews 40+ curricula across every approach, budget, and
              faith orientation. Our matching quiz takes under 5 minutes.
            </p>
            <p className="font-body text-xs text-green-400 mt-3">
              This site may earn affiliate commissions when you purchase curricula through our links — at no cost to you.
            </p>
          </div>
        </div>

        <div className="border-t border-forest pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-green-400">
            © {year} The Curriculum Compass. All rights reserved.
          </p>
          <p className="font-body text-xs text-green-400">
            Curriculum information verified periodically. Always check publisher sites for current pricing.
          </p>
        </div>
      </div>
    </footer>
  )
}
