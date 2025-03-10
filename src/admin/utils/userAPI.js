import axios from "axios";
import api from "./api";

const API_BASE_URL = "http://localhost:5000/api/users";

const userAPI = {
  // Get all users
  getAll: async (params) => {
    try {
      const response = await api.get(`/users`, {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search,
          role: params.role,
          status: params.status,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new user
  create: async (userData) => {
    try {
      const response = await api.post(`/users`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update a user
  update: async (id, data, config) => {
    try {
      const response = await api.put(`/users/${id}`, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a user
  delete: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put(`/users/password`, passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post(
        `/users/${id}/profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default userAPI;
