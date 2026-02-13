import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>TaskOrbit · React + Vite</span>
        <span className={styles.note}>Сделано для портфолио</span>
      </div>
    </footer>
  );
}

export default Footer;
