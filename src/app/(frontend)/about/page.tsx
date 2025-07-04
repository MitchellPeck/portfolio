import RichText from '@/app/(frontend)/components/RichText'
import type { Media } from '@/payload-types'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import './about.css'

export const metadata = {
  title: 'About | Mitchell Peck Development',
  description: 'Learn about my background, skills, and experience',
}

// Add interface definitions for experience and education with logoImage
interface ExperienceItem {
  company: string
  position: string
  type: string
  name?: string | null
  logoImage?: Media | string | number | null
  startDate: string
  endDate?: string | null
  current?: boolean | null
  id?: string | null
}

interface EducationItem {
  institution: string
  degree: string
  fieldOfStudy?: string | null
  logoImage?: Media | string | number | null
  startDate: string
  endDate?: string | null
  current?: boolean | null
  description?: string | null
  id?: string | null
}

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch about page content
  const { docs: aboutPages } = await payload.find({ collection: 'about', limit: 1 })

  const aboutPage = aboutPages[0]

  // Get image URL safely
  const profileImageUrl =
    aboutPage.profileImage &&
    typeof aboutPage.profileImage === 'object' &&
    'url' in aboutPage.profileImage
      ? aboutPage.profileImage.url
      : '/placeholder-profile.jpg' // Use a placeholder image as fallback

  // Get resume URL safely
  const resumeUrl =
    aboutPage.resumeFile &&
    typeof aboutPage.resumeFile === 'object' &&
    'url' in aboutPage.resumeFile
      ? aboutPage.resumeFile.url
      : ''

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1 className="page-title">About Me</h1>
        </div>
      </section>

      <section className="section profile-section">
        <div className="container">
          <div className="profile-content">
            <div className="profile-image-container">
              {profileImageUrl && (
                <Image
                  src={profileImageUrl}
                  alt={aboutPage.name}
                  width={400}
                  height={400}
                  className="profile-image"
                />
              )}
            </div>

            <div className="profile-info">
              <h2 className="profile-name">{aboutPage.name}</h2>
              <p className="profile-title">{aboutPage.title}</p>

              <div className="profile-bio">
                <RichText content={aboutPage.biography} className="biography" />
              </div>

              {aboutPage.socialLinks && aboutPage.socialLinks.length > 0 && (
                <div className="profile-social">
                  {aboutPage.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-link ${link.platform}`}
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}

              {resumeUrl && (
                <div className="profile-resume">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                  >
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {aboutPage.skills && aboutPage.skills.length > 0 && (
        <section className="section skills-section">
          <div className="container">
            <h2 className="section-title">Skills</h2>

            <div className="skills-container">
              {aboutPage.skills.map((skillCategory, index) => (
                <div key={index} className="skill-category">
                  <h3 className="skill-category-title">{skillCategory.category}</h3>
                  <ul className="skill-list">
                    {(skillCategory as any).skillItems &&
                      (skillCategory as any).skillItems.map((skill: any, skillIndex: number) => (
                        <li key={skillIndex} className="skill-item">
                          {skill.skill}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {aboutPage.experience && aboutPage.experience.length > 0 && (
        <section className="section experience-section">
          <div className="container">
            <h2 className="section-title">Experience</h2>

            <div className="timeline">
              {aboutPage.experience.map((exp: ExperienceItem, index) => {
                const startDate = new Date(exp.startDate)
                const endDate = exp.endDate ? new Date(exp.endDate) : null

                const startYear = startDate.getFullYear()
                const endYear = endDate ? endDate.getFullYear() : 'Present'

                // Get logo image URL safely
                const logoUrl =
                  exp.logoImage && typeof exp.logoImage === 'object' && 'url' in exp.logoImage
                    ? exp.logoImage.url
                    : ''

                return (
                  <div key={index} className="timeline-item">
                    {/* <div className="timeline-marker"></div> */}
                    <div className="timeline-header">
                      {logoUrl ? (
                        <div className="timeline-image">
                          <Image
                            src={logoUrl}
                            alt={exp.company}
                            style={{ objectFit: 'cover' }}
                            fill={true}
                            sizes="60px"
                          />
                        </div>
                      ) : (
                        <div className="timeline-image">
                          <div className="timeline-image-placeholder">
                            {exp.company.substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                      )}
                      <div className="timeline-company">
                        <h3 className="timeline-title">{exp.company}</h3>
                        <h4 className="timeline-subtitle">{exp.position}</h4>
                        <h4 className="timeline-subtitle">
                          {exp.type} {exp.name ? `- ${exp.name}` : ''}
                        </h4>
                        <div className="timeline-date">
                          {startYear} - {endYear}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {aboutPage.education && aboutPage.education.length > 0 && (
        <section className="section education-section">
          <div className="container">
            <h2 className="section-title">Education</h2>

            <div className="timeline">
              {aboutPage.education.map((edu: EducationItem, index) => {
                const startDate = new Date(edu.startDate)
                const endDate = edu.endDate ? new Date(edu.endDate) : null

                const startYear = startDate.getFullYear()
                const endYear = endDate ? endDate.getFullYear() : 'Present'

                // Get logo image URL safely
                const logoUrl =
                  edu.logoImage && typeof edu.logoImage === 'object' && 'url' in edu.logoImage
                    ? edu.logoImage.url
                    : ''

                return (
                  <div key={index} className="timeline-item">
                    {/* <div className="timeline-marker"></div> */}
                    <div className="timeline-header">
                      {logoUrl ? (
                        <div className="timeline-image">
                          <Image
                            src={logoUrl}
                            alt={edu.institution}
                            style={{ objectFit: 'cover' }}
                            fill={true}
                            sizes="60px"
                          />
                        </div>
                      ) : (
                        <div className="timeline-image">
                          <div className="timeline-image-placeholder">
                            {edu.institution.substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                      )}
                      <div className="timeline-company">
                        <h3 className="timeline-title">{edu.institution}</h3>
                        {edu.fieldOfStudy && (
                          <p className="timeline-subtitle">{edu.fieldOfStudy}</p>
                        )}
                        <h4 className="timeline-subtitle">{edu.degree}</h4>
                        <div className="timeline-date">
                          {startYear} - {endYear}
                        </div>
                      </div>
                    </div>
                    {edu.description && (
                      <div className="timeline-description">
                        <RichText content={edu.description} className="education-description" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section contact-cta-section">
        <div className="container">
          <div className="contact-cta">
            <h2 className="contact-cta-title">Let's Work Together</h2>
            <p className="contact-cta-description">
              Interested in collaborating or have a project in mind?
            </p>
            <Link href="mailto:me@mitchellpeck.com" className="button button-primary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
