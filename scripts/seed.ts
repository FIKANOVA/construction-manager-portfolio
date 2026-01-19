/**
 * Sanity Seed Script - Bruce Odhiambo Construction Manager Portfolio
 * 
 * This script seeds the Sanity CMS with Bruce's profile data,
 * services, projects (case studies), and experience.
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

// Sample text helper for rich text fields
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

// ============================================
// BRUCE ODHIAMBO SEED DATA
// ============================================
const seedData = {
    // 1. Profile (Singleton) - About Page Content
    profile: {
        _type: 'profile',
        _id: 'profile-main',
        name: 'Bruce Odhiambo',
        title: 'Construction Manager | Digital Product Lead',
        bio: `I am a purpose-driven project enthusiast combining my background in construction management with ongoing training in project planning and digital product development to drive sustainable, inclusive, and tech-enabled solutions.

My focus is on contributing to ecologically responsible, socially inclusive, and ethically managed initiatives that align with the UN Sustainable Development Goals (SDGs). I'm especially interested in how digital and green technologies can influence sustainable infrastructure and help build resilient communities across Africa.

I've taken on roles (both paid and voluntary) that sharpen my skills in planning, team coordination, data use, stakeholder communication, and tech adoption. These experiences are all steps toward my long-term goal: to become a strategic leader in sustainable development, shaping infrastructure projects that merge innovation with social impact.`,
        interests: [
            'Project-based roles in sustainability',
            'Digital innovation for development',
            'Infrastructure strategy',
            'Community-centred design',
        ],
        skills: [
            'Project Management',
            'GIS & Spatial Analysis',
            'Monitoring & Evaluation',
            'Data Analytics',
            'ArchiCAD',
            'Microsoft Suite',
            'Strategic Management',
            'Lead Generation',
        ],
        education: [
            {
                _key: 'edu-1',
                degree: 'MA Project Planning and Management',
                institution: 'University of Nairobi',
                period: '2023 - Present',
            },
            {
                _key: 'edu-2',
                degree: 'BSc Construction Management',
                institution: 'University of Nairobi',
                period: '2016 - 2020',
            },
        ],
        hobbies: [
            {
                _key: 'hobby-1',
                name: 'Rugby',
                description: 'Active player for 10+ years, currently in the leadership group at Nondescripts RFC.',
            },
            {
                _key: 'hobby-2',
                name: 'Technology',
                description: 'Enthusiast focusing on how technology can drive sustainability across ecosystems.',
            },
        ],
        socialLinks: [
            { _key: 'social-1', platform: 'linkedin', url: 'https://www.linkedin.com/in/bruce-odhiambo-8614b5175/' },
        ],
    },

    // 2. Contact Settings (Singleton)
    contactSettings: {
        _type: 'contactSettings',
        _id: 'contact-settings',
        email: 'cmbruce1015@gmail.com',
        phone: '+254 741 058 917',
        location: 'Munich, Germany / Nairobi, Kenya',
        availabilityStatus: 'Open to Opportunities',
    },

    // 3. Service Packages - Construction Management Services
    servicePackages: [
        {
            _type: 'servicePackage',
            title: 'Project Management & Oversight',
            category: 'construction',
            price: 'Custom Quote',
            features: [
                'Full Project Lifecycle Management',
                'Resource & Budget Allocation',
                'Risk Assessment & Mitigation',
                'Quality Control & Compliance',
                'Stakeholder Coordination',
            ],
            isPopular: true,
            description: 'End-to-end construction project management ensuring quality, safety, and timely delivery.',
        },
        {
            _type: 'servicePackage',
            title: 'Spatial Analysis & Mapping',
            category: 'gis',
            price: 'Custom Quote',
            features: [
                'Geographic Data Analysis',
                'Custom Map Development',
                'Site Selection Analysis',
                'Environmental Impact Mapping',
                'Infrastructure Planning',
            ],
            isPopular: true,
            description: 'GIS expertise for spatial analysis, mapping, and data-driven infrastructure decisions.',
        },
        {
            _type: 'servicePackage',
            title: 'AI Training Data QA',
            category: 'ai-data',
            price: 'Custom Quote',
            features: [
                'Data Annotation & Labeling',
                'Quality Assurance Protocols',
                'Model Validation Testing',
                'Training Dataset Curation',
                'Edge Case Identification',
            ],
            isPopular: true,
            description: 'Quality assurance and training data preparation for AI/ML systems ensuring accuracy and reliability.',
        },
        {
            _type: 'servicePackage',
            title: 'Strategic Advisory',
            category: 'consultancy',
            price: 'Custom Quote',
            features: [
                'Project Feasibility Studies',
                'Strategic Planning',
                'Sustainability Consulting',
                'Process Optimization',
                'Technology Adoption Strategy',
            ],
            isPopular: true,
            description: 'Strategic consulting for construction and development organizations seeking sustainable growth.',
        },
    ],

    // 4. Projects (Case Studies)
    projects: [
        {
            title: 'KENSUP Kibera Housing Project',
            slug: 'kensup-kibera-housing',
            category: 'construction',
            clientName: 'Ministry of Housing & Urban Development',
            projectDate: '2024-01-01',
            role: 'Site Supervisor',
            challenge: 'Managing high-density housing construction within constrained urban environments while ensuring quality and safety standards.',
            solution: 'Implemented rigorous on-site supervision protocols and coordinated daily between multiple contractors and community stakeholders.',
            impact: [
                'Delivered 200+ housing units on schedule',
                'Maintained zero-accident record on site',
                'Improved community buy-in through local involvement',
            ],
            tags: ['Supervision', 'Urban Housing', 'Safety'],
            imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
        },
        {
            title: 'Munich Digital Infrastructure Mapping',
            slug: 'munich-inframan-mapping',
            category: 'gis',
            clientName: 'Digitalstate GmbH',
            projectDate: '2023-10-01',
            role: 'GIS Specialist',
            challenge: 'Inconsistent spatial data across various municipal infrastructure projects leading to planning delays.',
            solution: 'Developed a unified GIS mapping framework to centralize and validate spatial data for city-wide infrastructure planning.',
            impact: [
                'Reduced planning time by 30%',
                'Improved data accuracy for infrastructure assets',
                'Enabled multi-agency data sharing',
            ],
            tags: ['GIS', 'Mapping', 'Infrastructure'],
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        },
        {
            title: 'AI Road Condition Dataset QA',
            slug: 'ai-road-qa',
            category: 'ai-data',
            clientName: 'Scale AI',
            projectDate: '2024-03-01',
            role: 'Quality Analyst',
            challenge: 'High error rates in automated road condition detection models due to poor training data quality.',
            solution: 'Designed and executed a rigorous QA protocol for 50,000+ data points, focusing on edge cases in rural infrastructure.',
            impact: [
                'Increased model accuracy from 82% to 94%',
                'Established new labeling benchmarks for rural terrain',
                'Streamlined feedback loop for data annotators',
            ],
            tags: ['AI', 'Data Quality', 'Automation'],
            imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop',
        },
    ],

    // 5. Experience (Work History)
    experience: [
        {
            _type: 'experience',
            company: 'Digitalstate GmbH',
            role: 'GIS Product Data Specialist',
            location: 'Munich, Germany',
            period: 'Sep 2023 - Present',
            description: 'Contributing to GIS product development and spatial data management for urban planning and infrastructure projects across Germany.',
            website: 'https://digitalstate.de',
            highlights: ['GIS data analysis', 'Product development', 'Quality assurance'],
            order: 1,
        },
        {
            _type: 'experience',
            company: 'Scale AI',
            role: 'AI Training & Quality Analyst',
            location: 'Remote',
            period: 'Jan 2024 - Present',
            description: 'Quality assurance for AI training datasets, ensuring data accuracy and identifying edge cases for machine learning model improvement.',
            highlights: ['Annotation QA', 'Model validation', 'Data curation'],
            order: 2,
        },
    ],
}

async function seed() {
    console.log('🌱 Starting Bruce Odhiambo Portfolio seed process...')

    try {
        console.log('👤 profile...')
        await client.createOrReplace(seedData.profile)

        console.log('📞 contact settings...')
        await client.createOrReplace(seedData.contactSettings)

        console.log('🗑️  clearing data...')
        await client.delete({ query: '*[_type in ["servicePackage", "project", "experience"]]' })

        console.log('📦 service packages...')
        for (const pkg of seedData.servicePackages) {
            await client.create(pkg)
        }

        console.log('💼 experience...')
        for (const exp of seedData.experience) {
            await client.create(exp as any)
        }

        console.log('🏗️  projects...')
        for (const p of seedData.projects) {
            const imageAsset = await uploadImage(p.imageUrl)
            const projectDoc = {
                _type: 'project',
                title: p.title,
                slug: { _type: 'slug', current: p.slug },
                category: p.category,
                clientName: p.clientName,
                projectDate: p.projectDate,
                role: (p as any).role,
                challenge: (p as any).challenge,
                solution: (p as any).solution,
                impact: (p as any).impact,
                tags: (p as any).tags,
                description: sampleDesc(p.title),
                coverImage: imageAsset,
                gallery: imageAsset ? [imageAsset] : [],
            }
            await client.create(projectDoc)
        }

        console.log('✅ Seed completed!')
    } catch (error) {
        console.error('❌ Seed failed:', error)
        process.exit(1)
    }
}

seed()
