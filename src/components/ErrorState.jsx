import styles from './ErrorState.module.css';

function ErrorState({ message, onRetry }) {
  return (
    <div className={styles.error}>
      <div>
        <h3>Что-то пошло не так</h3>
        <p>{message}</p>
      </div>
      {onRetry ? (
        <button type="button" onClick={onRetry}>
          Повторить
        </button>
      ) : null}
    </div>
  );
}

export default ErrorState;
