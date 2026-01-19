import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Construction & Infrastructure', value: 'construction' },
          { title: 'GIS & Spatial Analysis', value: 'gis' },
          { title: 'AI & Data Quality', value: 'ai-data' },
          { title: 'Monitoring & Evaluation', value: 'm-and-e' },
          { title: 'Sustainability Projects', value: 'sustainability' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client / Organization',
      type: 'string',
    }),
    defineField({
      name: 'projectLink',
      title: 'Project Link',
      type: 'url',
      description: 'Link to the live project or external case study',
    }),
    defineField({
      name: 'projectDate',
      title: 'Project Date',
      type: 'date',
      description: 'When the project was completed or started',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      description: 'Describe the main challenge of this project',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      description: 'Describe the solution implemented',
    }),
    defineField({
      name: 'impact',
      title: 'Key Impact',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List the key impacts or outcomes',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add short tags like Strategy, Mapping, etc.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      category: 'category',
    },
    prepare({ title, media, category }) {
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
})
