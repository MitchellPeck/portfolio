'use client'

import React from 'react'
import Link from 'next/link'
import './Footer.css'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">Mitchell Peck Development</h2>
            <p className="footer-tagline">
              Delivering intelligent solutions—smarter tech, smarter timing, smarter outcomes.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3 className="footer-heading">Navigation</h3>
              <ul className="footer-nav-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/projects">Projects</Link>
                </li>
                <li>
                  <Link href="/consulting">Consulting</Link>
                </li>
                <li>
                  <Link href="/posts">Blog</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-heading">Connect</h3>
              <ul className="footer-nav-list">
                <li>
                  <a
                    href="https://github.com/MitchellPeck"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/mitchell-a-peck/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:me@mitchellpeck.com">Email</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Mitchell Peck Development. All rights reserved.
          </p>
          {/* <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
