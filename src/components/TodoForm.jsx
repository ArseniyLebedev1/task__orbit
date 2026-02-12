import { useState } from 'react';
import styles from './TodoForm.module.css';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError('Введите название задачи.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    const success = await onAdd(trimmed);
    setIsSubmitting(false);

    if (success) {
      setTitle('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>План дня</h2>
        <p>Создавайте задачи и отслеживайте прогресс.</p>
      </div>
      <label className="visually-hidden" htmlFor="todo-title">
        Новая задача
      </label>
      <div className={styles.row}>
        <input
          id="todo-title"
          type="text"
          placeholder="Добавить новую задачу"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Сохранение...' : 'Добавить'}
        </button>
      </div>
      {error ? <span className={styles.error}>{error}</span> : null}
    </form>
  );
}

export default TodoForm;
