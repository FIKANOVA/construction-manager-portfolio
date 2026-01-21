import { defineField, defineType } from 'sanity'

export const volunteering = defineType({
    name: 'volunteering',
    title: 'Volunteering',
    type: 'document',
    fields: [
        defineField({
            name: 'organization',
            title: 'Organization',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'period',
            title: 'Period',
            type: 'string',
            description: 'e.g., "Jan 2024 - Aug 2025"',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'website',
            title: 'Organization Website',
            type: 'url',
        }),
        defineField({
            name: 'highlights',
            title: 'Highlights',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
    preview: {
        select: {
            title: 'organization',
            subtitle: 'role',
        },
    },
})
