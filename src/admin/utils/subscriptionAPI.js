import api from "./api";

const subscriptionAPI = {
  // Get all subscriptions
  getAll: async () => {
    try {
      const response = await api.get("/subscriptions");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get subscription by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/subscriptions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new subscription
  create: async (subscriptionData) => {
    try {
      const response = await api.post("/subscriptions", subscriptionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cancel a subscription
  cancel: async (id) => {
    try {
      const response = await api.patch(`/subscriptions/${id}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Extend a subscription
  extend: async (id, months) => {
    try {
      const response = await api.patch(`/subscriptions/${id}/extend`, {
        months,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default subscriptionAPI;
