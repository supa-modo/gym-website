import axios from "axios";

// API base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

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

      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// Helper function to simulate API delay
const simulateDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// User API
export const userAPI = {
  getAll: (params) => api.get("/users", { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  getSubscriptions: (userId) => api.get(`/users/${userId}/subscriptions`),
};

// Orders API
export const orderAPI = {
  getAll: (params) => api.get("/orders/admin/all", { params }),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get("/admin/stats"),
  getRecentActivity: () => api.get("/admin/recent-activity"),
};

export default api;
