import Hero from '../components/shared/Hero';
import Calendar from '../components/calendar/Calendar';
import { categoryColors, categoryLabels } from '../data/classes';
import styles from './CalendarPage.module.css';

export default function CalendarPage() {
  return (
    <>
      <Hero
        title="Class Calendar"
        subtitle="Browse our weekly schedule and find the perfect class for your practice."
        gradient="olive"
      />

      <section className={styles.calendarSection}>
        <div className="container">
          <Calendar />

          <div className={styles.legend}>
            <span className={styles.legendTitle}>Class Categories:</span>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <div key={key} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{ backgroundColor: categoryColors[key] }}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
