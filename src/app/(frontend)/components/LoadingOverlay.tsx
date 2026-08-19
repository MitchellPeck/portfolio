'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import './LoadingOverlay.css'

interface LoadingOverlayProps {
  isLoading?: boolean
}

export default function LoadingOverlay({ isLoading = true }: LoadingOverlayProps) {
  const pathname = usePathname()
  const currentRoute = pathname === '/' ? 'Home' : pathname

  if (!isLoading) return null

  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner" aria-hidden="true"></div>
        </div>
        <div className="loading-text">
          <p className="loading-title">Loading...</p>
          {currentRoute && <p>Navigating to {currentRoute}</p>}
        </div>
      </div>
    </div>
  )
}
