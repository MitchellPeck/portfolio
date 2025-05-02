import { CollectionConfig } from 'payload'

const Consulting: CollectionConfig = {
  slug: 'consulting',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
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
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}

export default Consulting
