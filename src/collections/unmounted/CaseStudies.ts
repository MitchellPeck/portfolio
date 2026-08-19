import type { CollectionConfig } from 'payload'

const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Detailed client case studies',
  },
  access: { read: () => true },
  fields: [
    // Core Info
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'brand',
      type: 'select',
      required: true,
      options: [
        { label: 'Mitchell Peck Development', value: 'mpd' },
        { label: 'ProSystems', value: 'prosystems' },
      ],
    },

    // Client Info
    {
      name: 'client',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'industry', type: 'relationship', relationTo: 'industries' },
        { name: 'website', type: 'text' },
        {
          name: 'anonymous',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Hide client name' },
        },
      ],
    },

    // Project Overview
    { name: 'overview', type: 'richText', required: true },
    { name: 'excerpt', type: 'textarea', admin: { description: 'Brief summary for cards' } },

    // Structured Case Study Sections
    {
      name: 'challenge',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'The Challenge' },
        { name: 'content', type: 'richText', required: true },
      ],
    },
    {
      name: 'solution',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Our Solution' },
        { name: 'content', type: 'richText', required: true },
      ],
    },
    {
      name: 'results',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'The Results' },
        { name: 'content', type: 'richText', required: true },
        {
          name: 'metrics',
          type: 'array',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { description: 'e.g., "50%"' },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { description: 'e.g., "Increase in conversions"' },
            },
          ],
        },
      ],
    },

    // Technologies Used
    {
      name: 'technologies',
      type: 'array',
      fields: [
        { name: 'type', type: 'text' },
        { name: 'technology', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },

    // Related Services
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },

    // Gallery
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },

    // Testimonial
    {
      name: 'testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
    },

    // Project Links
    { name: 'projectUrl', type: 'text' },

    // Timeline
    { name: 'projectDuration', type: 'text', admin: { description: 'e.g., "3 months"' } },
    { name: 'completedDate', type: 'date' },

    // Display
    { name: 'featured', type: 'checkbox', defaultValue: false },

    // SEO
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export default CaseStudies
