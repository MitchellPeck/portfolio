import type { CollectionConfig } from 'payload'

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Service offerings for MPD and ProSystems',
  },
  access: { read: () => true },
  fields: [
    // Core Info
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'brand',
      type: 'select',
      required: true,
      options: [
        { label: 'Mitchell Peck Development', value: 'mpd' },
        { label: 'ProSystems', value: 'prosystems' },
      ],
      admin: { description: 'Which brand this service belongs to' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        // MPD Categories
        { label: 'Web Development', value: 'web-development' },
        { label: 'Software Development', value: 'software-development' },
        { label: 'Mobile Development', value: 'mobile-development' },
        { label: 'Consulting', value: 'consulting' },
        { label: 'Maintenance & Support', value: 'maintenance-support' },
        // ProSystems Categories
        { label: 'Internet & Networking', value: 'networking' },
        { label: 'Security Systems', value: 'security' },
        { label: 'Audio / Video', value: 'audio-video' },
        { label: 'Car Installations', value: 'car-install' },
      ],
    },
    { name: 'icon', type: 'text', admin: { description: 'Icon identifier (e.g., Lucide icon name)' } },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: { description: 'Brief summary for cards (max 200 chars)' },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },

    // Features/Benefits
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'feature', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },

    // Deliverables
    {
      name: 'deliverables',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },

    // Technologies (for MPD services)
    {
      name: 'technologies',
      type: 'array',
      admin: {
        condition: (data) => data.brand === 'mpd',
        description: 'Technologies used for this service',
      },
      fields: [
        { name: 'technology', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },

    // Pricing Reference
    {
      name: 'relatedPricing',
      type: 'relationship',
      relationTo: 'pricing',
      hasMany: true,
      admin: { description: 'Link to related pricing packages' },
    },

    // Related Projects
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
    },

    // CTA
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'text', type: 'text', defaultValue: 'Get Started' },
        { name: 'link', type: 'text', defaultValue: '/contact' },
      ],
    },

    // Display Options
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first' },
    },

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

export default Services
