const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(
  /\/$/,
  ''
);

const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const fetchTodos = async () => request('/todos');

export const createTodo = async ({ title }) => {
  const payload = {
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };

  return request('/todos', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

export const updateTodo = async (id, updates) =>
  request(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  });

export const deleteTodo = async (id) =>
  request(`/todos/${id}`, {
    method: 'DELETE'
  });
