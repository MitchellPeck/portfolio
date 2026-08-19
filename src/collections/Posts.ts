import { CollectionConfig } from 'payload'

const Posts: CollectionConfig = {
  slug: 'posts',
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
        description: 'Must be checked for the post to appear on the site',
      },
    },
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'categories', type: 'array', fields: [{ name: 'category', type: 'text' }] },
    {
      name: 'publishedDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
      required: true,
    },
  ],
}

export default Posts
