'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#0d2137]">
            {/* Layer 1: Construction Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                    alt="Construction Site Background"
                    fill
                    className="object-cover opacity-30 grayscale"
                />
            </div>

            {/* Layer 2: Bruce's Profile Image - Positioned to show full face */}
            <div className="absolute inset-x-0 bottom-0 top-20 z-0 flex justify-center items-end">
                <div className="relative w-full h-full max-w-4xl">
                    <Image
                        src="/bruce-headshot.jpg"
                        alt="Bruce Odhiambo"
                        fill
                        priority
                        className="object-contain object-bottom opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_60%)]"
                    />
                </div>
            </div>

            {/* Layer 3: Gradient Overlay for Text Readability - Updated for blue theme */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d2137] via-[#0d2137]/60 to-[#0d2137]/80" />

            {/* Layer 4: Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 pt-20">
                {/* Name - H1 Tag */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl md:text-6xl lg:text-8xl font-light tracking-[0.2em] text-white text-center drop-shadow-2xl"
                >
                    Bruce Odhiambo
                </motion.h1>

                {/* Subtitles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 flex flex-col md:flex-row items-center gap-2 md:gap-4 font-medium"
                >
                    <span className="text-sm md:text-base tracking-[0.2em] text-amber-400 uppercase drop-shadow-lg">
                        Construction Manager
                    </span>
                    <span className="hidden md:block text-white/60">|</span>
                    <span className="text-sm md:text-base tracking-[0.2em] text-white/90 uppercase drop-shadow-lg">
                        Digital Product Lead
                    </span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-12 flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="/BO_CV.pdf"
                        target="_blank"
                        className="px-8 py-3 bg-amber-400 text-black text-sm tracking-[0.15em] uppercase hover:bg-amber-300 transition-all duration-300 text-center shadow-lg"
                    >
                        View CV
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-3 border border-white/30 text-white text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300 text-center backdrop-blur-sm"
                    >
                        Get in Touch
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="flex flex-col items-center"
                    >
                        <svg
                            className="w-5 h-8 text-white/50 drop-shadow-md"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 22C16.9706 22 21 17.9706 21 13C21 8.02944 12 2 12 2C12 2 3 8.02944 3 13C3 17.9706 7.02944 22 12 22Z" />
                        </svg>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-3 text-center ml-1">Scroll</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
