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
    date: string
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
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSubmitted(true)
        reset()
    }

    return (
        <div className="pt-24 pb-16 bg-[#0d2137] min-h-screen">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column - Info */}
                    <div>
                        <ScrollReveal>
                            <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-4 text-white">
                                Get in Touch
                            </h1>
                            <p className="text-white/60 mb-12 max-w-md">
                                Ready to collaborate on your next project?
                                Fill out the form and I&apos;ll get back to you within 24 hours.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="space-y-8">
                                {/* Email */}
                                <div>
                                    <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
                                        Email
                                    </p>
                                    <a
                                        href={`mailto:${settings.email}`}
                                        className="text-lg text-white hover:text-amber-400 transition-colors"
                                    >
                                        {settings.email}
                                    </a>
                                </div>

                                {/* Phone */}
                                <div>
                                    <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
                                        Phone
                                    </p>
                                    <a
                                        href={`tel:${settings.phone}`}
                                        className="text-lg text-white hover:text-amber-400 transition-colors"
                                    >
                                        {settings.phone}
                                    </a>
                                </div>

                                {/* Location */}
                                <div>
                                    <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
                                        Location
                                    </p>
                                    <p className="text-lg text-white">{settings.location}</p>
                                </div>

                                {/* Availability */}
                                <div className="pt-8 border-t border-white/10">
                                    <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
                                        Availability
                                    </p>
                                    <p className="text-lg text-amber-400 font-light">
                                        {settings.availabilityStatus}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Column - Form */}
                    <div>
                        <ScrollReveal delay={0.2}>
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-16 text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-green-500 flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-green-500"
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
                                    <h3 className="text-2xl font-light mb-4 text-white">Message Sent!</h3>
                                    <p className="text-white/60 mb-6">
                                        Thank you for reaching out. I&apos;ll be in touch soon.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-sm tracking-[0.1em] text-white/50 hover:text-white transition-colors uppercase"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                    {/* Name */}
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="form-input w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-amber-400 outline-none transition-colors"
                                            {...register('name', { required: 'Name is required' })}
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-xs text-red-400">{errors.name.message}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="form-input w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-amber-400 outline-none transition-colors"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address',
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Service Type */}
                                    <div>
                                        <select
                                            className="form-input w-full bg-[#0d2137] border-b border-white/20 py-4 text-white/50 focus:text-white focus:border-amber-400 outline-none cursor-pointer transition-colors [&>option]:bg-[#0d2137] [&>option]:text-white"
                                            {...register('serviceType', { required: 'Please select a service' })}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select Service Type</option>
                                            <option value="project-management">Project Management & M&E</option>
                                            <option value="gis">GIS & Spatial Intelligence</option>
                                            <option value="ai-qa">AI Training Data & QA</option>
                                            <option value="consultancy">Strategic Consultancy</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.serviceType && (
                                            <p className="mt-2 text-xs text-red-400">{errors.serviceType.message}</p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <textarea
                                            placeholder="Tell me about your project..."
                                            rows={5}
                                            className="form-input w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-amber-400 outline-none resize-none transition-colors"
                                            {...register('message', { required: 'Message is required' })}
                                        />
                                        {errors.message && (
                                            <p className="mt-2 text-xs text-red-400">{errors.message.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-amber-400 text-black text-sm tracking-[0.2em] uppercase hover:bg-amber-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    )
}
