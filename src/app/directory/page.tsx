'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { curricula } from '@/data/curricula'
import { stateLaws } from '@/data/stateLaws'
import CurriculumCard from '@/components/CurriculumCard'
import type { FaithOrientation, RequirementLevel } from '@/types'

type FaithFilter = FaithOrientation | 'all'
type BudgetFilter = 'all' | 'budget-friendly' | 'mid-range' | 'premium'
type ApproachFilter = 'all' | 'classical' | 'charlotte-mason' | 'literature-based' | 'traditional' | 'online' | 'unit-study'
type RequirementFilter = RequirementLevel | 'all'

const REQUIREMENT_LABELS: Record<RequirementLevel, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

const REQUIREMENT_STYLES: Record<RequirementLevel, string> = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

export default function DirectoryPage() {
  const [search, setSearch] = useState('')
  const [faith, setFaith] = useState<FaithFilter>('all')
  const [budget, setBudget] = useState<BudgetFilter>('all')
  const [approach, setApproach] = useState<ApproachFilter>('all')
  const [stateFilter, setStateFilter] = useState<RequirementFilter>('all')
  const [stateSearch, setStateSearch] = useState('')

  // Scroll to state laws if hash present
  useEffect(() => {
    if (window.location.hash === '#state-laws') {
      const el = document.getElementById('state-laws')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const filtered = useMemo(() => {
    return curricula.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) &&
          !c.description.toLowerCase().includes(search.toLowerCase()) &&
          !c.approach.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (faith !== 'all' && c.faithOrientation !== faith) return false
      if (budget !== 'all' && !c.tags.includes(budget)) return false
      if (approach !== 'all' && !c.tags.includes(approach)) return false
      return true
    })
  }, [search, faith, budget, approach])

  const filteredStates = useMemo(() => {
    return stateLaws.filter((s) => {
      if (stateFilter !== 'all' && s.requirementLevel !== stateFilter) return false
      if (stateSearch && !s.state.toLowerCase().includes(stateSearch.toLowerCase()) &&
          !s.abbreviation.toLowerCase().includes(stateSearch.toLowerCase())) {
        return false
      }
      return true
    })
  }, [stateFilter, stateSearch])

  const clearFilters = () => {
    setSearch('')
    setFaith('all')
    setBudget('all')
    setApproach('all')
  }

  const hasActiveFilters = search || faith !== 'all' || budget !== 'all' || approach !== 'all'

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-forest-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="font-heading text-4xl text-white mb-3">
            Homeschool Curriculum Directory
          </h1>
          <p className="font-body text-green-200 text-lg max-w-2xl">
            Browse all {curricula.length} reviewed curricula, filtered by your family&apos;s needs.
            Not sure where to start?{' '}
            <Link href="/quiz" className="text-white underline hover:no-underline">
              Take the free quiz →
            </Link>
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-cream-darker sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search curricula..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-cream-darker font-body text-sm focus:outline-none focus:border-forest bg-cream"
              />
            </div>

            {/* Faith filter */}
            <select
              value={faith}
              onChange={(e) => setFaith(e.target.value as FaithFilter)}
              className="px-3 py-2.5 rounded-lg border border-cream-darker font-body text-sm bg-cream focus:outline-none focus:border-forest"
            >
              <option value="all">All Faith Orientations</option>
              <option value="christian">Christian</option>
              <option value="catholic">Catholic</option>
              <option value="secular">Secular</option>
              <option value="neutral">Faith-Neutral</option>
            </select>

            {/* Budget filter */}
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value as BudgetFilter)}
              className="px-3 py-2.5 rounded-lg border border-cream-darker font-body text-sm bg-cream focus:outline-none focus:border-forest"
            >
              <option value="all">All Budgets</option>
              <option value="budget-friendly">Under $500/yr</option>
              <option value="mid-range">$500–$1,500/yr</option>
              <option value="premium">Over $1,500/yr</option>
            </select>

            {/* Approach filter */}
            <select
              value={approach}
              onChange={(e) => setApproach(e.target.value as ApproachFilter)}
              className="px-3 py-2.5 rounded-lg border border-cream-darker font-body text-sm bg-cream focus:outline-none focus:border-forest"
            >
              <option value="all">All Approaches</option>
              <option value="classical">Classical</option>
              <option value="charlotte-mason">Charlotte Mason</option>
              <option value="literature-based">Literature-Based</option>
              <option value="traditional">Traditional</option>
              <option value="online">Online</option>
              <option value="unit-study">Unit Study</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="font-body text-sm text-forest hover:text-forest-dark transition-colors px-2"
              >
                Clear filters ✕
              </button>
            )}
          </div>

          <p className="font-body text-xs text-gray-400 mt-2">
            Showing {filtered.length} of {curricula.length} curricula
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-heading text-2xl text-gray-400 mb-3">No curricula found</p>
            <p className="font-body text-gray-500 mb-4">Try adjusting your filters.</p>
            <button onClick={clearFilters} className="btn-secondary text-sm">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((curriculum) => (
              <CurriculumCard key={curriculum.id} curriculum={curriculum} compact />
            ))}
          </div>
        )}
      </div>

      {/* State Laws Table */}
      <div id="state-laws" className="bg-cream-dark border-t border-cream-darker">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-8">
            <h2 className="font-heading text-3xl text-forest-dark mb-3">
              Homeschool Requirements by State
            </h2>
            <p className="font-body text-gray-600 max-w-2xl">
              A summary of homeschool notification, testing, and portfolio requirements for all 50
              states. Always verify current requirements with your state&apos;s Department of Education.
            </p>
          </div>

          {/* State filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search state..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-cream-darker font-body text-sm focus:outline-none focus:border-forest bg-white"
              />
            </div>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value as RequirementFilter)}
              className="px-3 py-2.5 rounded-lg border border-cream-darker font-body text-sm bg-white focus:outline-none focus:border-forest"
            >
              <option value="all">All Requirement Levels</option>
              <option value="low">Low (Most Friendly)</option>
              <option value="medium">Medium</option>
              <option value="high">High (Most Regulated)</option>
            </select>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-4 flex-wrap">
            {(['low', 'medium', 'high'] as RequirementLevel[]).map((level) => (
              <div key={level} className="flex items-center gap-2">
                <span className={`text-xs font-body font-medium px-2.5 py-0.5 rounded-full ${REQUIREMENT_STYLES[level]}`}>
                  {REQUIREMENT_LABELS[level]}
                </span>
                <span className="font-body text-xs text-gray-500">
                  {level === 'low' ? 'Minimal oversight' : level === 'medium' ? 'Some requirements' : 'Significant requirements'}
                </span>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-cream-darker shadow-sm">
            <table className="w-full bg-white text-sm">
              <thead className="bg-cream-dark border-b border-cream-darker">
                <tr>
                  <th className="text-left px-4 py-3 font-body font-semibold text-gray-600">State</th>
                  <th className="text-left px-4 py-3 font-body font-semibold text-gray-600">Level</th>
                  <th className="text-left px-4 py-3 font-body font-semibold text-gray-600 hidden sm:table-cell">Notice</th>
                  <th className="text-left px-4 py-3 font-body font-semibold text-gray-600 hidden sm:table-cell">Testing</th>
                  <th className="text-left px-4 py-3 font-body font-semibold text-gray-600 hidden md:table-cell">Portfolio</th>
                  <th className="text-left px-4 py-3 font-body font-semibold text-gray-600 hidden lg:table-cell">Teacher Req.</th>
                  <th className="px-4 py-3 font-body font-semibold text-gray-600">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-darker">
                {filteredStates.map((law) => (
                  <tr key={law.abbreviation} className="hover:bg-cream/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-body font-medium text-gray-800">{law.state}</div>
                      <div className="font-body text-xs text-gray-400 mt-0.5 hidden sm:block">{law.requirements.slice(0, 80)}…</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-body text-xs font-medium px-2.5 py-1 rounded-full ${REQUIREMENT_STYLES[law.requirementLevel]}`}>
                        {REQUIREMENT_LABELS[law.requirementLevel]}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={law.noticeRequired ? 'text-amber-600' : 'text-green-600'}>
                        {law.noticeRequired ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={law.assessmentRequired ? 'text-amber-600' : 'text-green-600'}>
                        {law.assessmentRequired ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={law.portfolioRequired ? 'text-amber-600' : 'text-green-600'}>
                        {law.portfolioRequired ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-gray-600 hidden lg:table-cell max-w-[160px]">
                      {law.teacherQualifications}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={law.reportingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-xs text-forest hover:text-forest-light underline"
                      >
                        Official Site →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-body text-xs text-gray-400 mt-4">
            Last verified January 2025. Homeschool laws change — always confirm current requirements
            with your state Department of Education before beginning.
          </p>
        </div>
      </div>
    </div>
  )
}
