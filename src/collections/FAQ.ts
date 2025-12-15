import type { CollectionConfig } from 'payload'

const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    group: 'Content',
    description: 'Frequently asked questions',
  },
  access: { read: () => true },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'richText', required: true },

    // Categorization
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Services', value: 'services' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Process', value: 'process' },
        { label: 'Technical', value: 'technical' },
        { label: 'ProSystems', value: 'prosystems' },
      ],
    },
    {
      name: 'brand',
      type: 'select',
      options: [
        { label: 'Mitchell Peck Development', value: 'mpd' },
        { label: 'ProSystems', value: 'prosystems' },
        { label: 'Both', value: 'both' },
      ],
      defaultValue: 'both',
    },

    // Related Content
    {
      name: 'relatedService',
      type: 'relationship',
      relationTo: 'services',
    },

    // Display
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show in prominent FAQ sections' },
    },
  ],
}

export default FAQ
