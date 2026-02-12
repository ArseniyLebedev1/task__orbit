import styles from './Filters.module.css';

const FILTERS = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'В работе' },
  { value: 'completed', label: 'Готово' }
];

function Filters({
  filter,
  sortOrder,
  onFilterChange,
  onSortChange,
  onClearCompleted,
  hasCompleted
}) {
  return (
    <div className={styles.filters}>
      <div className={styles.segmented}>
        {FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={
              filter === option.value
                ? `${styles.filterButton} ${styles.active}`
                : styles.filterButton
            }
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <label className={styles.selectLabel}>
          Сортировка
          <select
            value={sortOrder}
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
          </select>
        </label>
        <button
          type="button"
          className={styles.clearButton}
          onClick={onClearCompleted}
          disabled={!hasCompleted}
        >
          Очистить выполненные
        </button>
      </div>
    </div>
  );
}

export default Filters;
