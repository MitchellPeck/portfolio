import React, { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import '../globals.css'
import './main.css'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingOverlay from './components/LoadingOverlay'

export const metadata = {
  title: 'Mitchell Peck Development',
  description: 'Delivering intelligent solutions—smarter tech, smarter timing, smarter outcomes.',
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
      socialLinks = siteSettings.socialLinks.filter(
        (link): link is SocialLink => !!link?.platform && !!link?.url
      )
    }
  } catch (error) {
    // Site settings not available, use fallback
    console.error('Failed to fetch site settings:', error)
  }

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="site-wrapper">
          <Header logoUrl={logoUrl} logoAltUrl={logoAltUrl} />
          <main className="main-content">
            <Suspense fallback={<LoadingOverlay isLoading={true} />}/>
            {children}
          </main>
          <Footer logoUrl={logoUrl} logoAltUrl={logoAltUrl} socialLinks={socialLinks} />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
