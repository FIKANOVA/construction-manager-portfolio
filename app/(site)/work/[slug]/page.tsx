import { client } from '@/lib/sanity'
import ProjectDetails from '@/app/components/ProjectDetails'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export const revalidate = 60 // Revalidate every minute

// Fetch project by slug
async function getProject(slug: string) {
    const query = `*[_type == "project" && slug.current == $slug][0] {
        title,
        category,
        clientName,
        shootDate,
        description,
        coverImage,
        "gallery": gallery[]
    }`
    return await client.fetch(query, { slug })
}

interface ProjectPageProps {
    params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params
    const project = await getProject(slug)

    if (!project) {
        return (
            <div className="pt-24 pb-16 bg-black min-h-screen">
                <div className="container mx-auto px-6 text-center py-24">
                    <h1 className="text-4xl font-light mb-4">Project Not Found</h1>
                    <p className="text-white/60 mb-8">The project you're looking for doesn't exist.</p>
                    <Link
                        href="/work"
                        className="inline-block px-8 py-3 border border-white/30 text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Back to Work
                    </Link>
                </div>
            </div>
        )
    }

    // Ensure description is handled if it's PortableText on the client
    // For simplicity in the client component, we'll pass it as is.
    // However, ProjectDetails was simplified. Let's make sure it handles generic Description.

    return <ProjectDetails project={project} />
}
