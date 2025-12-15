import React from 'react'
import Link from 'next/link'
import './team.css'

export const revalidate = 60

export const metadata = {
  title: 'Our Team | Mitchell Peck Development',
  description:
    'Meet the team behind Mitchell Peck Development and ProSystems. We bring expertise in software development and professional installation services.',
}

// Static team data
const teamMembers = [
  {
    name: 'Mitchell Peck',
    role: 'Founder & Lead Developer',
    type: 'founder',
    bio: 'Full-stack developer with over 10 years of experience building software solutions. Passionate about creating clean, efficient code and delivering exceptional results for clients.',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL'],
    social: {
      github: 'https://github.com/mitchellpeck',
      linkedin: 'https://linkedin.com/in/mitchellpeck',
    },
  },
]

const collaborators = [
  {
    name: 'Expert Network',
    role: 'Specialized Contractors',
    type: 'network',
    bio: 'We work with a network of trusted specialists for specific project needs, including UI/UX designers, mobile developers, and DevOps engineers.',
    specialties: ['UI/UX Design', 'Mobile Development', 'DevOps', 'Security'],
  },
]

const values = [
  {
    title: 'Quality First',
    description: 'We never compromise on code quality or craftsmanship. Every project receives our full attention and expertise.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: 'Clear Communication',
    description: 'We believe in transparency and keeping you informed every step of the way. No surprises, just progress.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Client Success',
    description: 'Your success is our success. We measure our work by the results it delivers for your business.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
  },
  {
    title: 'Continuous Learning',
    description: 'Technology evolves rapidly. We stay current with the latest tools and best practices to deliver modern solutions.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
]

export default function TeamPage() {
  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <div className="container">
          <div className="team-hero-content">
            <span className="team-hero-badge">Our Team</span>
            <h1 className="team-hero-title">
              Meet the <span className="text-gradient">Team</span>
            </h1>
            <p className="team-hero-description">
              Dedicated professionals committed to delivering exceptional software and installation
              services for your business.
            </p>
          </div>
        </div>
        <div className="team-hero-bg" />
      </section>

      {/* Founder Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Leadership</span>
            <h2 className="section-title">Meet the Founder</h2>
          </div>

          <div className="founder-grid">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="founder-card">
                <div className="founder-avatar">
                  <div className="founder-avatar-placeholder">
                    <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                <div className="founder-info">
                  <h3 className="founder-name">{member.name}</h3>
                  <p className="founder-role">{member.role}</p>
                  <p className="founder-bio">{member.bio}</p>

                  <div className="founder-skills">
                    <h4>Core Skills:</h4>
                    <div className="skills-tags">
                      {member.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="founder-social">
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="social-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators Section */}
      <section className="team-section team-section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Collaborators</span>
            <h2 className="section-title">Extended Team</h2>
            <p className="section-description">
              We partner with trusted specialists to deliver comprehensive solutions.
            </p>
          </div>

          <div className="collaborators-grid">
            {collaborators.map((collab, idx) => (
              <div key={idx} className="collaborator-card">
                <div className="collaborator-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="collaborator-name">{collab.name}</h3>
                <p className="collaborator-role">{collab.role}</p>
                <p className="collaborator-bio">{collab.bio}</p>
                <div className="collaborator-specialties">
                  {collab.specialties.map((specialty, sIdx) => (
                    <span key={sIdx} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-description">
              The principles that guide our work and relationships with clients.
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="team-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Work Together?</h2>
            <p className="cta-description">
              Let's discuss your project and see how we can help your business grow.
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
