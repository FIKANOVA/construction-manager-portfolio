'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/site-config'

export default function Hero({ cvUrl, heroRole1, heroRole2 }: { cvUrl?: string, heroRole1?: string, heroRole2?: string }) {
    const displayCvUrl = cvUrl || '/BO_CV.pdf'

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#0a0f14]">
            {/* Construction Background - Full Width, More Transparent */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{
                        scale: [1.1, 1.15, 1.1],
                        x: [0, -20, 0],
                        y: [0, -10, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-full h-full"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                        alt="Construction Background"
                        fill
                        className="object-cover opacity-30"
                    />
                </motion.div>
                {/* Uniform gradient overlay across entire hero */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.15) 35%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.6) 100%)"
                    }}
                />
                {/* Radial light gradient to blend portrait with background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse 60% 70% at 50% 35%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 30%, transparent 60%)"
                    }}
                />
            </div>

            {/* Portrait Image - Emerging from Construction Site */}
            <div className="absolute inset-0 z-10 flex justify-center items-center pointer-events-none">
                <div className="relative w-full h-full max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative w-full h-full flex justify-center items-center -mt-20 md:-mt-16"
                    >
                        <Image
                            src="/bruce-portrait-new.jpg"
                            alt="Bruce Odhiambo"
                            width={600}
                            height={700}
                            priority
                            className="object-contain object-center h-[95%] md:h-[100%] w-auto relative z-0 opacity-60 mix-blend-soft-light"
                            style={{
                                maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.5) 50%, transparent 85%), radial-gradient(ellipse at center, black 40%, transparent 75%)",
                                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.5) 50%, transparent 85%), radial-gradient(ellipse at center, black 40%, transparent 75%)",
                                maskComposite: "intersect",
                                WebkitMaskComposite: "source-in",
                                filter: "brightness(0.75) contrast(1.15) saturate(0.8) sepia(0.1)"
                            }}
                        />
                    </motion.div>
                </div>
            </div>



            {/* Text Content - Centered */}
            <div className="relative z-30 h-full flex flex-col justify-center items-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col items-center w-full"
                >
                    {/* Name - White */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.15em] md:tracking-[0.18em] text-white mb-6 drop-shadow-lg uppercase">
                        Bruce Odhiambo
                    </h1>

                    {/* Roles */}
                    <div className="flex flex-col md:flex-row items-center gap-3 mb-12 font-bold tracking-[0.2em] uppercase text-xs">
                        <span className="text-[#fbbf24]">{heroRole1 || 'Construction Manager'}</span>
                        <span className="hidden md:block text-white/40">|</span>
                        <span className="text-white">{heroRole2 || 'Digital Product Lead'}</span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
                        <Link
                            href={displayCvUrl}
                            target="_blank"
                            className="px-8 py-3 bg-[#fbbf24] text-black text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#f59e0b] transition-all shadow-lg text-center"
                        >
                            View CV
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-3 bg-transparent border-2 border-white/40 text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-all text-center"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator - Teardrop Icon */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            >
                {/* Teardrop/Water Drop Icon */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                >
                    <svg
                        width="24"
                        height="32"
                        viewBox="0 0 24 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg"
                    >
                        <path
                            d="M12 0C12 0 0 14 0 22C0 27.5228 5.37258 32 12 32C18.6274 32 24 27.5228 24 22C24 14 12 0 12 0Z"
                            fill="white"
                            fillOpacity="0.7"
                        />
                    </svg>
                </motion.div>

                {/* "SCROLL" Text - White */}
                <span className="text-white/70 text-[9px] tracking-[0.2em] uppercase font-light">
                    Scroll
                </span>
            </motion.div>
        </section>
    )
}
