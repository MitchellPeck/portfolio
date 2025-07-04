import React, { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'
import './main.css'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingOverlay from './components/LoadingOverlay'

export const metadata = {
  title: 'Mitchell Peck Development',
  description: 'Delivering intelligent solutions—smarter tech, smarter timing, smarter outcomes.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="site-wrapper">
          <Header />
          <main className="main-content">
            <Suspense fallback={<LoadingOverlay isLoading={true} />}/>
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
