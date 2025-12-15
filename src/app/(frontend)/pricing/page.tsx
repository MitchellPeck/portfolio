import React from 'react'
import Link from 'next/link'
import './pricing.css'

export const revalidate = 60

export const metadata = {
  title: 'Pricing | Mitchell Peck Development',
  description: 'Transparent pricing for software development services.',
}

// Static pricing data until CMS collections are set up
const mpdPricing = [
  {
    name: 'Starter',
    subtitle: 'Perfect for small projects',
    pricing: { amount: 2500, unit: 'project', displayText: 'Starting at $2,500' },
    features: [
      { feature: 'Single page website or landing page', included: true },
      { feature: 'Mobile responsive design', included: true },
      { feature: 'Basic SEO setup', included: true },
      { feature: 'Contact form integration', included: true },
      { feature: '2 rounds of revisions', included: true },
      { feature: '30-day support', included: true },
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    subtitle: 'Best for growing businesses',
    pricing: { amount: 7500, unit: 'project', displayText: 'Starting at $7,500' },
    features: [
      { feature: 'Multi-page website or web app', included: true },
      { feature: 'Custom design and branding', included: true },
      { feature: 'Advanced SEO optimization', included: true },
      { feature: 'CMS integration', included: true },
      { feature: 'API integrations', included: true },
      { feature: '90-day support', included: true },
    ],
    highlighted: true,
    highlightText: 'Most Popular',
  },
  {
    name: 'Enterprise',
    subtitle: 'For complex solutions',
    pricing: { displayText: 'Custom Quote' },
    features: [
      { feature: 'Full-stack custom development', included: true },
      { feature: 'Scalable architecture', included: true },
      { feature: 'Third-party integrations', included: true },
      { feature: 'Database design & optimization', included: true },
      { feature: 'Dedicated project manager', included: true },
      { feature: '12-month support', included: true },
    ],
    highlighted: false,
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
              Transparent <span className="text-gradient">Pricing</span>
            </h1>
            <p className="pricing-hero-description">
              Clear, upfront pricing with no hidden fees. Choose a package that fits your needs
              or contact us for a custom quote.
            </p>
          </div>
        </div>
        <div className="pricing-hero-bg" />
      </section>

      {/* MPD Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Mitchell Peck Development</span>
            <h2 className="section-title">Development Packages</h2>
            <p className="section-description">
              Flexible pricing options for websites, web applications, and custom software.
            </p>
          </div>

          <div className="pricing-grid">
            {mpdPricing.map((plan, idx) => (
              <div
                key={idx}
                className={`pricing-card ${plan.highlighted ? 'pricing-card-highlighted' : ''}`}
              >
                {plan.highlighted && plan.highlightText && (
                  <div className="pricing-badge">{plan.highlightText}</div>
                )}
                <h3 className="pricing-name">{plan.name}</h3>
                <p className="pricing-subtitle">{plan.subtitle}</p>
                <div className="pricing-amount">
                  {plan.pricing.displayText || `$${plan.pricing.amount}`}
                </div>

                <ul className="pricing-features">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className={feature.included ? 'included' : 'not-included'}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      {feature.feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} pricing-cta`}
                >
                  Get Started
                </Link>
              </div>
            ))}
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
                Professional installation for networking, security, audio/video, and automotive
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
              <h3>What's included in the project price?</h3>
              <p>
                All packages include design, development, testing, and deployment. We provide
                detailed quotes so you know exactly what you're paying for.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you offer payment plans?</h3>
              <p>
                Yes! We typically structure payments as 50% upfront and 50% upon completion.
                Custom arrangements are available for larger projects.
              </p>
            </div>
            <div className="faq-item">
              <h3>What if my project doesn't fit a package?</h3>
              <p>
                No problem! Contact us for a custom quote. We'll assess your needs and provide
                transparent pricing tailored to your specific requirements.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you offer ongoing support?</h3>
              <p>
                Absolutely. All packages include initial support, and we offer monthly retainer
                options for ongoing maintenance, updates, and enhancements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
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
