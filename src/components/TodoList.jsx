import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem.jsx';
import styles from './TodoList.module.css';

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <motion.ul layout className={styles.list}>
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default TodoList;
