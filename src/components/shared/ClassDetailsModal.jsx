import { useState } from 'react';
import { useData } from '../../context/DataContext';
import styles from './ClassDetailsModal.module.css';

export default function ClassDetailsModal({ event, onClose, onRegister }) {
  const { getCategoryColors, getCategoryLabels } = useData();
  const categoryColors = getCategoryColors();
  const categoryLabels = getCategoryLabels();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeX} onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className={styles.header}>
          <span
            className={styles.categoryBadge}
            style={{ backgroundColor: categoryColors[event.category] || '#ccc' }}
          >
            {categoryLabels[event.category] || event.category}
          </span>
          <h2 className={styles.className}>{event.className}</h2>
          <p className={styles.instructor}>with {event.instructor}</p>
        </div>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Date</span>
            <span className={styles.detailValue}>{formatDate(event.date)}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Time</span>
            <span className={styles.detailValue}>{event.time}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Duration</span>
            <span className={styles.detailValue}>{event.duration}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Level</span>
            <span className={styles.detailValue}>{event.level}</span>
          </div>
        </div>

        {event.classData?.description && (
          <div className={styles.description}>
            <h4>About This Class</h4>
            <p>{event.classData.description}</p>
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Close
          </button>
          <button className={styles.registerBtn} onClick={onRegister}>
            Register for This Class
          </button>
        </div>
      </div>
    </div>
  );
}
