'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-white">
            {/* Layer 1: Subtle Geometric Glass Elements in Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -top-[10%] -left-[5%] w-[40%] aspect-square border border-[#0d2137]/5 rounded-[4rem] rotate-12 bg-gradient-to-br from-white/20 to-[#0d2137]/5"
                />
                <motion.div
                    animate={{
                        rotate: [360, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 50,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute bottom-[5%] -right-[10%] w-[50%] aspect-square border border-[#0d2137]/5 rounded-[6rem] -rotate-12 bg-gradient-to-tl from-white/20 to-[#0d2137]/5"
                />
            </div>

            {/* Layer 2: Bruce's Profile Image - Sharp & High Contrast */}
            <div className="absolute inset-x-0 bottom-0 top-16 z-10 flex justify-center items-end">
                <div className="relative w-full h-[90%] max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src="/bruce-headshot.jpg"
                            alt="Bruce Odhiambo"
                            fill
                            priority
                            className="object-contain object-bottom opacity-100 grayscale-[0.5] contrast-125 brightness-110 [mask-image:linear-gradient(to_top,black_50%,transparent_95%)]"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Layer 3: Crystal Clear Glass Card Over Content */}
            <div className="relative z-30 h-full flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-4xl w-full p-12 md:p-20 relative"
                >
                    {/* Glass Backdrop Effect for content area */}
                    <div className="absolute inset-0 z-0 bg-white/10 backdrop-blur-[4px] border border-white/40 shadow-[0_8px_32px_rgba(13,33,55,0.05)] rounded-3xl" />

                    <div className="relative z-10 text-center">
                        {/* Tagline */}
                        <motion.span
                            initial={{ letterSpacing: '0.2em', opacity: 0 }}
                            animate={{ letterSpacing: '0.6em', opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.8 }}
                            className="block text-[10px] md:text-sm font-light text-[#0d2137]/40 uppercase mb-8"
                        >
                            Integrity • Precision • Future
                        </motion.span>

                        {/* Name */}
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="text-5xl md:text-8xl lg:text-[10rem] font-extralight tracking-tight text-[#0d2137] leading-none mb-10"
                        >
                            Bruce <span className="font-light">Odhiambo</span>
                        </motion.h1>

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.5 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <div className="w-12 h-[1px] bg-[#0d2137]/20" />
                            <p className="text-sm md:text-xl tracking-[0.3em] text-[#0d2137]/70 uppercase font-light">
                                Construction Manager & Digital Lead
                            </p>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 2 }}
                            className="mt-16 flex flex-col sm:flex-row gap-8 justify-center"
                        >
                            <Link
                                href="/BO_CV.pdf"
                                target="_blank"
                                className="px-12 py-4 bg-[#0d2137] text-white text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(13,33,55,0.2)]"
                            >
                                Portfolio
                            </Link>
                            <Link
                                href="/contact"
                                className="px-12 py-4 border border-[#0d2137]/30 text-[#0d2137] text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:bg-[#0d2137] hover:text-white"
                            >
                                Contact
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Vertical Scroll Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="absolute bottom-10 flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-[#0d2137]/0 via-[#0d2137]/40 to-[#0d2137]/0" />
                    <span className="text-[9px] tracking-[0.5em] text-[#0d2137]/30 uppercase rotate-180 [writing-mode:vertical-lr]">Scroll</span>
                </motion.div>
            </div>
        </section>
    )
}

