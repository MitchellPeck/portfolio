import React from 'react'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import '../globals.css'
import './main.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mitchell Peck Development',
    template: '%s | Mitchell Peck Development',
  },
  description: 'Delivering intelligent solutions—smarter tech, smarter timing, smarter outcomes.',
  openGraph: {
    siteName: 'Mitchell Peck Development',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

interface SocialLink {
  platform: string
  url: string
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch site settings for logo and social links
  let logoUrl: string | null = null
  let logoAltUrl: string | null = null
  let socialLinks: SocialLink[] = []
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

    if (siteSettings?.branding?.logo && typeof siteSettings.branding.logo === 'object') {
      logoUrl = siteSettings.branding.logo.url || null
    }
    if (siteSettings?.branding?.logoAlt && typeof siteSettings.branding.logoAlt === 'object') {
      logoAltUrl = siteSettings.branding.logoAlt.url || null
    }
    if (siteSettings?.socialLinks && Array.isArray(siteSettings.socialLinks)) {
      socialLinks = siteSettings.socialLinks.flatMap((link) =>
        link?.platform && link?.url ? [{ platform: link.platform, url: link.url }] : [],
      )
    }
  } catch (error) {
    // Site settings not available, use fallback
    console.error('Failed to fetch site settings:', error)
  }

  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="site-wrapper">
          <Header logoUrl={logoUrl} logoAltUrl={logoAltUrl} />
          <main id="main-content" className="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer
            logoUrl={logoUrl}
            logoAltUrl={logoAltUrl}
            socialLinks={socialLinks}
            currentYear={new Date().getFullYear()}
          />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
