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

// New collections (uncomment after running migrations)
// import CaseStudies from './collections/CaseStudies'
// import FAQ from './collections/FAQ'
// import Industries from './collections/Industries'
// import Pricing from './collections/Pricing'
// import Process from './collections/Process'
// import Services from './collections/Services'
// import Team from './collections/Team'
// import Testimonials from './collections/Testimonials'

// Globals
import SiteSettings from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
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
    // New collections - uncomment after running migrations:
    // CaseStudies,
    // Services,
    // Pricing,
    // Process,
    // Team,
    // Industries,
    // Testimonials,
    // FAQ,
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
