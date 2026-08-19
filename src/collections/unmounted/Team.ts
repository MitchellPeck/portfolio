import type { CollectionConfig } from 'payload'

const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    description: 'Team members and collaborators',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'photo', type: 'upload', relationTo: 'media', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'title', type: 'text', admin: { description: 'Full title if different from role' } },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Founder / Principal', value: 'founder' },
        { label: 'Full-Time', value: 'full-time' },
        { label: 'Part-Time', value: 'part-time' },
        { label: 'Contractor', value: 'contractor' },
        { label: 'Collaborator', value: 'collaborator' },
      ],
    },
    {
      name: 'brands',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Mitchell Peck Development', value: 'mpd' },
        { label: 'ProSystems', value: 'prosystems' },
      ],
    },
    { name: 'bio', type: 'richText' },
    {
      name: 'shortBio',
      type: 'textarea',
      admin: { description: 'Brief bio for cards (max 200 chars)' },
    },

    // Skills/Expertise
    {
      name: 'skills',
      type: 'array',
      fields: [{ name: 'skill', type: 'text', required: true }],
    },

    // Social Links
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Website', value: 'website' },
            { label: 'Email', value: 'email' },
          ],
          required: true,
        },
        { name: 'url', type: 'text', required: true },
      ],
    },

    // Display
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show on website' },
    },
  ],
}

export default Team
