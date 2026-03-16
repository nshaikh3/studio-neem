import { useState, useMemo } from 'react';
import Hero from '../components/shared/Hero';
import SectionHeading from '../components/shared/SectionHeading';
import RegistrationForm from '../components/shared/RegistrationForm';
import ClassDetailsModal from '../components/shared/ClassDetailsModal';
import { useData } from '../context/DataContext';
import styles from './ClassesPage.module.css';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

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

  // Next month's leading days (fill to complete last row)
  const totalCells = Math.ceil(days.length / 7) * 7;
  const remaining = totalCells - days.length;
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

export default function ClassesPage() {
  const { classes, categories, getSchedule, getCategoryColors } = useData();
  const categoryColors = getCategoryColors();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const [selectedDate, setSelectedDate] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [detailsEvent, setDetailsEvent] = useState(null);

  const schedule = getSchedule();
  const calendarDays = getCalendarDays(year, month);

  // Generate schedule list for current month
  const monthSchedule = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const events = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      const dayEvents = schedule[dateKey] || [];
      dayEvents.forEach((event) => {
        const classData = classes.find((c) => c.name === event.className);
        events.push({
          ...event,
          date: dateKey,
          day,
          classData,
        });
      });
    }

    return events;
  }, [schedule, classes, year, month]);

  // Filter schedule based on selected date
  const displayedSchedule = useMemo(() => {
    if (selectedDate === null) {
      return monthSchedule;
    }
    return monthSchedule.filter((event) => event.day === selectedDate);
  }, [monthSchedule, selectedDate]);

  const handleDayClick = (day) => {
    // Toggle selection - if already selected, deselect to show all
    if (selectedDate === day) {
      setSelectedDate(null);
    } else {
      setSelectedDate(day);
    }
  };

  const handleRegister = (event) => {
    setDetailsEvent(null); // Close details modal if open
    setRegistration({
      classData: event.classData || {
        id: 0,
        name: event.className,
        instructor: event.instructor,
      },
      scheduleDate: event.date,
      scheduleTime: event.time,
    });
  };

  const handleShowDetails = (event) => {
    setDetailsEvent(event);
  };

  const formatDisplayDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getSelectedDateLabel = () => {
    if (selectedDate === null) return null;
    const dateKey = formatDateKey(year, month, selectedDate);
    const date = new Date(dateKey + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Hero
        title="Classes"
        subtitle="Find your practice and join us on the mat."
        size="short"
        gradient="rose"
      />

      <section className={styles.calendar}>
        <div className="container">
          <div className={styles.calendarHeader}>
            <h2 className={styles.monthTitle}>
              {MONTH_NAMES[month]} {year}
            </h2>
            <p className={styles.calendarHint}>Click a day to see its classes</p>
          </div>

          <div className={styles.calendarGrid}>
            {DAY_LABELS.map((label) => (
              <div key={label} className={styles.dayLabel}>
                {label}
              </div>
            ))}
            {calendarDays.map((cell, i) => {
              const dateKey = cell.isOtherMonth ? null : formatDateKey(year, month, cell.day);
              const dayEvents = dateKey ? (schedule[dateKey] || []) : [];
              const isToday = !cell.isOtherMonth && cell.day === now.getDate();
              const isSelected = !cell.isOtherMonth && selectedDate === cell.day;
              const hasClasses = dayEvents.length > 0;
              const uniqueCategories = [...new Set(dayEvents.map((e) => e.category))];

              return (
                <button
                  key={i}
                  className={`${styles.dayCell} ${cell.isOtherMonth ? styles.otherMonth : ''} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''} ${hasClasses ? styles.hasClasses : ''}`}
                  onClick={() => !cell.isOtherMonth && handleDayClick(cell.day)}
                  disabled={cell.isOtherMonth}
                >
                  <span className={styles.dayNumber}>{cell.day}</span>
                  {uniqueCategories.length > 0 && (
                    <div className={styles.dots}>
                      {uniqueCategories.map((cat) => (
                        <span
                          key={cat}
                          className={styles.dot}
                          style={{ backgroundColor: categoryColors[cat] || '#ccc' }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles.legend}>
            {categories.map((cat) => (
              <div key={cat.key} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{ backgroundColor: cat.color }}
                />
                <span className={styles.legendLabel}>{cat.label}</span>
              </div>
            ))}
          </div>

          {selectedDate !== null && (
            <button className={styles.clearFilter} onClick={() => setSelectedDate(null)}>
              Show all classes
            </button>
          )}
        </div>
      </section>

      <section className={styles.schedule}>
        <div className="container">
          <SectionHeading
            title={selectedDate !== null ? getSelectedDateLabel() : 'Class Schedule'}
            subtitle={selectedDate !== null ? `${displayedSchedule.length} class${displayedSchedule.length !== 1 ? 'es' : ''} scheduled` : 'Click Register to reserve your spot'}
          />

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Class</th>
                  <th>Instructor</th>
                  <th>Level</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {displayedSchedule.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={styles.emptyMessage}>
                      {selectedDate !== null
                        ? 'No classes scheduled for this day.'
                        : 'No classes scheduled for this month.'}
                    </td>
                  </tr>
                ) : (
                  displayedSchedule.map((event, index) => (
                    <tr key={index}>
                      <td>{formatDisplayDate(event.date)}</td>
                      <td>{event.time}</td>
                      <td>
                        <span
                          className={styles.categoryDot}
                          style={{ backgroundColor: categoryColors[event.category] || '#ccc' }}
                        />
                        {event.className}
                      </td>
                      <td>{event.instructor}</td>
                      <td>{event.level}</td>
                      <td className={styles.actionButtons}>
                        <button
                          className={styles.detailsBtn}
                          onClick={() => handleShowDetails(event)}
                        >
                          Details
                        </button>
                        <button
                          className={styles.registerBtn}
                          onClick={() => handleRegister(event)}
                        >
                          Register
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {detailsEvent && (
        <ClassDetailsModal
          event={detailsEvent}
          onClose={() => setDetailsEvent(null)}
          onRegister={() => handleRegister(detailsEvent)}
        />
      )}

      {registration && (
        <RegistrationForm
          classData={registration.classData}
          scheduleDate={registration.scheduleDate}
          scheduleTime={registration.scheduleTime}
          onClose={() => setRegistration(null)}
          onSuccess={() => setRegistration(null)}
        />
      )}
    </>
  );
}
