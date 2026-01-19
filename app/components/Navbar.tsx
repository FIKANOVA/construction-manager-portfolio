'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/site-config'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-black/80 backdrop-blur-md border-b border-white/5'
                    : 'bg-transparent'
                    }`}
            >
                <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl md:text-2xl font-light tracking-[0.2em] text-white hover:text-white/80 transition-colors"
                    >
                        {siteConfig.clientName}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {siteConfig.nav.links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors uppercase"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden relative w-8 h-8 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        <div className="flex flex-col gap-1.5">
                            <motion.span
                                animate={{
                                    rotate: isMobileMenuOpen ? 45 : 0,
                                    y: isMobileMenuOpen ? 6 : 0,
                                }}
                                className="w-6 h-0.5 bg-white block origin-center"
                            />
                            <motion.span
                                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                                className="w-6 h-0.5 bg-white block"
                            />
                            <motion.span
                                animate={{
                                    rotate: isMobileMenuOpen ? -45 : 0,
                                    y: isMobileMenuOpen ? -6 : 0,
                                }}
                                className="w-6 h-0.5 bg-white block origin-center"
                            />
                        </div>
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#050505] flex items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {siteConfig.nav.links.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-light tracking-[0.2em] text-white hover:text-white/60 transition-colors uppercase"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
