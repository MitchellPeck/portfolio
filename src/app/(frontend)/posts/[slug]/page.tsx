import React, { cache } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import config from '@/payload.config'
import RichText from '@/app/(frontend)/components/RichText'
import './post-detail.css'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60

// Fetch once per request — shared by generateMetadata and the page
const getPost = cache(async (slug: string) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      published: { equals: true },
    },
    limit: 1,
  })

  return posts[0] ?? null
})

// Generate metadata for the page
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    }
  }

  // Get image URL safely
  let imageUrl = ''
  let imageAlt = post.title
  if (
    post.featuredImage &&
    typeof post.featuredImage === 'object' &&
    post.featuredImage.url
  ) {
    imageUrl = post.featuredImage.url
    imageAlt = post.featuredImage.alt || post.title
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: imageAlt,
            },
          ]
        : [],
      type: 'article',
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  // If post not found, show 404
  if (!post) {
    return notFound()
  }

  // Format the date
  const date = new Date(post.publishedDate)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)

  // Safely get the featured image
  const featuredImage =
    post.featuredImage && typeof post.featuredImage === 'object' ? post.featuredImage : null

  return (
    <div className="post-detail-page">
      <section className="post-hero">
        <div className="container">
          <div className="post-breadcrumbs">
            <Link href="/posts">Blog</Link> / <span>{post.title}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>

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
        </div>
      </section>

      <section className="post-content-section">
        <div className="container">
          <div className="post-featured-image">
            <Image
              src={featuredImage?.url || '/placeholder-image.jpg'}
              alt={featuredImage?.alt || post.title}
              width={250}
              height={250}
              priority
              className="featured-image"
            />
          </div>

          <div className="post-content">
            <RichText content={post.content} className="post-body" />
          </div>
        </div>
      </section>

      <section className="post-footer">
        <div className="container">
          <Link href="/posts" className="back-to-posts">
            ← Back to Blog
          </Link>
        </div>
      </section>
    </div>
  )
}
