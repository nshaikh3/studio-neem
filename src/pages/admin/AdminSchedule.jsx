import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/admin/shared/Modal';
import ScheduleEventForm from '../../components/admin/forms/ScheduleEventForm';
import HolidayForm from '../../components/admin/forms/HolidayForm';
import styles from '../../components/admin/AdminLayout.module.css';
import scheduleStyles from './AdminSchedule.module.css';

const DAYS = [
  { key: 'sunday', label: 'Sunday' },
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
];

export default function AdminSchedule() {
  const {
    scheduleTemplate,
    classes,
    categories,
    addScheduleSlot,
    removeScheduleSlot,
    scheduleEndDate,
    setScheduleEndDate,
    holidayDates,
    addHoliday,
    removeHoliday,
  } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [holidayModalOpen, setHolidayModalOpen] = useState(false);

  const handleAdd = () => {
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    addScheduleSlot(formData.day, {
      classId: formData.classId,
      time: formData.time,
    });
    setModalOpen(false);
  };

  const handleRemove = (day, index) => {
    if (window.confirm('Remove this class slot?')) {
      removeScheduleSlot(day, index);
    }
  };

  const handleAddHoliday = (holiday) => {
    addHoliday(holiday);
    setHolidayModalOpen(false);
  };

  const handleRemoveHoliday = (date) => {
    if (window.confirm('Remove this holiday?')) {
      removeHoliday(date);
    }
  };

  const handleEndDateChange = (e) => {
    setScheduleEndDate(e.target.value || null);
  };

  const handleClearEndDate = () => {
    setScheduleEndDate(null);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getClassById = (id) => classes.find((c) => c.id === id);

  const getCategoryColor = (key) => {
    const cat = categories.find((c) => c.key === key);
    return cat ? cat.color : '#ccc';
  };

  // Sort slots by time
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

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Weekly Schedule</h1>
        <p className={styles.pageSubtitle}>
          Configure the recurring weekly class template
        </p>
        <div className={styles.headerActions}>
          <button onClick={handleAdd} className={`${styles.btn} ${styles.btnPrimary}`}>
            + Add Class Slot
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Schedule Settings</h2>
          </div>
          <div className={styles.cardBody}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#2D2D2D', marginBottom: '0.375rem' }}>
                End Date
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="date"
                  value={scheduleEndDate || ''}
                  onChange={handleEndDateChange}
                  style={{
                    flex: 1,
                    padding: '0.625rem 0.875rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                  }}
                />
                {scheduleEndDate && (
                  <button
                    onClick={handleClearEndDate}
                    className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>
              Schedule repeats until this date. Leave empty for no end date.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Holiday Dates (Studio Closed)</h2>
          </div>
          <div className={styles.cardBody}>
            {holidayDates.length === 0 ? (
              <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 1rem' }}>
                No holidays added yet.
              </p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem' }}>
                {holidayDates.map((holiday) => (
                  <li
                    key={holiday.date}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <span>
                      <strong>{formatDate(holiday.date)}</strong> - {holiday.reason}
                    </span>
                    <button
                      onClick={() => handleRemoveHoliday(holiday.date)}
                      className={styles.btnIcon}
                      aria-label="Remove holiday"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setHolidayModalOpen(true)}
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              + Add Holiday
            </button>
          </div>
        </div>
      </div>

      <div className={scheduleStyles.grid}>
        {DAYS.map((day) => {
          const slots = scheduleTemplate[day.key] || [];
          const sortedSlots = sortByTime(slots);

          return (
            <div key={day.key} className={scheduleStyles.dayColumn}>
              <h3 className={scheduleStyles.dayTitle}>{day.label}</h3>
              <div className={scheduleStyles.slots}>
                {sortedSlots.length === 0 ? (
                  <p className={scheduleStyles.empty}>No classes</p>
                ) : (
                  sortedSlots.map((slot, idx) => {
                    const cls = getClassById(slot.classId);
                    if (!cls) return null;
                    const originalIndex = slots.indexOf(slot);

                    return (
                      <div
                        key={idx}
                        className={scheduleStyles.slot}
                        style={{ borderLeftColor: getCategoryColor(cls.category) }}
                      >
                        <div className={scheduleStyles.slotTime}>{slot.time}</div>
                        <div className={scheduleStyles.slotName}>{cls.name}</div>
                        <div className={scheduleStyles.slotInstructor}>
                          {cls.instructor}
                        </div>
                        <button
                          onClick={() => handleRemove(day.key, originalIndex)}
                          className={scheduleStyles.removeBtn}
                          aria-label="Remove slot"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Class Slot">
        <ScheduleEventForm
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={holidayModalOpen} onClose={() => setHolidayModalOpen(false)} title="Add Holiday">
        <HolidayForm
          onSubmit={handleAddHoliday}
          onCancel={() => setHolidayModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
