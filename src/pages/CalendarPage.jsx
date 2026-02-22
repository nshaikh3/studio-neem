import Hero from '../components/shared/Hero';
import Calendar from '../components/calendar/Calendar';
import { useData } from '../context/DataContext';
import styles from './CalendarPage.module.css';

export default function CalendarPage() {
  const { categories } = useData();

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
            {categories.map(cat => (
              <div key={cat.key} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{ backgroundColor: cat.color }}
                />
                <span>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
