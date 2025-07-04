import React from 'react'
import { getPayload } from 'payload'
import Link from 'next/link'
import Image from 'next/image'
import './posts.css'
import config from '@/payload.config'

export const metadata = {
  title: 'Blog | Mitchell Peck',
  description: 'Thoughts, tutorials, and insights about web development and technology',
}

export default async function PostsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch all posts
  const { docs: posts } = await payload.find({ collection: 'posts', sort: '-publishedDate' })

  return (
    <div className="posts-page">
      <section className="posts-hero">
        <div className="container">
          <h1 className="page-title">Blog</h1>
          <p className="page-description">
            Thoughts, tutorials, and insights about web development and technology
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="posts-list">
            {posts.map((post) => {
              const date = new Date(post.publishedDate)
              const formattedDate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }).format(date)

              return (
                <article key={post.id} className="post-item">
                  <div className="post-image-container">
                    <Link href={`/posts/${post.slug}`} className="post-image">
                      <Image
                        src={post.featuredImage.url}
                        alt={post.title}
                        width={500}
                        height={500}
                      />
                    </Link>
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <time dateTime={post.publishedDate}>{formattedDate}</time>
                      {post.categories && post.categories.length > 0 && (
                        <div className="post-categories">
                          {post.categories.map((cat, index) => (
                            <span key={index} className="post-category">
                              {cat.category}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <h2 className="post-title">
                      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <Link href={`/posts/${post.slug}`} className="post-read-more">
                      Read Article
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
