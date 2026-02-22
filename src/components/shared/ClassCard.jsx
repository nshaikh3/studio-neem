import { useData } from '../../context/DataContext';
import styles from './ClassCard.module.css';

export default function ClassCard({ classData }) {
  const { getCategoryColors } = useData();
  const categoryColors = getCategoryColors();
  const { name, level, duration, category, instructor, description } = classData;

  return (
    <div className={styles.card}>
      <div
        className={styles.categoryBar}
        style={{ backgroundColor: categoryColors[category] || '#ccc' }}
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.meta}>
          <span className={styles.level}>{level}</span>
          <span className={styles.dot}>&middot;</span>
          <span>{duration}</span>
        </div>
        <p className={styles.description}>{description}</p>
        <p className={styles.instructor}>with {instructor}</p>
      </div>
    </div>
  );
}
