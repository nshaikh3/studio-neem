import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './PasswordGate';
import styles from './AdminLayout.module.css';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { path: '/admin/classes', label: 'Classes', icon: '🧘' },
  { path: '/admin/schedule', label: 'Schedule', icon: '📅' },
  { path: '/admin/categories', label: 'Categories', icon: '🏷️' },
  { path: '/admin/memberships', label: 'Memberships', icon: '💳' },
];

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.logo}>Studio Neem</h1>
          <span className={styles.badge}>Admin</span>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <a href="/" className={styles.viewSite} target="_blank" rel="noopener noreferrer">
            View Site →
          </a>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
