import React from 'react'
import Link from 'next/link'
import './process.css'

export const revalidate = 60

export const metadata = {
  title: 'Our Process | Mitchell Peck Development',
  description:
    'Learn about our proven development process, from initial consultation to deployment and support.',
}

// Static process steps
const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We start by understanding your business, goals, and requirements. This phase includes stakeholder interviews, requirements gathering, and competitive analysis.',
    deliverables: ['Project brief', 'Requirements document', 'Competitive analysis', 'Initial timeline'],
  },
  {
    number: '02',
    title: 'Planning',
    description:
      'With a clear understanding of your needs, we create a detailed roadmap. This includes technical specifications, architecture decisions, and milestone planning.',
    deliverables: ['Technical specification', 'System architecture', 'Project roadmap', 'Detailed estimate'],
  },
  {
    number: '03',
    title: 'Design',
    description:
      'We design the user experience and interface, creating wireframes and visual designs that align with your brand and optimize for user engagement.',
    deliverables: ['Wireframes', 'UI/UX design', 'Design system', 'Prototype'],
  },
  {
    number: '04',
    title: 'Development',
    description:
      'Our team builds your solution using modern technologies and best practices. We work in sprints with regular demos and feedback sessions.',
    deliverables: ['Working software', 'Code documentation', 'Regular updates', 'Demo sessions'],
  },
  {
    number: '05',
    title: 'Testing',
    description:
      'Rigorous testing ensures quality and reliability. We perform unit testing, integration testing, and user acceptance testing before launch.',
    deliverables: ['Test reports', 'Bug fixes', 'Performance optimization', 'Security audit'],
  },
  {
    number: '06',
    title: 'Launch',
    description:
      'We deploy your solution and ensure a smooth launch. This includes environment setup, data migration, and monitoring configuration.',
    deliverables: ['Production deployment', 'Launch checklist', 'Monitoring setup', 'Documentation'],
  },
  {
    number: '07',
    title: 'Support',
    description:
      'Our relationship doesn\'t end at launch. We provide ongoing support, maintenance, and enhancements to ensure continued success.',
    deliverables: ['Bug fixes', 'Performance monitoring', 'Feature updates', 'Technical support'],
  },
]

export default function ProcessPage() {
  return (
    <div className="process-page">
      {/* Hero Section */}
      <section className="process-hero">
        <div className="container">
          <div className="process-hero-content">
            <span className="process-hero-badge">Our Process</span>
            <h1 className="process-hero-title">
              From Idea to <span className="text-gradient">Launch</span>
            </h1>
            <p className="process-hero-description">
              A proven methodology that ensures quality, transparency, and results. Every project
              follows our refined process, tailored to your specific needs.
            </p>
          </div>
        </div>
        <div className="process-hero-bg" />
      </section>

      {/* Process Timeline Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">The Journey</span>
            <h2 className="section-title">How We Work</h2>
            <p className="section-description">
              Each phase builds on the last, ensuring a smooth path from concept to completion.
            </p>
          </div>

          <div className="process-timeline">
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  <div className="step-deliverables">
                    <h4>Deliverables:</h4>
                    <ul>
                      {step.deliverables.map((deliverable, dIdx) => (
                        <li key={dIdx}>
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
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Process Section */}
      <section className="process-why">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Why It Works</span>
            <h2 className="section-title">The Benefits</h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Transparency</h3>
              <p>
                Regular updates and demos keep you informed every step of the way. No surprises,
                just progress.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>Predictability</h3>
              <p>
                Clear milestones and timelines help you plan and budget effectively. We deliver
                on our commitments.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Quality</h3>
              <p>
                Built-in testing and review stages ensure we catch issues early and deliver
                polished results.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Collaboration</h3>
              <p>
                Your input shapes the project at every stage. We work together to achieve the
                best possible outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="process-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Project?</h2>
            <p className="cta-description">
              Let's discuss your needs and create a plan tailored to your goals.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary">
                Start a Project
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
