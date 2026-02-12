import { useCallback, useEffect, useMemo } from 'react';
import useTodoStore from '../store/useTodoStore.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const EMPTY_COPY = {
  all: {
    title: 'Список задач пуст',
    description: 'Добавьте первую задачу и начните планировать день.'
  },
  active: {
    title: 'Нет активных задач',
    description: 'Похоже, все дела уже сделаны.'
  },
  completed: {
    title: 'Выполненных задач пока нет',
    description: 'Отмечайте выполненные задачи, чтобы видеть прогресс.'
  }
};

export const useTodoPage = () => {
  const {
    todos,
    isLoading,
    error,
    errorType,
    filter,
    sortOrder,
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
    setSortOrder
  } = useTodoStore();

  const [savedFilter, setSavedFilter] = useLocalStorage(
    'flowlist-filter',
    'all'
  );
  const [savedSortOrder, setSavedSortOrder] = useLocalStorage(
    'flowlist-sort',
    'newest'
  );

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (filter !== savedFilter) {
      setFilter(savedFilter);
    }
  }, [filter, savedFilter, setFilter]);

  useEffect(() => {
    if (sortOrder !== savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, [sortOrder, savedSortOrder, setSortOrder]);

  const handleAdd = useCallback(
    async (title) => {
      return addTodo(title);
    },
    [addTodo]
  );

  const handleToggle = useCallback(
    async (id) => {
      return toggleTodo(id);
    },
    [toggleTodo]
  );

  const handleDelete = useCallback(
    async (id) => {
      return deleteTodo(id);
    },
    [deleteTodo]
  );

  const handleFilterChange = useCallback(
    (nextFilter) => {
      setFilter(nextFilter);
      setSavedFilter(nextFilter);
    },
    [setFilter, setSavedFilter]
  );

  const handleSortChange = useCallback(
    (nextSort) => {
      setSortOrder(nextSort);
      setSavedSortOrder(nextSort);
    },
    [setSortOrder, setSavedSortOrder]
  );

  const handleClearCompleted = useCallback(async () => {
    return clearCompleted();
  }, [clearCompleted]);

  const {
    filteredTodos,
    totalCount,
    completedCount,
    activeCount
  } = useMemo(() => {
    const total = todos.length;
    let completed = 0;

    todos.forEach((todo) => {
      if (todo.completed) {
        completed += 1;
      }
    });

    const active = total - completed;

    let visibleTodos = todos;
    if (filter === 'active') {
      visibleTodos = todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
      visibleTodos = todos.filter((todo) => todo.completed);
    }

    const getTime = (value) => (value ? new Date(value).getTime() : 0);

    const sortedTodos = [...visibleTodos].sort((a, b) => {
      const aDate = getTime(a.createdAt);
      const bDate = getTime(b.createdAt);
      return sortOrder === 'newest' ? bDate - aDate : aDate - bDate;
    });

    return {
      filteredTodos: sortedTodos,
      totalCount: total,
      completedCount: completed,
      activeCount: active
    };
  }, [todos, filter, sortOrder]);

  const emptyState = EMPTY_COPY[filter] ?? EMPTY_COPY.all;
  const hasCompleted = completedCount > 0;
  const showList = !isLoading && filteredTodos.length > 0;
  const showEmpty = !isLoading && !error && filteredTodos.length === 0;
  const canRetry = errorType === 'load';

  return {
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
    reload: loadTodos
  };
};
