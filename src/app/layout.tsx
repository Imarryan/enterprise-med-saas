import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'MedLearnPro - Premium Medical Education Platform',
    template: '%s | MedLearnPro',
  },
  description:
    'Learn from India\'s top medical professionals. Premium video courses for doctors, nurses, and healthcare workers. Get certified and advance your career.',
  keywords: ['medical education', 'MBBS courses', 'doctor training', 'healthcare courses', 'CME credits'],
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
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <Navbar />
          <main style={{ minHeight: '100vh' }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
