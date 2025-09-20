'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import './Header.css'

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()!;

  useEffect(() => {
    const setHeaderHeightVar = () => {
      const headerEl = document.querySelector('.header') as HTMLElement | null
      if (headerEl) {
        const h = headerEl.offsetHeight
        document.documentElement.style.setProperty('--site-header-height', `${h}px`)
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      setHeaderHeightVar()
    }

    const handleResize = () => {
      setHeaderHeightVar()
    }

    // Initialize and bind
    setHeaderHeightVar()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Update header height var when menu state changes (mobile menu can alter header size)
  useEffect(() => {
    const headerEl = document.querySelector('.header') as HTMLElement | null
    if (headerEl) {
      const h = headerEl.offsetHeight
      document.documentElement.style.setProperty('--site-header-height', `${h}px`)
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            Mitchell Peck Development
          </Link>

          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger"></span>
          </button>

          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/projects"
                  className={`nav-link ${pathname.startsWith('/projects') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/consulting"
                  className={`nav-link ${pathname.startsWith('/consulting') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Consulting
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/prosystems"
                  className={`nav-link ${pathname.startsWith('/prosystems') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  ProSystems
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/about"
                  className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/contact"
                  className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
