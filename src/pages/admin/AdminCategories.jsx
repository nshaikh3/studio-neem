import { useState } from 'react';
import { useData } from '../../context/DataContext';
import DataTable from '../../components/admin/shared/DataTable';
import Modal from '../../components/admin/shared/Modal';
import CategoryForm from '../../components/admin/forms/CategoryForm';
import styles from '../../components/admin/AdminLayout.module.css';

export default function AdminCategories() {
  const { categories, classes, addCategory, updateCategory, deleteCategory } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAdd = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setModalOpen(true);
  };

  const handleDelete = (cat) => {
    const usedBy = classes.filter((c) => c.category === cat.key);
    if (usedBy.length > 0) {
      alert(
        `Cannot delete "${cat.label}" - it is used by ${usedBy.length} class(es). ` +
        'Update those classes first.'
      );
      return;
    }
    if (window.confirm(`Delete category "${cat.label}"?`)) {
      deleteCategory(cat.key);
    }
  };

  const handleSubmit = (formData) => {
    if (editingCategory) {
      updateCategory(editingCategory.key, formData);
    } else {
      addCategory(formData);
    }
    setModalOpen(false);
    setEditingCategory(null);
  };

  const columns = [
    { key: 'key', label: 'Key' },
    { key: 'label', label: 'Name' },
    {
      key: 'color',
      label: 'Color',
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
              width: 24,
              height: 24,
              borderRadius: 4,
              background: value,
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
          <code style={{ fontSize: '0.85rem', color: '#666' }}>{value}</code>
        </span>
      ),
    },
    {
      key: 'usage',
      label: 'Classes Using',
      render: (_, row) => {
        const count = classes.filter((c) => c.category === row.key).length;
        return count;
      },
    },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Categories</h1>
        <p className={styles.pageSubtitle}>Manage class categories and their colors</p>
        <div className={styles.headerActions}>
          <button onClick={handleAdd} className={`${styles.btn} ${styles.btnPrimary}`}>
            + Add Category
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <DataTable
          columns={columns}
          data={categories}
          emptyMessage="No categories yet."
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
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <CategoryForm
          categoryData={editingCategory}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
