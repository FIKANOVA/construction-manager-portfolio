import ScrollReveal from '@/app/components/ScrollReveal'
import { client, queries } from '@/lib/sanity'
import type { Experience } from '@/lib/sanity'

export const revalidate = 60

// Bruce Odhiambo's Complete Work Experience (Fallback when Sanity is empty)
const fallbackExperience = [
    {
        _id: '1',
        company: 'J365',
        role: 'Project Lead',
        location: 'Nairobi, Kenya',
        period: 'Oct 2024 - Present',
        description: 'Leading a mentorship-driven social initiative to empower student and early-career athletes (particularly rugby players) in building sustainable life paths beyond the pitch.',
        highlights: [
            'Lead overall project strategy, including goal-setting, logistics, and implementation',
            'Coordinate mentor–mentee engagement, matching athletes with professionals across industries',
            'Cultivate partnerships with experienced rugby veterans and professionals',
            'Manage program timelines, monitor progress, and evaluate outcomes',
            'Foster a growth-oriented, inclusive culture for participants',
        ],
    },
    {
        _id: '2',
        company: 'Dustlight',
        role: 'Marketing & Sales Trainee',
        location: 'Munich, Germany',
        period: 'Jun 2025 - Jul 2025',
        description: 'Start-up operations intern supporting sales development, lead generation, and presentation preparation.',
        website: 'https://dustlight.de',
        highlights: [
            'Sales development activities',
            'Lead generation and management',
            'Preparation of presentations',
        ],
    },
    {
        _id: '3',
        company: 'Sustain East Africa',
        role: 'GIS & Project Management Assistant',
        location: 'Nairobi, Kenya',
        period: 'Dec 2024 - May 2025',
        description: 'Supported project planning and execution by integrating geospatial analysis with project management tools and practices.',
        highlights: [
            'Cleaned and validated spatial data using QGIS',
            'Developed tools to monitor project deliverables and automate email reminders',
            'Designed and refined work plan templates to enhance tracking efficiency',
            'Provided regular progress reports and flagged data discrepancies',
            'Collaborated with team leads to maintain consistency and meet milestones',
        ],
    },
    {
        _id: '4',
        company: 'ETCO Kenya',
        role: 'Monitoring and Evaluation Officer (Volunteer)',
        location: 'Nairobi, Kenya',
        period: 'Jan 2024 - Aug 2025',
        description: 'Supporting organisational growth and accountability by implementing robust M&E systems to assess the performance and impact of development initiatives.',
        website: 'https://www.etco-kenya.org/',
        highlights: [
            'Design and deploy M&E tools to assess program outcomes',
            'Collect and analyse field data to generate actionable insights',
            'Support adaptive management with evidence-based recommendations',
            'Facilitate cross-functional collaboration between teams',
        ],
    },
    {
        _id: '5',
        company: 'LIMA Labs',
        role: 'Data Quality Specialist',
        location: 'Nairobi, Kenya',
        period: 'Jun 2023 - Nov 2023',
        description: 'Contributed to the development of high-quality machine learning datasets by accurately labelling and categorising data according to detailed project guidelines.',
        highlights: [
            'Applied project-specific annotation protocols to label images and data',
            'Conducted regular quality checks and participated in feedback cycles',
            'Collaborated with team to clarify ambiguous cases and update labels',
            'Supported creation of unbiased, high-performing AI models',
        ],
    },
    {
        _id: '6',
        company: 'Jubilee Allianz',
        role: 'Data Entry Clerk',
        location: 'Nairobi, Kenya',
        period: 'Dec 2021 - Jan 2022',
        description: 'Accurately entered and updated essential data into company databases and systems, ensuring all records were precise and up-to-date.',
        highlights: [
            'Reviewed documents, verified information, and corrected discrepancies',
            'Handled sensitive information with confidentiality and accuracy',
            'Collaborated with team to streamline data processes',
            'Supported efficient data management for operational effectiveness',
        ],
    },
    {
        _id: '7',
        company: 'Remotasks',
        role: '3D-LiDAR Specialist',
        location: 'Nairobi, Kenya',
        period: 'Nov 2019 - Nov 2021',
        description: 'Labelled and annotated LiDAR data to assist in training AI models for spatial recognition and object detection in autonomous systems.',
        highlights: [
            'Worked with complex 3D point cloud data',
            'Identified and categorised vehicles, pedestrians, and infrastructure',
            'Ensured all annotations met quality standards',
            'Contributed to datasets for autonomous driving applications',
        ],
    },
]

export default async function WorkPage() {
    const sanityExperience = await client.fetch<Experience[]>(queries.allExperience)
    const displayExperience = sanityExperience.length > 0 ? sanityExperience : fallbackExperience

    return (
        <div className="pt-24 pb-16 bg-[#0d2137] min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <ScrollReveal>
                    <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-4 text-white">
                        Experience
                    </h1>
                    <p className="text-white max-w-xl mb-16 opacity-80">
                        Professional journey in construction management, GIS analysis, project leadership, and AI data quality.
                    </p>
                </ScrollReveal>

                {/* Experience Timeline */}
                <div className="space-y-12">
                    {displayExperience.map((exp: any, index: number) => (
                        <ScrollReveal key={exp._id || exp.id} delay={index * 0.05}>
                            <div className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-xl md:text-2xl font-light tracking-wide text-white">
                                                {exp.company}
                                            </h2>
                                            {exp.website && (
                                                <a
                                                    href={exp.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-amber-400 transition-all border border-white/10 group"
                                                    title={`Visit ${exp.company}`}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
                                                        <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-amber-400 text-sm tracking-wide mt-1">
                                            {exp.role}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs tracking-[0.15em] text-white uppercase opacity-90">
                                            {exp.period}
                                        </p>
                                        <p className="text-xs text-white mt-1 opacity-70">
                                            {exp.location}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-white leading-relaxed mb-6 opacity-90">
                                    {exp.description}
                                </p>

                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {exp.highlights?.map((highlight: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-white text-sm opacity-85">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Education Section */}
                <ScrollReveal delay={0.3}>
                    <div className="mt-24 pt-16 border-t border-white/10">
                        <h2 className="text-3xl font-light tracking-[0.15em] uppercase mb-12 text-center text-white">
                            Education
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            <div className="text-center p-6 border border-white/10 bg-white/[0.02]">
                                <p className="text-xs tracking-[0.15em] text-amber-400 uppercase mb-2">
                                    2023 - Present
                                </p>
                                <h3 className="text-lg font-light mb-1 text-white/70">
                                    MA Project Planning and Management
                                </h3>
                                <p className="text-white text-sm">
                                    University of Nairobi
                                </p>
                            </div>
                            <div className="text-center p-6 border border-white/10 bg-white/[0.02]">
                                <p className="text-xs tracking-[0.15em] text-amber-400 uppercase mb-2">
                                    2016 - 2020
                                </p>
                                <h3 className="text-lg font-light mb-1 text-white/70">
                                    BSc Construction Management
                                </h3>
                                <p className="text-white text-sm">
                                    University of Nairobi
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    )
}
