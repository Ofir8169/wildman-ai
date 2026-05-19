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
  "/images/garden9.jpeg",
  "/images/garden10.jpeg",
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
      <div className="noise"></div>
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
        <div className="logo">WILDMAN</div>

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
            className={index === heroIndex ? "hero-bg active" : "hero-bg"}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="overlay"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <p className="mini">WILDMAN LANDSCAPE</p>

          <h1>
            מרחבי חוץ
            <span>עם סיפור</span>
          </h1>

          <p className="desc">
            תכנון והקמה של גינות, מערכות השקיה, פרגולות ודקים
            בקו מודרני, טבעי ונקי.
          </p>

          <div className="buttons">
            <a href="#gallery">צפייה בפרויקטים</a>
            <a href="#contact" className="light-btn">יצירת קשר</a>
          </div>
        </motion.div>
      </section>

      <section className="services" id="services">
        <motion.div
          className="title"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          
        </motion.div>

        <div className="cards">
          {[
            {
              n: "01",
              title: "עיצוב גינות",
              text: "תכנון גינות מודרניות בקו יוקרתי, טבעי ונקי.",
            },
            {
              n: "02",
              title: "תכנון השקיה",
              text: "מערכות השקיה חכמות בטכנולוגיה מתקדמת.",
            },
            {
              n: "03",
              title: "פרגולות ודקים",
              text: "פרגולות, דקים ופינות אירוח בגימור יוקרתי.",
            },
          ].map((item, index) => (
            <motion.div
              className="card"
              key={item.n}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: index * 0.12 }}
            >
              <span>{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="marquee">
        <div>
          עץ טבעי · אבן · תאורה חמה · צמחייה ים־תיכונית · ברזל · דקים · פרגולות ·
        </div>
      </section>

      <section className="gallery" id="gallery">
        <motion.div
          className="title"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          פרויקטים נבחרים
        </motion.div>

        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt=""
              onClick={() => setOpenImage(img)}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.04 }}
            />
          ))}
        </div>
      </section>

      <section className="cinematic-section">
        <div className="cinematic-image"></div>
        <div className="cinematic-overlay"></div>

        <motion.div
          className="cinematic-content"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p>WILDMAN EXPERIENCE</p>

          <h2>
            כל גינה מתחילה
            <span>בחוויה</span>
          </h2>

          <div className="cinematic-line"></div>

          <h3>
        בwild man אנחנו מאמינים שכל גינה היא סיפור, ואנחנו זוכים לעזור לכם ליצור חוויות חדשות וסיפורים יפים עם רגעים בלתי נשכחים, בעזרת סדרת מפגשים שתעזור לנו ליצור את הפינה שתמיד חלמתם עליה
       </h3>
        </motion.div>
      </section>

      <section className="contact" id="contact">
        <motion.div
          className="contact-box"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          <div className="title">
            רוצים להפוך את החצר
            <br />
            לפינת נוף קסומה?
          </div>

          <p>
            שלחו הודעה ונחזור אליכם לייעוץ, תכנון והערכת מחיר ראשונית.
          </p>

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
        </motion.div>
      </section>

      <nav className="mobile-nav">
        <a href="#home">בית</a>
        <a href="#services">שירותים</a>
        <a href="#gallery">פרויקטים</a>
        <a href="#contact">קשר</a>
      </nav>

      {openImage && (
        <div className="lightbox" onClick={() => setOpenImage(null)}>
          <button onClick={() => setOpenImage(null)}>×</button>
          <img src={openImage} alt="" />
        </div>
      )}
    </div>
  )
}