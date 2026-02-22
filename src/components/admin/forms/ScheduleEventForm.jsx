import { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import styles from './FormStyles.module.css';

const DAYS = [
  { key: 'sunday', label: 'Sunday' },
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
];

const TIMES = [
  '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
];

export default function ScheduleEventForm({ eventData, onSubmit, onCancel }) {
  const { classes } = useData();
  const isEditing = !!eventData;

  const [formData, setFormData] = useState({
    day: 'monday',
    classId: classes[0]?.id || 1,
    time: '9:00 AM',
  });

  useEffect(() => {
    if (eventData) {
      setFormData({
        day: eventData.day || 'monday',
        classId: eventData.classId || classes[0]?.id || 1,
        time: eventData.time || '9:00 AM',
      });
    }
  }, [eventData, classes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'classId' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Day of Week</label>
        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          className={styles.select}
          disabled={isEditing}
        >
          {DAYS.map((day) => (
            <option key={day.key} value={day.key}>
              {day.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Class</label>
        <select
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          className={styles.select}
        >
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name} ({cls.instructor})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Time</label>
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          className={styles.select}
        >
          {TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn}>
          {isEditing ? 'Update Slot' : 'Add Slot'}
        </button>
      </div>
    </form>
  );
}
