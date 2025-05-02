import { CollectionConfig } from 'payload'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
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
