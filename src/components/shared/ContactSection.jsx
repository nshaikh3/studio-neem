import SectionHeading from './SectionHeading';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section className={styles.contact}>
      <div className="container">
        <SectionHeading title="Contact Us" />
        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.infoBlock}>
              <h4>Address</h4>
              <p>123 Serenity Lane<br />Austin, TX 78701</p>
            </div>

            <div className={styles.infoBlock}>
              <h4>Hours</h4>
              <ul className={styles.hours}>
                <li><span>Monday - Friday</span><span>6:30 AM - 8:00 PM</span></li>
                <li><span>Saturday</span><span>7:00 AM - 4:00 PM</span></li>
                <li><span>Sunday</span><span>8:00 AM - 12:00 PM</span></li>
              </ul>
            </div>

            <div className={styles.infoBlock}>
              <h4>Contact</h4>
              <p>
                <a href="mailto:hello@studioneem.com">hello@studioneem.com</a>
                <br />
                <a href="tel:+15125550142">(512) 555-0142</a>
              </p>
            </div>
          </div>

          <div className={styles.mapPlaceholder}>
            <span>Google Maps</span>
            <p>Map will be added when address is finalized</p>
          </div>
        </div>
      </div>
    </section>
  );
}
