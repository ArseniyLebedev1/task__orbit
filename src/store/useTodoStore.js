import { create } from 'zustand';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo as removeTodo
} from '../api/todoApi.js';

const loadError = 'Не удалось загрузить задачи. Проверьте сервер.';
const saveError = 'Не удалось сохранить изменения. Попробуйте снова.';

const useTodoStore = create((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,
  errorType: null,
  filter: 'all',
  sortOrder: 'newest',
  setFilter: (filter) => set({ filter }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  loadTodos: async () => {
    set({ isLoading: true, error: null, errorType: null });
    try {
      const data = await fetchTodos();
      set({ todos: data, isLoading: false });
    } catch (error) {
      set({ error: loadError, errorType: 'load', isLoading: false });
    }
  },
  addTodo: async (title) => {
    set({ error: null, errorType: null });
    try {
      const newTodo = await createTodo({ title });
      set((state) => ({ todos: [newTodo, ...state.todos] }));
      return true;
    } catch (error) {
      set({ error: saveError, errorType: 'save' });
      return false;
    }
  },
  toggleTodo: async (id) => {
    const current = get().todos.find((todo) => todo.id === id);
    if (!current) return false;

    set({ error: null, errorType: null });
    try {
      const updated = await updateTodo(id, {
        completed: !current.completed
      });
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? updated : todo
        )
      }));
      return true;
    } catch (error) {
      set({ error: saveError, errorType: 'save' });
      return false;
    }
  },
  deleteTodo: async (id) => {
    set({ error: null, errorType: null });
    try {
      await removeTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id)
      }));
      return true;
    } catch (error) {
      set({ error: saveError, errorType: 'save' });
      return false;
    }
  },
  clearCompleted: async () => {
    const completedIds = get().todos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);

    if (!completedIds.length) return false;

    set({ error: null, errorType: null });
    try {
      await Promise.all(completedIds.map((id) => removeTodo(id)));
      set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed)
      }));
      return true;
    } catch (error) {
      set({ error: saveError, errorType: 'save' });
      return false;
    }
  }
}));

export default useTodoStore;
