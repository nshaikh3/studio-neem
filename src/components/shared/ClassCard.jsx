import { categoryColors } from '../../data/classes';
import styles from './ClassCard.module.css';

export default function ClassCard({ classData }) {
  const { name, level, duration, category, instructor, description } = classData;

  return (
    <div className={styles.card}>
      <div
        className={styles.categoryBar}
        style={{ backgroundColor: categoryColors[category] }}
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
