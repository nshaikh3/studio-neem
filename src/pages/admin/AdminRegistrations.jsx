import { useData } from '../../context/DataContext';
import DataTable from '../../components/admin/shared/DataTable';
import styles from '../../components/admin/AdminLayout.module.css';

export default function AdminRegistrations() {
  const { registrations, deleteRegistration } = useData();

  const handleDelete = (reg) => {
    if (window.confirm(`Delete registration for "${reg.name}"?`)) {
      deleteRegistration(reg.id);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCreatedAt = (isoStr) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'className', label: 'Class' },
    {
      key: 'scheduleDate',
      label: 'Date',
      render: (value) => formatDate(value),
    },
    { key: 'scheduleTime', label: 'Time' },
    {
      key: 'createdAt',
      label: 'Registered',
      render: (value) => formatCreatedAt(value),
    },
  ];

  // Sort registrations by schedule date (ascending)
  const sortedRegistrations = [...registrations].sort((a, b) => {
    const dateA = a.scheduleDate + ' ' + a.scheduleTime;
    const dateB = b.scheduleDate + ' ' + b.scheduleTime;
    return dateA.localeCompare(dateB);
  });

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Registrations</h1>
        <p className={styles.pageSubtitle}>
          View and manage class registrations ({registrations.length} total)
        </p>
      </div>

      <div className={styles.card}>
        <DataTable
          columns={columns}
          data={sortedRegistrations}
          emptyMessage="No registrations yet. Registrations will appear here when students sign up for classes."
          actions={(row) => (
            <button
              onClick={() => handleDelete(row)}
              className={`${styles.btn} ${styles.btnSmall} ${styles.btnDanger}`}
            >
              Delete
            </button>
          )}
        />
      </div>
    </div>
  );
}
