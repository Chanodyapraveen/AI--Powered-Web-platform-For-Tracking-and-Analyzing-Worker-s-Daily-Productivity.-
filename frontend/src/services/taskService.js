import api from './api';

export const taskService = {
  // Get all tasks
  getAllTasks: async (params = {}) => {
    return await api.get('/tasks', { params });
  },

  // Get task by ID
  getTaskById: async (id) => {
    return await api.get(`/tasks/${id}`);
  },

  // Create new task
  createTask: async (taskData) => {
    return await api.post('/tasks', taskData);
  },

  // Update task
  updateTask: async (id, taskData) => {
    return await api.put(`/tasks/${id}`, taskData);
  },

  // Delete task
  deleteTask: async (id) => {
    return await api.delete(`/tasks/${id}`);
  },

  // Update task status
  updateTaskStatus: async (id, status) => {
    return await api.patch(`/tasks/${id}/status`, { status });
  },

  // Assign task to worker
  assignTask: async (id, workerId) => {
    return await api.patch(`/tasks/${id}/assign`, { workerId });
  },

  // Get tasks by status
  getTasksByStatus: async (status) => {
    return await api.get(`/tasks/status/${status}`);
  },
};

export default taskService;
