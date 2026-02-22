import { useState, useEffect } from 'react';
import styles from './AdminLayout.module.css';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'studioneem2026';
const AUTH_KEY = 'studioneem_admin_auth';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}

export default function PasswordGate({ children }) {
  const { isAuthenticated, login } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className={styles.gateWrapper}>
      <div className={styles.gateCard}>
        <h1 className={styles.gateTitle}>Admin Access</h1>
        <p className={styles.gateSubtitle}>Enter the admin password to continue</p>
        <form onSubmit={handleSubmit} className={styles.gateForm}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.gateInput}
            autoFocus
          />
          {error && <p className={styles.gateError}>{error}</p>}
          <button type="submit" className={styles.gateButton}>
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
