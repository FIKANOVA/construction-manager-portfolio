/**
 * Custom Sanity Image Loader for Cloudflare Pages
 * 
 * Cloudflare Pages does not support Next.js default image optimization.
 * This loader offloads image processing to Sanity's CDN.
 */

interface ImageLoaderProps {
    src: string
    width: number
    quality?: number
}

export default function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
    // If it's already a Sanity URL with parameters, just append width/quality
    if (src.includes('cdn.sanity.io')) {
        const url = new URL(src)
        url.searchParams.set('w', width.toString())
        url.searchParams.set('q', (quality || 75).toString())
        url.searchParams.set('auto', 'format')
        return url.toString()
    }

    // For Unsplash or other URLs, append standard parameters
    if (src.includes('unsplash.com')) {
        const url = new URL(src)
        url.searchParams.set('w', width.toString())
        url.searchParams.set('q', (quality || 75).toString())
        return url.toString()
    }

    // For other URLs, return as-is
    return src
}
