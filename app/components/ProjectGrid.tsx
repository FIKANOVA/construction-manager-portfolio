'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import { type Project } from '@/lib/sanity'
import { urlFor as sanityUrlFor } from '@/lib/sanity'

// Helper to get image URL safely
const urlFor = (source: any) => {
    if (!source) return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' // Default placeholder
    return sanityUrlFor(source).width(800).url()
}

interface ProjectGridProps {
    initialProjects: Project[]
}

const categories = [
    { key: 'all', label: 'All' },
    { key: 'wedding', label: 'Weddings' },
    { key: 'portrait', label: 'Portraits' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'nature', label: 'Nature' },
    { key: 'sports', label: 'Sports' },
    { key: 'celebrations', label: 'Celebrations' },
]

export default function ProjectGrid({ initialProjects }: ProjectGridProps) {
    const [activeCategory, setActiveCategory] = useState('all')

    const filteredProjects = activeCategory === 'all'
        ? initialProjects
        : initialProjects.filter(p => p.category === activeCategory)

    return (
        <>
            {/* Category Filter */}
            <ScrollReveal delay={0.1}>
                <div className="flex flex-wrap gap-4 md:gap-8 mb-12 border-b border-white/10 pb-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`text-sm tracking-[0.15em] uppercase transition-all duration-300 pb-2 ${activeCategory === cat.key
                                ? 'text-white border-b-2 border-white'
                                : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </ScrollReveal>

            {/* Masonry Grid */}
            <div className="masonry portfolio-grid">
                <AnimatePresence mode="wait">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="masonry-item portfolio-item"
                        >
                            <Link
                                href={`/work/${project.slug.current}`}
                                className="block relative group overflow-hidden"
                            >
                                <div className={`relative ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
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
                                        <h3 className="text-lg font-light tracking-wide">
                                            {project.title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-24">
                    <p className="text-white/50">No projects found in this category.</p>
                </div>
            )}
        </>
    )
}
