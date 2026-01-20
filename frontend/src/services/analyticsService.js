import api from "./api";

export const analyticsService = {
  // Get dashboard analytics
  getDashboardAnalytics: async () => {
    return await api.get("/analytics/dashboard");
  },

  // Get productivity trends
  getProductivityTrends: async (params = {}) => {
    return await api.get("/analytics/productivity", { params });
  },

  // Get worker performance
  getWorkerPerformance: async (workerId, params = {}) => {
    return await api.get(`/analytics/workers/${workerId}/performance`, {
      params,
    });
  },

  // Get team statistics
  getTeamStatistics: async (params = {}) => {
    return await api.get("/analytics/team/stats", { params });
  },

  // Get task completion rates
  getTaskCompletionRates: async (params = {}) => {
    return await api.get("/analytics/tasks/completion-rates", { params });
  },

  // Get time tracking data
  getTimeTrackingData: async (params = {}) => {
    return await api.get("/analytics/time-tracking", { params });
  },
};

export default analyticsService;
