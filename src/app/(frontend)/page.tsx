import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import { Project, Consulting } from '../../payload-types'
import ProjectCard from './components/ProjectCard'
import './page.css'
import config from '@/payload.config'
import heroImage from "../../public/me.png";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

export default async function Home() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch featured published projects
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      published: { equals: true },
      featured: { equals: true },
    },
    limit: 3,
    sort: '-createdAt',
  })

  // Fetch featured published consulting
  const { docs: consultingProjects } = await payload.find({
    collection: 'consulting',
    where: {
      published: { equals: true },
      featured: { equals: true },
    },
    limit: 3,
    sort: '-createdAt',
  })

  const placeholderImage = '/placeholder-image.jpg'

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Welcome to <span className="text-gradient">Mitchell Peck Development</span>
              </h1>
              <p className="hero-heading">
                Delivering intelligent solutions... smarter tech, smarter timing, smarter outcomes.
              </p>
              <div className="hero-subtitle">
                <p>
                  We create practical solutions for everyday challenges in education, small business,
                  and consumer technology, using AI to deliver cutting-edge experiences that find
                  creative ways to increase productivity.
                </p>
                <p>
                  We work with a wide range of technologies: front-end and back-end application
                  development, hardware development, and media technologies.
                </p>
              </div>
              <div className="hero-ctas">
                <Link href="/contact" className="btn btn-primary">
                  Start a Project
                </Link>
                <Link href="/work" className="btn btn-secondary">
                  View Our Work
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <Image
                src={heroImage}
                alt="Mitchell Peck"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="hero-stats">
          <div className="container">
            <div className="stats-bar">
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="section services-overview">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What We Do</span>
            <h2 className="section-title">Services Built for Growth</h2>
            <p className="section-description">
              Two brands, one mission: delivering solutions that drive your business forward.
            </p>
          </div>

          <div className="services-cards">
            <div className="service-overview-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3>Mitchell Peck Development</h3>
              <p>
                Custom software, web applications, mobile apps, and digital solutions built with
                modern technologies and best practices.
              </p>
              <ul className="service-features">
                <li>Web Development</li>
                <li>Software Engineering</li>
                <li>Mobile Applications</li>
                <li>API Development</li>
              </ul>
              <Link href="/services" className="service-link">
                Explore Development Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            <div className="service-overview-card service-overview-card-alt">
              <div className="service-icon service-icon-alt">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3>ProSystems</h3>
              <p>
                Professional installation services for networking, security systems, audio/video,
                and automotive enhancements.
              </p>
              <ul className="service-features">
                <li>Network Installation</li>
                <li>Security Systems</li>
                <li>Audio/Video Setup</li>
                <li>Car Electronics</li>
              </ul>
              <Link href="/prosystems" className="service-link service-link-alt">
                Explore Installation Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      {(projects.length > 0 || consultingProjects.length > 0) && (
        <section className="section work-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Portfolio</span>
              <h2 className="section-title">Featured Projects & Consulting</h2>
              <p className="section-description">
                Recent projects that showcase our expertise and commitment to quality.
              </p>
            </div>

            <div className="work-grid-wrapper">
              <div className="grid-stabilizer">
                <div className="work-grid">
                  {projects.map((project: Project) => {
                    const media =
                      project.featuredImage && typeof project.featuredImage === 'object'
                        ? project.featuredImage
                        : null
                    const imageUrl = media?.url || placeholderImage

                    const technologies = project.technologies
                      ? project.technologies
                          .filter(
                            (tech) =>
                              tech &&
                              typeof tech === 'object' &&
                              'technology' in tech &&
                              tech.technology,
                          )
                          .map((tech) => tech.technology as string)
                      : []

                    return (
                      <div key={`p-${project.id}`} className="work-item">
                        <ProjectCard
                          status={project.status}
                          title={project.title}
                          slug={project.slug}
                          imageUrl={imageUrl || placeholderImage}
                          imageAlt={media?.alt || undefined}
                          technologies={technologies}
                          linkPath="/projects"
                          overview={project.overview}
                        />
                      </div>
                    )
                  })}

                  {consultingProjects.map((project: Consulting) => {
                    const media =
                      project.featuredImage && typeof project.featuredImage === 'object'
                        ? project.featuredImage
                        : null
                    const imageUrl = media?.url || placeholderImage

                    const technologies = project.technologies
                      ? project.technologies
                          .filter(
                            (tech) =>
                              tech &&
                              typeof tech === 'object' &&
                              'technology' in tech &&
                              tech.technology,
                          )
                          .map((tech) => tech.technology as string)
                      : []

                    return (
                      <div key={`c-${project.id}`} className="work-item">
                        <ProjectCard
                          title={project.title}
                          slug={project.slug}
                          imageUrl={imageUrl || placeholderImage}
                          imageAlt={media?.alt || undefined}
                          technologies={technologies}
                          subtitle={`Client: ${project.client}`}
                          linkPath="/consulting"
                          overview={project.overview}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="section-footer">
              <Link href="/work" className="btn btn-secondary">
                View All Work
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Process Preview Section */}
      <section className="section process-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Process</span>
            <h2 className="section-title">How We Work</h2>
            <p className="section-description">
              A proven methodology that ensures quality and results.
            </p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="process-number">01</div>
              <h3>Discovery</h3>
              <p>We learn about your business, goals, and requirements.</p>
            </div>
            <div className="process-connector" />
            <div className="process-step">
              <div className="process-number">02</div>
              <h3>Plan</h3>
              <p>We create a detailed roadmap and technical specification.</p>
            </div>
            <div className="process-connector" />
            <div className="process-step">
              <div className="process-number">03</div>
              <h3>Build</h3>
              <p>We develop your solution with regular updates and demos.</p>
            </div>
            <div className="process-connector" />
            <div className="process-step">
              <div className="process-number">04</div>
              <h3>Launch</h3>
              <p>We deploy and provide ongoing support for your success.</p>
            </div>
          </div>

          <div className="section-footer">
            <Link href="/process" className="btn btn-secondary">
              Learn More About Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Start Your Project?</h2>
              <p className="cta-description">
                Let's discuss how we can help bring your ideas to life. Get in touch for a free
                consultation.
              </p>
              <div className="cta-buttons">
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Get in Touch
                </Link>
                <Link href="/pricing" className="btn btn-ghost btn-lg">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
