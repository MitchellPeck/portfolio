import React from 'react'
import Link from 'next/link'
import './pricing.css'

export const revalidate = 60

export const metadata = {
  title: 'Pricing | Mitchell Peck Development',
  description: 'Custom project-based pricing for software development services.',
}

// What's included in every project
const projectInclusions = [
  'Custom design tailored to your brand',
  'Mobile responsive development',
  'SEO optimization',
  'Testing and quality assurance',
  'Deployment and launch support',
  'Post-launch support period',
]

// Project types we work on
const projectTypes = [
  {
    name: 'Websites & Landing Pages',
    description: 'Marketing sites, portfolios, landing pages, and business websites.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    name: 'Web Applications',
    description: 'Custom web apps, dashboards, portals, and SaaS platforms.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: 'Mobile Applications',
    description: 'iOS, Android, and cross-platform mobile app development.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    name: 'Custom Software',
    description: 'API development, integrations, automation, and enterprise solutions.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
]

export default function PricingPage() {
  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-hero-content">
            <span className="pricing-hero-badge">Pricing</span>
            <h1 className="pricing-hero-title">
              Project-Based <span className="text-gradient">Pricing</span>
            </h1>
            <p className="pricing-hero-description">
              Every project is unique. We provide custom quotes based on your specific requirements,
              scope, and timeline—ensuring you only pay for what you need.
            </p>
          </div>
        </div>
        <div className="pricing-hero-bg" />
      </section>

      {/* Custom Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Mitchell Peck Development</span>
            <h2 className="section-title">Custom Project Quotes</h2>
            <p className="section-description">
              All development pricing is per-project, tailored to your specific specs and requirements.
            </p>
          </div>

          {/* Main Quote Card */}
          <div className="custom-pricing-card">
            <div className="custom-pricing-header">
              <div className="custom-pricing-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="custom-pricing-title">
                <h3>Custom Quote</h3>
                <p>Based on your project specifications</p>
              </div>
            </div>

            <div className="custom-pricing-body">
              <div className="pricing-factors">
                <h4>What determines your quote:</h4>
                <ul>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Project scope and complexity
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    Features and functionality required
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Timeline and delivery schedule
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Integration and third-party requirements
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    Ongoing support and maintenance needs
                  </li>
                </ul>
              </div>

              <div className="pricing-inclusions">
                <h4>Every project includes:</h4>
                <ul>
                  {projectInclusions.map((item, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="custom-pricing-footer">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Request a Quote
              </Link>
              <p className="pricing-note">Free consultation • No obligation • Response within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* ProSystems Banner */}
      <section className="pricing-section pricing-section-alt">
        <div className="container">
          <div className="prosystems-pricing-banner">
            <div className="prosystems-banner-content">
              <span className="section-badge section-badge-alt">ProSystems</span>
              <h2 className="section-title">Installation Services</h2>
              <p className="section-description">
                Professional installation for home automation, networking, security, audio/video, and automotive
                systems. Pricing varies based on project scope and requirements.
              </p>
              <div className="prosystems-pricing-info">
                <div className="pricing-info-item">
                  <span className="info-label">Hourly Rate</span>
                  <span className="info-value">From $150/hr</span>
                </div>
                <div className="pricing-info-item">
                  <span className="info-label">Project Based</span>
                  <span className="info-value">From $500</span>
                </div>
                <div className="pricing-info-item">
                  <span className="info-label">Custom Systems</span>
                  <span className="info-value">Quote</span>
                </div>
              </div>
              <Link href="/prosystems" className="btn btn-prosystems">
                View ProSystems Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pricing-faq">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">FAQ</span>
            <h2 className="section-title">Common Questions</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do you determine project pricing?</h3>
              <p>
                We assess each project individually based on scope, complexity, required features,
                timeline, and any integrations needed. After a discovery call, we provide a detailed
                quote with a full breakdown.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you offer payment plans?</h3>
              <p>
                Yes! We typically structure payments as 50% upfront and 50% upon completion.
                For larger projects, we can arrange milestone-based payments.
              </p>
            </div>
            <div className="faq-item">
              <h3>What happens if the scope changes?</h3>
              <p>
                We understand projects evolve. Any scope changes are discussed transparently,
                and we provide updated quotes before proceeding with additional work.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you offer ongoing support?</h3>
              <p>
                Every project includes a post-launch support period. We also offer monthly
                retainer options for ongoing maintenance, updates, and enhancements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Discuss Your Project?</h2>
            <p className="cta-description">
              Tell us about your project and we'll provide a custom quote within 24 hours.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
