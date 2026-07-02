import type { Metadata } from 'next'
import './globals.css'
import Loader from '@/components/Loader'
import AppShell from '@/components/layout/AppShell'

export const metadata: Metadata = {
  metadataBase: new URL('https://taoarchitecture.com'),
  title: {
    default: 'Tao Architecture | Sustainable Luxury Architects in Pune',
    template: '%s | Tao Architecture',
  },
  description: 'Tao Architecture is a leading luxury architecture and interior design firm in Pune, specializing in sustainable villas, corporate offices, and eco-sensitive resorts. Led by Principal Architect Manish Banker.',
  keywords: ['Luxury Architects Pune', 'Sustainable Architecture India', 'Villa Design Pune', 'Corporate Office Interiors', 'Manish Banker', 'Eco-friendly Resorts'],
  authors: [{ name: 'Manish Banker' }],
  creator: 'Tao Architecture',
  publisher: 'Tao Architecture',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tao Architecture | Sustainable Luxury Architects in Pune',
    description: 'Award-winning architecture firm in Pune creating soulful, sustainable spaces that blend nature with modern luxury.',
    url: 'https://taoarchitecture.com',
    siteName: 'Tao Architecture',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tao Architecture | Sustainable Luxury Architects in Pune',
    description: 'Award-winning architecture firm in Pune creating soulful, sustainable spaces.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ArchitectureFirm',
    'name': 'Tao Architecture Pvt. Ltd.',
    'image': 'https://taoarchitecture.com/logo.png',
    'url': 'https://taoarchitecture.com',
    'telephone': '+91-744-771-9343',
    'priceRange': '$$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'A/2, Friends Enclave, West Block, Opp Sai Hira Complex, Mundhwa',
      'addressLocality': 'Pune',
      'postalCode': '411036',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 18.540102,
      'longitude': 73.896368
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      'opens': '09:30',
      'closes': '18:30'
    },
    'founder': {
      '@type': 'Person',
      'name': 'Manish Banker',
      'jobTitle': 'Principal Architect'
    },
    'sameAs': [
      'https://www.facebook.com/taoarchitect/',
      'https://www.instagram.com/tao_architecture/',
      'https://www.linkedin.com/company/tao-architecture-design/'
    ],
    'knowsAbout': ['Sustainable Architecture', 'Luxury Villas', 'Corporate Interiors', 'Resort Design', 'Turnkey Interior Solutions']
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-agenda antialiased text-neutral-medium-grey">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Loader />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
