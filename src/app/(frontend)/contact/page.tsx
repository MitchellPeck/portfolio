import Link from 'next/link'
import './contact.css'

export const revalidate = 60

export const metadata = {
  title: 'Contact',
  description:
    'Get in touch with Mitchell Peck Development for software development, web applications, and professional installation services.',
}

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-hero-badge">Get In Touch</span>
            <h1 className="contact-hero-title">
              Let's Build Something <span className="text-gradient">Amazing</span>
            </h1>
            <p className="contact-hero-description">
              Ready to bring your ideas to life? Whether you need custom software, a web
              application, or professional installation services, we're here to help.
            </p>
          </div>
        </div>
        <div className="contact-hero-bg" />
      </section>

      {/* Contact Options Section */}
      <section className="section contact-options-section">
        <div className="container">
          <div className="contact-grid">
            {/* Start Project CTA */}
            <div className="contact-cta-card">
              <div className="cta-badge">Recommended</div>
              <h2>Start Your Project</h2>
              <p>
                Complete our inquiry form to tell us about your project, timeline, and goals. This
                helps us understand your needs and prepare for our initial conversation.
              </p>

              <a
                href="https://portal.mitchellpeck.com/survey/start/b7f82f16-fbfb-491b-b9aa-8d5722ebb576"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg inquiry-btn"
              >
                Complete Inquiry Form
                <span className="visually-hidden"> (opens in new tab)</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <div className="cta-features">
                <div className="cta-feature">
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
                  <span>Free consultation</span>
                </div>
                <div className="cta-feature">
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
                  <span>No obligation</span>
                </div>
                <div className="cta-feature">
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
                  <span>5-minute form</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-info-card">
              <div className="card-header">
                <div className="card-icon">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h2>Contact Information</h2>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="contact-details-text">
                    <h3>Email</h3>
                    <a href="mailto:me@mitchellpeck.com" className="contact-link">
                      me@mitchellpeck.com
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div className="contact-details-text">
                    <h3>Phone</h3>
                    <a href="tel:4045281122" className="contact-link">
                      (404) 528-1122
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="contact-details-text">
                    <h3>Location</h3>
                    <span className="contact-text">Atlanta, Georgia</span>
                  </div>
                </div>
              </div>

              <div className="response-time">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Typical response within 24-48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="section expect-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What to Expect</span>
            <h2 className="section-title">Our Process After You Reach Out</h2>
            <p className="section-description">
              Here's what happens when you submit an inquiry or contact us directly.
            </p>
          </div>

          <div className="expect-grid">
            <div className="expect-card">
              <div className="expect-number">1</div>
              <h3>Initial Response</h3>
              <p>
                We'll review your inquiry and respond within 24-48 hours to schedule a discovery
                call.
              </p>
            </div>

            <div className="expect-card">
              <div className="expect-number">2</div>
              <h3>Discovery Call</h3>
              <p>
                A 30-minute call to discuss your project in detail, understand your goals, and
                answer any questions.
              </p>
            </div>

            <div className="expect-card">
              <div className="expect-number">3</div>
              <h3>Proposal & Estimate</h3>
              <p>
                We'll prepare a detailed proposal outlining scope, timeline, and investment for your
                project.
              </p>
            </div>

            <div className="expect-card">
              <div className="expect-number">4</div>
              <h3>Kickoff</h3>
              <p>
                Once approved, we'll schedule a kickoff meeting to align on details and begin work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Quick Links */}
      <section className="section services-links-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Services</span>
            <h2 className="section-title">How Can We Help?</h2>
          </div>

          <div className="services-links-grid">
            <Link href="/services" className="service-link-card">
              <div className="service-link-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3>Development Services</h3>
              <p>Custom software, web apps, mobile apps, and API development.</p>
              <span className="service-link-arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>

            <Link href="/prosystems" className="service-link-card service-link-card-alt">
              <div className="service-link-icon service-link-icon-alt">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3>ProSystems Installation</h3>
              <p>Network, security, A/V, and automotive installation services.</p>
              <span className="service-link-arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>

            <Link href="/pricing" className="service-link-card">
              <div className="service-link-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>Pricing & Packages</h3>
              <p>View our pricing tiers and service packages.</p>
              <span className="service-link-arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>

            <Link href="/work" className="service-link-card">
              <div className="service-link-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3>Our Portfolio</h3>
              <p>See examples of our past projects and client work.</p>
              <span className="service-link-arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
