import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LenisProvider from "../providers/LenisProvider";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LenisProvider>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </LenisProvider>
    );
}
