import type { GlobalConfig } from 'payload'

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    // Branding
    {
      name: 'branding',
      type: 'group',
      fields: [
        { name: 'siteName', type: 'text', defaultValue: 'Mitchell Peck Development' },
        { name: 'siteTagline', type: 'text' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        {
          name: 'logoAlt',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Alternative logo (e.g., for dark backgrounds)' },
        },
        { name: 'favicon', type: 'upload', relationTo: 'media' },
      ],
    },

    // Contact Info - MPD
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Info (MPD)',
      fields: [
        { name: 'email', type: 'email', defaultValue: 'me@mitchellpeck.com' },
        { name: 'phone', type: 'text', defaultValue: '(404) 528-1122' },
        { name: 'address', type: 'textarea' },
        {
          name: 'inquiryFormUrl',
          type: 'text',
          defaultValue:
            'https://portal.mitchellpeck.com/survey/start/b7f82f16-fbfb-491b-b9aa-8d5722ebb576',
        },
      ],
    },

    // ProSystems Branding
    {
      name: 'prosystemsBranding',
      type: 'group',
      label: 'ProSystems Branding',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Primary ProSystems logo' },
        },
        {
          name: 'logoAlt',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Alternative ProSystems logo (e.g., for dark backgrounds)' },
        },
      ],
    },

    // ProSystems Contact
    {
      name: 'prosystemsContact',
      type: 'group',
      label: 'Contact Info (ProSystems)',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        {
          name: 'inquiryFormUrl',
          type: 'text',
        },
      ],
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
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
          ],
          required: true,
        },
        { name: 'url', type: 'text', required: true },
      ],
    },

    // Default SEO
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'defaultTitle', type: 'text', defaultValue: 'Mitchell Peck Development' },
        { name: 'titleSuffix', type: 'text', defaultValue: ' | Mitchell Peck Development' },
        { name: 'defaultDescription', type: 'textarea' },
        { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
        { name: 'googleSiteVerification', type: 'text' },
        { name: 'twitterHandle', type: 'text' },
      ],
    },

    // Analytics & Scripts
    {
      name: 'analytics',
      type: 'group',
      fields: [
        { name: 'googleAnalyticsId', type: 'text' },
        { name: 'googleTagManagerId', type: 'text' },
        { name: 'facebookPixelId', type: 'text' },
      ],
    },

    // Footer Content
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          defaultValue: 'Mitchell Peck Development. All rights reserved.',
        },
        { name: 'showProSystemsLink', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}

export default SiteSettings
