import api from "./api";

const productAPI = {
  // Get all products
  getAll: async (params) => {
    try {
      const response = await api.get("/products", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get product by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new product
  create: async (productData) => {
    try {
      const response = await api.post(`/products`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update a product
  update: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a product
  delete: async (id) => {
    try {
      const response = await api.delete(`products/${id}`);
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

      const response = await api.post(`products/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default productAPI;
