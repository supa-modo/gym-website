import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/products";

const productAPI = {
  // Get all products
  getAll: async (params) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search,
          category: params.category,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get product by ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new product
  create: async (productData) => {
    try {
      const response = await axios.post(API_BASE_URL, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update a product
  update: async (id, productData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a product
  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload product image
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default productAPI;
