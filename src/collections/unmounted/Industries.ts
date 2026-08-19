import type { CollectionConfig } from 'payload'

const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    description: 'Industries served',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'icon', type: 'text', admin: { description: 'Icon identifier (e.g., Lucide icon name)' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'description', type: 'richText' },

    // Applicable Brands
    {
      name: 'brands',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Mitchell Peck Development', value: 'mpd' },
        { label: 'ProSystems', value: 'prosystems' },
      ],
    },

    // Related Content
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'relatedCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
    },

    // Key challenges/solutions
    {
      name: 'challenges',
      type: 'array',
      fields: [
        { name: 'challenge', type: 'text', required: true },
        { name: 'solution', type: 'textarea' },
      ],
    },

    // Display
    { name: 'featured', type: 'checkbox', defaultValue: false },
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

export default Industries
