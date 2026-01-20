import api from './api';

export const workerService = {
  // Get all workers
  getAllWorkers: async (params = {}) => {
    return await api.get('/workers', { params });
  },

  // Get worker by ID
  getWorkerById: async (id) => {
    return await api.get(`/workers/${id}`);
  },

  // Create new worker
  createWorker: async (workerData) => {
    return await api.post('/workers', workerData);
  },

  // Update worker
  updateWorker: async (id, workerData) => {
    return await api.put(`/workers/${id}`, workerData);
  },

  // Delete worker
  deleteWorker: async (id) => {
    return await api.delete(`/workers/${id}`);
  },

  // Get worker statistics
  getWorkerStats: async (id) => {
    return await api.get(`/workers/${id}/stats`);
  },

  // Get worker tasks
  getWorkerTasks: async (id, params = {}) => {
    return await api.get(`/workers/${id}/tasks`, { params });
  },
};

export default workerService;
