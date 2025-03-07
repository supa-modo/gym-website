import api from "./api";

const planAPI = {
  // Get all plans
  getAll: async () => {
    try {
      const response = await api.get("/plans");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get plan by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/plans/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new plan
  create: async (data) => {
    try {
      const response = await api.post("/plans", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update a plan
  update: async (id, data) => {
    try {
      const response = await api.patch(`/plans/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a plan
  delete: async (id) => {
    try {
      const response = await api.delete(`/plans/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get plan statistics
  getStats: async (id) => {
    try {
      const response = await api.get(`/plans/${id}/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default planAPI;
