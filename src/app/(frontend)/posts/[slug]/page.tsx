import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import config from '@/payload.config'
import RichText from '@/app/(frontend)/components/RichText'
import './post-detail.css'

interface PostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch the post by slug
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: params.slug } },
    limit: 1,
  })

  const post = posts[0]

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    }
  }

  // Get image URL safely
  let imageUrl = ''
  if (
    post.featuredImage &&
    typeof post.featuredImage === 'object' &&
    'url' in post.featuredImage &&
    post.featuredImage.url
  ) {
    imageUrl = post.featuredImage.url
  }

  return {
    title: `${post.title} | Mitchell Peck's Blog`,
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
              alt: post.title,
            },
          ]
        : [],
      type: 'article',
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch the post by slug
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: params.slug } },
    limit: 1,
  })

  const post = posts[0]

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

  // Safely get image URL
  const imageUrl =
    post.featuredImage &&
    typeof post.featuredImage === 'object' &&
    'url' in post.featuredImage &&
    post.featuredImage.url
      ? post.featuredImage.url
      : '/placeholder-image.jpg'

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
              src={imageUrl}
              alt={post.title}
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
