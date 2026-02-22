import { useState, useEffect } from 'react';
import styles from './FormStyles.module.css';

export default function CategoryForm({ categoryData, onSubmit, onCancel }) {
  const isEditing = !!categoryData;

  const [formData, setFormData] = useState({
    key: '',
    label: '',
    color: '#7E7F41',
  });

  useEffect(() => {
    if (categoryData) {
      setFormData({
        key: categoryData.key || '',
        label: categoryData.label || '',
        color: categoryData.color || '#7E7F41',
      });
    }
  }, [categoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Auto-generate key from label when creating
  const handleLabelChange = (e) => {
    const label = e.target.value;
    setFormData((prev) => ({
      ...prev,
      label,
      key: isEditing ? prev.key : label.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Category Name</label>
        <input
          type="text"
          name="label"
          value={formData.label}
          onChange={handleLabelChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Key (ID)</label>
        <input
          type="text"
          name="key"
          value={formData.key}
          onChange={handleChange}
          className={styles.input}
          required
          disabled={isEditing}
          pattern="[a-z0-9-]+"
        />
        {!isEditing && (
          <span className={styles.hint}>Auto-generated from name. Lowercase, no spaces.</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Color</label>
        <div className={styles.colorPicker}>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className={styles.colorInput}
          />
          <input
            type="text"
            value={formData.color}
            onChange={handleChange}
            name="color"
            className={styles.colorHex}
            pattern="#[0-9A-Fa-f]{6}"
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn}>
          {isEditing ? 'Update Category' : 'Add Category'}
        </button>
      </div>
    </form>
  );
}
