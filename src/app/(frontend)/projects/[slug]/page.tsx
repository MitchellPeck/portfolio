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
  params: { slug: string }
}

// Generate metadata for the page dynamically
export async function generateMetadata(
  { params }: ProjectPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch project by slug
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: params.slug } },
    limit: 1,
  })

  const project = docs[0] as Project | undefined

  if (!project) {
    return { title: 'Project Not Found' }
  }

  // Extract description for meta description
  const description =
    typeof project.description === 'string'
      ? project.description
      : extractTextFromRichText(project.description)

  return { title: `${project.title} | Mitchell Peck`, description: description.substring(0, 160) }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch project by slug
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: params.slug } },
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
