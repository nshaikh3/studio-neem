import Button from './Button';
import styles from './PricingCard.module.css';

export default function PricingCard({ tier, featured = false }) {
  const { name, price, period, features, cta } = tier;

  return (
    <div className={`${styles.card} ${featured ? styles.featured : ''}`}>
      {featured && <div className={styles.badge}>Most Popular</div>}
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.pricing}>
        <span className={styles.price}>{price}</span>
        {period && <span className={styles.period}>/{period}</span>}
      </div>
      <ul className={styles.features}>
        {features.map((feature, i) => (
          <li key={i} className={styles.feature}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Button variant={featured ? 'primary' : 'secondary'}>{cta}</Button>
    </div>
  );
}
