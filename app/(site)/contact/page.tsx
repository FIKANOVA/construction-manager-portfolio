'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/app/components/ScrollReveal'

import { siteConfig } from '@/site-config'

const contactSettings = siteConfig.contact

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
        // console.log('Form submitted:', data)
        setIsSubmitting(false)
        setIsSubmitted(true)
        reset()
    }

    return (
        <div className="pt-24 pb-16 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column - Info */}
                    <div>
                        <ScrollReveal>
                            <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase mb-4">
                                Get in Touch
                            </h1>
                            <p className="text-white/60 mb-12 max-w-md">
                                Ready to create something beautiful together?
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
                                        href={`mailto:${contactSettings.email}`}
                                        className="text-lg hover:text-white/70 transition-colors"
                                    >
                                        {contactSettings.email}
                                    </a>
                                </div>

                                {/* Phone */}
                                <div>
                                    <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
                                        Phone
                                    </p>
                                    <a
                                        href={`tel:${contactSettings.phone}`}
                                        className="text-lg hover:text-white/70 transition-colors"
                                    >
                                        {contactSettings.phone}
                                    </a>
                                </div>

                                {/* Location */}
                                <div>
                                    <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
                                        Location
                                    </p>
                                    <p className="text-lg">{contactSettings.location}</p>
                                </div>

                                {/* Availability */}
                                <div className="pt-8 border-t border-white/10">
                                    <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
                                        Availability
                                    </p>
                                    <p className="text-lg text-amber-400">
                                        {contactSettings.availabilityStatus}
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
                                    <h3 className="text-2xl font-light mb-4">Message Sent!</h3>
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
                                            className="form-input w-full"
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
                                            className="form-input w-full"
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

                                    {/* Date */}
                                    <div>
                                        <input
                                            type="date"
                                            placeholder="Project Start Date"
                                            className="form-input w-full"
                                            {...register('date')}
                                        />
                                    </div>

                                    {/* Service Type */}
                                    <div>
                                        <select
                                            className="form-input w-full bg-black cursor-pointer [&>option]:bg-black [&>option]:text-white"
                                            {...register('serviceType', { required: 'Please select a service' })}
                                            defaultValue=""
                                        >
                                            <option value="" disabled className="bg-black text-white">
                                                Select Service Type
                                            </option>
                                            <option value="project-management" className="bg-black text-white">Project Management & M&E</option>
                                            <option value="gis" className="bg-black text-white">GIS & Spatial Intelligence</option>
                                            <option value="ai-qa" className="bg-black text-white">AI Training Data & QA</option>
                                            <option value="green-tech" className="bg-black text-white">Green Tech Integration</option>
                                            <option value="infrastructure" className="bg-black text-white">Sustainable Infrastructure</option>
                                            <option value="other" className="bg-black text-white">Other</option>
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
                                            className="form-input w-full resize-none"
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
                                        className="w-full py-4 bg-white text-black text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
