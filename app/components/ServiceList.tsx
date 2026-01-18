'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import { type ServicePackage } from '@/lib/sanity'

interface ServiceListProps {
    initialPackages: ServicePackage[]
}

const categoryTabs = [
    { key: 'wedding', label: 'Wedding' },
    { key: 'portrait', label: 'Portrait' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'nature', label: 'Nature' },
    { key: 'sports', label: 'Sports' },
    { key: 'celebrations', label: 'Celebrations' },
]

export default function ServiceList({ initialPackages }: ServiceListProps) {
    const [activeCategory, setActiveCategory] = useState('wedding')

    const filteredPackages = initialPackages.filter(p => p.category === activeCategory)

    return (
        <>
            {/* Category Tabs */}
            <ScrollReveal delay={0.1}>
                <div className="flex flex-wrap gap-2 md:gap-4 mb-12">
                    {categoryTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveCategory(tab.key)}
                            className={`px-6 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-300 border ${activeCategory === tab.key
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-white/60 border-white/20 hover:border-white/50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </ScrollReveal>

            {/* Package Cards */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredPackages.map((pkg, index) => (
                        <motion.div
                            key={pkg._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 border ${pkg.isPopular
                                ? 'border-amber-500/50 bg-amber-500/5'
                                : 'border-white/10 bg-white/[0.02]'
                                } hover:border-white/30 transition-all duration-300`}
                        >
                            {/* Popular Badge */}
                            {pkg.isPopular && (
                                <div className="absolute -top-3 left-6 px-4 py-1 bg-amber-500 text-black text-xs tracking-[0.1em] uppercase font-medium">
                                    Best Value
                                </div>
                            )}

                            {/* Package Content */}
                            <div className="mb-6">
                                <h3 className="text-xl font-light tracking-wide mb-2">
                                    {pkg.title}
                                </h3>
                                <p className="text-white/50 text-sm">
                                    {pkg.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <span className="text-4xl md:text-5xl font-light tracking-tight">
                                    {pkg.price}
                                </span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {pkg.features?.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                                        <svg
                                            className="w-4 h-4 text-white/40 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link
                                href="/contact"
                                className={`block w-full py-4 text-center text-sm tracking-[0.15em] uppercase transition-all duration-300 ${pkg.isPopular
                                    ? 'bg-white text-black hover:bg-white/90'
                                    : 'border border-white/30 hover:bg-white hover:text-black'
                                    }`}
                            >
                                Book This Package
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </>
    )
}
