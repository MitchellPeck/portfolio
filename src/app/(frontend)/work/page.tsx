import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Project, Consulting } from '@/payload-types'
import ProjectCard from '@/app/(frontend)/components/ProjectCard'
import './work.css'

export const revalidate = 60

export const metadata = {
  title: 'Our Work',
  description:
    'Browse our portfolio of software projects, client work, and case studies showcasing our expertise.',
}

export default async function WorkPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch published projects
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: { published: { equals: true } },
    sort: '-createdAt',
    limit: 100,
  })

  // Fetch published consulting/client work
  const { docs: consultingProjects } = await payload.find({
    collection: 'consulting',
    where: { published: { equals: true } },
    sort: '-createdAt',
    limit: 100,
  })

  // Placeholder image for fallbacks
  const placeholderImage = '/placeholder-image.jpg'

  // Get featured items
  const featuredProjects = projects.filter((p: Project) => p.featured)
  const featuredConsulting = consultingProjects.filter((c: Consulting) => c.featured)

  return (
    <div className="work-page">
      {/* Hero Section */}
      <section className="work-hero">
        <div className="container">
          <div className="work-hero-content">
            <span className="work-hero-badge">Our Work</span>
            <h1 className="work-hero-title">
              Projects That <span className="text-gradient">Deliver Results</span>
            </h1>
            <p className="work-hero-description">
              From custom software solutions to open-source contributions, explore our portfolio
              of work that has helped businesses grow and succeed.
            </p>
          </div>
        </div>
        <div className="work-hero-bg" />
      </section>

      {/* Stats Section */}
      <section className="work-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{projects.length + consultingProjects.length}</span>
              <span className="stat-label">Case Studies Published</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      {(featuredProjects.length > 0 || featuredConsulting.length > 0) && (
        <section className="work-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Work</h2>
              <p className="section-description">
                Highlighted projects that showcase our capabilities and expertise.
              </p>
            </div>

            <div className="work-grid">
              {/* Featured Projects first */}
              {featuredProjects.map((project: Project) => {
                const media =
                  project.featuredImage && typeof project.featuredImage === 'object'
                    ? project.featuredImage
                    : null
                const imageUrl = media?.url || placeholderImage

                const technologies = project.technologies
                  ? project.technologies
                      .filter(
                        (tech) =>
                          tech && typeof tech === 'object' && 'technology' in tech && tech.technology,
                      )
                      .map((tech) => tech.technology as string)
                  : []

                return (
                  <ProjectCard
                    key={`project-${project.id}`}
                    title={project.title}
                    slug={project.slug}
                    imageUrl={imageUrl || placeholderImage}
                    imageAlt={media?.alt || undefined}
                    technologies={technologies}
                    featured={true}
                    status={project.status}
                    linkPath="/projects"
                    overview={project.overview}
                  />
                )
              })}

              {/* Featured Consulting second */}
              {featuredConsulting.map((project: Consulting) => {
                const media =
                  project.featuredImage && typeof project.featuredImage === 'object'
                    ? project.featuredImage
                    : null
                const imageUrl = media?.url || placeholderImage

                const technologies = project.technologies
                  ? project.technologies
                      .filter(
                        (tech) =>
                          tech && typeof tech === 'object' && 'technology' in tech && tech.technology,
                      )
                      .map((tech) => tech.technology as string)
                  : []

                return (
                  <ProjectCard
                    key={`consulting-${project.id}`}
                    title={project.title}
                    slug={project.slug}
                    imageUrl={imageUrl || placeholderImage}
                    imageAlt={media?.alt || undefined}
                    technologies={technologies}
                    featured={true}
                    subtitle={`Client: ${project.client}`}
                    linkPath="/consulting"
                    overview={project.overview}
                  />
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.filter((p: Project) => !p.featured).length > 0 && (
        <section className="work-section work-section-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Projects</h2>
              <p className="section-description">
                Software projects, tools, and applications.
              </p>
            </div>

            <div className="work-grid">
              {projects
                .filter((p: Project) => !p.featured)
                .map((project: Project) => {
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
                    <ProjectCard
                      key={`project-${project.id}`}
                      title={project.title}
                      slug={project.slug}
                      imageUrl={imageUrl || placeholderImage}
                      imageAlt={media?.alt || undefined}
                      technologies={technologies}
                      status={project.status}
                      linkPath="/projects"
                      overview={project.overview}
                    />
                  )
                })}
            </div>

            <div className="section-footer">
              <Link href="/projects" className="btn btn-secondary">
                View All Projects
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Consulting Section */}
      {consultingProjects.filter((c: Consulting) => !c.featured).length > 0 && (
        <section className="work-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Consulting</h2>
              <p className="section-description">
                Custom solutions built for clients across various industries.
              </p>
            </div>

            <div className="work-grid">
              {consultingProjects
                .filter((c: Consulting) => !c.featured)
                .map((project: Consulting) => {
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
                    <ProjectCard
                      key={`consulting-${project.id}`}
                      title={project.title}
                      slug={project.slug}
                      imageUrl={imageUrl || placeholderImage}
                      imageAlt={media?.alt || undefined}
                      technologies={technologies}
                      subtitle={`Client: ${project.client}`}
                      linkPath="/consulting"
                      overview={project.overview}
                    />
                  )
                })}
            </div>

            <div className="section-footer">
              <Link href="/consulting" className="btn btn-secondary">
                View All Consulting
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="work-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Have a Project in Mind?</h2>
            <p className="cta-description">
              Let's discuss how we can help bring your ideas to life.
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
