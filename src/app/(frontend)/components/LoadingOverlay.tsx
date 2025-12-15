'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import './LoadingOverlay.css'

interface LoadingOverlayProps {
  isLoading?: boolean
}

export default function LoadingOverlay({ isLoading = true }: LoadingOverlayProps) {
  const pathname = usePathname()
  const [currentRoute, setCurrentRoute] = useState('')

  useEffect(() => {
    // Format the pathname for display
    const routeName = pathname === '/' ? 'Home' : pathname.split('/').pop() || pathname
    setCurrentRoute("/" + routeName.toLowerCase())
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <div className="loading-text">
          <h2>Loading...</h2>
          {currentRoute && <p>Navigating to {currentRoute}</p>}
        </div>
      </div>
    </div>
  )
}
