'use client'

import React, { useEffect, useState } from 'react'

// This component ensures proper rehydration of grid layouts
export default function GridStabilizer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return <div className="grid-stabilizer">{children}</div>
}
