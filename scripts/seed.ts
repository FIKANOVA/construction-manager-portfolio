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
            'Product Development',
            'Project Management',
            'Sustainability and Scalability',
            'Software Development',
            'Analytical Skills',
            'Microsoft Suite',
            'Virtual Assistance',
            'Data Analytics',
            'Strategic Management',
            'ArchiCAD',
            'Lead Generation',
            'Market Research',
            'Geographical Information Systems',
            'Generative AI',
            'Monitoring and Evaluation',
            'Entrepreneurship',
            'Web Services (Google, Amazon)',
        ],
        education: [
            {
                _key: 'edu-1',
                degree: 'MA Project Planning and Management',
                institution: 'University of Nairobi',
                period: 'Sep 2023 - Present',
            },
            {
                _key: 'edu-2',
                degree: 'BSc Construction Management',
                institution: 'University of Nairobi',
                period: 'Sep 2016 - Dec 2020',
            },
            {
                _key: 'edu-3',
                degree: 'Kenya Certificate of Secondary Education (KCSE)',
                institution: 'Maseno School',
                period: 'Feb 2012 - Nov 2015',
            },
            {
                _key: 'edu-4',
                degree: 'Kenya Certificate of Primary Education (KCPE)',
                institution: 'M M Shah Primary School',
                period: 'Jan 2004 - Nov 2011',
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
        phone: '+254741058917',
        location: 'Munich, Germany | Nairobi, Kenya',
        availabilityStatus: 'Open to Roles in Construction and Digital Transformation',
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
            title: 'SGR Phase 2A Construction',
            slug: 'sgr-phase-2a',
            category: 'construction',
            clientName: 'China Road and Bridge Corporation (CRBC)',
            projectDate: '2019-01-01',
            role: 'Assistant Construction Manager / Intern',
            projectLink: 'https://krc.co.ke/standard-gauge-railway/',
            challenge: 'Managing logistics and on-site coordination for a mega-infrastructure rail project across varied terrain.',
            solution: 'Assisted in site supervision, concrete quality control, and progress reporting to ensure adherence to Chinese rail standards.',
            impact: [
                'Successfully supported section completion on schedule',
                'Reduced material waste through tighter inventory management',
                'Facilitated communication between local and expatriate teams',
            ],
            tags: ['Railways', 'Infrastructure', 'Logistics'],
            imageUrl: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c9?q=80&w=2070&auto=format&fit=crop',
        },
        {
            title: 'Tatu City Infrastructure Development',
            slug: 'tatu-city-infra',
            category: 'construction',
            clientName: 'Tatu City Limited',
            projectDate: '2020-05-01',
            role: 'Junior Project Coordinator',
            projectLink: 'https://www.tatucity.com/',
            challenge: 'Coordinating multiple utility installations (power, water, roads) in a fast-paced urban development project.',
            solution: 'Managed vendor schedules and conducted daily site audits to ensure utility corridors were properly aligned.',
            impact: [
                'Streamlined utility installation timelines by 15%',
                'Enhanced site safety protocols leading to zero LTI during tenure',
                'Improved documentation for future urban maintenance',
            ],
            tags: ['Urban Development', 'Utilities', 'Project Control'],
            imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
        },
        {
            title: 'Urban Heat Mapping & Sustainability',
            slug: 'urban-heat-mapping',
            category: 'gis',
            clientName: 'Digitalstate GmbH',
            projectDate: '2023-11-01',
            role: 'GIS & Spatial Data Lead',
            projectLink: 'https://digitalstate.de/',
            challenge: 'Identifying urban heat islands across Munich to inform city cooling strategies and green infrastructure investment.',
            solution: 'Leveraged multispectral satellite imagery and ground sensors to create high-resolution thermal maps.',
            impact: [
                'Informed €5M greening strategy for Munich North',
                'Created publicly accessible map for vulnerable populations',
                'Enhanced predictive model for summer energy loads',
            ],
            tags: ['GIS', 'Sustainability', 'Remote Sensing'],
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        },
        {
            title: 'Kenya-South Sudan Road Link',
            slug: 'kenya-south-sudan-road',
            category: 'construction',
            clientName: 'China Railway No.10 Engineering Group',
            projectDate: '2021-06-01',
            role: 'Quality Control Technician',
            projectLink: 'https://www.crecg.com/english/2437/2443/index.html',
            challenge: 'Ensuring structural integrity and material quality for a critical cross-border road link in remote terrain.',
            solution: 'Conducted rigorous lab testing for concrete and asphalt, maintaining strict compliance with international road standards.',
            impact: [
                'Maintained 100% compliance rate for material testing',
                'Accelerated QA approval process by 20%',
                'Facilitated cross-border logistics for construction materials',
            ],
            tags: ['Roads', 'Quality Control', 'Logistics'],
            imageUrl: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=2000&auto=format&fit=crop',
        },
        {
            title: 'J365 Mentorship Initiative',
            slug: 'j365-mentorship',
            category: 'social-impact',
            clientName: 'J365 Foundation',
            projectDate: '2024-10-05',
            role: 'Project Lead',
            projectLink: 'https://j365.org',
            challenge: 'Empowering student and early-career athletes in building sustainable life paths beyond sports.',
            solution: 'Developed a mentorship-driven social initiative matching athletes with professionals across industries for career and personal development guidance.',
            impact: [
                'Launched strategic planning and execution framework',
                'Established mentor-mentee matching system',
                'Cultivated partnerships with rugby veterans and industry professionals',
                'Created sustainable community-building model through sport and innovation',
            ],
            tags: ['Social Impact', 'Mentorship', 'Sports', 'Leadership'],
            imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop',
        },
    ],

    // 5. Experience (Work History) - Complete CV Data
    experience: [
        {
            _type: 'experience',
            company: 'J365',
            role: 'Project Lead',
            location: 'Nairobi, Kenya',
            period: 'Oct 2024 - Present',
            description: 'As the project lead of J365, a mentorship-driven social initiative, I oversee strategic planning and execution to empower student and early-career athletes (particularly rugby players) in building sustainable life paths beyond the pitch.',
            website: 'https://j365.org',
            highlights: [
                'Lead overall project strategy, including goal-setting, logistics, and implementation',
                'Coordinate mentor–mentee engagement, matching athletes with professionals',
                'Cultivate partnerships with rugby veterans and professionals',
                'Manage program timelines, monitor progress, and evaluate outcomes',
            ],
            order: 1,
        },
        {
            _type: 'experience',
            company: 'Dustlight',
            role: 'Marketing & Sales Trainee',
            location: 'Munich, Germany',
            period: 'Jun 2025 - Jul 2025',
            description: 'As a start-up operations intern, I assist with sales development activities, lead generation and management, and preparation of presentations.',
            website: 'https://dustlight.de',
            highlights: [
                'Sales development activities',
                'Lead generation and management',
                'Presentation preparation',
            ],
            order: 2,
        },
        {
            _type: 'experience',
            company: 'Sustain East Africa',
            role: 'GIS and Project Management Assistant',
            location: 'Nairobi, Kenya',
            period: 'Dec 2024 - May 2025',
            description: 'Supported project planning and execution by integrating geospatial analysis with project management tools and practices. Role involved both technical and coordination functions.',
            website: 'https://sustaineastafrica.org',
            highlights: [
                'Cleaned and validated spatial data using QGIS',
                'Developed tools to monitor project deliverables and automate reminders',
                'Designed and refined work plan templates',
                'Provided regular progress reports and flagged data discrepancies',
            ],
            order: 3,
        },
        {
            _type: 'experience',
            company: 'LIMA Labs',
            role: 'Data Quality Specialist',
            location: 'Nairobi, Kenya',
            period: 'Jun 2023 - Nov 2023',
            description: 'Contributed to the development of high-quality machine learning datasets by accurately labelling and categorising data according to detailed project guidelines.',
            website: 'https://limalabs.ai',
            highlights: [
                'Applied project-specific annotation protocols to label images',
                'Conducted regular quality checks and participated in feedback cycles',
                'Collaborated to clarify ambiguous cases and update labels',
                'Supported creation of unbiased, high-performing AI models',
            ],
            order: 4,
        },
        {
            _type: 'experience',
            company: 'Jubilee Allianz',
            role: 'Data Entry Clerk',
            location: 'Nairobi, Kenya',
            period: 'Dec 2021 - Jan 2022',
            description: 'Accurately entered and updated essential data into company databases and systems, ensuring all records were precise and up-to-date.',
            website: 'https://jubileeallianz.com',
            highlights: [
                'Reviewed documents and verified information',
                'Corrected discrepancies and handled sensitive information',
                'Collaborated to streamline data processes',
            ],
            order: 5,
        },
        {
            _type: 'experience',
            company: 'Remotasks',
            role: '3D-LiDAR Specialist',
            location: 'Nairobi, Kenya',
            period: 'Nov 2019 - Nov 2021',
            description: 'Labelled and annotated LiDAR data to assist in training AI models for spatial recognition and object detection. Worked with complex 3D point cloud data.',
            website: 'https://remotasks.com',
            highlights: [
                'Identified and categorised objects (vehicles, pedestrians, infrastructure)',
                'Ensured annotations met quality standards for autonomous systems',
                'Developed reliable datasets for AI applications',
            ],
            order: 6,
        },
    ],

    // 6. Volunteering
    volunteering: [
        {
            _type: 'volunteering',
            organization: 'ETCO Kenya',
            role: 'Monitoring and Evaluation Officer',
            location: 'Nairobi, Kenya',
            period: 'Jan 2024 - Aug 2025',
            description: 'Support organisational growth and accountability by implementing robust M&E systems to assess the performance, impact, and alignment of development initiatives.',
            website: 'https://www.etco-kenya.org/',
            highlights: [
                'Design and deploy M&E tools to assess program outcomes',
                'Collect and analyse field data to generate actionable insights',
                'Support adaptive management with evidence-based recommendations',
            ],
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
        await client.delete({ query: '*[_type in ["servicePackage", "project", "experience", "volunteering"]]' })

        console.log('📦 service packages...')
        for (const pkg of seedData.servicePackages) {
            await client.create(pkg)
        }

        console.log('💼 experience...')
        for (const exp of seedData.experience) {
            await client.create(exp as any)
        }

        console.log('🤝 volunteering...')
        for (const vol of seedData.volunteering) {
            await client.create(vol as any)
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
                projectLink: (p as any).projectLink,
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
