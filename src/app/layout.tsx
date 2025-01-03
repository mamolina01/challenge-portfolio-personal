import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout'

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Challenge Portfolio Personal',
  description: 'Challenge Portfolio Personal | Matias Molina'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased max-w-screen overflow-x-hidden`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
