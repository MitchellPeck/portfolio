import type { CollectionConfig } from 'payload'

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', group: 'Content' },
  access: {
    // Public API readers only see published docs; logged-in admins see drafts too
    read: ({ req }) => (req.user ? true : { published: { equals: true } }),
  },
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
      name: 'status',
      type: 'select',
      options: [
        { label: 'Planned', value: 'Planned' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Paused', value: 'Paused' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Completed - Actively Maintained', value: 'Completed - Actively Maintained' },
        { label: 'Completed - Sunset', value: 'Completed - Sunset' },
      ],
      defaultValue: 'In Progress',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        { name: 'type', type: 'text' },
        { name: 'technology', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
    { name: 'projectUrl', type: 'text', admin: { description: 'Link to the live project' } },
    { name: 'githubUrl', type: 'text', admin: { description: 'Link to GitHub repository' } },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },

    // Relationships - uncomment after enabling collections in payload.config.ts
    // {
    //   name: 'relatedService',
    //   type: 'relationship',
    //   relationTo: 'services',
    // },
    // {
    //   name: 'industry',
    //   type: 'relationship',
    //   relationTo: 'industries',
    // },
    // {
    //   name: 'testimonial',
    //   type: 'relationship',
    //   relationTo: 'testimonials',
    // },

    // Gallery
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },

    // Dates
    { name: 'startDate', type: 'date' },
    { name: 'completedDate', type: 'date' },

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

export default Projects
