/**
 * Sanity Seed Script - Bruce Odhiambo Construction Manager Portfolio
 * 
 * This script seeds the Sanity CMS with Bruce's profile data,
 * services, projects (case studies), and experience.
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
        // Construction Services
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
            title: 'Site Supervision',
            category: 'construction',
            price: 'Custom Quote',
            features: [
                'Daily Site Inspections',
                'Progress Documentation',
                'Contractor Coordination',
                'Safety Compliance Monitoring',
                'Issue Resolution',
            ],
            isPopular: false,
            description: 'Professional site supervision to ensure construction standards and safety protocols are maintained.',
        },
        {
            _type: 'servicePackage',
            title: 'M&E Framework Development',
            category: 'construction',
            price: 'Custom Quote',
            features: [
                'KPI Development',
                'Data Collection Strategy',
                'Progress Tracking Systems',
                'Impact Assessment',
                'Reporting Dashboards',
            ],
            isPopular: false,
            description: 'Robust Monitoring & Evaluation frameworks for construction and development projects.',
        },

        // GIS Services
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
            title: 'Urban Planning Support',
            category: 'gis',
            price: 'Custom Quote',
            features: [
                'Land Use Analysis',
                'Zoning Compliance Review',
                'Development Density Studies',
                'Traffic Pattern Analysis',
                'Green Space Planning',
            ],
            isPopular: false,
            description: 'GIS-based support for urban planning and sustainable development initiatives.',
        },

        // AI & Data Quality Services
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
            title: 'Data Quality Assessment',
            category: 'ai-data',
            price: 'Custom Quote',
            features: [
                'Data Accuracy Audits',
                'Completeness Analysis',
                'Consistency Checks',
                'Bias Detection',
                'Quality Improvement Plans',
            ],
            isPopular: false,
            description: 'Comprehensive data quality assessments to ensure your datasets meet production standards.',
        },

        // Consultancy Services
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
        {
            _type: 'servicePackage',
            title: 'Team Training & Capacity Building',
            category: 'consultancy',
            price: 'Custom Quote',
            features: [
                'Project Management Training',
                'GIS Skills Workshops',
                'Data Literacy Programs',
                'Best Practices Workshops',
                'Mentorship Programs',
            ],
            isPopular: false,
            description: 'Training and capacity building for teams in construction, GIS, and project management.',
        },
    ],

    // 4. Projects (Case Studies) - Based on Bruce's CV
    projects: [
        {
            title: 'KENSUP Kibera Housing Project',
            slug: 'kensup-kibera-housing',
            category: 'construction',
            clientName: 'Ministry of Housing & Urban Development',
            projectDate: '2024-01-01',
            description: 'Supervised the construction of affordable housing units in Kibera as part of the Kenya Slum Upgrading Programme (KENSUP). Oversaw quality control, safety compliance, and coordination with multiple contractors.',
            imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2689&auto=format&fit=crop',
        },
        {
            title: 'Nairobi River Restoration M&E',
            slug: 'nairobi-river-restoration',
            category: 'm-and-e',
            clientName: 'Nairobi Metropolitan Services',
            projectDate: '2023-06-01',
            description: 'Developed and implemented a comprehensive Monitoring & Evaluation framework for the Nairobi River restoration project, tracking environmental impact indicators and community engagement metrics.',
            imageUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2669&auto=format&fit=crop',
        },
        {
            title: 'Munich Urban GIS Mapping',
            slug: 'munich-urban-gis-mapping',
            category: 'gis',
            clientName: 'Digitalstate GmbH',
            projectDate: '2023-09-01',
            description: 'Led GIS mapping and spatial analysis for urban development projects in Munich, Germany. Created detailed maps for infrastructure planning and environmental assessments.',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        },
        {
            title: 'AI Mapping Data Quality Assurance',
            slug: 'ai-mapping-data-qa',
            category: 'ai-data',
            clientName: 'Scale AI / Outlier',
            projectDate: '2024-06-01',
            description: 'Quality assurance for AI training datasets focused on autonomous vehicle navigation and mapping applications. Ensured data accuracy and identified edge cases for model improvement.',
            imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop',
        },
        {
            title: 'Affordable Housing Sustainability Study',
            slug: 'affordable-housing-sustainability',
            category: 'sustainability',
            clientName: 'University of Nairobi',
            projectDate: '2022-05-01',
            description: 'Research project analyzing sustainable construction practices for affordable housing in Kenya, focusing on eco-friendly materials and energy efficiency.',
            imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2565&auto=format&fit=crop',
        },
        {
            title: 'Community Infrastructure Assessment',
            slug: 'community-infrastructure-assessment',
            category: 'construction',
            clientName: 'Local Government Authority',
            projectDate: '2021-08-01',
            description: 'Comprehensive infrastructure assessment for rural community development, including roads, water systems, and public facilities. Developed priority action plans and cost estimates.',
            imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
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
            highlights: [
                'GIS data analysis and mapping',
                'Product development support',
                'Quality assurance for spatial datasets',
            ],
            order: 1,
        },
        {
            _type: 'experience',
            company: 'Scale AI / Outlier',
            role: 'AI Training & Quality Analyst',
            location: 'Remote',
            period: 'Jan 2024 - Present',
            description: 'Quality assurance for AI training datasets, ensuring data accuracy and identifying edge cases for machine learning model improvement.',
            website: 'https://scale.com',
            highlights: [
                'Data annotation and labeling QA',
                'Edge case identification',
                'Model validation support',
            ],
            order: 2,
        },
        {
            _type: 'experience',
            company: 'Ministry of Housing & Urban Development',
            role: 'Construction Site Supervisor',
            location: 'Nairobi, Kenya',
            period: '2020 - 2023',
            description: 'Supervised construction of affordable housing projects under KENSUP, ensuring quality control, safety compliance, and contractor coordination.',
            highlights: [
                'Project oversight and coordination',
                'Quality and safety compliance',
                'Stakeholder management',
            ],
            order: 3,
        },
        {
            _type: 'experience',
            company: 'University of Nairobi',
            role: 'Research Assistant',
            location: 'Nairobi, Kenya',
            period: '2019 - 2020',
            description: 'Conducted research on sustainable construction practices and affordable housing in Kenya.',
            highlights: [
                'Data collection and analysis',
                'Literature review',
                'Report writing',
            ],
            order: 4,
        },
    ],
}

async function seed() {
    console.log('🌱 Starting Bruce Odhiambo Portfolio seed process...')
    console.log('================================================\n')

    try {
        // 1. Profile
        console.log('👤 Creating/Updating profile...')
        await client.createOrReplace(seedData.profile)
        console.log('   ✓ Profile created\n')

        // 2. Contact Settings
        console.log('📞 Creating/Updating contact settings...')
        await client.createOrReplace(seedData.contactSettings)
        console.log('   ✓ Contact settings created\n')

        // 3. Clear existing dynamic data
        console.log('🗑️  Clearing existing data...')
        await client.delete({ query: '*[_type == "servicePackage"]' })
        await client.delete({ query: '*[_type == "project"]' })
        await client.delete({ query: '*[_type == "experience"]' })
        console.log('   ✓ Cleared service packages, projects, and experience\n')

        // 4. Service Packages
        console.log('📦 Creating service packages...')
        for (const pkg of seedData.servicePackages) {
            await client.create(pkg)
            console.log(`   ✓ ${pkg.title}`)
        }
        console.log('')

        // 5. Experience
        console.log('💼 Creating experience entries...')
        for (const exp of seedData.experience) {
            await client.create(exp)
            console.log(`   ✓ ${exp.company} - ${exp.role}`)
        }
        console.log('')

        // 6. Projects (Case Studies)
        console.log('🏗️  Creating projects (case studies) with images...')
        for (const p of seedData.projects) {
            console.log(`   > Uploading image for ${p.title}...`)
            const imageAsset = await uploadImage(p.imageUrl)

            const projectDoc = {
                _type: 'project',
                title: p.title,
                slug: { _type: 'slug', current: p.slug },
                category: p.category,
                clientName: p.clientName,
                projectDate: p.projectDate,
                description: sampleDesc(p.description),
                coverImage: imageAsset,
                gallery: imageAsset ? [imageAsset] : [],
            }

            await client.create(projectDoc)
            console.log(`   ✓ ${p.title}`)
        }

        console.log('\n================================================')
        console.log('✅ Seed completed successfully!')
        console.log('================================================')
        console.log('\n📊 Summary:')
        console.log(`   • Profile: 1`)
        console.log(`   • Contact Settings: 1`)
        console.log(`   • Service Packages: ${seedData.servicePackages.length}`)
        console.log(`   • Projects: ${seedData.projects.length}`)
        console.log(`   • Experience: ${seedData.experience.length}`)
        console.log('\n🔗 Categories covered:')
        console.log('   Construction, GIS, AI & Data, Consultancy, M&E, Sustainability')
        console.log('\n👉 Visit /studio to manage content in Sanity Studio')

    } catch (error) {
        console.error('\n❌ Seed failed:', error)
        process.exit(1)
    }
}

seed()
