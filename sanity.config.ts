import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

const interviewSchema = {
  name: 'interview',
  title: 'Interview',
  type: 'document' as const,
  fields: [
    {
      name: 'title',
      title: 'Story Title',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'intervieweeName',
      title: "Interviewee's Name",
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'intervieweeOrigin',
      title: 'Origin / Background',
      type: 'string',
      description: 'e.g. "Originally from Oaxaca, Mexico — now living in Chicago"',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary shown in story cards.',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Identity', value: 'identity' },
          { title: 'Immigration', value: 'immigration' },
          { title: 'Family', value: 'family' },
          { title: 'Work', value: 'work' },
          { title: 'Community', value: 'community' },
          { title: 'Resilience', value: 'resilience' },
          { title: 'Culture', value: 'culture' },
          { title: 'Faith', value: 'faith' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'intervieweeName',
      media: 'mainImage',
    },
  },
}

export default defineConfig({
  name: 'american-stories',
  title: 'American Stories',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [interviewSchema],
  },
})
