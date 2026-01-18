'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'
import { urlFor as sanityUrlFor } from '@/lib/sanity'
import { type Project } from '@/lib/sanity'

// Helper to get image URL safely
const urlFor = (source: any) => {
    if (!source) return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' // Default placeholder
    return sanityUrlFor(source).width(800).url()
}

interface FeaturedWorkProps {
    projects: Project[]
}

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
    return (
        <section className="py-24 md:py-32 bg-black">
            <div className="container mx-auto px-6">
                <ScrollReveal>
                    <div className="flex items-center justify-between mb-16">
                        <h2 className="text-2xl md:text-3xl font-light tracking-[0.15em] uppercase">
                            Featured Work
                        </h2>
                        <Link
                            href="/work"
                            className="text-sm tracking-[0.1em] text-white/60 hover:text-white transition-colors uppercase group"
                        >
                            View All
                            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </Link>
                    </div>
                </ScrollReveal>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 portfolio-grid">
                    {projects.map((project, index) => (
                        <ScrollReveal key={project._id} delay={index * 0.1}>
                            <Link
                                href={`/work/${project.slug.current}`}
                                className="portfolio-item block relative group aspect-[4/3] overflow-hidden"
                            >
                                <Image
                                    src={urlFor(project.coverImage)}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-xs tracking-[0.2em] text-white/60 uppercase mb-2">
                                        {project.category}
                                    </p>
                                    <h3 className="text-xl md:text-2xl font-light tracking-wide">
                                        {project.title}
                                    </h3>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
