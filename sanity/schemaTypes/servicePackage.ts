import { defineField, defineType } from 'sanity'

export const servicePackage = defineType({
    name: 'servicePackage',
    title: 'Service Package',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Construction', value: 'construction' },
                    { title: 'GIS Services', value: 'gis' },
                    { title: 'AI & QA', value: 'ai-data' },
                    { title: 'Consultancy', value: 'consultancy' },
                    { title: 'Other', value: 'other' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'string',
            description: 'e.g., "Ksh 85,000"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of package features',
        }),
        defineField({
            name: 'isPopular',
            title: 'Is Popular',
            type: 'boolean',
            description: 'Mark as best value / popular package',
            initialValue: false,
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Short summary of the package',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            price: 'price',
            isPopular: 'isPopular',
        },
        prepare({ title, category, price, isPopular }) {
            return {
                title: `${title}${isPopular ? ' ⭐' : ''}`,
                subtitle: `${category} - ${price}`,
            }
        },
    },
})
