import React from 'react'
import Link from 'next/link'
import '../legal.css'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Mitchell Peck Development handles the information you share with us.',
}

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: August 19, 2026</p>

      <p>
        Mitchell Peck Development (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website. This
        page explains what information we collect when you visit or contact us, and how we handle
        it.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Contact details you send us.</strong> If you email, call, or complete our project
          inquiry form (hosted on our client portal), we receive the information you choose to
          share — typically your name, contact details, and a description of your project.
        </li>
        <li>
          <strong>Basic usage analytics.</strong> We use Vercel Analytics and Speed Insights to
          understand aggregate site traffic and performance. These tools do not use cookies and do
          not track you across other sites.
        </li>
      </ul>

      <h2>How we use it</h2>
      <p>
        We use the information you share solely to respond to your inquiry, scope and deliver work
        you request, and maintain our business records. We do not sell your information, and we do
        not share it with third parties except the service providers that host this site and our
        client portal.
      </p>

      <h2>Retention and your choices</h2>
      <p>
        We keep inquiry and client records only as long as they are useful for the working
        relationship. You can ask us at any time to see the information we hold about you or to
        delete it — email{' '}
        <a href="mailto:me@mitchellpeck.com">me@mitchellpeck.com</a> and we will take care of it.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, contact us at{' '}
        <a href="mailto:me@mitchellpeck.com">me@mitchellpeck.com</a> or through the{' '}
        <Link href="/contact">contact page</Link>.
      </p>
    </div>
  )
}
