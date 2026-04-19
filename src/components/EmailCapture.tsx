'use client'

import { useState } from 'react'

interface EmailCaptureProps {
  answersParam: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function EmailCapture({ answersParam }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), answers: answersParam }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(data?.error ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setMessage('Check your inbox — your matches are on the way!')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-8 text-center">
        <div className="text-4xl mb-3">📬</div>
        <h3 className="font-heading text-2xl text-forest-dark mb-2">
          You&apos;re all set!
        </h3>
        <p className="font-body text-gray-700">{message}</p>
        <p className="font-body text-xs text-gray-500 mt-3">
          Don&apos;t see it? Check your spam folder, or add our email to your contacts.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-cream-darker rounded-2xl p-6 sm:p-8">
      <div className="text-center mb-5">
        <div className="text-3xl mb-2">💌</div>
        <h3 className="font-heading text-2xl text-forest-dark mb-2">
          Save Your Results
        </h3>
        <p className="font-body text-gray-600 max-w-md mx-auto">
          Enter your email and we&apos;ll send your top 3 matches so you can come back to them later.
          No spam — just your results.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="flex-1 px-4 py-3 rounded-xl border border-cream-darker font-body text-base focus:outline-none focus:border-forest bg-cream disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email.trim()}
          className="bg-forest text-cream font-body font-semibold px-6 py-3 rounded-xl hover:bg-forest-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? 'Sending…' : 'Send My Matches →'}
        </button>
      </form>

      {status === 'error' && message && (
        <p className="font-body text-sm text-red-600 text-center mt-3">{message}</p>
      )}

      <p className="font-body text-xs text-gray-400 text-center mt-4">
        We&apos;ll occasionally send curriculum recommendations. Unsubscribe anytime.
      </p>
    </div>
  )
}
