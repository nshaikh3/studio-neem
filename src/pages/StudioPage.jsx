import Hero from '../components/shared/Hero';
import SectionHeading from '../components/shared/SectionHeading';
import styles from './StudioPage.module.css';

const amenities = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4v4M16 24v4M6 16H2M30 16h-4M8.93 8.93L6.1 6.1M25.07 25.07l-2.83-2.83M8.93 23.07l-2.83 2.83M25.07 6.93l-2.83 2.83" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="5"/>
      </svg>
    ),
    title: 'Heated Studio',
    description: 'Temperature-controlled rooms for hot yoga and warm vinyasa classes.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="8" width="20" height="16" rx="1" strokeLinecap="round"/>
        <path d="M6 12h20M10 8v-2M22 8v-2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Complimentary Mats',
    description: 'Premium yoga mats and props provided for all members at no extra cost.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4v6a4 4 0 008 0V4" strokeLinecap="round"/>
        <path d="M8 14c0 6 3 10 8 14 5-4 8-8 8-14" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Shower Facilities',
    description: 'Spacious private showers with organic bath products and fresh towels.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 24h20M8 24v-4h5v4M19 24v-6h5v6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10.5" cy="14" r="3"/>
        <path d="M10.5 11v-3M7.5 14h-2M13.5 14h2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Tea Lounge',
    description: 'A cozy space to unwind before or after class with herbal teas and light refreshments.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="6" width="24" height="20" rx="2"/>
        <path d="M16 6v20M4 16h24" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Private Changing',
    description: 'Individual changing rooms with secure lockers and vanity stations.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="12" width="24" height="14" rx="2"/>
        <path d="M8 12V8a4 4 0 014-4h8a4 4 0 014 4v4" strokeLinecap="round"/>
        <circle cx="16" cy="19" r="2"/>
      </svg>
    ),
    title: 'On-Site Parking',
    description: 'Convenient free parking in our private lot, just steps from the studio entrance.',
  },
];

export default function StudioPage() {
  return (
    <>
      <Hero title="Our Studio" gradient="olive" />

      <section className={styles.philosophy}>
        <div className="container">
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyText}>
              <SectionHeading
                title="Our Philosophy"
                align="left"
              />
              <p>
                Founded on the belief that women deserve a dedicated space for wellness,
                Studio Neem provides a sanctuary free from judgment and competition.
                Here, every woman — regardless of age, body type, or experience level —
                is welcomed with open arms.
              </p>
              <p>
                Our name draws inspiration from the neem tree, a symbol of healing, protection,
                and renewal in many cultures. Like the tree itself, our practice is rooted in
                ancient wisdom yet designed for the modern woman.
              </p>
            </div>
            <div className={styles.philosophyImage}>
              <div className={styles.placeholder} style={{ background: 'linear-gradient(135deg, var(--terracotta) 0%, var(--dusty-rose) 100%)' }}>
                <span>Studio Interior</span>
              </div>
            </div>
          </div>

          <div className={`${styles.philosophyGrid} ${styles.reversed}`}>
            <div className={styles.philosophyImage}>
              <div className={styles.placeholder} style={{ background: 'linear-gradient(135deg, var(--dusty-rose) 0%, var(--warm-tan-light) 100%)' }}>
                <span>Our Instructors</span>
              </div>
            </div>
            <div className={styles.philosophyText}>
              <SectionHeading
                title="Our Instructors"
                align="left"
              />
              <p>
                Our team of certified instructors brings decades of combined experience
                across diverse yoga traditions. Each teacher is selected not only for their
                technical expertise but for their ability to create a warm, inclusive atmosphere.
              </p>
              <p>
                From Priya's gentle morning flows to Aisha's powerful vinyasa sequences,
                our instructors guide you on a deeply personal journey of strength,
                flexibility, and inner peace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.amenities}>
        <div className="container">
          <SectionHeading
            title="Studio Amenities"
            subtitle="Everything you need for a complete wellness experience, all under one roof."
          />
          <div className={styles.amenitiesGrid}>
            {amenities.map((amenity, i) => (
              <div key={i} className={styles.amenityCard}>
                <div className={styles.amenityIcon}>{amenity.icon}</div>
                <h4 className={styles.amenityTitle}>{amenity.title}</h4>
                <p className={styles.amenityDesc}>{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.location}>
        <div className="container">
          <SectionHeading title="Find Us" />
          <div className={styles.locationGrid}>
            <div className={styles.locationInfo}>
              <h4>Address</h4>
              <p>123 Serenity Lane<br />Austin, TX 78701</p>

              <h4>Hours</h4>
              <ul className={styles.hours}>
                <li><span>Monday – Friday</span><span>6:30 AM – 8:00 PM</span></li>
                <li><span>Saturday</span><span>7:00 AM – 4:00 PM</span></li>
                <li><span>Sunday</span><span>8:00 AM – 12:00 PM</span></li>
              </ul>

              <h4>Contact</h4>
              <p>hello@studioneem.com<br />(512) 555-0142</p>
            </div>
            <div className={styles.mapPlaceholder}>
              <span>Google Maps Embed</span>
              <p>Map will be added when address is finalized</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
