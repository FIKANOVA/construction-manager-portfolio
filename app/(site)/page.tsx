import Hero from '@/app/components/Hero'
import ScrollReveal from '@/app/components/ScrollReveal'
import Link from 'next/link'

export const revalidate = 60

// Featured Experience for Homepage
const featuredExperience = [
  {
    company: 'J365',
    role: 'Project Lead',
    description: 'Leading digital transformation and construction project oversight.',
  },
  {
    company: 'Sustain East Africa',
    role: 'GIS Assistant',
    description: 'Geospatial analysis and mapping for environmental projects.',
  },
]

// Featured Services for Homepage
const featuredServices = [
  'Project Management & M&E Strategy',
  'GIS & Spatial Intelligence',
  'AI Training Data & QA',
]

export default async function HomePage() {
  return (
    <>
      <Hero />

      {/* Featured Experience Section */}
      <section className="py-24 md:py-32 bg-[#0d2137] border-t border-white/10">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.15em] uppercase mb-12 text-center">
              Experience
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredExperience.map((exp, index) => (
              <ScrollReveal key={exp.company} delay={index * 0.1}>
                <div className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <p className="text-xs tracking-[0.2em] text-amber-400 uppercase mb-2">
                    {exp.role}
                  </p>
                  <h3 className="text-xl font-light tracking-wide mb-3">
                    {exp.company}
                  </h3>
                  <p className="text-white/50 text-sm">
                    {exp.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="text-center mt-12">
              <Link
                href="/work"
                className="text-sm tracking-[0.15em] text-white/50 hover:text-white transition-colors uppercase"
              >
                View Full Experience →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 md:py-32 bg-[#0d2137] border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.15em] uppercase mb-12">
              Services
            </h2>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {featuredServices.map((service, index) => (
              <ScrollReveal key={service} delay={index * 0.1}>
                <span className="px-6 py-3 border border-white/20 text-sm tracking-[0.1em] text-white/70">
                  {service}
                </span>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <Link
              href="/services"
              className="inline-block px-8 py-3 border border-white/30 text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              Learn More
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[#0d2137] border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-light tracking-[0.1em] mb-8">
              Let&apos;s Work Together
            </h2>
            <p className="text-white/60 mb-12 max-w-xl mx-auto">
              Looking for expertise in construction management, GIS analysis, or digital product leadership?
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-amber-400 text-black text-sm tracking-[0.2em] uppercase hover:bg-amber-300 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
