import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import "./index.css"

const heroImages = [
  "/images/garden1.jpeg",
  "/images/garden2.jpeg",
  "/images/garden3.jpeg",
  "/images/garden4.jpeg",
]

const galleryImages = [
  "/images/garden1.jpeg",
  "/images/garden2.jpeg",
  "/images/garden3.jpeg",
  "/images/garden4.jpeg",
  "/images/garden5.jpeg",
  "/images/garden6.jpeg",
  "/images/garden7.jpeg",
  "/images/garden8.jpeg",
]

export default function App() {

  const [heroIndex, setHeroIndex] = useState(0)
  const [openImage, setOpenImage] = useState(null)

  useEffect(() => {

    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 3200)

    return () => clearInterval(timer)

  }, [])

  return (

    <div className="app">

      <div className="progress-bar"></div>

      <a
        className="floating-whatsapp"
        href="https://wa.me/972525014084"
        target="_blank"
        rel="noreferrer"
      >
        ✆
      </a>

      <header className="navbar">

        <div className="logo">
          WILDMAN
        </div>

        <nav>
          <a href="#home">בית</a>
          <a href="#services">שירותים</a>
          <a href="#gallery">פרויקטים</a>
          <a href="#contact">צור קשר</a>
        </nav>

      </header>

      <section className="hero" id="home">

        {heroImages.map((img, index) => (

          <div
            key={img}
            className={
              index === heroIndex
                ? "hero-bg active"
                : "hero-bg"
            }
            style={{
              backgroundImage: `url(${img})`
            }}
          />

        ))}

        <div className="overlay"></div>

        <motion.div

          className="hero-content"

          initial={{
            opacity: 0,
            y: 40
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 1.2
          }}
        >

          <p className="mini">
            WILDMAN LANDSCAPE
          </p>

          <h1>
            מרחבי חוץ
            <span>עם סיפור</span>
          </h1>

          <p className="desc">
            תכנון והקמה של גינות יוקרה,
            מערכות השקיה חכמות,
            פרגולות ודקים בקו מודרני ונקי.
          </p>

          <div className="buttons">

            <a href="#gallery">
              עבודות
            </a>

            <a href="#contact">
              יצירת קשר
            </a>

          </div>

        </motion.div>

      </section>

      <section className="services" id="services">

        <div className="section-mini">
          השירותים שלנו
        </div>

        <div className="title">
          עיצוב חוץ ברמה אחרת
        </div>

        <div className="cards">

          <div className="card">

            <span>01</span>

            <h3>
              עיצוב גינות
            </h3>

            <p>
              תכנון גינות מודרניות בקו יוקרתי ונקי.
            </p>

          </div>

          <div className="card">

            <span>02</span>

            <h3>
              תכנון השקיה
            </h3>

            <p>
              מערכות חכמות בטכנולוגיה מתקדמת.
            </p>

          </div>

          <div className="card">

            <span>03</span>

            <h3>
              פרגולות ודקים
            </h3>

            <p>
              פרגולות, דקים ופינות אירוח בגימור יוקרתי.
            </p>

          </div>

        </div>

      </section>

      <section className="gallery" id="gallery">

        <div className="section-mini">
          פרויקטים נבחרים
        </div>

        <div className="title">
          גלריית עבודות
        </div>

        <div className="gallery-grid">

          {galleryImages.map((img, index) => (

            <img
              key={index}
              src={img}
              alt=""
              onClick={() => setOpenImage(img)}
            />

          ))}

        </div>

      </section>

      <section className="cinematic-section">

        <div className="cinematic-image"></div>

        <div className="cinematic-overlay"></div>

        <div className="cinematic-content">

          <p>
            WILDMAN EXPERIENCE
          </p>

          <h2>
            כל גינה מתחילה
            <span>בחוויה</span>
          </h2>

          <div className="cinematic-line"></div>

          <h3>
            שילוב של טבע,
            תאורה,
            חומרים מדויקים
            ועיצוב על־זמני.
          </h3>

        </div>

      </section>

      <section className="contact" id="contact">

        <div className="contact-box">

          <div className="title">
            רוצים להפוך את החצר
            <br />
            למרחב יוקרתי?
          </div>

          <div className="contact-buttons">

            <a
              className="instagram"
              href="https://www.instagram.com/wildman_landscape"
              target="_blank"
              rel="noreferrer"
            >
              אינסטגרם
            </a>

            <a
              className="whatsapp"
              href="https://wa.me/972525014084"
              target="_blank"
              rel="noreferrer"
            >
              וואטסאפ
            </a>

          </div>

        </div>

      </section>

      <nav className="mobile-nav">

        <a href="#home">
          בית
        </a>

        <a href="#services">
          שירותים
        </a>

        <a href="#gallery">
          פרויקטים
        </a>

        <a href="#contact">
          קשר
        </a>

      </nav>

      {openImage && (

        <div
          className="lightbox"
          onClick={() => setOpenImage(null)}
        >

          <button
            onClick={() => setOpenImage(null)}
          >
            ×
          </button>

          <img src={openImage} alt="" />

        </div>

      )}

    </div>

  )

}