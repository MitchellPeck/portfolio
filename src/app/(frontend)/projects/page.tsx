import React from 'react'
import { getPayload } from 'payload'
import ProjectCard from '../components/ProjectCard'
import './projects.css'
import config from '@/payload.config'
import type { Project } from '@/payload-types'

export const metadata = {
  title: 'Projects | Mitchell Peck Development',
  description: 'Browse through our development projects and case studies',
}

export default async function ProjectsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch all projects
  const { docs: allProjects } = await payload.find({
    collection: 'projects',
    sort: '-publishedDate',
    limit: 100,
  })

  // Separate featured and non-featured projects
  const featuredProjects = allProjects.filter((project: Project) => project.featured === true)
  const regularProjects = allProjects.filter((project: Project) => project.featured !== true)

  // Combine them with featured projects first
  const sortedProjects = [...featuredProjects, ...regularProjects]

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="container">
          <h1 className="page-title">Projects</h1>
          <p className="page-description">
            A collection of our latest work in web development, design, and more.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="projects-grid">
            {sortedProjects.map((project: Project) => {
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
                <div key={project.id} className="project-item">
                  <ProjectCard
                    title={project.title}
                    slug={project.slug}
                    imageUrl={imageUrl}
                    technologies={technologies}
                    featured={project.featured === true}
                    linkPath="/projects"
                    status={project.status}
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
