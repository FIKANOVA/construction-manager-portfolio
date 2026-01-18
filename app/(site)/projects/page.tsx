import Link from 'next/link'
import Image from 'next/image' // Keeping Image for Next.js optimization
import ScrollReveal from '@/app/components/ScrollReveal'
import { client, queries, urlFor } from '@/lib/sanity'
import type { Project } from '@/lib/sanity'

export const revalidate = 60

// Case Study Data (Fallback)
const fallbackProjects = [
    {
        _id: 'j365',
        title: 'J365 Rugby Mentorship',
        role: 'Project Lead',
        category: 'Social Impact & Mentorship',
        period: 'Oct 2024 - Present',
        description: 'A mentorship-driven social initiative empowering student and early-career athletes.',
        challenge: 'Many student-athletes struggle with the transition from sports to professional careers.',
        solution: 'Developed a comprehensive mentorship framework matching athletes with industry professionals.',
        coverImage: 'https://images.unsplash.com/photo-1529180184693-41c463f25d91?q=80&w=2670&auto=format&fit=crop',
        impact: [
            'Established strategic partnerships',
            'Coordinated mentor-mentee engagements',
            'Implemented M&E tools',
            'Fostered an inclusive community',
        ],
        tags: ['Strategy', 'Mentorship', 'Partnerships', 'M&E'],
        projectLink: 'https://j365.org',
        slug: { current: 'j365-rugby' }
    },
    // Add other fallback if needed, but keeping it minimal to encourage CMS usage
]

export default async function ProjectsPage() {
    const sanityProjects = await client.fetch<Project[]>(queries.allProjects)
    // Use Sanity projects if available, otherwise use fallback (mapped to match structure)
    const displayProjects = sanityProjects.length > 0 ? sanityProjects : fallbackProjects

    return (
        <div className="pt-24 pb-16 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <ScrollReveal>
                    <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-4">
                        Case Studies
                    </h1>
                    <p className="text-white/60 max-w-xl mb-16">
                        In-depth look at key projects driving sustainable development and digital innovation.
                    </p>
                </ScrollReveal>

                {/* Projects List */}
                <div className="space-y-24">
                    {displayProjects.map((project: any, index: number) => (
                        <ScrollReveal key={project._id || project.id} delay={index * 0.1}>
                            <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-white/10 pt-12">
                                {/* Visual Side */}
                                <div className="space-y-8">
                                    <div className="relative aspect-video overflow-hidden bg-white/5 border border-white/10">
                                        <Image
                                            src={typeof project.coverImage === 'string' ? project.coverImage : urlFor(project.coverImage).url()}
                                            alt={project.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags?.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-1.5 border border-white/20 text-xs tracking-wider uppercase text-white/70"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="flex flex-col justify-center">
                                    <div className="mb-6">
                                        <div className="flex items-center gap-4 text-xs tracking-[0.2em] mb-2">
                                            <span className="text-amber-400 uppercase">{project.category}</span>
                                            <span className="text-white/30">|</span>
                                            <span className="text-white/50">{project.period}</span>
                                        </div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                                                {project.title}
                                            </h2>
                                            {project.projectLink && (
                                                <a
                                                    href={project.projectLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-amber-400 transition-all border border-white/10 group mt-1"
                                                    title={`Visit ${project.title}`}
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
                                                        <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-lg text-white/80 font-light">
                                            {project.role}
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase mb-3">
                                                The Challenge
                                            </h3>
                                            <p className="text-white/60 leading-relaxed">
                                                {project.challenge}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase mb-3">
                                                The Solution
                                            </h3>
                                            <p className="text-white/60 leading-relaxed">
                                                {project.solution}
                                            </p>
                                        </div>

                                        <div className="bg-white/[0.03] p-6 border border-white/10">
                                            <h3 className="text-xs tracking-[0.2em] text-amber-400 uppercase mb-4">
                                                Key Impact
                                            </h3>
                                            <ul className="space-y-3">
                                                {project.impact?.map((item: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                                                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>

                {/* CTA Section */}
                <ScrollReveal delay={0.3}>
                    <div className="mt-24 text-center">
                        <h3 className="text-2xl font-light tracking-wide mb-6">
                            Want to see more detailed work samples?
                        </h3>
                        <div className="flex justify-center gap-6">
                            <Link
                                href="/contact"
                                className="px-8 py-3 bg-white text-black text-sm tracking-[0.15em] uppercase hover:bg-white/90 transition-all duration-300"
                            >
                                Contact Me
                            </Link>
                            <Link
                                href="/BO_CV.pdf"
                                target="_blank"
                                className="px-8 py-3 border border-white/30 text-white text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                            >
                                View CV
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    )
}
