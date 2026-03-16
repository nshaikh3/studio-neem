import Hero from '../components/shared/Hero';
import SectionHeading from '../components/shared/SectionHeading';
import { useData } from '../context/DataContext';
import styles from './GalleryPage.module.css';

export default function GalleryPage() {
  const { classes } = useData();

  // Collect all gallery images from all classes
  const allImages = classes.flatMap((cls) =>
    (cls.galleryImages || []).map((url) => ({
      url,
      className: cls.name,
      classId: cls.id,
    }))
  );

  return (
    <>
      <Hero
        title="Gallery"
        subtitle="Moments from our studio - the practice, the community, the journey."
        size="short"
        gradient="rose"
      />

      <section className={styles.gallery}>
        <div className="container">
          {allImages.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="8" y="8" width="48" height="48" rx="4" />
                  <circle cx="24" cy="24" r="6" />
                  <path d="M8 44l16-16 12 12 12-12 8 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Coming Soon</h3>
              <p>Our gallery is being curated. Check back soon for photos from our classes and community events.</p>
            </div>
          ) : (
            <>
              <SectionHeading
                title="Class Photos"
                subtitle="Snapshots from our yoga community"
              />
              <div className={styles.imageGrid}>
                {allImages.map((img, index) => (
                  <div key={index} className={styles.imageCard}>
                    <img src={img.url} alt={`${img.className} class`} className={styles.image} />
                    <div className={styles.imageOverlay}>
                      <span className={styles.imageLabel}>{img.className}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
