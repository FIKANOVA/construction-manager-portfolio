/**
 * Sanity Seed Script
 * 
 * Usage:
 * npx tsx scripts/seed.ts
 */

import { createClient } from 'next-sanity'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cpjzxobo'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
    console.error('❌ SANITY_API_TOKEN is missing in .env.local')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2024-01-01',
    useCdn: false,
})

// Sample text helper
const sampleDesc = (text: string) => [
    {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text }],
        markDefs: [],
    },
]

// Helper to upload image from URL
async function uploadImage(imageUrl: string) {
    try {
        const res = await fetch(imageUrl)
        if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`)
        const buffer = await res.arrayBuffer()
        const asset = await client.assets.upload('image', Buffer.from(buffer))
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id,
            },
        }
    } catch (error) {
        console.warn(`Failed to upload image from ${imageUrl}:`, error)
        return null
    }
}

// Seed Data
const seedData = {
    // 1. Photographer Profile (Singleton)
    photographer: {
        _type: 'photographer',
        _id: 'photographer-main',
        name: 'VUYO',
        bio: `A visual storyteller based in Nairobi, Kenya, with a passion for capturing life's most precious moments. My journey with photography began as a curious teenager with a borrowed camera, and has evolved into a lifelong passion for creating images that transcend time.`,
        philosophy: '"Photography is the art of frozen time... the ability to store emotion and feelings within a frame."',
        gearList: ['Sony A7RV', 'Sony 24-70mm f/2.8 GM', 'Sony 85mm f/1.4 GM', 'Godox AD600 Pro'],
        socialLinks: [
            { platform: 'instagram', url: 'https://www.instagram.com/vuyophoto' },
        ],
    },

    // 2. Contact Settings (Singleton)
    contactSettings: {
        _type: 'contactSettings',
        _id: 'contact-settings',
        email: 'hello@vuyophoto.com',
        phone: '+254 700 000 000',
        location: 'Nairobi, Kenya',
        availabilityStatus: 'Booking for 2026',
    },

    // 3. Service Packages (Pricing Plans)
    servicePackages: [
        // Weddings
        {
            _type: 'servicePackage',
            title: 'Gold Wedding Package',
            category: 'wedding',
            price: 'Ksh 85,000',
            features: ['10 Hours Coverage', '2 Photographers', '500+ Edited Images', 'Online Gallery'],
            isPopular: true,
            description: 'Our most popular comprehensive wedding coverage.',
        },
        {
            _type: 'servicePackage',
            title: 'Platinum Wedding Package',
            category: 'wedding',
            price: 'Ksh 120,000',
            features: ['Full Day Coverage', 'Engagement Shoot', 'Priority Editing', 'Premium Photo Album', ' Drone Coverage'],
            isPopular: false,
            description: 'The ultimate luxury experience for your special day.',
        },

        // Portraits
        {
            _type: 'servicePackage',
            title: 'Individual Portrait Session',
            category: 'portrait',
            price: 'Ksh 15,000',
            features: ['2 Hour Session', '3 Outfit Changes', '25 Retouched Images', 'Studio or Outdoor'],
            isPopular: false,
            description: 'Professional headshots or creative portraits.',
        },
        {
            _type: 'servicePackage',
            title: 'Family Portrait Session',
            category: 'portrait',
            price: 'Ksh 25,000',
            features: ['2 Hour Session', 'Up to 5 Family Members', '40 Retouched Images', 'Print Release'],
            isPopular: true,
            description: 'Capture your family bond in a timeless style.',
        },

        // Commercial
        {
            _type: 'servicePackage',
            title: 'Brand Starter',
            category: 'commercial',
            price: 'Ksh 45,000',
            features: ['Half Day Shoot', 'Product & Lifestyle', 'Social Media Rights', '50 High-Res Images'],
            isPopular: false,
            description: 'Perfect for small businesses launching a new product.',
        },
        {
            _type: 'servicePackage',
            title: 'Full Brand Campaign',
            category: 'commercial',
            price: 'Custom Quote',
            features: ['Multi-Day Shoot', 'Creative Direction', 'Full Commercial Rights', 'Model Casting Assistance'],
            isPopular: true,
            description: 'Complete visual identity creation for established brands.',
        },

        // Nature
        {
            _type: 'servicePackage',
            title: 'Wildlife Excursion',
            category: 'nature',
            price: 'Ksh 30,000 / Day',
            features: ['Guided Photography Tour', 'Equipment Rental Available', 'Post-Processing Workshop'],
            isPopular: false,
            description: 'Join us for a guided photography tour in the wild.',
        },

        // Sports
        {
            _type: 'servicePackage',
            title: 'Game Day Coverage',
            category: 'sports',
            price: 'Ksh 20,000',
            features: ['Full Match Coverage', 'Action & Candid Shots', 'Fast Delivery for Socials'],
            isPopular: true,
            description: 'Capture the intensity of the game.',
        },

        // Celebrations
        {
            _type: 'servicePackage',
            title: 'Event Coverage',
            category: 'celebrations',
            price: 'Ksh 10,000 / Hour',
            features: ['Birthday Parties', 'Anniversaries', 'Baby Showers', 'Candid Moments'],
            isPopular: false,
            description: 'Documenting your joy at any celebration.',
        },
    ],

    // 4. Sample Projects
    projects: [
        {
            title: 'Mountain Wedding',
            slug: 'mountain-wedding',
            category: 'wedding',
            clientName: 'Sarah & Mike',
            shootDate: '2025-11-10',
            description: 'An intimate wedding ceremony held in the misty hills. We captured the raw emotion and stunning scenery.',
            imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
        },
        {
            title: 'Urban Portraits',
            slug: 'urban-portraits',
            category: 'portrait',
            clientName: 'James K.',
            shootDate: '2025-10-05',
            description: 'A gritty, high-contrast portrait session in downtown Nairobi, focusing on shadow and light.',
            imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80',
        },
        {
            title: 'Tech Startup Launch',
            slug: 'tech-startup-launch',
            category: 'commercial',
            clientName: 'NexGen Tech',
            shootDate: '2025-08-15',
            description: 'Product photography and lifestyle shots for a new tech gadget release.',
            imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
        },
        {
            title: 'Mara Migration',
            slug: 'mara-migration',
            category: 'nature',
            clientName: 'Nature Weekly',
            shootDate: '2025-07-20',
            description: 'Witnessing the great wildebeest migration in the Masai Mara. A spectacle of nature.',
            imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
        },
        {
            title: 'Rugby Finals',
            slug: 'rugby-finals',
            category: 'sports',
            clientName: 'Nondies RFC',
            shootDate: '2025-05-30',
            description: 'High-intensity action shots from the cup final match. Mud, sweat, and victory.',
            imageUrl: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?w=1200&q=80',
        },
        {
            title: 'Golden Jubilee',
            slug: 'golden-jubilee',
            category: 'celebrations',
            clientName: 'The Kamathis',
            shootDate: '2025-12-01',
            description: 'A vibrant 50th anniversary celebration full of color, dance, and family joy.',
            imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
        },
    ],
}

async function seed() {
    console.log('🌱 Starting expanded seed process...')

    try {
        console.log('📷 Creating/Updating photographer...')
        await client.createOrReplace(seedData.photographer)

        console.log('📞 Creating/Updating contact settings...')
        await client.createOrReplace(seedData.contactSettings)

        console.log('🗑️ Clearing existing data...')
        await client.delete({ query: '*[_type == "servicePackage"]' })
        await client.delete({ query: '*[_type == "project"]' })

        console.log('📦 Creating service packages (Pricing Plans)...')
        for (const pkg of seedData.servicePackages) {
            await client.create(pkg)
        }

        console.log('🎨 Creating sample projects with Real Images...')
        for (const p of seedData.projects) {
            console.log(`   > Uploading image for ${p.title}...`)
            const imageAsset = await uploadImage(p.imageUrl)

            const projectDoc = {
                _type: 'project',
                title: p.title,
                slug: { _type: 'slug', current: p.slug },
                category: p.category,
                clientName: p.clientName,
                shootDate: p.shootDate,
                description: sampleDesc(p.description),
                coverImage: imageAsset,
                gallery: imageAsset ? [imageAsset] : [], // Use same image for gallery for now
            }

            await client.create(projectDoc)
        }

        console.log('✅ Seed completed! Database is well populated.')
        console.log('   👉 Categories covered: Wedding, Portrait, Commercial, Nature, Sports, Celebrations')
    } catch (error) {
        console.error('❌ Seed failed:', error)
        process.exit(1)
    }
}

seed()
