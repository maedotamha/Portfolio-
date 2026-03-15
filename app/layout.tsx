import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    variable: "--font-roboto-mono",
});

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    ],
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: "Maedot Alemu | Full-Stack Developer",
    description: "Portfolio of Maedot Alemu, a Software Engineering graduate from Addis Ababa Science and Technology University. Specializing in full-stack development, distributed systems, and modern web technologies.",
    keywords: ["Software Engineer", "Developer", "Maedot Alemu", "AASTU", "Next.js", "React", "TypeScript", "Full Stack"],
    authors: [{ name: "Maedot Alemu" }],
    openGraph: {
        title: "Maedot Alemu | Software Engineering Portfolio",
        description: "Explore my projects, experience, and technical skills in software engineering.",
        url: "https://maedotalemu.com", // Placeholder
        siteName: "Maedot Alemu Portfolio",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Maedot Alemu | Software Engineering Portfolio",
        description: "Explore my projects and technical journey.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

import { SkipLink } from "@/components/ui/SkipLink";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${robotoMono.variable} antialiased font-sans`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex flex-col min-h-screen">
                        <SkipLink />
                        <Navigation />
                        <main id="main-content" className="flex-grow">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
