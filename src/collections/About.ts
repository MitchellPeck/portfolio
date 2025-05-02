import { CollectionConfig } from 'payload'

const About: CollectionConfig = {
  slug: 'about',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'profileImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'biography', type: 'richText', required: true },
    {
      name: 'skills',
      type: 'array',
      fields: [
        { name: 'category', type: 'text', required: true },
        {
          name: 'skillItems',
          type: 'array',
          fields: [{ name: 'skill', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'experience',
      type: 'array',
      fields: [
        { name: 'company', type: 'text', required: true },
        { name: 'position', type: 'text', required: true },
        { name: 'type', type: 'text', required: true },
        { name: 'name', type: 'text' },
        {
          name: 'logoImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Company logo or relevant image (square format works best)',
          },
        },
        {
          name: 'startDate',
          type: 'date',
          admin: { date: { pickerAppearance: 'monthOnly' } },
          required: true,
        },
        { name: 'endDate', type: 'date', admin: { date: { pickerAppearance: 'monthOnly' } } },
        { name: 'current', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        { name: 'institution', type: 'text', required: true },
        { name: 'degree', type: 'text', required: true },
        { name: 'fieldOfStudy', type: 'text' },
        {
          name: 'logoImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Institution logo or relevant image (square format works best)',
          },
        },
        {
          name: 'startDate',
          type: 'date',
          required: true,
          admin: { date: { pickerAppearance: 'monthOnly' } },
        },
        { name: 'endDate', type: 'date', admin: { date: { pickerAppearance: 'monthOnly' } } },
        { name: 'current', type: 'checkbox', defaultValue: false },
        { name: 'description', type: 'textarea' },
      ],
    },
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
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Dribbble', value: 'dribbble' },
            { label: 'Behance', value: 'behance' },
          ],
          required: true,
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'resumeFile',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Upload your resume/CV (PDF preferred)' },
    },
  ],
}

export default About
