import Image from 'next/image'
import Link from 'next/link'
import './about.css'
import image from "../../../public/me.png"

export const revalidate = 60

export const metadata = {
  title: 'About | Mitchell Peck Development',
  description:
    'Learn about Mitchell Peck Development, our mission, values, and the team behind our software and installation services.',
}

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '2', label: 'Service Lines' },
]

const values = [
  {
    title: 'Quality First',
    description: 'We never cut corners. Every project is built with care, attention to detail, and a commitment to excellence.',
    icon: 'check',
  },
  {
    title: 'Transparency',
    description: "Open communication and honest feedback. You'll always know where your project stands.",
    icon: 'eye',
  },
  {
    title: 'Reliability',
    description: 'We deliver on time, every time. Our clients count on us, and we take that responsibility seriously.',
    icon: 'clock',
  },
  {
    title: 'Innovation',
    description: 'We stay current with the latest technologies and best practices to deliver modern, future-proof solutions.',
    icon: 'layers',
  },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span className="about-hero-badge">About Us</span>
            <h1 className="about-hero-title">
              Building Technology That <span className="text-gradient">Makes a Difference</span>
            </h1>
            <p className="about-hero-description">
              We're a development agency and installation services company dedicated to delivering
              intelligent solutions that help businesses grow and succeed.
            </p>
          </div>
        </div>
        <div className="about-hero-bg" />
      </section>

      {/* Company Overview Section */}
      <section className="section company-section">
        <div className="container">
          <div className="company-grid">
            <div className="company-content">
              <span className="section-badge">Our Mission</span>
              <h2 className="company-title">Smarter Tech, Smarter Outcomes</h2>
              <p className="company-description">
                Mitchell Peck Development was founded with a simple mission: to help businesses
                leverage technology to achieve their goals. We believe that great software should be
                accessible, reliable, and built to last.
              </p>
              <p className="company-description">
                Whether you need a custom web application, mobile app, or professional installation
                services, we bring the same commitment to quality and attention to detail to every
                project.
              </p>
            </div>
            <div className="company-stats">
              {stats.map((stat, index) => (
                <div key={index} className="company-stat">
                  <span className="stat-number">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Values</span>
            <h2 className="section-title">What Drives Us</h2>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon === 'check' && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  )}
                  {value.icon === 'eye' && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                  {value.icon === 'clock' && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  )}
                  {value.icon === 'layers' && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  )}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="section founder-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Leadership</span>
            <h2 className="section-title">Meet the Founder</h2>
          </div>

          <div className="founder-content">
            <div className="founder-image-container">
              <Image
                src={image}
                alt="Mitchell Peck"
                width={400}
                height={400}
                className="founder-image"
              />
            </div>

            <div className="founder-info">
              <h3 className="founder-name">Mitchell Peck</h3>
              <p className="founder-title">Founder & Lead Developer</p>

              <div className="founder-bio">
                <p>
                  Mitchell is a full-stack developer with over 5 years of experience building
                  web applications, mobile apps, and custom software solutions. His background
                  spans education technology, small business solutions, and consumer applications.
                </p>
                <p>
                  With expertise in both software development and hardware installation,
                  Mitchell brings a unique perspective to every project, ensuring solutions
                  are not only technically sound but also practical and user-friendly.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Work Together?</h2>
              <p className="cta-description">
                Let's discuss how we can help bring your ideas to life.
              </p>
              <div className="cta-buttons">
                <Link href="/contact" className="btn btn-primary">
                  Get in Touch
                </Link>
                <Link href="/work" className="btn btn-secondary">
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
