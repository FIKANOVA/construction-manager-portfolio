import { defineField, defineType } from 'sanity'

export const photographer = defineType({
    name: 'photographer',
    title: 'Photographer',
    type: 'document',
    // Singleton configuration

    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            description: 'Long form biography',
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
            name: 'philosophy',
            title: 'Philosophy',
            type: 'text',
            description: 'A short quote or philosophy statement',
        }),
        defineField({
            name: 'gearList',
            title: 'Gear List',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Camera equipment and gear',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'Twitter/X', value: 'twitter' },
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'TikTok', value: 'tiktok' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'cvFile',
            title: 'CV / Resume',
            type: 'file',
            description: 'Upload your CV/Resume (PDF, DOC, DOCX). This will be available as a download link on the frontend.',
            options: {
                accept: '.pdf,.doc,.docx',
            },
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'portraitImage',
        },
    },
})
