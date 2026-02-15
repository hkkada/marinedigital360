import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default:
      'MarineForge — Marine Marketing Agency | Productization, SEO & Sales Enablement',
    template: '%s | MarineForge',
  },
  description:
    'MarineForge is a specialized marine marketing agency that transforms boat manufacturer, dealer, and marine technology capabilities into market-ready products. Productization, sales enablement, SEO, GEO, and AI-powered digital marketing for the marine industry.',
  keywords: [
    'marine marketing agency',
    'marine productization',
    'boat manufacturer marketing',
    'marine sales enablement',
    'marine SEO',
    'marine digital marketing',
    'boat dealer marketing',
    'marine commercialization',
    'yacht marketing agency',
    'marine GEO optimization',
    'marine web design',
    'fishing charter marketing',
  ],
  metadataBase: new URL('https://marineforge.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:
      'MarineForge — Marine Marketing Agency | Productization, SEO & Sales Enablement',
    description:
      'MarineForge transforms marine business capabilities into market-ready products. Productization, sales enablement, SEO, and AI-powered marketing for boat manufacturers, dealers, and marine technology companies.',
    siteName: 'MarineForge',
    locale: 'en_US',
    type: 'website',
    url: 'https://marineforge.com',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'MarineForge — Marine Marketing Agency | Productization, SEO & Sales Enablement',
    description:
      'MarineForge transforms marine business capabilities into market-ready products. Productization, sales enablement, SEO, and AI-powered marketing for the marine industry.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#030213',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
      </body>
    </html>
  );
}
