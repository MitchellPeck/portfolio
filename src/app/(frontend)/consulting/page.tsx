import React from 'react'
import { getPayload } from 'payload'
import ProjectCard from '../components/ProjectCard'
import './consulting.css'
import config from '@/payload.config'
import type { Consulting } from '@/payload-types'

export const metadata = {
  title: 'Consulting | Mitchell Peck Development',
  description: 'Browse through our consulting and professional services',
}

export default async function ConsultingPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch all consulting projects
  const { docs: allConsultingProjects } = await payload.find({
    collection: 'consulting',
    sort: '-publishedDate',
    limit: 100,
  })

  // Separate featured and non-featured consulting projects
  const featuredProjects = allConsultingProjects.filter(
    (project: Consulting) => project.featured === true,
  )
  const regularProjects = allConsultingProjects.filter(
    (project: Consulting) => project.featured !== true,
  )

  // Combine them with featured projects first
  const sortedProjects = [...featuredProjects, ...regularProjects]

  return (
    <div className="consulting-page">
      <section className="consulting-hero">
        <div className="container">
          <h1 className="page-title">Consulting</h1>
          <p className="page-description">
            A collection of our consulting work and professional services for various clients.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="consulting-grid">
            {sortedProjects.map((project: Consulting) => {
              // Safely extract the image URL
              const imageUrl =
                project.featuredImage &&
                typeof project.featuredImage === 'object' &&
                'url' in project.featuredImage &&
                project.featuredImage.url
                  ? project.featuredImage.url
                  : '/placeholder-image.jpg'

              // Safely extract technologies
              const technologies = project.technologies
                ? project.technologies
                    .filter(
                      (tech) =>
                        tech && typeof tech === 'object' && 'technology' in tech && tech.technology,
                    )
                    .map((tech) => tech.technology as string)
                : []

              return (
                <div key={project.id} className="consulting-item">
                  <ProjectCard
                    title={project.title}
                    slug={project.slug}
                    imageUrl={imageUrl}
                    technologies={technologies}
                    featured={project.featured === true}
                    subtitle={`Client: ${project.client}`}
                    linkPath="/consulting"
                    overview={project.overview}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
