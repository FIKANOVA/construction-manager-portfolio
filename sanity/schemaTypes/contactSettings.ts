import { defineField, defineType } from 'sanity'

export const contactSettings = defineType({
    name: 'contactSettings',
    title: 'Contact Settings',
    type: 'document',
    // Singleton configuration

    fields: [
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.email(),
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'City or region',
        }),
        defineField({
            name: 'availabilityStatus',
            title: 'Availability Status',
            type: 'string',
            description: 'e.g., "Booking for 2026"',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Contact Settings',
            }
        },
    },
})
