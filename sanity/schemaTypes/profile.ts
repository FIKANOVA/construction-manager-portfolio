import { defineField, defineType } from 'sanity'

export const profile = defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Professional Title',
            type: 'string',
            description: 'e.g., "Construction Manager | Digital Product Lead"',
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 6,
        }),
        defineField({
            name: 'heroRole1',
            title: 'Hero Role 1',
            type: 'string',
            description: 'First role displayed in the hero section (e.g., "Construction Manager")',
        }),
        defineField({
            name: 'heroRole2',
            title: 'Hero Role 2',
            type: 'string',
            description: 'Second role displayed in the hero section (e.g., "Digital Product Lead")',
        }),
        defineField({
            name: 'portraitImage',
            title: 'Portrait Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'heroBackgroundImage',
            title: 'Hero Background Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Background image for the hero section',
        }),
        defineField({
            name: 'interests',
            title: 'Current Interests',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'hobbies',
            title: 'Hobbies & Interests',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'education',
            title: 'Education',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'degree', title: 'Degree', type: 'string' },
                        { name: 'institution', title: 'Institution', type: 'string' },
                        { name: 'period', title: 'Period', type: 'string' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'cvFile',
            title: 'CV File (PDF)',
            type: 'file',
            options: {
                accept: '.pdf',
            },
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', title: 'Platform', type: 'string' },
                        { name: 'url', title: 'URL', type: 'url' },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'portraitImage',
        },
    },
})
