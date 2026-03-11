import api from "./api";

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await api.put("/auth/profile", userData);
    localStorage.setItem("user", JSON.stringify(response.user));
    return response;
  },

  // Change password
  changePassword: async (passwordData) => {
    return await api.put("/auth/change-password", passwordData);
  },
};

export default authService;
