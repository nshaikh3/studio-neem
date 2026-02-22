import { useState } from 'react';
import styles from './FormStyles.module.css';

export default function HolidayForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    date: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.reason.trim()) {
      return;
    }
    onSubmit({
      date: formData.date,
      reason: formData.reason.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Reason</label>
        <input
          type="text"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className={styles.input}
          placeholder="e.g., Christmas, Studio Maintenance"
          required
        />
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn}>
          Add Holiday
        </button>
      </div>
    </form>
  );
}
