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
  const [mobileSubmenu, setMobileSubmenu] = useState<NavItem | null>(null)
  const pathname = usePathname()!
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Close everything when the route changes (covers browser back/forward).
  // State is adjusted during render per React's "you might not need an effect".
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setIsMenuOpen(false)
    setActiveDropdown(null)
    setMobileSubmenu(null)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  // Escape closes the mobile menu, submenu, and any open dropdown
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setActiveDropdown(null)
        setMobileSubmenu(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock page scroll behind the full-screen mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previous
      }
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setMobileSubmenu(null)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
    setMobileSubmenu(null)
  }

  const isDesktop = () => window.innerWidth > 768

  const openDropdown = (label: string) => {
    if (!isDesktop()) return
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const scheduleDropdownClose = () => {
    if (!isDesktop()) return
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
          <Link
            href="/"
            className="logo"
            onClick={closeMenu}
            aria-label="Mitchell Peck Development — home"
          >
            {(logoAltUrl || logoUrl) ? (
              <span className="logo-images">
                {/* Dark mode logo */}
                <Image
                  src={logoAltUrl || logoUrl || ''}
                  alt=""
                  width={40}
                  height={40}
                  className="logo-image logo-dark"
                />
                {/* Light mode logo (only if both exist) */}
                {logoUrl && logoAltUrl && (
                  <Image
                    src={logoUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="logo-image logo-light"
                  />
                )}
              </span>
            ) : (
              <span className="logo-mark" aria-hidden="true">MP</span>
            )}
            <span className="logo-text" aria-hidden="true">Mitchell Peck Development</span>
          </Link>

          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="site-nav"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <nav id="site-nav" className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={`nav-item ${item.dropdown ? 'has-dropdown' : ''} ${item.dropdown && activeDropdown === item.label ? 'dropdown-open' : ''}`}
                  onMouseEnter={() => item.dropdown && openDropdown(item.label)}
                  onMouseLeave={scheduleDropdownClose}
                  onFocus={() => item.dropdown && openDropdown(item.label)}
                  onBlur={scheduleDropdownClose}
                >
                  <Link
                    href={item.href}
                    className={`nav-link ${isActiveLink(item.href, item.dropdown) ? 'active' : ''}`}
                    aria-haspopup={item.dropdown ? 'menu' : undefined}
                    aria-expanded={item.dropdown ? activeDropdown === item.label : undefined}
                    onClick={(e) => {
                      // On mobile, open submenu instead of navigating
                      if (item.dropdown && window.innerWidth <= 768) {
                        e.preventDefault()
                        setMobileSubmenu(item)
                      } else {
                        closeMenu()
                      }
                    }}
                  >
                    {item.label}
                    {item.dropdown && (
                      <svg
                        className="dropdown-arrow"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
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
                <span className="visually-hidden"> (opens in new tab)</span>
              </Link>
            </div>
          </nav>

          {/* Mobile Submenu */}
          <div className={`mobile-submenu ${mobileSubmenu ? 'active' : ''}`}>
            <button
              className="mobile-submenu-back"
              onClick={() => setMobileSubmenu(null)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            {mobileSubmenu && (
              <>
                <h2 className="mobile-submenu-title">{mobileSubmenu.label}</h2>
                <ul className="mobile-submenu-list">
                  {mobileSubmenu.dropdown?.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="mobile-submenu-link"
                        onClick={closeMenu}
                      >
                        <span className="mobile-submenu-link-label">{item.label}</span>
                        {item.description && (
                          <span className="mobile-submenu-link-desc">{item.description}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
