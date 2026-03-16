import Hero from '../components/shared/Hero';
import SectionHeading from '../components/shared/SectionHeading';
import ContactSection from '../components/shared/ContactSection';
import Button from '../components/shared/Button';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <Hero
        title="Studio Neem"
        subtitle="A sacred space for women to find strength, balance, and peace through the ancient practice of yoga."
        size="medium"
        gradient="olive"
      >
        <Button to="/classes" variant="light">View Classes</Button>
        <Button to="/gallery" variant="secondary">
          <span style={{ color: 'var(--cream)' }}>Gallery</span>
        </Button>
      </Hero>

      <section className={styles.welcome}>
        <div className="container">
          <div className={styles.welcomeGrid}>
            <div className={styles.welcomeImage}>
              <div className={styles.placeholder}>
                <span>Studio Photo</span>
              </div>
            </div>
            <div className={styles.welcomeText}>
              <SectionHeading
                title="Welcome to Studio Neem"
                align="left"
              />
              <p>
                Founded in 2026, Studio Neem is Austin's premier women-only yoga studio —
                a tranquil sanctuary where women of all ages, backgrounds, and experience levels
                come together to nurture body, mind, and spirit.
              </p>
              <p>
                Just as the neem tree has been revered for centuries for its healing properties,
                our studio is rooted in the belief that every woman deserves a dedicated space
                for wellness and self-discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Ready to Begin Your Journey?</h2>
          <p className={styles.ctaText}>
            Join our community of women dedicated to wellness, growth, and connection.
          </p>
          <div className={styles.ctaActions}>
            <Button to="/classes" variant="light">View Schedule & Register</Button>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
