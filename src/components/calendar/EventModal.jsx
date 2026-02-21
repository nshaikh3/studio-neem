import { categoryColors } from '../../data/classes';
import styles from './EventModal.module.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function EventModal({ day, month, year, events, onClose }) {
  if (!day) return null;

  const dateStr = `${MONTH_NAMES[month]} ${day}, ${year}`;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.date}>{dateStr}</h3>
        <button className={styles.close} onClick={onClose} aria-label="Close detail panel">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>

      {events.length === 0 ? (
        <p className={styles.noEvents}>No classes scheduled for this day.</p>
      ) : (
        <ul className={styles.eventList}>
          {events.map(event => (
            <li key={event.id} className={styles.eventItem}>
              <div
                className={styles.categoryDot}
                style={{ backgroundColor: categoryColors[event.category] }}
              />
              <div className={styles.eventInfo}>
                <h4 className={styles.eventName}>{event.className}</h4>
                <div className={styles.eventMeta}>
                  <span>{event.time}</span>
                  <span className={styles.separator}>&middot;</span>
                  <span>{event.duration}</span>
                </div>
                <div className={styles.eventDetails}>
                  <span>{event.instructor}</span>
                  <span className={styles.separator}>&middot;</span>
                  <span>{event.level}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
