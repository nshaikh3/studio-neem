import { useState } from 'react';
import { useData } from '../../context/DataContext';
import styles from './RegistrationForm.module.css';

export default function RegistrationForm({ classData, scheduleDate, scheduleTime, onClose, onSuccess }) {
  const { addRegistration } = useData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRegistration({
      classId: classData.id,
      className: classData.name,
      scheduleDate,
      scheduleTime,
      ...formData,
    });
    setSubmitted(true);
    if (onSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  if (submitted) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3>Registration Complete!</h3>
            <p>You're registered for {classData.name} on {formatDate(scheduleDate)} at {scheduleTime}.</p>
            <p className={styles.successNote}>We'll see you on the mat!</p>
            <button onClick={onClose} className={styles.closeBtn}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeX} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className={styles.header}>
          <h3>Register for Class</h3>
          <div className={styles.classInfo}>
            <p className={styles.className}>{classData.name}</p>
            <p className={styles.classDetails}>
              {formatDate(scheduleDate)} at {scheduleTime}
            </p>
            <p className={styles.instructor}>with {classData.instructor}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Your name"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="(555) 123-4567"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Complete Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
