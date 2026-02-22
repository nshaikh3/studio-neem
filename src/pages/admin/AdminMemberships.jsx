import { useState } from 'react';
import { useData } from '../../context/DataContext';
import DataTable from '../../components/admin/shared/DataTable';
import Modal from '../../components/admin/shared/Modal';
import MembershipForm from '../../components/admin/forms/MembershipForm';
import styles from '../../components/admin/AdminLayout.module.css';

export default function AdminMemberships() {
  const { memberships, addMembership, updateMembership, deleteMembership } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);

  const handleAdd = () => {
    setEditingMembership(null);
    setModalOpen(true);
  };

  const handleEdit = (mem) => {
    setEditingMembership(mem);
    setModalOpen(true);
  };

  const handleDelete = (mem) => {
    if (window.confirm(`Delete "${mem.name}" membership tier?`)) {
      deleteMembership(mem.id);
    }
  };

  const handleSubmit = (formData) => {
    if (editingMembership) {
      updateMembership(editingMembership.id, formData);
    } else {
      addMembership(formData);
    }
    setModalOpen(false);
    setEditingMembership(null);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    {
      key: 'price',
      label: 'Price',
      render: (value, row) => `${value}/${row.period}`,
    },
    {
      key: 'features',
      label: 'Features',
      render: (value) => (
        <span style={{ color: '#666' }}>
          {value.length} feature{value.length !== 1 ? 's' : ''}
        </span>
      ),
    },
    { key: 'cta', label: 'Button Text' },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Memberships</h1>
        <p className={styles.pageSubtitle}>Manage pricing tiers and features</p>
        <div className={styles.headerActions}>
          <button onClick={handleAdd} className={`${styles.btn} ${styles.btnPrimary}`}>
            + Add Membership
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <DataTable
          columns={columns}
          data={memberships}
          emptyMessage="No membership tiers yet."
          actions={(row) => (
            <>
              <button
                onClick={() => handleEdit(row)}
                className={`${styles.btn} ${styles.btnSmall} ${styles.btnSecondary}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(row)}
                className={`${styles.btn} ${styles.btnSmall} ${styles.btnDanger}`}
              >
                Delete
              </button>
            </>
          )}
        />
      </div>

      <div className={styles.card} style={{ marginTop: '1.5rem' }}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Preview</h2>
        </div>
        <div className={styles.cardBody}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {memberships.map((mem) => (
              <div
                key={mem.id}
                style={{
                  flex: '1 1 250px',
                  padding: '1.5rem',
                  background: '#f8f8f8',
                  borderRadius: 8,
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{mem.name}</h3>
                <p style={{ margin: '0 0 1rem', fontSize: '1.5rem', fontWeight: 600 }}>
                  {mem.price}
                  <span style={{ fontSize: '0.9rem', fontWeight: 400, color: '#666' }}>
                    /{mem.period}
                  </span>
                </p>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                  {mem.features.map((f, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingMembership ? 'Edit Membership' : 'Add Membership'}
      >
        <MembershipForm
          membershipData={editingMembership}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
