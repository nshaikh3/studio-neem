import styles from './SectionHeading.module.css';

export default function SectionHeading({ title, subtitle, align = 'center' }) {
  return (
    <div className={`${styles.heading} ${styles[align]}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.line} />
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
