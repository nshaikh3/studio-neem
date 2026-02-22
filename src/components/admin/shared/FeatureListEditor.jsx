import { useState } from 'react';
import styles from './FeatureListEditor.module.css';

export default function FeatureListEditor({ features, onChange }) {
  const [newFeature, setNewFeature] = useState('');

  const handleAdd = () => {
    if (newFeature.trim()) {
      onChange([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index) => {
    onChange(features.filter((_, i) => i !== index));
  };

  const handleUpdate = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className={styles.editor}>
      <ul className={styles.list}>
        {features.map((feature, index) => (
          <li key={index} className={styles.item}>
            <input
              type="text"
              value={feature}
              onChange={(e) => handleUpdate(index, e.target.value)}
              className={styles.itemInput}
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className={styles.removeBtn}
              aria-label="Remove feature"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.addRow}>
        <input
          type="text"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a feature..."
          className={styles.addInput}
        />
        <button type="button" onClick={handleAdd} className={styles.addBtn}>
          Add
        </button>
      </div>
    </div>
  );
}
