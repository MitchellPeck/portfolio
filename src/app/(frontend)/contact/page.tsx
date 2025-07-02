import './contact.css'

export const metadata = {
  title: 'Contact | Mitchell Peck Development',
  description: 'Get in touch with Mitchell Peck for consulting, projects, and collaboration opportunities.',
}

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-hero">
          <h1 className="contact-title">Let's Work Together</h1>
          <p className="contact-subtitle">
            Ready to bring your ideas to life? Get in touch and let's discuss how we can create something amazing together.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="contact-details-text">
                  <h3>Email</h3>
                  <a href="mailto:me@mitchellpeck.com" className="contact-link">
                    me@mitchellpeck.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className="contact-details-text">
                  <h3>Phone</h3>
                  <a href="tel:4045281122" className="contact-link">
                    (404) 528-1122
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-cta">
            <h2>Ready to Get Started?</h2>
            <p>
              Complete our inquiry form to tell me about your project, timeline, and goals. 
              I'll get back to you within 24 hours to discuss next steps.
            </p>
            <a 
              href="https://portal.mitchellpeck.com/p/form/jzj9XK7XybACmsJfC" 
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
    </div>
  )
}
