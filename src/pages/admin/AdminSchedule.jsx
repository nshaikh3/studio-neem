import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/admin/shared/Modal';
import ScheduleEventForm from '../../components/admin/forms/ScheduleEventForm';
import styles from '../../components/admin/AdminLayout.module.css';
import scheduleStyles from './AdminSchedule.module.css';

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

function getWeekStartDate(year, month, day) {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - dayOfWeek);
  return sunday;
}

export default function AdminSchedule() {
  const {
    schedule,
    classes,
    categories,
    addClassToDate,
    removeClassFromDate,
    copyWeekToNext,
  } = useData();

  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const calendarDays = getCalendarDays(viewYear, viewMonth);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    const dateKey = formatDateKey(viewYear, viewMonth, day);
    setSelectedDate(dateKey);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleAddSubmit = (formData) => {
    addClassToDate(selectedDate, {
      classId: formData.classId,
      time: formData.time,
    });
    setAddModalOpen(false);
  };

  const handleRemove = (index) => {
    if (window.confirm('Remove this class?')) {
      removeClassFromDate(selectedDate, index);
    }
  };

  const handleCopyWeek = () => {
    if (!selectedDate) return;
    const [year, month, day] = selectedDate.split('-').map(Number);
    const weekStart = getWeekStartDate(year, month - 1, day);

    const nextWeekEnd = new Date(weekStart);
    nextWeekEnd.setDate(weekStart.getDate() + 13);
    const endStr = nextWeekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    if (window.confirm(`Copy this week's schedule to next week (ending ${endStr})?`)) {
      copyWeekToNext(weekStart);
    }
  };

  const getClassById = (id) => classes.find((c) => c.id === id);

  const getCategoryColor = (key) => {
    const cat = categories.find((c) => c.key === key);
    return cat ? cat.color : '#ccc';
  };

  const sortByTime = (slots) => {
    return [...slots].sort((a, b) => {
      const timeA = a.time.toLowerCase();
      const timeB = b.time.toLowerCase();
      const parseTime = (t) => {
        const [time, period] = t.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'pm' && hours !== 12) hours += 12;
        if (period === 'am' && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };
      return parseTime(timeA) - parseTime(timeB);
    });
  };

  const getDateLabel = (dateKey) => {
    const date = new Date(dateKey + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const selectedDaySlots = selectedDate ? (schedule[selectedDate] || []) : [];
  const sortedSlots = sortByTime(selectedDaySlots);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Schedule</h1>
        <p className={styles.pageSubtitle}>
          Click a date to add or remove classes
        </p>
      </div>

      <div className={scheduleStyles.calendarCard}>
        <div className={scheduleStyles.calendarHeader}>
          <button
            onClick={handlePrevMonth}
            className={scheduleStyles.navBtn}
            aria-label="Previous month"
          >
            &larr;
          </button>
          <h2 className={scheduleStyles.monthTitle}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h2>
          <button
            onClick={handleNextMonth}
            className={scheduleStyles.navBtn}
            aria-label="Next month"
          >
            &rarr;
          </button>
        </div>

        <div className={scheduleStyles.calendarGrid}>
          {DAY_LABELS.map((label) => (
            <div key={label} className={scheduleStyles.dayLabel}>
              {label}
            </div>
          ))}
          {calendarDays.map((cell, i) => {
            const dateKey = cell.isOtherMonth ? null : formatDateKey(viewYear, viewMonth, cell.day);
            const daySlots = dateKey ? (schedule[dateKey] || []) : [];
            const classCount = daySlots.length;
            const isToday = !cell.isOtherMonth &&
              viewYear === now.getFullYear() &&
              viewMonth === now.getMonth() &&
              cell.day === now.getDate();

            return (
              <button
                key={i}
                className={`${scheduleStyles.dayCell} ${cell.isOtherMonth ? scheduleStyles.otherMonth : ''} ${isToday ? scheduleStyles.today : ''}`}
                onClick={() => !cell.isOtherMonth && handleDayClick(cell.day)}
                disabled={cell.isOtherMonth}
              >
                <span className={scheduleStyles.dayNumber}>{cell.day}</span>
                {classCount > 0 && (
                  <span className={scheduleStyles.classCount}>{classCount}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className={scheduleStyles.legend}>
          {categories.map((cat) => (
            <div key={cat.key} className={scheduleStyles.legendItem}>
              <span
                className={scheduleStyles.legendDot}
                style={{ backgroundColor: cat.color }}
              />
              <span className={scheduleStyles.legendLabel}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={selectedDate !== null}
        onClose={handleCloseModal}
        title={selectedDate ? getDateLabel(selectedDate) : ''}
      >
        <div className={scheduleStyles.dayModal}>
          <div className={scheduleStyles.dayModalHeader}>
            <button
              onClick={handleAddClick}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              + Add Class
            </button>
            <button
              onClick={handleCopyWeek}
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              Copy Week &rarr;
            </button>
          </div>

          {sortedSlots.length === 0 ? (
            <p className={scheduleStyles.emptyDay}>No classes scheduled for this day.</p>
          ) : (
            <div className={scheduleStyles.slotList}>
              {sortedSlots.map((slot, idx) => {
                const cls = getClassById(slot.classId);
                if (!cls) return null;
                const originalIndex = selectedDaySlots.indexOf(slot);

                return (
                  <div
                    key={idx}
                    className={scheduleStyles.slotItem}
                    style={{ borderLeftColor: getCategoryColor(cls.category) }}
                  >
                    <div className={scheduleStyles.slotTime}>{slot.time}</div>
                    <div className={scheduleStyles.slotDetails}>
                      <div className={scheduleStyles.slotName}>{cls.name}</div>
                      <div className={scheduleStyles.slotInstructor}>{cls.instructor}</div>
                    </div>
                    <button
                      onClick={() => handleRemove(originalIndex)}
                      className={scheduleStyles.removeBtn}
                      aria-label="Remove class"
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Class"
      >
        <ScheduleEventForm
          onSubmit={handleAddSubmit}
          onCancel={() => setAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
