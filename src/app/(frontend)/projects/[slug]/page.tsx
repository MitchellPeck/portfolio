import React from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import config from '@/payload.config'
import type { Metadata, ResolvingMetadata } from 'next'
import { extractTextFromRichText } from '@/app/(frontend)/components/richTextUtils'
import RichText from '@/app/(frontend)/components/RichText'
import type { Media, Project } from '../../../../payload-types'
import './project-detail.css'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

// Force dynamic rendering - required for dynamic routes without generateStaticParams
export const dynamic = 'force-dynamic'
// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

// Generate metadata for the page dynamically
export async function generateMetadata(
  { params }: ProjectPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch published project by slug
  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      published: { equals: true },
    },
    limit: 1,
  })

  const project = docs[0] as Project | undefined

  if (!project) {
    return { title: 'Project Not Found' }
  }

  // Use SEO fields if available, otherwise fall back to description
  const metaTitle = project.seo?.metaTitle || `${project.title} | Mitchell Peck`
  const metaDescription = project.seo?.metaDescription || (
    typeof project.description === 'string'
      ? project.description
      : extractTextFromRichText(project.description)
  ).substring(0, 160)

  // Get OG image URL if available
  const ogImage = project.seo?.ogImage && typeof project.seo.ogImage === 'object' && 'url' in project.seo.ogImage
    ? project.seo.ogImage.url
    : undefined

  return {
    title: metaTitle,
    description: metaDescription,
    ...(ogImage && {
      openGraph: {
        images: [{ url: ogImage }],
      },
    }),
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch published project by slug
  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      published: { equals: true },
    },
    limit: 1,
  })

  const project = docs[0] as Project | undefined

  if (!project) {
    notFound()
  }

  // Get image URL
  const featuredImage = project.featuredImage as Media
  const imageUrl =
    typeof featuredImage === 'object' && 'url' in featuredImage ? featuredImage.url : ''

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
              <h3 className="badge-group-title">Project Info</h3>
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
                    <h3 className="tech-group-title">{techType}</h3>
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
                alt={project.title}
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
                const galleryImage = item.image as Media
                const galleryImageUrl =
                  typeof galleryImage === 'object' && 'url' in galleryImage ? galleryImage.url : ''

                return galleryImageUrl ? (
                  <div key={index} className="gallery-item">
                    <Image
                      src={galleryImageUrl}
                      alt={item.caption || `${project.title} gallery image ${index + 1}`}
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
