'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './ProjectCard.css'
import { PayloadRichText, extractTextFromRichText } from './richTextUtils'

type ProjectStatus =
  | 'Planned'
  | 'In Progress'
  | 'Paused'
  | 'Completed'
  | 'Completed - Actively Maintained'
  | 'Completed - Sunset'

interface ProjectCardProps {
  title: string
  slug: string
  imageUrl: string
  technologies: string[]
  featured?: boolean
  subtitle?: string
  linkPath?: string
  status?: ProjectStatus
  overview?: any
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  slug,
  imageUrl,
  technologies,
  featured = false,
  subtitle,
  linkPath = '/projects',
  status,
  overview,
}) => {
  const projectUrl = `${linkPath}/${slug}`

  const overviewText = overview
    ? typeof overview === 'string'
      ? overview
      : extractTextFromRichText(overview)
    : null

  const getStatusColor = (status?: ProjectStatus) => {
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

  return (
    <Link href={projectUrl} className="project-card-wrapper">
      <article className={`project-card ${featured ? 'project-card-featured' : ''}`}>
        <div className="project-card-image">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
          {status && <span className={`status-badge ${getStatusColor(status)}`}>{status}</span>}
          {featured && <span className="featured-badge">Featured</span>}
        </div>
        <div className="project-card-content">
          <h3 className="project-card-title">{title}</h3>
          {subtitle && <p className="project-card-subtitle">{subtitle}</p>}
          {overviewText && <p className="project-card-overview">{overviewText}</p>}
          <div className="project-card-technologies">
            {technologies.map((tech, index) => (
              <span key={index} className="project-card-tech">
                {tech}
              </span>
            ))}
          </div>
          <div className="project-card-actions">
            <span className="project-card-link">View Details</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProjectCard
