import { useState } from 'react';
import { useData } from '../../context/DataContext';
import DataTable from '../../components/admin/shared/DataTable';
import Modal from '../../components/admin/shared/Modal';
import ClassForm from '../../components/admin/forms/ClassForm';
import styles from '../../components/admin/AdminLayout.module.css';

export default function AdminClasses() {
  const { classes, categories, addClass, updateClass, deleteClass, toggleFeatured } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const handleAdd = () => {
    setEditingClass(null);
    setModalOpen(true);
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setModalOpen(true);
  };

  const handleDelete = (cls) => {
    if (window.confirm(`Delete "${cls.name}"? This will also remove it from the schedule.`)) {
      deleteClass(cls.id);
    }
  };

  const handleSubmit = (formData) => {
    if (editingClass) {
      updateClass(editingClass.id, formData);
    } else {
      addClass(formData);
    }
    setModalOpen(false);
    setEditingClass(null);
  };

  const getCategoryLabel = (key) => {
    const cat = categories.find((c) => c.key === key);
    return cat ? cat.label : key;
  };

  const getCategoryColor = (key) => {
    const cat = categories.find((c) => c.key === key);
    return cat ? cat.color : '#ccc';
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'level', label: 'Level' },
    { key: 'duration', label: 'Duration' },
    {
      key: 'category',
      label: 'Category',
      render: (value) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: getCategoryColor(value),
            }}
          />
          {getCategoryLabel(value)}
        </span>
      ),
    },
    {
      key: 'featured',
      label: 'Featured',
      render: (value, row) => (
        <button
          onClick={() => toggleFeatured(row.id)}
          className={`${styles.btn} ${styles.btnSmall} ${value ? styles.btnPrimary : styles.btnSecondary}`}
          style={{ minWidth: 60 }}
        >
          {value ? 'Yes' : 'No'}
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Classes</h1>
        <p className={styles.pageSubtitle}>Manage your yoga classes</p>
        <div className={styles.headerActions}>
          <button onClick={handleAdd} className={`${styles.btn} ${styles.btnPrimary}`}>
            + Add Class
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <DataTable
          columns={columns}
          data={classes}
          emptyMessage="No classes yet. Add your first class to get started."
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingClass ? 'Edit Class' : 'Add Class'}
      >
        <ClassForm
          classData={editingClass}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
