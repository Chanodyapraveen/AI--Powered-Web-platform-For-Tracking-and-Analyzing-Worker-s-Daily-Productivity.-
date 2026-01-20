import api from './api';

// Mock users for demo
const MOCK_USERS = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Manager User',
    email: 'manager@demo.com',
    password: 'manager123',
    role: 'manager',
  },
  {
    id: 3,
    name: 'Worker User',
    email: 'worker@demo.com',
    password: 'worker123',
    role: 'worker',
  },
];

// Mock authentication (for demo without backend)
const mockLogin = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        const token = 'mock-jwt-token-' + Date.now();
        resolve({
          token,
          user: userWithoutPassword,
          message: 'Login successful',
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500); // Simulate network delay
  });
};

const mockRegister = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = MOCK_USERS.find(u => u.email === userData.email);
      
      if (existingUser) {
        reject(new Error('Email already exists'));
      } else {
        const newUser = {
          id: MOCK_USERS.length + 1,
          name: userData.name,
          email: userData.email,
          role: 'worker',
        };
        const token = 'mock-jwt-token-' + Date.now();
        resolve({
          token,
          user: newUser,
          message: 'Registration successful',
        });
      }
    }, 500);
  });
};

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      // Try mock login first (for demo)
      const response = await mockLogin(credentials);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      // If mock login fails, you can try real API here
      // const response = await api.post('/auth/login', credentials);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      // Try mock register first (for demo)
      const response = await mockRegister(userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      // If mock register fails, you can try real API here
      // const response = await api.post('/auth/register', userData);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  },

  // Change password
  changePassword: async (passwordData) => {
    return await api.put('/auth/change-password', passwordData);
  },
};

export default authService;
