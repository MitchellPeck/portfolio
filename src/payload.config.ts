import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

// Collections
import Consulting from './collections/Consulting'
import { Media } from './collections/Media'
import Posts from './collections/Posts'
import Projects from './collections/Projects'
import { Users } from './collections/Users'

// Scaffolding for future collections lives in ./collections/unmounted/ (excluded
// from type-checking until registered — see tsconfig.json). To activate one:
// move it back into ./collections, import it here, add it to `collections`,
// and create/run a migration.

// Globals
import SiteSettings from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const siteURL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://mitchellpeck.com' : 'http://localhost:3000')

// Origins allowed to use cookie auth against the API (prod domain, Vercel
// preview deployments, and localhost during development)
const allowedOrigins = [
  siteURL,
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000'] : []),
]

export default buildConfig({
  // No `serverURL` on purpose: with it set, Payload emits absolute media URLs,
  // which next/image rejects without an images.remotePatterns allowlist.
  // Relative /api/media/file/... URLs work everywhere (metadataBase makes
  // them absolute in OG tags).
  cors: allowedOrigins,
  csrf: allowedOrigins,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' - Mitchell Peck Development CMS' },
  },
  collections: [
    Users,
    // Content
    Media,
    Posts,
    Consulting,
    // Core
    Projects,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || '' } }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
