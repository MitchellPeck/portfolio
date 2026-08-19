import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import './services.css'

export const revalidate = 60

export const metadata = {
  title: 'Services',
  description:
    'Custom software development, web applications, mobile apps, and digital solutions built with modern technologies.',
}

// Static service data until CMS collections are set up
const mpdServices = [
  {
    category: 'Web Development',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    services: [
      { title: 'Custom Websites', description: 'Responsive, modern websites built for performance and user experience.' },
      { title: 'Web Applications', description: 'Full-stack web applications with modern frameworks and best practices.' },
      { title: 'E-Commerce', description: 'Online stores with secure payment processing and inventory management.' },
    ],
  },
  {
    category: 'Software Development',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    services: [
      { title: 'Custom Software', description: 'Tailored solutions to automate and optimize your business processes.' },
      { title: 'API Development', description: 'RESTful APIs and integrations to connect your systems.' },
      { title: 'Database Design', description: 'Efficient, scalable database architecture and optimization.' },
    ],
  },
  {
    category: 'Mobile Development',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    services: [
      { title: 'iOS Apps', description: 'Native iOS applications built with Swift and SwiftUI.' },
      { title: 'Android Apps', description: 'Native Android applications built with Kotlin.' },
      { title: 'Cross-Platform', description: 'React Native apps that work on both iOS and Android.' },
    ],
  },
]

export default async function ServicesPage() {
  // Fetch site settings for ProSystems logo
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  const prosystemsLogo = siteSettings?.prosystemsBranding?.logo
  const prosystemsLogoAlt = siteSettings?.prosystemsBranding?.logoAlt
  const logoUrl = prosystemsLogo && typeof prosystemsLogo === 'object' && 'url' in prosystemsLogo ? prosystemsLogo.url : null
  const logoAltUrl = prosystemsLogoAlt && typeof prosystemsLogoAlt === 'object' && 'url' in prosystemsLogoAlt ? prosystemsLogoAlt.url : null

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content">
            <span className="services-hero-badge">Our Services</span>
            <h1 className="services-hero-title">
              Solutions That <span className="text-gradient">Deliver Results</span>
            </h1>
            <p className="services-hero-description">
              Custom software, web applications, and digital solutions built with modern technologies
              and industry best practices.
            </p>
          </div>
        </div>
        <div className="services-hero-bg" />
      </section>

      {/* MPD Services Section */}
      <section className="services-section">
        <div className="container">

          <div className="services-categories">
            {mpdServices.map((category, idx) => (
              <div key={idx} className="service-category">
                <div className="category-header">
                  <div className="category-icon">{category.icon}</div>
                  <h2 className="category-title">{category.category}</h2>
                </div>

                <div className="services-grid">
                  {category.services.map((service, serviceIdx) => (
                    <div key={serviceIdx} className="service-card">
                      <div className="service-card-content">
                        <h3 className="service-card-title">{service.title}</h3>
                        <p className="service-card-description">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ProSystems Banner */}
      <section className="services-section services-section-alt">
        <div className="container">
          <div className="prosystems-banner">
            <div className="prosystems-banner-content">
              {(logoUrl || logoAltUrl) ? (
                <div className="prosystems-banner-logo">
                  <Image
                    src={logoAltUrl || logoUrl || ''}
                    alt="ProSystems"
                    width={180}
                    height={50}
                    className="prosystems-logo-dark"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  {logoUrl && logoAltUrl && (
                    <Image
                      src={logoUrl}
                      alt="ProSystems"
                      width={180}
                      height={50}
                      className="prosystems-logo-light"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  )}
                </div>
              ) : (
                <span className="section-badge section-badge-alt">ProSystems</span>
              )}
              <h2 className="section-title">Installation Services</h2>
              <p className="section-description">
                Professional installation for home automation, networking, security, audio/video, and automotive
                systems. Clean installs, expert setup, and ongoing support.
              </p>
              <div className="prosystems-services-preview">
                <div className="preview-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Home Automation
                </div>
                <div className="preview-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Networking
                </div>
                <div className="preview-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Security
                </div>
                <div className="preview-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Audio / Video
                </div>
                <div className="preview-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Automotive
                </div>
              </div>
              <Link href="/prosystems" className="btn btn-prosystems">
                Explore ProSystems
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Let's discuss your project and find the perfect solution for your needs.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary">
                Start a Project
              </Link>
              <Link href="/pricing" className="btn btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
