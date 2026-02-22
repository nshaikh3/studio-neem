import Hero from '../components/shared/Hero';
import SectionHeading from '../components/shared/SectionHeading';
import ClassCard from '../components/shared/ClassCard';
import Button from '../components/shared/Button';
import { useData } from '../context/DataContext';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { classes } = useData();
  const featured = classes.filter(c => c.featured);

  return (
    <>
      <Hero
        title="Studio Neem"
        subtitle="A sacred space for women to find strength, balance, and peace through the ancient practice of yoga."
        size="full"
        gradient="olive"
      >
        <Button to="/classes" variant="light">Explore Classes</Button>
        <Button to="/sign-up" variant="secondary">
          <span style={{ color: 'var(--cream)' }}>Join Us</span>
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
              <Button to="/studio" variant="secondary">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuredClasses}>
        <div className="container">
          <SectionHeading
            title="Featured Classes"
            subtitle="From gentle flows to powerful practices, find the class that speaks to you."
          />
          <div className={styles.classGrid}>
            {featured.map(cls => (
              <ClassCard key={cls.id} classData={cls} />
            ))}
          </div>
          <div className={styles.classesAction}>
            <Button to="/classes">View All Classes</Button>
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
            <Button to="/sign-up" variant="light">View Membership Options</Button>
            <Button to="/calendar" variant="secondary">
              <span style={{ color: 'var(--cream)' }}>See Schedule</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
