import ScrollReveal from '@/app/components/ScrollReveal'
import { client, queries } from '@/lib/sanity'
import type { Experience } from '@/lib/sanity'

export const revalidate = 60

// Bruce Odhiambo's Full Work Experience (Fallback)
const fallbackExperience = [
    {
        _id: '1',
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
    // ... (Other entries can be added to Sanity, keeping one as fallback example)
]

export default async function WorkPage() {
    const sanityExperience = await client.fetch<Experience[]>(queries.allExperience)
    const displayExperience = sanityExperience.length > 0 ? sanityExperience : fallbackExperience

    return (
        <div className="pt-24 pb-16 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <ScrollReveal>
                    <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-4">
                        Experience
                    </h1>
                    <p className="text-white/60 max-w-xl mb-16">
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
                                            <h2 className="text-xl md:text-2xl font-light tracking-wide">
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
                                        <p className="text-xs tracking-[0.15em] text-white/50 uppercase">
                                            {exp.period}
                                        </p>
                                        <p className="text-xs text-white/40 mt-1">
                                            {exp.location}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-white/60 leading-relaxed mb-6">
                                    {exp.description}
                                </p>

                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {exp.highlights?.map((highlight: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-white/50 text-sm">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    )
}
