import { useRef, useState } from 'react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/admin/shared/Modal';
import styles from '../../components/admin/AdminLayout.module.css';

export default function AdminDashboard() {
  const { classes, categories, memberships, scheduleTemplate, scheduleEndDate, holidayDates, resetAllData } = useData();
  const fileInputRef = useRef(null);
  const [showCodeModal, setShowCodeModal] = useState(false);

  const generateCode = () => {
    return `// Initial data used as fallback when localStorage is empty

export const initialClasses = ${JSON.stringify(classes, null, 2)};

export const initialCategories = ${JSON.stringify(categories, null, 2)};

export const initialMemberships = ${JSON.stringify(memberships, null, 2)};

// Schedule end date - null for no end (continues indefinitely)
export const initialScheduleEndDate = ${JSON.stringify(scheduleEndDate)};

// Holiday dates when studio is closed
export const initialHolidayDates = ${JSON.stringify(holidayDates, null, 2)};

// Weekly schedule template - day of week mapped to class slots
export const initialScheduleTemplate = ${JSON.stringify(scheduleTemplate, null, 2)};
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
      memberships,
      scheduleTemplate,
      scheduleEndDate,
      holidayDates,
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
        if (data.classes && data.categories && data.memberships && data.scheduleTemplate) {
          // Save directly to localStorage
          localStorage.setItem('studioneem_classes', JSON.stringify(data.classes));
          localStorage.setItem('studioneem_categories', JSON.stringify(data.categories));
          localStorage.setItem('studioneem_memberships', JSON.stringify(data.memberships));
          localStorage.setItem('studioneem_schedule', JSON.stringify(data.scheduleTemplate));
          // Handle new fields (with defaults for backwards compatibility)
          localStorage.setItem('studioneem_scheduleEndDate', JSON.stringify(data.scheduleEndDate ?? null));
          localStorage.setItem('studioneem_holidayDates', JSON.stringify(data.holidayDates ?? []));
          // Reload to pick up changes
          window.location.reload();
        } else {
          alert('Invalid data file. Missing required fields.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const handleReset = () => {
    if (window.confirm('Reset all data to defaults? This cannot be undone.')) {
      resetAllData();
      window.location.reload();
    }
  };

  const featuredCount = classes.filter((c) => c.featured).length;
  const totalSlots = Object.values(scheduleTemplate).reduce(
    (acc, slots) => acc + slots.length,
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
          <p className={styles.statLabel}>Featured Classes</p>
          <p className={styles.statValue}>{featuredCount}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Categories</p>
          <p className={styles.statValue}>{categories.length}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Membership Tiers</p>
          <p className={styles.statValue}>{memberships.length}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Weekly Class Slots</p>
          <p className={styles.statValue}>{totalSlots}</p>
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
            <a href="/admin/memberships" className={`${styles.btn} ${styles.btnSecondary}`}>
              Update Pricing
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

      <div className={styles.card} style={{ marginTop: '1.5rem' }}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Featured on Homepage</h2>
        </div>
        <div className={styles.cardBody}>
          {featuredCount === 0 ? (
            <p style={{ color: '#666', margin: 0 }}>
              No featured classes yet. Mark classes as featured to display them on the homepage.
            </p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {classes
                .filter((c) => c.featured)
                .map((c) => (
                  <li key={c.id} style={{ marginBottom: '0.5rem' }}>
                    <strong>{c.name}</strong> with {c.instructor}
                  </li>
                ))}
            </ul>
          )}
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
