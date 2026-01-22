import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/app/components/ScrollReveal'
import { siteConfig } from '@/site-config'
import { client, queries, urlFor, type Profile } from '@/lib/sanity'

export const revalidate = 60

// Fallback data if Sanity fetch fails
const fallbackProfile = {
    name: 'Bruce Odhiambo',
    title: 'Construction Manager | Digital Product Lead',
    bio: `I am a purpose-driven project enthusiast combining my background in construction management with ongoing training in project planning and digital product development to drive sustainable, inclusive, and tech-enabled solutions.

My focus is on contributing to ecologically responsible, socially inclusive, and ethically managed initiatives that align with the UN Sustainable Development Goals (SDGs). I'm especially interested in how digital and green technologies can influence sustainable infrastructure and help build resilient communities across Africa.

I've taken on roles (both paid and voluntary) that sharpen my skills in planning, team coordination, data use, stakeholder communication, and tech adoption. These experiences are all steps toward my long-term goal: to become a strategic leader in sustainable development, shaping infrastructure projects that merge innovation with social impact.`,
    interests: [
        'Project-based roles in sustainability',
        'Digital innovation for development',
        'Infrastructure strategy',
        'Community-centred design',
    ],
    education: [
        {
            degree: 'MA Project Planning and Management',
            institution: 'University of Nairobi',
            period: '2023 - Present',
        },
        {
            degree: 'BSc Construction Management',
            institution: 'University of Nairobi',
            period: '2016 - 2020',
        },
    ],
    skills: [
        'Project Management',
        'GIS & Spatial Analysis',
        'Monitoring & Evaluation',
        'Data Analytics',
        'ArchiCAD',
        'Microsoft Suite',
        'Strategic Management',
        'Lead Generation',
    ],
    hobbies: [
        {
            name: 'Rugby',
            description: 'Active player for 10+ years, currently in the leadership group at Nondescripts RFC.',
        },
        {
            name: 'Technology',
            description: 'Enthusiast focusing on how technology can drive sustainability across ecosystems.',
        },
    ],
}

async function getProfile(): Promise<Profile | null> {
    try {
        return await client.fetch(queries.profile)
    } catch (error) {
        console.error('Failed to fetch profile:', error)
        return null
    }
}

export default async function AboutPage() {
    const sanityProfile = await getProfile()
    const profile = sanityProfile || fallbackProfile

    // Helper to get image URL
    const getImageUrl = (image: any, fallback: string) => {
        if (!image) return fallback
        return urlFor(image).width(800).url()
    }

    const portraitUrl = getImageUrl(
        (profile as Profile).portraitImage,
        '/bruce-headshot.jpg'
    )

    const cvUrl = (profile as Profile).cvFile || '/BO_CV.pdf'

    return (
        <div className="pt-24 pb-16 bg-[#0d2137] min-h-screen">
            {/* Split Layout Section */}
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Sticky Image (Desktop) */}
                    <div className="lg:sticky lg:top-32 lg:h-fit">
                        <ScrollReveal>
                            <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                                <Image
                                    src={portraitUrl}
                                    alt={profile.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* CV Button */}
                            <div className="mt-6 flex gap-4">
                                <Link
                                    href={cvUrl}
                                    target="_blank"
                                    className="flex-1 py-3 bg-amber-400 text-black text-center text-sm tracking-[0.15em] uppercase hover:bg-amber-300 transition-colors"
                                >
                                    View CV
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex-1 py-3 border border-white/30 text-center text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors"
                                >
                                    Contact
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Scrolling Text Content */}
                    <div className="space-y-12">
                        <ScrollReveal>
                            <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] uppercase mb-4 text-white">
                                About Me
                            </h1>
                            <h2 className="text-xl font-light text-amber-400 mb-2">
                                {profile.name}
                            </h2>
                            <p className="text-white/70 text-sm tracking-wide">
                                {profile.title}
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="prose prose-invert prose-lg">
                                {profile.bio?.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-white leading-relaxed mb-6 opacity-90">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Current Interests */}
                        {profile.interests && profile.interests.length > 0 && (
                            <ScrollReveal delay={0.15}>
                                <div className="pt-8 border-t border-white/10">
                                    <h3 className="text-xs tracking-[0.2em] text-white uppercase mb-4 opacity-70">
                                        Current Interests
                                    </h3>
                                    <ul className="space-y-2">
                                        {profile.interests.map((interest, i) => (
                                            <li key={i} className="flex items-center gap-3 text-white/85">
                                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                                                {interest}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Social Links */}
                        <ScrollReveal delay={0.2}>
                            <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                                <a
                                    href={siteConfig.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm tracking-[0.1em] text-white/70 hover:text-white transition-colors uppercase"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href={`mailto:${siteConfig.contact.email}`}
                                    className="text-sm tracking-[0.1em] text-white/70 hover:text-white transition-colors uppercase"
                                >
                                    Email
                                </a>
                                {siteConfig.socials.whatsapp && (
                                    <a
                                        href={siteConfig.socials.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm tracking-[0.1em] text-white/70 hover:text-white transition-colors uppercase"
                                    >
                                        WhatsApp
                                    </a>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            {profile.education && profile.education.length > 0 && (
                <section className="py-24 md:py-32 mt-24 border-y border-white/10">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <h3 className="text-center text-sm tracking-[0.2em] text-white uppercase mb-12 opacity-70">
                                Education
                            </h3>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            {profile.education.map((edu, index) => (
                                <ScrollReveal key={edu.degree} delay={index * 0.1}>
                                    <div className="text-center">
                                        <p className="text-xs tracking-[0.15em] text-amber-400 uppercase mb-2">
                                            {edu.period}
                                        </p>
                                        <h4 className="text-lg font-light mb-1 text-white/70">
                                            {edu.degree}
                                        </h4>
                                        <p className="text-white text-sm">
                                            {edu.institution}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills Marquee */}
            {profile.skills && profile.skills.length > 0 && (
                <section className="py-16 overflow-hidden">
                    <ScrollReveal>
                        <h3 className="text-center text-sm tracking-[0.2em] text-white/70 uppercase mb-8">
                            Skills
                        </h3>
                    </ScrollReveal>
                    <div className="relative group hover-pause">
                        <div className="flex animate-marquee whitespace-nowrap">
                            {profile.skills.map((skill, index) => (
                                <span
                                    key={`a-${index}`}
                                    className="mx-8 text-2xl md:text-4xl font-light tracking-wider text-white/20"
                                >
                                    {skill}
                                </span>
                            ))}
                            {profile.skills.map((skill, index) => (
                                <span
                                    key={`b-${index}`}
                                    className="mx-8 text-2xl md:text-4xl font-light tracking-wider text-white/20"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Hobbies Section */}
            {profile.hobbies && profile.hobbies.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <h3 className="text-center text-sm tracking-[0.2em] text-white uppercase mb-12 opacity-70">
                                Beyond Work
                            </h3>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            {profile.hobbies.map((hobby, index) => (
                                <ScrollReveal key={hobby.name} delay={index * 0.1}>
                                    <div className="p-6 border border-white/10 bg-white/[0.02]">
                                        <h4 className="text-lg font-light mb-2 text-amber-400">
                                            {hobby.name}
                                        </h4>
                                        <p className="text-white/80 text-sm">
                                            {hobby.description}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <ScrollReveal>
                        <h3 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                            Let&apos;s Work Together
                        </h3>
                        <p className="text-white/80 mb-8 max-w-md mx-auto">
                            Open to collaborating on sustainability, digital innovation, and infrastructure projects.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-10 py-4 border border-white/30 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Get in Touch
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    )
}
