import apiClient from "./client";

/**
 * Stock API endpoints
 */
export const stocksApi = {
  // Get all stocks
  getAll: async (params = {}) => {
    return await apiClient
      .get("Product/GetAllProduct", { searchParams: params })
      .json();
  },

  // Get stock by ID
  getById: async (id) => {
    return await apiClient.get(`Product/GetProductById/${id}`).json();
  },

  // Create new stock
  create: async (data) => {
    return await apiClient.post("Product/CreateProduct", { json: data }).json();
  },

  // Update stock
  update: async (id, data) => {
    return await apiClient
      .put(`Product/UpdateProduct/${id}`, { json: data })
      .json();
  },

  // Delete stock
  delete: async (id) => {
    return await apiClient.delete(`Product/DeleteProduct/${id}`).json();
  },

  // Search stocks
  search: async (query) => {
    return await apiClient
      .get("stocks/search", {
        searchParams: { q: query },
      })
      .json();
  },
};
