import React from 'react'
import Link from 'next/link'
import './industries.css'

export const revalidate = 60

export const metadata = {
  title: 'Industries',
  description:
    'We serve businesses across various industries with custom software and installation services.',
}

// Static industry data
const industries = [
  {
    name: 'E-Commerce',
    description:
      'Custom online stores, inventory management, and payment processing solutions that drive sales and simplify operations.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    featured: true,
    challenges: ['Payment security', 'Inventory sync', 'Conversion optimization'],
  },
  {
    name: 'Small Business',
    description:
      'Affordable, scalable solutions for growing businesses—websites, automation, and digital tools that save time and money.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    featured: true,
    challenges: ['Budget constraints', 'Time management', 'Scaling operations'],
  },
  {
    name: 'Real Estate',
    description:
      'Property management platforms, listing websites, and CRM solutions for agents and brokerages.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    featured: true,
    challenges: ['MLS integration', 'Lead management', 'Mobile-first design'],
  },
  {
    name: 'Professional Services',
    description:
      'Client portals, booking systems, and workflow automation for service businesses.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    featured: false,
    challenges: ['Client communication', 'Scheduling complexity', 'Document management'],
  },
  {
    name: 'Hospitality',
    description:
      'Reservation systems, guest management, and property technology solutions.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    featured: false,
    challenges: ['Booking management', 'Guest experience', 'Multi-property coordination'],
  },
  {
    name: 'Residential',
    description:
      'Smart home integration, security systems, and home entertainment installations.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    featured: false,
    challenges: ['Home automation', 'Network reliability', 'Aesthetic installation'],
  },
]

const featuredIndustries = industries.filter((i) => i.featured)
const otherIndustries = industries.filter((i) => !i.featured)

export default function IndustriesPage() {
  return (
    <div className="industries-page">
      {/* Hero Section */}
      <section className="industries-hero">
        <div className="container">
          <div className="industries-hero-content">
            <span className="industries-hero-badge">Industries</span>
            <h1 className="industries-hero-title">
              Solutions for <span className="text-gradient">Every Sector</span>
            </h1>
            <p className="industries-hero-description">
              We bring deep industry expertise to deliver solutions that address your specific
              challenges and drive meaningful results.
            </p>
          </div>
        </div>
        <div className="industries-hero-bg" />
      </section>

      {/* Featured Industries */}
      <section className="industries-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Expertise</span>
            <h2 className="section-title">Featured Industries</h2>
            <p className="section-description">
              Deep experience in these key sectors allows us to deliver exceptional results.
            </p>
          </div>

          <div className="featured-industries-grid">
            {featuredIndustries.map((industry, idx) => (
              <div key={idx} className="industry-card industry-card-featured">
                <div className="industry-icon">{industry.icon}</div>
                <h3 className="industry-name">{industry.name}</h3>
                <p className="industry-description">{industry.description}</p>
                <div className="industry-challenges">
                  <h4>Key Challenges We Solve:</h4>
                  <ul>
                    {industry.challenges.map((challenge, cIdx) => (
                      <li key={cIdx}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="industry-cta">
                  Discuss Your Project
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="industries-section industries-section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">More Industries</span>
            <h2 className="section-title">We Also Serve</h2>
          </div>

          <div className="industries-grid">
            {otherIndustries.map((industry, idx) => (
              <div key={idx} className="industry-card">
                <div className="industry-icon">{industry.icon}</div>
                <h3 className="industry-name">{industry.name}</h3>
                <p className="industry-description">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="industries-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Don't See Your Industry?</h2>
            <p className="cta-description">
              We work with businesses across all sectors. Contact us to discuss how we can help
              your specific needs.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary">
                Get in Touch
              </Link>
              <Link href="/services" className="btn btn-secondary">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
