/**
 * Site Configuration
 * 
 * Bruce Odhiambo - Construction Manager's Portfolio
 */

export interface SiteConfig {
    // Branding
    clientName: string
    tagline: string
    description: string
    baseUrl: string

    // Theme
    theme: {
        primaryColor: string
        accentColor: string
        fontFamily: string
    }

    // Contact
    contact: {
        email: string
        phone: string
        phoneWork?: string
        location: string
        availabilityStatus: string
    }

    // Social Links
    socials: {
        instagram?: string
        twitter?: string
        facebook?: string
        youtube?: string
        linkedin?: string
        whatsapp?: string
    }

    // Navigation
    nav: {
        links: { label: string; href: string }[]
    }

    // Footer
    footer: {
        credit: string
        creditUrl?: string
    }
}

export const siteConfig: SiteConfig = {
    // ============================================
    // 🎨 BRANDING - Bruce Odhiambo
    // ============================================
    clientName: 'Bruce Odhiambo',
    tagline: "Construction Manager's Portfolio",
    description: 'Portfolio of Bruce Odhiambo - Construction Manager & GIS Specialist',
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://bruce.fikanovaco.ke',

    // ============================================
    // 🎭 THEME
    // ============================================
    theme: {
        primaryColor: 'black',
        accentColor: 'amber-400',
        fontFamily: 'Manrope',
    },

    // ============================================
    // 📞 CONTACT INFORMATION
    // ============================================
    contact: {
        email: 'cmbruce1015@gmail.com',
        phone: '(+254) 0741058917',
        phoneWork: '(+49) 015236122715',
        location: 'Munich, Germany / Nairobi, Kenya',
        availabilityStatus: 'Open to Opportunities',
    },

    // ============================================
    // 🔗 SOCIAL MEDIA LINKS
    // ============================================
    socials: {
        linkedin: 'https://www.linkedin.com/in/bruce-odhiambo-8614b5175/',
        whatsapp: 'https://wa.me/254741058917',
    },

    // ============================================
    // 🧭 NAVIGATION
    // ============================================
    nav: {
        links: [
            { label: 'Projects', href: '/projects' },
            { label: 'Services', href: '/services' },
            { label: 'Experience', href: '/work' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
        ],
    },

    // ============================================
    // 📄 FOOTER
    // ============================================
    footer: {
        credit: 'Fikanova',
        creditUrl: 'https://fikanova.co.ke/',
    },
}

// Helper to get full social URLs
export function getSocialUrl(platform: keyof SiteConfig['socials']): string | undefined {
    return siteConfig.socials[platform]
}
