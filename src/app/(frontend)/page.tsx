import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import { Project, Post, Home as HomePage, Consulting } from '../../payload-types'
import ProjectCard from './components/ProjectCard'
import GridStabilizer from './components/GridStabilizer'
import WordCloud from './components/WordCloud'
import './page.css'
import config from '@/payload.config'
import RichText from '@/app/(frontend)/components/RichText'

export default async function Home() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch home page content
  const { docs: homePages } = await payload.find({ collection: 'home', limit: 1 })

  const homePage = homePages[0] as HomePage

  // Fetch featured projects
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: { featured: { equals: true } },
    limit: homePage?.featuredProjectsLimit || 3,
    sort: '-createdAt',
  })

  // Fetch featured consulting
  const { docs: consultingProjects } = await payload.find({
    collection: 'consulting',
    where: { featured: { equals: true } },
    limit: homePage?.featuredConsultingLimit || 3,
    sort: '-createdAt',
  })

  // Fetch recent posts
  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: homePage?.featuredPostsLimit || 3,
    sort: '-publishedDate',
  })

  // Placeholder image for fallbacks
  const placeholderImage = '/placeholder-image.jpg'

  return (
    <>
      {/* Home page background gradient */}
      <div className="home-page-background" />
      
      {/* Word cloud background */}
      <WordCloud />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{homePage?.title || 'Mitchell Peck Development'}</h1>
            <p className="hero-heading">
              {homePage?.heroHeading ||
                'Delivering intelligent solutions... smarter tech, smarter timing, smarter outcomes.'}
            </p>
            <div className="hero-subtitle">
              {homePage?.heroSubheading && (
                <RichText content={homePage.heroSubheading} className="hero-subtitle-content" />
              )}
            </div>
            {homePage?.ctaText && homePage?.ctaLink && (
              <Link href={homePage.ctaLink} className="button button-primary hero-cta">
                {homePage.ctaText}
              </Link>
            )}
          </div>
          {homePage?.heroImage &&
            typeof homePage.heroImage === 'object' &&
            'url' in homePage.heroImage &&
            homePage.heroImage.url && (
              <div className="hero-image">
                <Image src={homePage.heroImage.url} alt="Hero" width={500} height={500} priority />
              </div>
            )}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section projects-section">
        <div className="container">
          <h2 className="section-title">
            {homePage?.featuredProjectsHeading || 'Featured Projects'}
          </h2>

          <div className="projects-grid-wrapper">
            <GridStabilizer>
              <div className="projects-grid">
                {projects.map((project: Project) => {
                  // Safely extract the image URL
                  const imageUrl =
                    project.featuredImage &&
                    typeof project.featuredImage === 'object' &&
                    'url' in project.featuredImage &&
                    project.featuredImage.url
                      ? project.featuredImage.url
                      : placeholderImage

                  // Safely extract technologies
                  const technologies = project.technologies
                    ? project.technologies
                        .filter(
                          (tech) =>
                            tech &&
                            typeof tech === 'object' &&
                            'technology' in tech &&
                            tech.technology,
                        )
                        .map((tech) => tech.technology as string)
                    : []

                  return (
                    <div key={project.id} className="project-item">
                      <ProjectCard
                        status={project.status}
                        title={project.title}
                        slug={project.slug}
                        imageUrl={imageUrl}
                        technologies={technologies}
                        overview={project.overview}
                      />
                    </div>
                  )
                })}
              </div>
            </GridStabilizer>
          </div>

          <div className="section-footer">
            <Link href="/projects" className="button button-outline">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Consulting Section */}
      {consultingProjects.length > 0 && (
        <section className="section consulting-section">
          <div className="container">
            <h2 className="section-title">
              {homePage?.featuredConsultingHeading || 'Featured Consulting'}
            </h2>

            <div className="consulting-grid-wrapper">
              <GridStabilizer>
                <div className="consulting-grid">
                  {consultingProjects.map((project: Consulting) => {
                    // Safely extract the image URL
                    const imageUrl =
                      project.featuredImage &&
                      typeof project.featuredImage === 'object' &&
                      'url' in project.featuredImage &&
                      project.featuredImage.url
                        ? project.featuredImage.url
                        : placeholderImage

                    // Safely extract technologies
                    const technologies = project.technologies
                      ? project.technologies
                          .filter(
                            (tech) =>
                              tech &&
                              typeof tech === 'object' &&
                              'technology' in tech &&
                              tech.technology,
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
                          subtitle={`Client: ${project.client}`}
                          linkPath="/consulting"
                          overview={project.overview}
                        />
                      </div>
                    )
                  })}
                </div>
              </GridStabilizer>
            </div>

            <div className="section-footer">
              <Link href="/consulting" className="button button-outline">
                View All Consulting
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      {posts.length > 0 && (
        <section className="section posts-section">
          <div className="container">
            <h2 className="section-title">{homePage?.featuredPostsHeading || 'Recent Posts'}</h2>

            <div className="posts-grid-wrapper">
              <GridStabilizer>
                <div className="posts-grid">
                  {posts.map((post: Post) => {
                    // Safely extract the image URL
                    const imageUrl =
                      post.featuredImage &&
                      typeof post.featuredImage === 'object' &&
                      'url' in post.featuredImage &&
                      post.featuredImage.url
                        ? post.featuredImage.url
                        : placeholderImage

                    return (
                      <article key={post.id} className="post-card">
                        <Link href={`/posts/${post.slug}`} className="post-image">
                          <Image src={imageUrl} alt={post.title} width={400} height={225} />
                        </Link>
                        <div className="post-content">
                          <h3 className="post-title">
                            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="post-excerpt">{post.excerpt}</p>
                          <Link href={`/posts/${post.slug}`} className="post-read-more">
                            Read More
                          </Link>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </GridStabilizer>
            </div>

            <div className="section-footer">
              <Link href="/posts" className="button button-outline">
                View All Posts
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
