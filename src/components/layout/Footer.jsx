import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h3>Studio Neem</h3>
            <p className={styles.tagline}>For Women By Women</p>
            <p>
              A nurturing space dedicated to women's wellness through the practice
              of yoga, meditation, and mindful movement. EST 2026.
            </p>
          </div>

          <nav className={styles.footerNav}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/studio">Our Studio</Link></li>
              <li><Link to="/classes">Classes</Link></li>
              <li><Link to="/sign-up">Membership</Link></li>
              <li><Link to="/calendar">Calendar</Link></li>
            </ul>
          </nav>

          <div className={styles.footerContact}>
            <h4>Contact</h4>
            <p>123 Serenity Lane<br />Austin, TX 78701</p>
            <p>hello@studioneem.com</p>
            <p>(512) 555-0142</p>
          </div>
        </div>

        <hr className={styles.divider} />
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Studio Neem. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
