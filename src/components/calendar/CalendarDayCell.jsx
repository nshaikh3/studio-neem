import { useData } from '../../context/DataContext';
import styles from './CalendarDayCell.module.css';

export default function CalendarDayCell({ day, events, isToday, isOtherMonth, isSelected, onClick }) {
  const { getCategoryColors } = useData();
  const categoryColors = getCategoryColors();

  if (!day) {
    return <div className={styles.empty} />;
  }

  const uniqueCategories = [...new Set(events.map(e => e.category))];

  return (
    <button
      className={`${styles.cell} ${isToday ? styles.today : ''} ${isOtherMonth ? styles.otherMonth : ''} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      aria-label={`${day}, ${events.length} class${events.length !== 1 ? 'es' : ''}`}
    >
      <span className={styles.dayNumber}>{day}</span>
      {uniqueCategories.length > 0 && (
        <div className={styles.dots}>
          {uniqueCategories.map(cat => (
            <span
              key={cat}
              className={styles.dot}
              style={{ backgroundColor: categoryColors[cat] || '#ccc' }}
            />
          ))}
        </div>
      )}
      <span className={styles.eventCount}>
        {events.length > 0 && `${events.length}`}
      </span>
    </button>
  );
}
