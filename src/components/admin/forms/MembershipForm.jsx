import { useState, useEffect } from 'react';
import FeatureListEditor from '../shared/FeatureListEditor';
import styles from './FormStyles.module.css';

const PERIODS = ['class', 'month', 'year'];

export default function MembershipForm({ membershipData, onSubmit, onCancel }) {
  const isEditing = !!membershipData;

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    period: 'month',
    features: [],
    cta: 'Get Started',
  });

  useEffect(() => {
    if (membershipData) {
      setFormData({
        name: membershipData.name || '',
        price: membershipData.price || '',
        period: membershipData.period || 'month',
        features: membershipData.features || [],
        cta: membershipData.cta || 'Get Started',
      });
    }
  }, [membershipData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeaturesChange = (features) => {
    setFormData((prev) => ({
      ...prev,
      features,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Membership Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="e.g., Monthly Unlimited"
          required
        />
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label}>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={styles.input}
            placeholder="e.g., $140"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Period</label>
          <select
            name="period"
            value={formData.period}
            onChange={handleChange}
            className={styles.select}
          >
            {PERIODS.map((p) => (
              <option key={p} value={p}>
                per {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Features</label>
        <FeatureListEditor
          features={formData.features}
          onChange={handleFeaturesChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Button Text (CTA)</label>
        <input
          type="text"
          name="cta"
          value={formData.cta}
          onChange={handleChange}
          className={styles.input}
          placeholder="e.g., Get Started"
        />
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn}>
          {isEditing ? 'Update Membership' : 'Add Membership'}
        </button>
      </div>
    </form>
  );
}
