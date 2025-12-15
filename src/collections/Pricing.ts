import type { CollectionConfig } from 'payload'

const Pricing: CollectionConfig = {
  slug: 'pricing',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    description: 'Pricing packages and tiers',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'brand',
      type: 'select',
      required: true,
      options: [
        { label: 'Mitchell Peck Development', value: 'mpd' },
        { label: 'ProSystems', value: 'prosystems' },
      ],
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Fixed Price', value: 'fixed' },
        { label: 'Hourly Rate', value: 'hourly' },
        { label: 'Monthly Retainer', value: 'retainer' },
        { label: 'Custom Quote', value: 'custom' },
        { label: 'Starting At', value: 'starting' },
      ],
    },
    { name: 'subtitle', type: 'text', admin: { description: 'e.g., "Perfect for small businesses"' } },
    { name: 'description', type: 'richText' },

    // Pricing Display
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'amount',
          type: 'number',
          admin: { description: 'Price in dollars (leave empty for "Contact Us")' },
        },
        { name: 'currency', type: 'text', defaultValue: 'USD' },
        {
          name: 'unit',
          type: 'select',
          options: [
            { label: 'One-time', value: 'once' },
            { label: 'Per Hour', value: 'hour' },
            { label: 'Per Month', value: 'month' },
            { label: 'Per Year', value: 'year' },
            { label: 'Per Project', value: 'project' },
          ],
        },
        {
          name: 'displayText',
          type: 'text',
          admin: { description: 'Override text like "Starting at $X" or "Contact Us"' },
        },
      ],
    },

    // Features Included
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'feature', type: 'text', required: true },
        { name: 'included', type: 'checkbox', defaultValue: true },
        { name: 'tooltip', type: 'text', admin: { description: 'Additional info on hover' } },
      ],
    },

    // Related Services
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },

    // Display Options
    {
      name: 'highlighted',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show as "Most Popular" or featured' },
    },
    {
      name: 'highlightText',
      type: 'text',
      admin: { description: 'e.g., "Most Popular", "Best Value"' },
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },

    // CTA
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'text', type: 'text', defaultValue: 'Get Started' },
        { name: 'link', type: 'text', defaultValue: '/contact' },
      ],
    },
  ],
}

export default Pricing
