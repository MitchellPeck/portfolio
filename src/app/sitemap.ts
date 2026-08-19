import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

const STATIC_ROUTES = [
  '',
  '/about',
  '/consulting',
  '/contact',
  '/industries',
  '/posts',
  '/pricing',
  '/privacy',
  '/process',
  '/projects',
  '/prosystems',
  '/services',
  '/team',
  '/terms',
  '/work',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const collections = [
      { slug: 'posts', prefix: '/posts' },
      { slug: 'projects', prefix: '/projects' },
      { slug: 'consulting', prefix: '/consulting' },
    ] as const

    for (const { slug, prefix } of collections) {
      const { docs } = await payload.find({
        collection: slug,
        where: { published: { equals: true } },
        limit: 1000,
        select: { slug: true, updatedAt: true },
      })

      for (const doc of docs) {
        entries.push({
          url: `${SITE_URL}${prefix}/${doc.slug}`,
          lastModified: doc.updatedAt ? new Date(doc.updatedAt) : undefined,
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }
  } catch (error) {
    // If the CMS is unreachable, still serve the static routes
    console.error('sitemap: failed to load CMS entries', error)
  }

  return entries
}
