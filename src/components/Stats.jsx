import styles from './Stats.module.css';

function Stats({ total, active, completed }) {
  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={styles.card}>
      <h3>Статистика</h3>
      <div className={styles.metrics}>
        <div>
          <span>Всего</span>
          <strong>{total}</strong>
        </div>
        <div>
          <span>В работе</span>
          <strong>{active}</strong>
        </div>
        <div>
          <span>Готово</span>
          <strong>{completed}</strong>
        </div>
      </div>
      <div className={styles.progress} aria-hidden="true">
        <div
          className={styles.progressBar}
          style={{ width: `${completionRate}%` }}
        />
      </div>
      <p className={styles.caption}>Готово на {completionRate}%</p>
    </div>
  );
}

export default Stats;
