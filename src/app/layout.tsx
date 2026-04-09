import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTopButton from '@/components/BackToTopButton';
import { Suspense } from 'react';
import RouteProgressBar from '@/components/RouteProgressBar';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0f',
};

export const metadata: Metadata = {
  title: {
    default: 'MedLearnPro - Premium Medical Education Platform',
    template: '%s | MedLearnPro',
  },
  description:
    "Learn from India's top medical instructors. Premium video courses for healthcare professionals. Get certified and advance your career.",
  keywords: ['medical education', 'MBBS courses', 'professional training', 'healthcare courses', 'CME credits'],
  openGraph: {
    type: 'website',
    siteName: 'MedLearnPro',
    title: 'MedLearnPro - Premium Medical Education Platform',
    description: 'Premium digital medical courses for healthcare professionals.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Suspense fallback={null}>
            <RouteProgressBar />
          </Suspense>
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: 80 }}>{children}</main>
          <Footer />
          <WhatsAppButton />
          <BackToTopButton />
        </Providers>
      </body>
    </html>
  );
}
