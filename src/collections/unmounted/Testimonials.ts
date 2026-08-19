import type { CollectionConfig } from 'payload'

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    group: 'Content',
    description: 'Client testimonials and reviews',
  },
  access: { read: () => true },
  fields: [
    { name: 'clientName', type: 'text', required: true },
    { name: 'clientTitle', type: 'text', admin: { description: 'Job title' } },
    { name: 'clientCompany', type: 'text' },
    { name: 'clientPhoto', type: 'upload', relationTo: 'media' },
    {
      name: 'clientLogo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Company logo' },
    },

    // Testimonial Content
    { name: 'quote', type: 'textarea', required: true },
    {
      name: 'fullTestimonial',
      type: 'richText',
      admin: { description: 'Extended testimonial if available' },
    },

    // Rating
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: { description: 'Star rating (1-5)' },
    },

    // Source
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Direct', value: 'direct' },
        { label: 'Google', value: 'google' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Clutch', value: 'clutch' },
        { label: 'Upwork', value: 'upwork' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'sourceUrl', type: 'text', admin: { description: 'Link to original review' } },

    // Context
    {
      name: 'brand',
      type: 'select',
      options: [
        { label: 'Mitchell Peck Development', value: 'mpd' },
        { label: 'ProSystems', value: 'prosystems' },
      ],
    },
    {
      name: 'relatedService',
      type: 'relationship',
      relationTo: 'services',
    },
    {
      name: 'relatedCaseStudy',
      type: 'relationship',
      relationTo: 'case-studies',
    },
    {
      name: 'relatedProject',
      type: 'relationship',
      relationTo: 'projects',
    },

    // Display
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    { name: 'date', type: 'date' },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show on website' },
    },
  ],
}

export default Testimonials
