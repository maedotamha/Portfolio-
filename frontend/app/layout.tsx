import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Maedot Alemu — Software Engineer',
  description: 'Portfolio of Maedot Alemu, Software Engineering student at Addis Ababa University specializing in full-stack development with React, Node.js, and cloud technologies.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'React', 'Node.js', 'TypeScript', 'Next.js'],
  authors: [{ name: 'Maedot Alemu' }],
  openGraph: {
    title: 'Maedot Alemu — Software Engineer',
    description: 'Portfolio showcasing projects and experience in full-stack development',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} font-sans antialiased bg-background min-h-screen`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
