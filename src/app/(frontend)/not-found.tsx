import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for could not be found.',
}

export default function NotFound() {
  return (
    <section className="section">
      <div className="container text-center">
        <h1>Page not found</h1>
        <p className="text-muted" style={{ maxWidth: '32rem', margin: '0 auto 2rem' }}>
          The page you were looking for doesn&apos;t exist or may have moved. Try one of these
          instead:
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/work" className="btn btn-secondary">
            View Our Work
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}
