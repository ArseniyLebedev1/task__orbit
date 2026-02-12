import styles from './LoadingState.module.css';

function LoadingState() {
  return (
    <div className={styles.loading}>
      <span className={styles.spinner} aria-hidden="true" />
      <span>Загружаем список дел...</span>
    </div>
  );
}

export default LoadingState;
