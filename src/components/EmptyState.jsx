import styles from './EmptyState.module.css';

function EmptyState({ title, description }) {
  return (
    <div className={styles.empty}>
      <div className={styles.icon} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default EmptyState;
