import { useState, useCallback } from 'react';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import { schedule } from '../../data/schedule';
import styles from './Calendar.module.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDateKey(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function Calendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  const goToPrev = useCallback(() => {
    setSelectedDay(null);
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  }, [month]);

  const goToNext = useCallback(() => {
    setSelectedDay(null);
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  }, [month]);

  const goToToday = useCallback(() => {
    setYear(now.getFullYear());
    setMonth(now.getMonth());
    setSelectedDay(now.getDate());
  }, []);

  const selectedEvents = selectedDay
    ? (schedule[formatDateKey(year, month, selectedDay)] || [])
    : [];

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendarMain}>
        <div className={styles.navigation}>
          <button className={styles.navBtn} onClick={goToPrev} aria-label="Previous month">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>

          <div className={styles.monthYear}>
            <h2 className={styles.monthLabel}>{MONTH_NAMES[month]} {year}</h2>
            <button className={styles.todayBtn} onClick={goToToday}>Today</button>
          </div>

          <button className={styles.navBtn} onClick={goToNext} aria-label="Next month">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 4l6 6-6 6" />
            </svg>
          </button>
        </div>

        <CalendarGrid
          year={year}
          month={month}
          schedule={schedule}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
      </div>

      <div className={`${styles.detailPanel} ${selectedDay ? styles.open : ''}`}>
        <EventModal
          day={selectedDay}
          month={month}
          year={year}
          events={selectedEvents}
          onClose={() => setSelectedDay(null)}
        />
      </div>
    </div>
  );
}
