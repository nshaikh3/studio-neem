import { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import styles from './FormStyles.module.css';

const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const DURATIONS = ['30 min', '45 min', '60 min', '75 min', '90 min'];

export default function ClassForm({ classData, onSubmit, onCancel }) {
  const { categories } = useData();
  const isEditing = !!classData;

  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    level: 'All Levels',
    duration: '60 min',
    category: categories[0]?.key || '',
    description: '',
    featured: false,
  });

  useEffect(() => {
    if (classData) {
      setFormData({
        name: classData.name || '',
        instructor: classData.instructor || '',
        level: classData.level || 'All Levels',
        duration: classData.duration || '60 min',
        category: classData.category || categories[0]?.key || '',
        description: classData.description || '',
        featured: classData.featured || false,
      });
    }
  }, [classData, categories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Class Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Instructor</label>
        <input
          type="text"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label}>Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className={styles.select}
          >
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={styles.select}
          >
            {DURATIONS.map((dur) => (
              <option key={dur} value={dur}>
                {dur}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.select}
        >
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          rows={4}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <span>Show on homepage (Featured)</span>
        </label>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn}>
          {isEditing ? 'Update Class' : 'Add Class'}
        </button>
      </div>
    </form>
  );
}
