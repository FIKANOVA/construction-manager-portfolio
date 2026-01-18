import Link from 'next/link'
import { siteConfig } from '@/site-config'

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-light tracking-[0.2em] text-white hover:text-white/80 transition-colors"
                    >
                        {siteConfig.clientName}
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6 md:gap-8">
                        {siteConfig.nav.links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-xs tracking-[0.15em] text-white/50 hover:text-white transition-colors uppercase"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/40 tracking-widest uppercase">
                        <p>&copy; {new Date().getFullYear()} Bruce Odhiambo. All rights reserved.</p>
                        <p className="mt-2 md:mt-0">Nairobi, Kenya</p>
                    </div>
                    <p className="text-xs text-white/30 tracking-wider">
                        Built by{' '}
                        {siteConfig.footer.creditUrl ? (
                            <a
                                href={siteConfig.footer.creditUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/50 hover:text-white transition-colors"
                            >
                                {siteConfig.footer.credit}
                            </a>
                        ) : (
                            <span className="text-white/50">{siteConfig.footer.credit}</span>
                        )}
                    </p>
                </div>
            </div>
        </footer>
    )
}
