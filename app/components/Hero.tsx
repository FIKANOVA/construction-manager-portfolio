'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
            {/* Layer 1: Subtle Texture & Grain for High-End Quality */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Layer 2: Subtle Smoky Blobs for Depth */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [-20, 40, -20],
                        y: [-20, 20, -20],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-[0.03] blur-[150px] rounded-full"
                />
                <motion.div
                    animate={{
                        x: [20, -40, 20],
                        y: [40, -20, 40],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white opacity-[0.02] blur-[120px] rounded-full"
                />
            </div>

            {/* Layer 3: Construction Background (Ghostly Presence) */}
            <div className="absolute inset-0 z-0 scale-105">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 20, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                        alt="Construction Site Background"
                        fill
                        className="object-cover opacity-[0.12] grayscale contrast-[1.2]"
                    />
                </motion.div>
            </div>

            {/* Layer 4: Bruce's Profile Image - Integrated as a silhouette/lighten */}
            <div className="absolute inset-x-0 bottom-0 top-20 z-10 flex justify-center items-end">
                <div className="relative w-full h-[88%] max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src="/bruce-headshot.jpg"
                            alt="Bruce Odhiambo"
                            fill
                            priority
                            className="object-contain object-bottom opacity-75 mix-blend-screen brightness-[1.1] grayscale [mask-image:linear-gradient(to_top,black_40%,transparent_95%)]"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Layer 5: Darkness & Vignette */}
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/80 via-transparent to-black" />
            <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

            {/* Layer 6: Typography Content */}
            <div className="relative z-30 h-full flex flex-col items-center justify-center px-6">
                <div className="max-w-5xl w-full text-center">
                    {/* Tagline Animation */}
                    <div className="overflow-hidden mb-8">
                        <motion.span
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
                            className="block text-[10px] md:text-xs font-light tracking-[0.5em] text-white/50 uppercase"
                        >
                            Infrastructure • Strategy • Innovation
                        </motion.span>
                    </div>

                    {/* Name with Split Animation */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                        className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] font-extralight tracking-tight text-white mb-12"
                    >
                        Bruce <span className="block italic text-white/90">Odhiambo</span>
                    </motion.h1>

                    {/* Roles with Divider Animation */}
                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 48 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="h-[1px] bg-white/20 mb-8"
                        />
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            className="text-xs md:text-sm tracking-[0.3em] text-white/60 uppercase"
                        >
                            Construction Manager <span className="mx-2 text-white/20">|</span> Digital Product Lead
                        </motion.p>
                    </div>

                    {/* CTA Group */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center"
                    >
                        <Link
                            href="/BO_CV.pdf"
                            target="_blank"
                            className="group relative inline-block"
                        >
                            <span className="relative z-10 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70 group-hover:text-white transition-colors duration-500">
                                View Portfolio CV
                            </span>
                            <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white/40 transition-all duration-700 group-hover:w-full" />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-10 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white transition-all duration-500"
                        >
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>

                {/* Vertical Scroll Line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="absolute bottom-10 flex flex-col items-center gap-6"
                >
                    <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                    <span className="text-[9px] tracking-[0.6em] text-white/20 uppercase rotate-90 origin-left ml-2">Scroll</span>
                </motion.div>
            </div>
        </section>
    )
}
