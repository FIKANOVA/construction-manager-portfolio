'use client'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/app/components/ScrollReveal'
import { client, queries } from '@/lib/sanity'
import { siteConfig } from '@/site-config'

interface ContactSettings {
    email: string
    phone: string
    location: string
    availabilityStatus: string
}

interface FormData {
    name: string
    email: string
    serviceType: string
    message: string
}

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [settings, setSettings] = useState<ContactSettings>(siteConfig.contact)

    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = await client.fetch(queries.contactSettings)
                if (data) {
                    setSettings({
                        email: data.email || siteConfig.contact.email,
                        phone: data.phone || siteConfig.contact.phone,
                        location: data.location || siteConfig.contact.location,
                        availabilityStatus: data.availabilityStatus || siteConfig.contact.availabilityStatus
                    })
                }
            } catch (error) {
                console.error('Failed to fetch contact settings:', error)
            }
        }
        fetchSettings()
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (response.ok) {
                setIsSubmitted(true)
                reset()
            } else {
                console.error('Submission failed:', result.error)
                alert(result.error || 'Something went wrong. Please try again or contact me directly via email.')
            }
        } catch (error) {
            console.error('Submission error:', error)
            alert('A network error occurred. Please try again or contact me directly via email.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="pt-24 pb-16 bg-[#0d2137] min-h-screen">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column - Info */}
                    <div>
                        <ScrollReveal>
                            <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase mb-8 text-white">
                                Get in Touch
                            </h1>
                            <p className="text-white opacity-60 mb-16 max-w-md leading-relaxed">
                                Ready to collaborate on your next construction, GIS, or development project?
                                Fill out the form and I&apos;ll get back to you within 24 hours.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="space-y-12">
                                {/* Email */}
                                <div>
                                    <p className="text-xs tracking-[0.3em] text-white opacity-40 uppercase mb-4">
                                        Email
                                    </p>
                                    <a
                                        href={`mailto:${siteConfig.contact.email}`}
                                        className="text-xl text-white hover:text-amber-400 transition-colors tracking-wide"
                                    >
                                        {siteConfig.contact.email}
                                    </a>
                                </div>

                                {/* Phone */}
                                <div>
                                    <p className="text-xs tracking-[0.3em] text-white opacity-40 uppercase mb-4">
                                        Phone
                                    </p>
                                    <div className="space-y-3">
                                        <a
                                            href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                                            className="block text-xl text-white hover:text-amber-400 transition-colors tracking-wide"
                                        >
                                            {siteConfig.contact.phone} <span className="text-xs opacity-40 ml-2">(KE)</span>
                                        </a>
                                        {siteConfig.contact.phoneWork && (
                                            <a
                                                href={`tel:${siteConfig.contact.phoneWork.replace(/\s/g, '')}`}
                                                className="block text-xl text-white hover:text-amber-400 transition-colors tracking-wide"
                                            >
                                                {siteConfig.contact.phoneWork} <span className="text-xs opacity-40 ml-2">(DE)</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <p className="text-xs tracking-[0.3em] text-white opacity-40 uppercase mb-4">
                                        Location
                                    </p>
                                    <p className="text-xl text-white tracking-wide">{siteConfig.contact.location}</p>
                                </div>

                                {/* Availability */}
                                <div className="pt-12 border-t border-white/10">
                                    <p className="text-xs tracking-[0.3em] text-white opacity-40 uppercase mb-4">
                                        Availability
                                    </p>
                                    <p className="text-xl text-amber-400 font-light tracking-wide">
                                        {siteConfig.contact.availabilityStatus}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Column - Form */}
                    <div className="mt-8 lg:mt-4">
                        <ScrollReveal delay={0.2}>
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-16 text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-amber-400 flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-amber-400"
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
                                    </div>
                                    <h3 className="text-2xl font-light mb-4 text-white uppercase tracking-wider">Message Sent!</h3>
                                    <p className="text-white opacity-70 mb-8">
                                        Thank you for reaching out. I&apos;ll be in touch soon.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-sm tracking-[0.2em] text-white underline underline-offset-8 uppercase hover:text-amber-400 transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                                    {/* Name */}
                                    <div className="group relative">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/40 focus:border-white outline-none transition-colors"
                                            {...register('name', { required: 'Name is required' })}
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="group relative">
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/40 focus:border-white outline-none transition-colors"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address',
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Service Type */}
                                    <div className="group relative">
                                        <select
                                            className="w-full bg-[#0d2137] border-b border-white/20 py-4 text-white focus:border-white outline-none cursor-pointer transition-colors appearance-none"
                                            {...register('serviceType', { required: 'Please select a service' })}
                                            defaultValue=""
                                        >
                                            <option value="" disabled className="text-white/40">Select Service Type</option>
                                            <option value="project-management">Project Management & Oversight</option>
                                            <option value="gis">Spatial Analysis & Mapping</option>
                                            <option value="ai-qa">AI Training Data QA</option>
                                            <option value="consultancy">Strategic Advisory</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </div>
                                        {errors.serviceType && (
                                            <p className="mt-2 text-xs text-red-500">{errors.serviceType.message}</p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div className="group relative">
                                        <textarea
                                            placeholder="Tell me about your project..."
                                            rows={4}
                                            className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/40 focus:border-white outline-none resize-none transition-colors"
                                            {...register('message', { required: 'Message is required' })}
                                        />
                                        {errors.message && (
                                            <p className="mt-2 text-xs text-red-500">{errors.message.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-8">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-6 bg-white text-black text-sm tracking-[0.3em] uppercase hover:bg-neutral-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    )
}
