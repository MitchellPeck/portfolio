import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import './prosystems.css'

export const revalidate = 60

export const metadata = {
  title: 'ProSystems',
  description:
    'MPD ProSystems provides professional home automation, networking, security, audio/video, and automotive installation services using open-source platforms like Home Assistant.',
}

// Static service data for ProSystems
const prosystemsServices = [
  {
    category: 'Home Automation',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    description: 'Smart home solutions using open-source platforms—designed for existing homes with minimal or no new wiring.',
    services: [
      { title: 'Home Assistant Setup', description: 'Local-first smart home hub with powerful automations, dashboards, and no cloud dependency.' },
      { title: 'Zigbee & Z-Wave Networks', description: 'Wireless mesh networks for sensors, switches, and smart devices—no new wiring required.' },
      { title: 'MQTT & Local Integration', description: 'Connect DIY devices, ESPHome sensors, and third-party gear through local protocols.' },
      { title: 'Lighting Control', description: 'Smart switches, dimmers, and bulbs with scene control and voice integration.' },
      { title: 'Climate Automation', description: 'Smart thermostats, sensors, and automated HVAC control for comfort and efficiency.' },
      { title: 'Voice & App Control', description: 'Integration with Apple HomeKit, Google Home, and Alexa—all controlled locally.' },
    ],
  },
  {
    category: 'Internet & Networking',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    services: [
      { title: 'Wi-Fi Design', description: 'Pro-grade mesh systems and coverage optimization for homes and businesses.' },
      { title: 'Hardwired Networks', description: 'Ethernet drops, terminations, and structured cabling throughout your space.' },
      { title: 'Rack & Equipment Setup', description: 'Clean rack builds with proper cable management and labeling.' },
    ],
  },
  {
    category: 'Security Systems',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    services: [
      { title: 'Camera Systems', description: 'PoE/IP cameras with NVR setup and reliable local storage.' },
      { title: 'Smart Locks & Sensors', description: 'Access control and motion detection with app integration.' },
      { title: 'Remote Monitoring', description: 'Mobile app setup for 24/7 access to your security system.' },
    ],
  },
  {
    category: 'Audio / Video',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
    services: [
      { title: 'TV Mounting', description: 'Professional mounting with cable concealment and clean finish.' },
      { title: 'Surround Sound', description: 'Multi-zone audio, soundbars, receivers, and speaker installation.' },
      { title: 'Projector Setup', description: 'Home theater projectors with screens and proper calibration.' },
    ],
  },
  {
    category: 'Car Installations',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
        <path d="M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
        <path d="M5 17H3v-6l2-5h10l2 5v6h-2" />
        <path d="M5 17h6m4 0h2" />
        <line x1="5" y1="11" x2="17" y2="11" />
      </svg>
    ),
    services: [
      { title: 'Head Units', description: 'Apple CarPlay, Android Auto, and aftermarket stereo installation.' },
      { title: 'Audio Upgrades', description: 'Speakers, amplifiers, and subwoofer systems with custom enclosures.' },
      { title: 'Cameras & Dash Cams', description: 'Backup cameras, dash cams, and OEM-integration friendly installs.' },
    ],
  },
]

export default async function ProSystemsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch site settings for ProSystems logo
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  const prosystemsLogo = siteSettings?.prosystemsBranding?.logo
  const prosystemsLogoAlt = siteSettings?.prosystemsBranding?.logoAlt
  const logoUrl = prosystemsLogo && typeof prosystemsLogo === 'object' && 'url' in prosystemsLogo ? prosystemsLogo.url : null
  const logoAltUrl = prosystemsLogoAlt && typeof prosystemsLogoAlt === 'object' && 'url' in prosystemsLogoAlt ? prosystemsLogoAlt.url : null

  return (
    <div className="prosystems-page">
      {/* Hero Section */}
      <section className="prosystems-hero">
        <div className="container">
          <div className="prosystems-hero-content">
            {(logoUrl || logoAltUrl) ? (
              <div className="prosystems-hero-logo">
                {/* Dark mode logo (default) */}
                <Image
                  src={logoAltUrl || logoUrl || ''}
                  alt="ProSystems"
                  width={280}
                  height={80}
                  priority
                  className="prosystems-logo-dark"
                  style={{ width: 'auto', height: 'auto' }}
                />
                {/* Light mode logo (only if both exist) */}
                {logoUrl && logoAltUrl && (
                  <Image
                    src={logoUrl}
                    alt="ProSystems"
                    width={280}
                    height={80}
                    priority
                    className="prosystems-logo-light"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                )}
              </div>
            ) : (
              <span className="prosystems-hero-badge">ProSystems</span>
            )}
            <h1 className="prosystems-hero-title">
              Professional <span className="text-gradient-blue">Installation Services</span>
            </h1>
            <p className="prosystems-hero-description">
              Expert installation for home automation, networking, security, audio/video, and automotive systems.
              Open-source solutions, clean installs, reliable results.
            </p>
          </div>
        </div>
        <div className="prosystems-hero-bg" />
      </section>

      {/* Services Section */}
      <section className="prosystems-section">
        <div className="container">

          <div className="prosystems-categories">
            {prosystemsServices.map((category, idx) => (
              <div key={idx} className="prosystems-category">
                <div className="category-header category-header-blue">
                  <div className="category-icon category-icon-blue">{category.icon}</div>
                  <div className="category-header-text">
                    <h2 className="category-title">{category.category}</h2>
                    {'description' in category && category.description && (
                      <p className="category-description">{category.description}</p>
                    )}
                  </div>
                </div>

                <div className="prosystems-grid">
                  {category.services.map((service, serviceIdx) => (
                    <div key={serviceIdx} className="prosystems-card">
                      <div className="prosystems-card-content">
                        <h3 className="prosystems-card-title">{service.title}</h3>
                        <p className="prosystems-card-description">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="prosystems-section prosystems-section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-badge section-badge-blue">Our Process</span>
            <h2 className="section-title">How We Work</h2>
            <p className="section-description">
              A straightforward process that ensures quality results every time.
            </p>
          </div>

          <div className="prosystems-process-steps">
            <div className="prosystems-process-step">
              <div className="prosystems-process-number">01</div>
              <h3>Consult</h3>
              <p>We review your goals, space, and constraints to understand exactly what you need.</p>
            </div>
            <div className="prosystems-process-connector" />
            <div className="prosystems-process-step">
              <div className="prosystems-process-number">02</div>
              <h3>Design</h3>
              <p>We propose the right gear, layout, and timeline with clear, upfront pricing.</p>
            </div>
            <div className="prosystems-process-connector" />
            <div className="prosystems-process-step">
              <div className="prosystems-process-number">03</div>
              <h3>Install</h3>
              <p>Professional installation with clean cable management, labeling, and thorough testing.</p>
            </div>
            <div className="prosystems-process-connector" />
            <div className="prosystems-process-step">
              <div className="prosystems-process-number">04</div>
              <h3>Support</h3>
              <p>We stand by our work and help you get the most out of your new systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="prosystems-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge section-badge-blue">About</span>
            <h2 className="section-title">Why ProSystems</h2>
            <p className="section-description">
              The same engineering mindset from software, applied to the physical world.
            </p>
          </div>

          <div className="prosystems-about-grid">
            <div className="prosystems-about-card">
              <div className="prosystems-about-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Clean Installs</h3>
              <p>Neat cable management, labeled terminations, and professional finish on every job.</p>
            </div>
            <div className="prosystems-about-card">
              <div className="prosystems-about-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>Upfront Pricing</h3>
              <p>Consultative scoping with straightforward, honest pricing before work begins.</p>
            </div>
            <div className="prosystems-about-card">
              <div className="prosystems-about-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3>Vendor Agnostic</h3>
              <p>We recommend the right gear for your needs, not tied to any single brand.</p>
            </div>
            <div className="prosystems-about-card">
              <div className="prosystems-about-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              </div>
              <h3>Ongoing Support</h3>
              <p>Post-install support and tuning to ensure everything works perfectly long-term.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="prosystems-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Tell us about your project and get a free consultation. We'll get back to you within 48 hours.
            </p>
            <div className="cta-buttons">
              <a
                href="https://portal.mitchellpeck.com/survey/start/96e76e1d-afc4-47db-b337-f84023805e2e"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-prosystems"
              >
                Start Your Project
                <span className="visually-hidden"> (opens in new tab)</span>
              </a>
              <Link href="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
            <div className="cta-contact-info">
              <a href="mailto:prosystems@mitchellpeck.com" className="cta-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                prosystems@mitchellpeck.com
              </a>
              <a href="tel:4045281122" className="cta-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                (404) 528-1122
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
