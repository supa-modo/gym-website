import axios from "axios";

// API base URL - will be used when backend is ready
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // For now, just logout if token is invalid
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// Mock API responses for development until backend is ready
const mockResponses = {
  // Add mock responses here as needed
};

// Helper function to simulate API delay
const simulateDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// User API
export const userAPI = {
  getAll: async (params) => {
    // Simulate API call
    await simulateDelay();
    return { data: { users: [], total: 0 } };
  },
  getById: async (id) => {
    // Simulate API call
    await simulateDelay();
    return { data: {} };
  },
  create: async (data) => {
    // Simulate API call
    await simulateDelay();
    return { data: { ...data, id: Date.now() } };
  },
  update: async (id, data) => {
    // Simulate API call
    await simulateDelay();
    return { data: { ...data, id } };
  },
  delete: async (id) => {
    // Simulate API call
    await simulateDelay();
    return { data: { success: true } };
  },
  getSubscriptions: async (userId) => {
    // Simulate API call
    await simulateDelay();
    return { data: [] };
  },
};

// Membership Plans API
export const planAPI = {
  getAll: async () => {
    // Simulate API call
    await simulateDelay();
    return { data: [] };
  },
  getById: async (id) => {
    // Simulate API call
    await simulateDelay();
    return { data: {} };
  },
  create: async (data) => {
    // Simulate API call
    await simulateDelay();
    return { data: { ...data, id: Date.now() } };
  },
  update: async (id, data) => {
    // Simulate API call
    await simulateDelay();
    return { data: { ...data, id } };
  },
  delete: async (id) => {
    // Simulate API call
    await simulateDelay();
    return { data: { success: true } };
  },
};

// Subscriptions API
export const subscriptionAPI = {
  getAll: async () => {
    // Simulate API call
    await simulateDelay();
    return { data: [] };
  },
  getById: async (id) => {
    // Simulate API call
    await simulateDelay();
    return { data: {} };
  },
  cancel: async (id) => {
    // Simulate API call
    await simulateDelay();
    return { data: { success: true } };
  },
  create: async (data) => {
    // Simulate API call
    await simulateDelay();
    return { data: { ...data, id: Date.now() } };
  },
};

// Products API
export const productAPI = {
  getAll: async (params) => {
    // Simulate API call
    await simulateDelay();
    return { data: { products: [], total: 0 } };
  },
  getById: async (id) => {
    // Simulate API call
    await simulateDelay();
    return { data: {} };
  },
  create: async (data) => {
    // Simulate API call
    await simulateDelay();
    return { data: { ...data, id: Date.now() } };
  },
  update: async (id, data) => {
    // Simulate API call
    await simulateDelay();
    return { data: { ...data, id } };
  },
  delete: async (id) => {
    // Simulate API call
    await simulateDelay();
    return { data: { success: true } };
  },
};

// Orders API
export const orderAPI = {
  getAll: async (params) => {
    // Simulate API call
    await simulateDelay();
    return { data: { orders: [], total: 0 } };
  },
  getById: async (id) => {
    // Simulate API call
    await simulateDelay();
    return { data: {} };
  },
  updateStatus: async (id, status) => {
    // Simulate API call
    await simulateDelay();
    return { data: { success: true } };
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    // Simulate API call
    await simulateDelay();
    return { data: {} };
  },
  getRecentActivity: async () => {
    // Simulate API call
    await simulateDelay();
    return { data: [] };
  },
};

export default api;
