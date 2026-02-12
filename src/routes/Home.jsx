import TodoForm from '../components/TodoForm.jsx';
import Filters from '../components/Filters.jsx';
import TodoList from '../components/TodoList.jsx';
import Stats from '../components/Stats.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import { useTodoPage } from './useTodoPage.js';
import styles from './Home.module.css';

function Home() {
  const {
    isLoading,
    error,
    canRetry,
    filter,
    sortOrder,
    filteredTodos,
    totalCount,
    completedCount,
    activeCount,
    hasCompleted,
    emptyState,
    showList,
    showEmpty,
    handleAdd,
    handleToggle,
    handleDelete,
    handleFilterChange,
    handleSortChange,
    handleClearCompleted,
    reload
  } = useTodoPage();

  return (
    <section className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.panel}>
          <TodoForm onAdd={handleAdd} />
          <Filters
            filter={filter}
            sortOrder={sortOrder}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onClearCompleted={handleClearCompleted}
            hasCompleted={hasCompleted}
          />
          {error ? (
            <ErrorState message={error} onRetry={canRetry ? reload : undefined} />
          ) : null}
          {isLoading ? <LoadingState /> : null}
          {showList ? (
            <TodoList
              todos={filteredTodos}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ) : null}
          {showEmpty ? (
            <EmptyState
              title={emptyState.title}
              description={emptyState.description}
            />
          ) : null}
        </div>
        <aside className={styles.side}>
          <Stats
            total={totalCount}
            active={activeCount}
            completed={completedCount}
          />
          <div className={styles.tip}>
            <h4>Совет дня</h4>
            <p>
              Разбейте большую задачу на 2-3 маленьких шага и завершайте их по
              очереди.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Home;
