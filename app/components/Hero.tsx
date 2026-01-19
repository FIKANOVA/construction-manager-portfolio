'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#f8faff]">
            {/* Layer 1: Construction Background - Very subtle on light bg */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                    alt="Construction Site Background"
                    fill
                    className="object-cover opacity-5 grayscale"
                />
            </div>

            {/* Layer 2: Bruce's Profile Image - Optimized for light bg */}
            <div className="absolute inset-x-0 bottom-0 top-20 z-0 flex justify-center items-end">
                <div className="relative w-full h-full max-w-4xl">
                    <Image
                        src="/bruce-headshot.jpg"
                        alt="Bruce Odhiambo"
                        fill
                        priority
                        className="object-contain object-bottom opacity-100 grayscale brightness-110 [mask-image:linear-gradient(to_top,black_40%,transparent_90%)]"
                    />
                </div>
            </div>

            {/* Layer 3: Subtle Smoky Overlay for transition */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-white/40 to-[#0d2137]/10" />

            {/* Layer 4: Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 pt-20 text-center">
                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-7xl lg:text-9xl font-light tracking-[0.1em] text-[#0d2137] drop-shadow-sm uppercase"
                >
                    Bruce <span className="font-medium">Odhiambo</span>
                </motion.h1>

                {/* Subtitles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8 flex flex-col items-center gap-4"
                >
                    <div className="h-[2px] w-16 bg-[#0d2137]/20" />
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <span className="text-sm md:text-lg tracking-[0.3em] text-[#0d2137]/80 uppercase font-light">
                            Construction Manager
                        </span>
                        <span className="hidden md:block text-[#0d2137]/20 text-xl font-thin">/</span>
                        <span className="text-sm md:text-lg tracking-[0.3em] text-[#0d2137]/60 uppercase font-light">
                            Digital Product Lead
                        </span>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 flex flex-col sm:flex-row gap-6"
                >
                    <Link
                        href="/BO_CV.pdf"
                        target="_blank"
                        className="px-10 py-4 bg-[#0d2137] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#1a3a5c] transition-all duration-300 shadow-xl"
                    >
                        View Portfolio
                    </Link>
                    <Link
                        href="/contact"
                        className="px-10 py-4 border border-[#0d2137]/20 text-[#0d2137] text-xs tracking-[0.2em] uppercase hover:bg-[#0d2137] hover:text-white transition-all duration-300"
                    >
                        Start Inquiry
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-3"
                    >
                        <div className="w-[1px] h-12 bg-gradient-to-b from-[#0d2137]/0 via-[#0d2137]/40 to-[#0d2137]/0" />
                        <span className="text-[10px] tracking-[0.5em] text-[#0d2137]/30 uppercase ml-1">Explore</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

