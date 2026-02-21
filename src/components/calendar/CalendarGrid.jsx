import CalendarDayCell from './CalendarDayCell';
import styles from './CalendarGrid.module.css';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  // Previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isOtherMonth: true });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, isOtherMonth: false });
  }

  // Next month's leading days (fill to 42 cells = 6 rows)
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ day: d, isOtherMonth: true });
  }

  return days;
}

function formatDateKey(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function CalendarGrid({ year, month, schedule, selectedDay, onSelectDay }) {
  const days = getCalendarDays(year, month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <div className={styles.grid}>
      {DAY_LABELS.map(label => (
        <div key={label} className={styles.dayLabel}>{label}</div>
      ))}
      {days.map((cell, i) => {
        const dateKey = cell.isOtherMonth ? null : formatDateKey(year, month, cell.day);
        const events = dateKey ? (schedule[dateKey] || []) : [];
        const isToday = isCurrentMonth && !cell.isOtherMonth && cell.day === today.getDate();
        const isSelected = !cell.isOtherMonth && cell.day === selectedDay;

        return (
          <CalendarDayCell
            key={i}
            day={cell.day}
            events={events}
            isToday={isToday}
            isOtherMonth={cell.isOtherMonth}
            isSelected={isSelected}
            onClick={() => !cell.isOtherMonth && onSelectDay(cell.day)}
          />
        );
      })}
    </div>
  );
}
