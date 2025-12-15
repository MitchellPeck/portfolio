import type { CollectionConfig } from 'payload'

const Process: CollectionConfig = {
  slug: 'process',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Process steps and methodology',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'brand',
      type: 'select',
      required: true,
      options: [
        { label: 'Mitchell Peck Development', value: 'mpd' },
        { label: 'ProSystems', value: 'prosystems' },
        { label: 'Both', value: 'both' },
      ],
    },
    { name: 'introduction', type: 'richText' },

    // Process Steps
    {
      name: 'steps',
      type: 'array',
      required: true,
      fields: [
        { name: 'stepNumber', type: 'number', required: true },
        { name: 'title', type: 'text', required: true },
        {
          name: 'shortTitle',
          type: 'text',
          admin: { description: 'Brief title for timeline view (e.g., "Consult")' },
        },
        { name: 'description', type: 'richText', required: true },
        { name: 'icon', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'duration', type: 'text', admin: { description: 'e.g., "1-2 weeks"' } },
        {
          name: 'deliverables',
          type: 'array',
          fields: [{ name: 'item', type: 'text' }],
        },
      ],
    },

    // Summary/Conclusion
    { name: 'conclusion', type: 'richText' },

    // CTA
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Ready to Start?' },
        { name: 'text', type: 'text', defaultValue: 'Get in Touch' },
        { name: 'link', type: 'text', defaultValue: '/contact' },
      ],
    },

    // Display
    { name: 'sortOrder', type: 'number', defaultValue: 0 },

    // SEO
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}

export default Process
