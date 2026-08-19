import React from 'react'
import Link from 'next/link'
import '../legal.css'

export const metadata = {
  title: 'Terms of Service',
  description: 'The terms that apply when you use the Mitchell Peck Development website.',
}

export default function TermsPage() {
  return (
    <div className="legal-page">
      <h1>Terms of Service</h1>
      <p className="legal-updated">Last updated: August 19, 2026</p>

      <p>
        Welcome to the Mitchell Peck Development website. By using this site you agree to these
        terms.
      </p>

      <h2>Use of this site</h2>
      <p>
        This site presents our services, portfolio, and writing. You may browse and share links to
        it freely. You may not attempt to disrupt the site, probe it for vulnerabilities without
        permission, or misrepresent its content as your own.
      </p>

      <h2>Content and portfolio work</h2>
      <p>
        The content on this site — text, images, and case studies — belongs to Mitchell Peck
        Development or the clients it describes and is shown here with permission. Client names and
        project details are illustrative of past work, not an offer of identical results.
      </p>

      <h2>Engagements</h2>
      <p>
        Information on this site, including pricing, is provided as general guidance and does not
        constitute a binding offer. Actual client engagements are governed by the written proposal
        and agreement for that project.
      </p>

      <h2>No warranties</h2>
      <p>
        This site is provided &ldquo;as is.&rdquo; We work to keep it accurate and available but do
        not guarantee it will be error-free or uninterrupted.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{' '}
        <a href="mailto:me@mitchellpeck.com">me@mitchellpeck.com</a> or use the{' '}
        <Link href="/contact">contact page</Link>.
      </p>
    </div>
  )
}
