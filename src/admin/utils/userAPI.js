import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/users"; // Update with your backend URL

const userAPI = {
  // Get all users
  getAll: async (params) => {
    try {
      const response = await axios.get(API_BASE_URL, {
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
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new user
  create: async (userData) => {
    try {
      const response = await axios.post(API_BASE_URL, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update a user
  update: async (id, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a user
  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
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

      const response = await axios.post(
        `${API_BASE_URL}/${id}/profile-picture`,
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
