'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="section">
      <div className="container text-center">
        <h1>Something went wrong</h1>
        <p className="text-muted" style={{ maxWidth: '32rem', margin: '0 auto 2rem' }}>
          Sorry — an unexpected error occurred while loading this page. You can try again, or head
          back to the homepage.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={reset} className="btn btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </section>
  )
}
