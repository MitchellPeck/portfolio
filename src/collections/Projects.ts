import { CollectionConfig } from 'payload'

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
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
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}

export default Projects
