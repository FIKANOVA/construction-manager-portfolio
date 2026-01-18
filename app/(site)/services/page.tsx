
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/app/components/ScrollReveal'

export const revalidate = 60 // Revalidate every minute

// Bruce Odhiambo's Services
const services = [
    {
        id: '1',
        title: 'Project Management & M&E Strategy',
        description: 'End-to-end project lifecycle management with robust Monitoring & Evaluation frameworks. Expertise in construction oversight, resource allocation, and stakeholder coordination.',
        features: [
            'Construction Project Oversight',
            'M&E Framework Development',
            'Budget & Resource Management',
            'Stakeholder Coordination',
            'Risk Assessment & Mitigation',
        ],
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2689&auto=format&fit=crop', // Architecture/Construction
    },
    {
        id: '2',
        title: 'GIS & Spatial Intelligence',
        description: 'Geographic Information Systems expertise for spatial analysis, mapping, and data-driven decision making in construction and environmental projects.',
        features: [
            'Spatial Data Analysis',
            'Custom Map Development',
            'Environmental Impact Mapping',
            'Site Selection Analysis',
            'Infrastructure Planning',
        ],
        image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2669&auto=format&fit=crop', // Map/Data
    },
    {
        id: '3',
        title: 'AI Training Data & QA',
        description: 'Quality assurance and training data preparation for AI/ML systems. Ensuring data accuracy and model reliability through rigorous validation processes.',
        features: [
            'Data Annotation & Labeling',
            'Quality Assurance Protocols',
            'Model Validation Testing',
            'Training Dataset Curation',
            'Edge Case Identification',
        ],
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop', // AI/Abstract
    },
]

export default async function ServicesPage() {
    return (
        <div className="pt-24 pb-16 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <ScrollReveal>
                    <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-4">
                        Services
                    </h1>
                    <p className="text-white/60 max-w-xl mb-16">
                        Professional services in construction management, GIS analysis, and AI quality assurance.
                        Each engagement is tailored to deliver measurable results.
                    </p>
                </ScrollReveal>

                {/* Services List */}
                <div className="space-y-16">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id} delay={index * 0.1}>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-b border-white/10 items-start">
                                {/* Column 1: Description (5 cols) */}
                                <div className="lg:col-span-5">
                                    <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-6">
                                        {service.title}
                                    </h2>
                                    <p className="text-white/60 leading-relaxed text-lg">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Column 2: Capabilities (3 cols) */}
                                <div className="lg:col-span-3">
                                    <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase mb-6 border-b border-white/10 pb-2">
                                        Key Capabilities
                                    </h3>
                                    <ul className="space-y-4">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Column 3: Image (4 cols) - To the right of capabilities */}
                                <div className="lg:col-span-4">
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5 border border-white/10 group">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* CTA Section */}
                <ScrollReveal delay={0.3}>
                    <div className="mt-16 text-center py-12 border border-white/10 bg-white/[0.02]">
                        <h3 className="text-2xl font-light tracking-wide mb-4">
                            Let&apos;s Discuss Your Project
                        </h3>
                        <p className="text-white/50 mb-6 max-w-md mx-auto">
                            Looking for expertise in construction management, GIS, or AI quality assurance?
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-8 py-3 border border-white/30 text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    )
}
