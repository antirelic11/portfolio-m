import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsContactOpen(false)
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <main className="portfolio-home">
      <div className="grad" />
      <h1 className="page-title">Mehdi Dassouli</h1>

      <nav className="portfolio-frame" aria-label="Portfolio navigation">
        <a
          className="github-link"
          href="https://github.com/antirelic11"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png"
            alt=""
            className="github-icon"
          />
          View My Github Page
        </a>
        <a href="./aboutme">About Me</a>
        <a href="./projects">Projects</a>
        <a href="./objectives">Objectives</a>
        <button
          type="button"
          className="contact-button"
          onClick={() => setIsContactOpen(true)}
        >
          Informations
        </button>
      </nav>

      {isContactOpen && (
        <div
          className="contact-popup"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsContactOpen(false)
          }}
        >
          <section
            className="contact-popup-frame"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
          >
            <button
              type="button"
              className="close-button"
              aria-label="Close contact information"
              onClick={() => setIsContactOpen(false)}
            >
              &times;
            </button>
            <h2 id="contact-title">Contact Information</h2>
            <p>Email: mehdidassouli956@gmail.com</p>
            <p>Phone: +86 18800470027</p>
            <p>WeChat ID: mehdiiid</p>
            <p>Location: Heilongjiang, Harbin, China</p>
            <p>Student at Harbin Institute of Technology</p>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
