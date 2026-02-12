import { memo } from 'react';
import { motion } from 'framer-motion';
import styles from './TodoItem.module.css';

function TodoItem({ todo, onToggle, onDelete }) {
  const createdLabel = todo.createdAt
    ? new Date(todo.createdAt).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'short'
      })
    : '—';

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={todo.completed ? `${styles.item} ${styles.done}` : styles.item}
    >
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.title}</span>
      </label>
      <div className={styles.meta}>
        <span className={styles.date}>{createdLabel}</span>
        <button type="button" onClick={() => onDelete(todo.id)}>
          Удалить
        </button>
      </div>
    </motion.li>
  );
}

export default memo(TodoItem);
