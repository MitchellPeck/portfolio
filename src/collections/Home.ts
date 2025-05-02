import { CollectionConfig } from 'payload'

const Home: CollectionConfig = {
  slug: 'home',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'heroHeading', type: 'text', required: true },
    { name: 'heroSubheading', type: 'richText' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'ctaText', type: 'text' },
    { name: 'ctaLink', type: 'text' },
    { name: 'featuredProjectsHeading', type: 'text', defaultValue: 'Featured Projects' },
    { name: 'featuredProjectsLimit', type: 'number', defaultValue: 3, min: 1, max: 6 },
    { name: 'featuredConsultingHeading', type: 'text', defaultValue: 'Featured Consulting' },
    { name: 'featuredConsultingLimit', type: 'number', defaultValue: 3, min: 1, max: 6 },
    { name: 'featuredPostsHeading', type: 'text', defaultValue: 'Recent Posts' },
    { name: 'featuredPostsLimit', type: 'number', defaultValue: 3, min: 1, max: 6 },
  ],
}

export default Home
