'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import './Header.css'

interface HeaderProps {
  logoUrl?: string | null
  logoAltUrl?: string | null
}

interface DropdownItem {
  label: string
  href: string
  description?: string
}

interface NavItem {
  label: string
  href: string
  dropdown?: DropdownItem[]
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Development', href: '/services', description: 'Web, apps & software' },
      { label: 'ProSystems', href: '/prosystems', description: 'Installation services' },
      { label: 'Our Process', href: '/process', description: 'How we work' },
      { label: 'Industries', href: '/industries', description: 'Sectors we serve' },
    ],
  },
  { label: 'Our Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
]

export const Header: React.FC<HeaderProps> = ({ logoUrl, logoAltUrl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()!
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const setHeaderHeightVar = () => {
      const headerEl = document.querySelector('.header') as HTMLElement | null
      if (headerEl) {
        const h = headerEl.offsetHeight
        document.documentElement.style.setProperty('--site-header-height', `${h}px`)
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setHeaderHeightVar()
    }

    const handleResize = () => {
      setHeaderHeightVar()
    }

    setHeaderHeightVar()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
    setActiveDropdown(null)
  }

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const isActiveLink = (href: string, dropdown?: DropdownItem[]) => {
    if (pathname === href) return true
    if (dropdown) {
      return dropdown.some((item) => pathname.startsWith(item.href))
    }
    return pathname.startsWith(href) && href !== '/'
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo" onClick={closeMenu}>
            {(logoAltUrl || logoUrl) ? (
              <span className="logo-images">
                {/* Dark mode logo */}
                <Image
                  src={logoAltUrl || logoUrl || ''}
                  alt="Mitchell Peck Development"
                  width={40}
                  height={40}
                  className="logo-image logo-dark"
                />
                {/* Light mode logo (only if both exist) */}
                {logoUrl && logoAltUrl && (
                  <Image
                    src={logoUrl}
                    alt="Mitchell Peck Development"
                    width={40}
                    height={40}
                    className="logo-image logo-light"
                  />
                )}
              </span>
            ) : (
              <span className="logo-mark">MP</span>
            )}
            <span className="logo-text">Mitchell Peck Development</span>
          </Link>

          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={`nav-item ${item.dropdown ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={item.href}
                    className={`nav-link ${isActiveLink(item.href, item.dropdown) ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                    {item.dropdown && (
                      <svg
                        className="dropdown-arrow"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>
                  {item.dropdown && (
                    <div
                      className={`dropdown-menu ${activeDropdown === item.label ? 'active' : ''}`}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="dropdown-item"
                          onClick={closeMenu}
                        >
                          <span className="dropdown-item-label">{dropdownItem.label}</span>
                          {dropdownItem.description && (
                            <span className="dropdown-item-description">
                              {dropdownItem.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="header-cta-group">
              <Link href="/contact" className="header-cta btn btn-primary" onClick={closeMenu}>
                Contact
              </Link>
              <Link
                href="https://portal.mitchellpeck.com/my/home"
                target="_blank"
                rel="noopener noreferrer"
                className="header-cta btn btn-secondary"
                onClick={closeMenu}
              >
                Client Portal
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
