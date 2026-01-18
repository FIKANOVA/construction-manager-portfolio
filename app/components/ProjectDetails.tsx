'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/app/components/ScrollReveal'
import { urlFor } from '@/lib/sanity'
// import { Project } from '@/lib/sanity' // If you have a Project type exported

import { PortableText } from '@portabletext/react'

interface ProjectDetailsProps {
    project: any // Replace 'any' with your Project type if available
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {

    // Helper to render images safely
    const resolveImage = (source: any) => {
        return source ? urlFor(source).width(1200).url() : 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'
    }

    return (
        <div className="pt-24 pb-16 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                {/* Back Link */}
                <ScrollReveal>
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-sm tracking-[0.1em] text-white/50 hover:text-white transition-colors uppercase mb-8"
                    >
                        <span>←</span> Back to Work
                    </Link>
                </ScrollReveal>

                {/* Header */}
                <ScrollReveal delay={0.1}>
                    <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
                        {project.category}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-light tracking-[0.1em] mb-6">
                        {project.title}
                    </h1>
                    <div className="text-white/60 max-w-2xl mb-12 prose prose-invert">
                        {Array.isArray(project.description) ? (
                            <PortableText value={project.description} />
                        ) : (
                            <p>{project.description || 'No description available.'}</p>
                        )}
                    </div>
                </ScrollReveal>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {project.gallery && project.gallery.length > 0 ? (
                        project.gallery.map((image: any, index: number) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <motion.div
                                    className={`relative overflow-hidden ${index === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Image
                                        src={resolveImage(image)}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </ScrollReveal>
                        ))
                    ) : (
                        /* Fallback/Cover View if no gallery */
                        <ScrollReveal>
                            <motion.div
                                className="relative overflow-hidden md:col-span-2 aspect-[16/9]"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Image
                                    src={resolveImage(project.coverImage)}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </ScrollReveal>
                    )}
                </div>

                {/* CTA */}
                <ScrollReveal delay={0.3}>
                    <div className="mt-16 text-center py-12 border border-white/10 bg-white/[0.02]">
                        <h3 className="text-2xl font-light tracking-wide mb-4">
                            Want something similar?
                        </h3>
                        <p className="text-white/50 mb-6 max-w-md mx-auto">
                            Let's create something beautiful together.
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
