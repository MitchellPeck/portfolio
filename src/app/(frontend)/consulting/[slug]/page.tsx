import React from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { default as _Image } from 'next/image' // Renamed to avoid unused var warning
import Link from 'next/link'
import { RichText } from '../../components/RichText'
import config from '@/payload.config'
import type { Metadata, ResolvingMetadata } from 'next'
import type { Consulting } from '@/payload-types'
import './consulting-detail.css'

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Find the consulting project by slug
  const { docs } = await payload.find({
    collection: 'consulting',
    where: {
      slug: {
        equals: params.slug,
      },
    },
  })

  if (!docs || docs.length === 0) {
    return {
      title: 'Consulting Project Not Found',
    }
  }

  // Get a plain text description for meta
  let description = 'Consulting project details'
  try {
    if (docs[0].description && typeof docs[0].description === 'object') {
      // For rich text object
      description = 'Consulting for ' + docs[0].client
    }
  } catch (_error) {
    // Fallback if there's an error parsing the description
  }

  return {
    title: `${docs[0].title} | Consulting | Mitchell Peck`,
    description,
  }
}

export default async function ConsultingDetailPage({ params }: { params: { slug: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Find the consulting project by slug
  const { docs } = await payload.find({
    collection: 'consulting',
    where: {
      slug: {
        equals: params.slug,
      },
    },
  })

  if (!docs || docs.length === 0) {
    return notFound()
  }

  const project: Consulting = docs[0]

  // Safely extract the image URL
  const imageUrl =
    project.featuredImage &&
    typeof project.featuredImage === 'object' &&
    'url' in project.featuredImage &&
    project.featuredImage.url
      ? project.featuredImage.url
      : '/placeholder-image.jpg'

  return (
    <div className="consulting-detail-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/consulting">← Back to Consulting</Link>
        </div>

        <div className="consulting-header">
          <h1 className="consulting-title">{project.title}</h1>

          {project.featured && (
            <div className="consulting-badges">
              <div className="badge-group">
                <h3 className="badge-group-title">Project Info</h3>
                <div className="badge-group-items">
                  <span className="consulting-badge featured">Featured</span>
                </div>
              </div>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="consulting-technologies">
              {/* Group technologies by type */}
              {(() => {
                // Create an object to group technologies by type
                const techGroups: Record<string, Array<(typeof project.technologies)[0]>> = {}

                // Group technologies by their type
                project.technologies.forEach((tech) => {
                  if (tech?.technology) {
                    const type = tech.type || 'Other'
                    if (!techGroups[type]) {
                      techGroups[type] = []
                    }
                    techGroups[type].push(tech)
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
                            className="consulting-tech-tag"
                          >
                            {tech.technology}
                          </a>
                        ) : (
                          <span key={index} className="consulting-tech-tag">
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

          <div className="consulting-meta">
            <div className="consulting-client">
              <h4>Client</h4>
              <p>{project.client}</p>
            </div>
          </div>
        </div>

        <div className="consulting-featured-image">
          <div className="image-container">
            <img src={imageUrl} alt={project.title} className="featured-image" />
          </div>
        </div>

        <div className="consulting-content">
          <div className="consulting-overview">
            <h2>Overview</h2>
            <div className="consulting-overview-content">
              <RichText content={project.overview} />
            </div>
          </div>

          <div className="consulting-sidebar"></div>
        </div>

        <div className="consulting-description">
          <h3>Project Details</h3>
          <div className="consulting-description-content">
            <RichText content={project.description} />
          </div>
        </div>
      </div>
    </div>
  )
}
