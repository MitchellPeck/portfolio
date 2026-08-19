import React, { cache } from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import config from '@/payload.config'
import type { Metadata } from 'next'
import { extractTextFromRichText } from '@/app/(frontend)/components/richTextUtils'
import RichText from '@/app/(frontend)/components/RichText'
import type { Project } from '../../../../payload-types'
import './project-detail.css'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

// Fetch once per request — shared by generateMetadata and the page
const getProject = cache(async (slug: string): Promise<Project | null> => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      published: { equals: true },
    },
    limit: 1,
  })

  return docs[0] ?? null
})

// Generate metadata for the page dynamically
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  // Use SEO fields if available, otherwise fall back to description
  const metaTitle = project.seo?.metaTitle || project.title
  const metaDescription = project.seo?.metaDescription || (
    typeof project.description === 'string'
      ? project.description
      : extractTextFromRichText(project.description)
  ).substring(0, 160)

  // OG image: explicit SEO image first, then the featured image
  const ogImageSource =
    project.seo?.ogImage && typeof project.seo.ogImage === 'object'
      ? project.seo.ogImage
      : project.featuredImage && typeof project.featuredImage === 'object'
        ? project.featuredImage
        : null
  const ogImage = ogImageSource?.url || undefined

  return {
    title: metaTitle,
    description: metaDescription,
    ...(ogImage && {
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: [{ url: ogImage, alt: ogImageSource?.alt || project.title }],
      },
    }),
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  // Get image URL (featuredImage may be an unpopulated ID or null)
  const featuredImage =
    project.featuredImage && typeof project.featuredImage === 'object'
      ? project.featuredImage
      : null
  const imageUrl = featuredImage?.url || ''

  return (
    <div className="project-detail-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/projects">← Back to Projects</Link>
        </div>

        <header className="project-header">
          <h1 className="project-title">{project.title}</h1>

          <div className="project-badges">
            <div className="badge-group">
              <h2 className="badge-group-title">Project Info</h2>
              <div className="badge-group-items">
                {project.status && (
                  <span className={`project-badge ${getStatusColorClass(project.status)}`}>
                    {project.status}
                  </span>
                )}
                {project.featured && <span className="project-badge featured">Featured</span>}
              </div>
            </div>
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div className="project-technologies">
              {/* Group technologies by type */}
              {(() => {
                // Create an object to group technologies by type
                const techGroups: Record<string, Array<(typeof project.technologies)[0]>> = {}

                // Group technologies by their type
                project.technologies.forEach((tech) => {
                  if (tech?.technology && tech.type) {
                    if (!techGroups[tech.type]) {
                      techGroups[tech.type] = []
                    }
                    techGroups[tech.type].push(tech)
                  }
                })

                // Render each group as a column
                return Object.entries(techGroups).map(([techType, techs]) => (
                  <div key={techType} className="tech-group">
                    <h2 className="tech-group-title">{techType}</h2>
                    <div className="tech-group-items">
                      {techs.map((tech, index) =>
                        tech.link ? (
                          <a
                            key={index}
                            href={tech.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-tech-tag"
                          >
                            {tech.technology}
                          </a>
                        ) : (
                          <span key={index} className="project-tech-tag">
                            {tech.technology}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                ))
              })()}
            </div>
          )}
        </header>

        <div className="project-featured-image">
          {imageUrl && (
            <div className="image-container">
              <Image
                src={imageUrl}
                alt={featuredImage?.alt || project.title}
                width={500}
                height={500}
                className="featured-image"
              />
            </div>
          )}
        </div>

        <div className="project-content">
          <div className="project-overview">
            <h2>Project Overview</h2>
            <RichText content={project.overview} className="project-overview-content" />

            <div className="project-description">
              <h3>About this Project</h3>
              <RichText content={project.description} className="project-description-content" />
            </div>
          </div>

          <div className="project-info">
            {(project.startDate || project.completedDate) && (
              <div className="project-dates">
                {project.startDate && (
                  <div className="project-date">
                    <span className="date-label">Started</span>
                    <span className="date-value">
                      {new Date(project.startDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                {project.completedDate && (
                  <div className="project-date">
                    <span className="date-label">Completed</span>
                    <span className="date-value">
                      {new Date(project.completedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="project-links">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Live Project
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link github"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="project-gallery">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {project.gallery.map((item, index) => {
                const galleryImage =
                  item.image && typeof item.image === 'object' ? item.image : null
                const galleryImageUrl = galleryImage?.url || ''

                return galleryImageUrl ? (
                  <div key={index} className="gallery-item">
                    <Image
                      src={galleryImageUrl}
                      alt={
                        galleryImage?.alt ||
                        item.caption ||
                        `${project.title} gallery image ${index + 1}`
                      }
                      width={600}
                      height={400}
                      className="gallery-image"
                    />
                    {item.caption && <p className="gallery-caption">{item.caption}</p>}
                  </div>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function getStatusColorClass(status: string): string {
  switch (status) {
    case 'Planned':
      return 'status-planned'
    case 'In Progress':
      return 'status-in-progress'
    case 'Paused':
      return 'status-paused'
    case 'Completed':
      return 'status-completed'
    case 'Completed - Actively Maintained':
      return 'status-maintained'
    case 'Completed - Sunset':
      return 'status-sunset'
    default:
      return ''
  }
}
