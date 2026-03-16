import { useRef, useState } from 'react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/admin/shared/Modal';
import styles from '../../components/admin/AdminLayout.module.css';

export default function AdminDashboard() {
  const { classes, categories, schedule, registrations, resetAllData } = useData();
  const fileInputRef = useRef(null);
  const [showCodeModal, setShowCodeModal] = useState(false);

  const generateCode = () => {
    return `// Initial data used as fallback when localStorage is empty

export const initialClasses = ${JSON.stringify(classes, null, 2)};

// Registrations for classes
// Shape: { id, classId, scheduleDate, scheduleTime, name, phone, email, createdAt }
export const initialRegistrations = [];

export const initialCategories = ${JSON.stringify(categories, null, 2)};

export const initialMemberships = [];

// Schedule - date keys mapped to class slots
// Shape: { '2026-03-16': [{ classId: 1, time: '7:00 AM' }], ... }
export const initialSchedule = ${JSON.stringify(schedule, null, 2)};
`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCode());
    alert('Code copied to clipboard!');
  };

  const handleExport = () => {
    const data = {
      classes,
      categories,
      schedule,
      registrations,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studio-neem-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.classes && data.schedule) {
          localStorage.setItem('studioneem_classes', JSON.stringify(data.classes));
          localStorage.setItem('studioneem_categories', JSON.stringify(data.categories || []));
          localStorage.setItem('studioneem_schedule', JSON.stringify(data.schedule));
          localStorage.setItem('studioneem_registrations', JSON.stringify(data.registrations ?? []));
          window.location.reload();
        } else {
          alert('Invalid data file. Missing required fields.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm('Reset all data to defaults? This cannot be undone.')) {
      resetAllData();
      window.location.reload();
    }
  };

  const totalScheduledClasses = Object.values(schedule).reduce(
    (acc, slots) => acc + slots.length,
    0
  );

  const scheduledDays = Object.keys(schedule).length;

  const galleryImageCount = classes.reduce(
    (acc, cls) => acc + (cls.galleryImages?.length || 0),
    0
  );

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>Overview of your studio data</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Classes</p>
          <p className={styles.statValue}>{classes.length}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Scheduled Classes</p>
          <p className={styles.statValue}>{totalScheduledClasses}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Days with Classes</p>
          <p className={styles.statValue}>{scheduledDays}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Registrations</p>
          <p className={styles.statValue}>{registrations.length}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Quick Actions</h2>
        </div>
        <div className={styles.cardBody}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/admin/classes" className={`${styles.btn} ${styles.btnPrimary}`}>
              Manage Classes
            </a>
            <a href="/admin/schedule" className={`${styles.btn} ${styles.btnSecondary}`}>
              Edit Schedule
            </a>
            <a href="/admin/registrations" className={`${styles.btn} ${styles.btnSecondary}`}>
              View Registrations
            </a>
          </div>
        </div>
      </div>

      <div className={styles.card} style={{ marginTop: '1.5rem' }}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Data Management</h2>
        </div>
        <div className={styles.cardBody}>
          <p style={{ color: '#666', marginTop: 0, marginBottom: '1rem', fontSize: '0.9rem' }}>
            Export your data as JSON to back it up or deploy to production.
            Import to restore from a backup.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => setShowCodeModal(true)} className={`${styles.btn} ${styles.btnPrimary}`}>
              Generate Code for Deploy
            </button>
            <button onClick={handleExport} className={`${styles.btn} ${styles.btnSecondary}`}>
              Export JSON
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              Import JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
            <button onClick={handleReset} className={`${styles.btn} ${styles.btnDanger}`}>
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        title="Deploy Code"
      >
        <p style={{ color: '#666', marginTop: 0, fontSize: '0.9rem' }}>
          Copy this code and replace the contents of <code>src/data/initialData.js</code>, then commit and redeploy.
        </p>
        <div style={{ position: 'relative' }}>
          <pre
            style={{
              background: '#1e1e1e',
              color: '#d4d4d4',
              padding: '1rem',
              borderRadius: 8,
              fontSize: '0.75rem',
              overflow: 'auto',
              maxHeight: 300,
            }}
          >
            {generateCode()}
          </pre>
          <button
            onClick={handleCopyCode}
            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
            style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
          >
            Copy
          </button>
        </div>
      </Modal>
    </div>
  );
}
