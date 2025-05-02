import React from 'react'
import '../globals.css'
import './main.css'
import Header from './components/Header'
import Footer from './components/Footer'

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
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
