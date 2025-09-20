"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import './prosystems.css'

export default function ProSystemsClient() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > window.innerHeight * 0.5)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="prosystems-page" id="top">
      {/* Sub Header (local navigation) */}
      <nav className={`prosystems-subnav ${isScrolled ? 'scrolled' : ''}`} aria-label="ProSystems sub navigation">
        <div className="container subnav-inner">
          <div className="subnav-brand">
            <Link href="#top" className="subnav-logo">ProSystems</Link>
          </div>
          <div className="subnav-links">
            <Link href="#top" className="subnav-link">Home</Link>
            <Link href="#services" className="subnav-link">Services</Link>
            <Link href="#about" className="subnav-link">About</Link>
            <Link href="#contact" className="subnav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="prosystems-hero">
        <div className="container">
          <h1 className="page-title">MPD ProSystems</h1>
          <p className="hero-sub">
            End-to-end design and installation for homes, offices, and vehicles. Reliable. Clean.
            Done right.
          </p>
          <div className="hero-cta">
            <Link href="#contact" className="button button-primary">
              Get a Quote
            </Link>
            <Link href="#services" className="button button-outline">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="section prosystems-services">
        <div className="container">
          <h2 className="section-title">What We Install</h2>
          <div className="services-grid">
            <article className="service-card">
              <div className="service-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3zm0 4a5 5 0 0 1 5 5h-2a3 3 0 0 0-3-3V7zm-1 4H3a9 9 0 0 0 9 9v-2a7 7 0 0 1-7-7h6v0z"/></svg>
              </div>
              <h3>Internet & Networking</h3>
              <p>
                Pro-grade Wi‑Fi design, mesh systems, hardwiring, rack builds, low‑voltage
                runs, ISP coordination, and speed optimization.
              </p>
              <ul className="feature-list">
                <li>Whole‑home/business coverage</li>
                <li>Ethernet drops & terminations</li>
                <li>Router, switch, and rack setup</li>
              </ul>
            </article>

            <article className="service-card">
              <div className="service-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 2 7v6c0 5 4 9 10 9s10-4 10-9V7L12 2zm0 2.18L20 8v5c0 4.42-3.58 8-8 8s-8-3.58-8-8V8l8-3.82zM7 13h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>
              </div>
              <h3>Security Systems</h3>
              <p>
                Cameras, NVRs, smart locks, sensors, and alerting. Clean installs with remote
                access and reliable storage.
              </p>
              <ul className="feature-list">
                <li>PoE/IP camera systems</li>
                <li>Smart locks and sensors</li>
                <li>App/remote monitoring setup</li>
              </ul>
            </article>

            <article className="service-card">
              <div className="service-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm2 4h14v10H5V9zm2 2v6h10v-6H7z"/></svg>
              </div>
              <h3>Audio / Video</h3>
              <p>
                TV mounting, projector setups, whole‑home audio, soundbars, receivers, and tidy
                cable management.
              </p>
              <ul className="feature-list">
                <li>TV mounting & concealment</li>
                <li>Surround sound & zones</li>
                <li>Projectors & screens</li>
              </ul>
            </article>

            <article className="service-card">
              <div className="service-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16l3 3 11-11-3-3L5 16zm-1.5 4H8l-4-4v4z"/></svg>
              </div>
              <h3>Car Installations</h3>
              <p>
                Head units, speakers, amps, subs, backup cameras, dash cams, and custom clean
                wiring.
              </p>
              <ul className="feature-list">
                <li>Apple CarPlay/Android Auto</li>
                <li>Amplifiers & sub enclosures</li>
                <li>OEM‑integration friendly</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section prosystems-about">
        <div className="container">
          <h2 className="section-title">About ProSystems</h2>
          <div className="about-content">
            <p>
              MPD ProSystems is a specialized branch of Mitchell Peck Development focused on
              professional, clean, and reliable installations. We bring the same engineering
              mindset from software into the physical world: planning, documentation, and
              meticulous execution.
            </p>
            <ul className="feature-list">
              <li>Consultative scoping and straightforward pricing</li>
              <li>Neat cable management and labeled terminations</li>
              <li>Vendor‑agnostic gear recommendations</li>
              <li>Post‑install support and tuning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section prosystems-process">
        <div className="container">
          <h2 className="section-title">Our Process</h2>
          <ol className="process-steps">
            <li>
              <strong>Consult.</strong> We review goals, space/vehicle, and constraints.
            </li>
            <li>
              <strong>Design.</strong> We propose gear, layout, and timelines.
            </li>
            <li>
              <strong>Install.</strong> Professional, clean, labeled, and tested.
            </li>
            <li>
              <strong>Support.</strong> We stand by our work and help you get the most out of it.
            </li>
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section prosystems-contact">
        <div className="container">
          <div className="contact-hero">
            <h2 className="section-title">Get in Touch</h2>
            <p className="contact-subtitle">Ready to upgrade your home, office, or vehicle? Tell us about your project.</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div className="contact-details-text">
                    <h4>Email</h4>
                    <a href="mailto:prosystems@mitchellpeck.com" className="contact-link">prosystems@mitchellpeck.com</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div className="contact-details-text">
                    <h4>Phone</h4>
                    <a href="tel:4045281122" className="contact-link">(404) 528-1122</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-cta">
              <h3>Ready to Get Started?</h3>
              <p>Complete our inquiry form to tell us about your project, timeline, and goals. We'll get back to you within 48 hours.</p>
              <a 
                href="https://portal.mitchellpeck.com/survey/start/96e76e1d-afc4-47db-b337-f84023805e2e"
                target="_blank"
                rel="noopener noreferrer"
                className="inquiry-button"
              >
                Complete Inquiry Form
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Back to Top button */}
      <button
        type="button"
        className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 4l6 6-1.41 1.41L13 7.83V20h-2V7.83L7.41 11.41 6 10l6-6z"/>
        </svg>
      </button>
    </div>
  )
}
