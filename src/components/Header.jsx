import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const getLinkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo} aria-hidden="true" />
        <div>
          <div className={styles.title}>Flowlist</div>
          <div className={styles.subtitle}>Фокус на важных делах</div>
        </div>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" end className={getLinkClass}>
          Задачи
        </NavLink>
        <NavLink to="/about" className={getLinkClass}>
          О проекте
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
