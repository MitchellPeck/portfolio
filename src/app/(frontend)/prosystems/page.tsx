import Link from 'next/link'
import './prosystems.css'

export const metadata = {
  title: 'MPD ProSystems | Mitchell Peck Development',
  description:
    'Professional installations: Internet/Networking, Security Systems, Audio/Video, and Car Installations by MPD ProSystems.',
}

export default function ProSystemsPage() {
  return (
    <div className="prosystems-page">
      {/* Hero */}
      <section className="prosystems-hero">
        <div className="container">
          <h1 className="page-title">MPD ProSystems</h1>
          <p className="hero-sub">
            End-to-end design and installation for homes, offices, and vehicles. Reliable. Clean.
            Done right.
          </p>
          <div className="hero-cta">
            <Link href="/contact" className="button button-primary">
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
          <div className="section-footer">
            <Link href="/contact" className="button button-primary">Start Your Project</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
