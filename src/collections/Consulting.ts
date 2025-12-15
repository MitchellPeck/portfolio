import { CollectionConfig } from 'payload'

const Consulting: CollectionConfig = {
  slug: 'consulting',
  admin: { useAsTitle: 'title', group: 'Content' },
  access: { read: () => true },
  fields: [
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Must be checked for the project to appear on the site',
      },
    },
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'overview', type: 'richText', required: true },
    { name: 'description', type: 'richText', required: true },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        { name: 'type', type: 'text' },
        { name: 'technology', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
    { name: 'client', type: 'text', required: true },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}

export default Consulting
