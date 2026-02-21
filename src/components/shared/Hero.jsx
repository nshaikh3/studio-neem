import styles from './Hero.module.css';

export default function Hero({ title, subtitle, size = 'short', gradient = 'olive', children }) {
  return (
    <section className={`${styles.hero} ${styles[size]} ${styles[gradient]}`}>
      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </section>
  );
}
