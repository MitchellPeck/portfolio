import React, { cache } from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '../../components/RichText'
import { extractTextFromRichText } from '../../components/richTextUtils'
import config from '@/payload.config'
import type { Metadata } from 'next'
import type { Consulting } from '@/payload-types'
import './consulting-detail.css'

interface ConsultingPageProps {
  params: Promise<{ slug: string }>
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

// Fetch once per request — shared by generateMetadata and the page
const getConsultingProject = cache(async (slug: string): Promise<Consulting | null> => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'consulting',
    where: {
      slug: { equals: slug },
      published: { equals: true },
    },
    limit: 1,
  })

  return docs[0] ?? null
})

export async function generateMetadata({ params }: ConsultingPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getConsultingProject(slug)

  if (!project) {
    return {
      title: 'Consulting Project Not Found',
    }
  }

  // Build a plain-text description from the overview, falling back to the client name
  let description = `Consulting for ${project.client}`
  if (project.overview && typeof project.overview === 'object') {
    const text = extractTextFromRichText(project.overview).trim()
    if (text) {
      description = text.substring(0, 160)
    }
  }

  const featuredImage =
    project.featuredImage && typeof project.featuredImage === 'object'
      ? project.featuredImage
      : null

  return {
    title: project.title,
    description,
    ...(featuredImage?.url && {
      openGraph: {
        title: project.title,
        description,
        images: [{ url: featuredImage.url, alt: featuredImage.alt || project.title }],
      },
    }),
  }
}

export default async function ConsultingDetailPage({ params }: ConsultingPageProps) {
  const { slug } = await params
  const project = await getConsultingProject(slug)

  if (!project) {
    return notFound()
  }

  // Safely extract the featured image (may be an unpopulated ID or null)
  const featuredImage =
    project.featuredImage && typeof project.featuredImage === 'object'
      ? project.featuredImage
      : null
  const imageUrl = featuredImage?.url || '/placeholder-image.jpg'

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
                <h2 className="badge-group-title">Project Info</h2>
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
                    <h2 className="tech-group-title">{techType}</h2>
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
                            <span className="visually-hidden"> (opens in new tab)</span>
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
              <h3>Client</h3>
              <p>{project.client}</p>
            </div>
          </div>
        </div>

        <div className="consulting-featured-image">
          <div className="image-container">
            <Image
              src={imageUrl}
              alt={featuredImage?.alt || project.title}
              width={500}
              height={500}
              className="featured-image"
            />
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
