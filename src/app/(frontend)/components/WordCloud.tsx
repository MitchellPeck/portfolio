'use client'

import React, { useEffect, useState, useRef } from 'react'
import './WordCloud.css'

const WordCloud: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number>()
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  // Calculate transform values based on scroll position
  const maxScroll = 800 // Approximate height where word cloud should disappear
  const scrollProgress = Math.min(scrollY / maxScroll, 1)
  
  const scale = 1 + scrollProgress * 3 // Scale from 1 to 4
  const rotation = scrollProgress * 180 // Rotate up to 180 degrees
  const opacity = 1 - scrollProgress // Fade out as it scales up

  const technologies = [
    { text: 'Next.js', size: 2.5, x: 15, y: 20 },
    { text: 'React', size: 2.3, x: 70, y: 15 },
    { text: 'TypeScript', size: 2.1, x: 45, y: 35 },
    { text: 'JavaScript', size: 2.0, x: 25, y: 50 },
    { text: 'Python', size: 1.8, x: 80, y: 45 },
    { text: 'OpenAI API', size: 1.7, x: 10, y: 70 },
    { text: 'AI/ML', size: 1.6, x: 60, y: 65 },
    { text: 'OpenCV', size: 1.5, x: 35, y: 80 },
    { text: 'SQL', size: 1.4, x: 85, y: 75 },
    { text: 'Java', size: 1.4, x: 50, y: 10 },
    { text: 'Astro', size: 1.3, x: 20, y: 85 },
    { text: 'EdTech', size: 1.3, x: 75, y: 25 },
    { text: 'Canvas', size: 1.2, x: 5, y: 40 },
    { text: 'HTML/CSS', size: 1.2, x: 90, y: 60 },
    { text: 'Audio Systems', size: 1.1, x: 40, y: 95 },
    { text: 'FIRST Robotics', size: 1.1, x: 65, y: 85 },
    { text: 'Dante Networking', size: 1.0, x: 30, y: 5 },
    { text: 'Blackbaud', size: 1.0, x: 95, y: 35 },
    { text: 'Google Classroom', size: 0.9, x: 15, y: 95 },
    { text: 'OneRoster', size: 0.9, x: 85, y: 10 },
    { text: 'Shure', size: 0.8, x: 55, y: 75 },
    { text: 'Yamaha', size: 0.8, x: 5, y: 60 },
    { text: 'Allen & Heath', size: 0.8, x: 70, y: 5 },
    { text: 'Sennheiser', size: 0.7, x: 25, y: 25 },
  ]

  return (
    <div 
      className="word-cloud"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
      }}
    >
      {technologies.map((tech, index) => {
        // Calculate rotated position
        const centerX = 50
        const centerY = 50
        const offsetX = tech.x - centerX
        const offsetY = tech.y - centerY
        
        const rotationRad = (rotation * Math.PI) / 180
        const rotatedX = centerX + (offsetX * Math.cos(rotationRad) - offsetY * Math.sin(rotationRad))
        const rotatedY = centerY + (offsetX * Math.sin(rotationRad) + offsetY * Math.cos(rotationRad))
        
        return (
          <span
            key={index}
            className="word-cloud-item"
            style={{
              position: 'absolute',
              left: `${rotatedX}%`,
              top: `${rotatedY}%`,
              fontSize: `${tech.size}rem`,
              animationDelay: `${index * 0.3}s`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {tech.text}
          </span>
        )
      })}
    </div>
  )
}

export default WordCloud
