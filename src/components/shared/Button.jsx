import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export default function Button({ children, to, variant = 'primary', onClick, type = 'button' }) {
  const className = `${styles.button} ${styles[variant]}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
