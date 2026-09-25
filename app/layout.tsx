import type { Metadata, Viewport } from 'next';
import React from 'react';
import SeoSchema from '../components/SeoSchema';

export const viewport: Viewport = {
  themeColor: '#070A05',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ayyuq.in'),
  title: {
    default: 'Ayyuq Tech Solutions | Web Development & Custom Software Agency in Mumbai',
    template: '%s | Ayyuq Tech Solutions',
  },
  description:
    'Top-rated website development company in Mumbai & Thane. We build custom Next.js web applications, high-performance mobile apps, and custom ERP/POS systems with sub-second loading speed, zero WordPress lag, and enterprise security.',
  applicationName: 'Ayyuq Tech Solutions',
  keywords: [
    'Website development company in Mumbai',
    'Mobile app development agency Thane',
    'Custom software company near me',
    'Custom POS & ERP software developers',
    'Next.js web development Mumbai',
    'React developers Mumbai',
    'Web development agency in Thane',
    'Custom CRM software India',
    'Full stack web developers Mumbai',
    'E-commerce website developers Mumbai',
    'Speed optimized web development Thane',
    'Ayyuq Tech Solutions',
  ],
  authors: [{ name: 'Hussain Tinwala', url: 'https://ayyuq.in/founder' }],
  creator: 'Ayyuq Tech Solutions',
  publisher: 'Ayyuq Tech Solutions',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://ayyuq.in',
    languages: {
      'en-IN': 'https://ayyuq.in',
      'en-US': 'https://ayyuq.in',
    },
  },
  openGraph: {
    title: 'Ayyuq Tech Solutions | Web Development & Custom Software Agency in Mumbai',
    description:
      'Engineered for speed. Custom website development, mobile apps, and tailor-made ERP/POS software in Mumbai & Thane. Sub-1s page loads, modern Next.js tech stack, zero bloated templates.',
    url: 'https://ayyuq.in',
    siteName: 'Ayyuq Tech Solutions',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://ayyuq.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ayyuq Tech Solutions - Web & Software Agency Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayyuq Tech Solutions | Web Development & Custom Software Agency in Mumbai',
    description:
      'Premier custom website and mobile app development in Mumbai & Thane. Zero-lag Next.js applications with sub-second loading speeds.',
    images: ['https://ayyuq.in/og-image.png'],
    creator: '@ayyuqtech',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'TFvPhBMjxLIunekVC_27aUR8hYhOL560RNIUHrTb_Ss',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <SeoSchema />
      </head>
      <body className="min-h-screen bg-[#070A05] text-[#FAFAFA] font-sans antialiased selection:bg-[#D95D39]/30 selection:text-[#FAFAFA]">
        <div className="relative flex min-h-screen flex-col bg-[#070A05]">
          {/* Subtle brand glow accent */}
          <div
            className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(217,93,57,0.06),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(58,77,57,0.12),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-1 flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}
