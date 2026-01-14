import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'

export const metadata: Metadata = {
  title: 'Tao Architecture | Architecture & Design Studio',
  description: 'Touching intangible beauty of nature, through tangible forms of Architecture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-agenda antialiased text-neutral-medium-grey">
        <Loader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
