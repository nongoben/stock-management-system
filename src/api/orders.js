import apiClient from "./client";

/**
 * Order API endpoints
 */
export const ordersApi = {
  // Get all orders
  getAll: async (params = {}) => {
    return await apiClient.get("orders", { searchParams: params }).json();
  },

  // Get order by ID
  getById: async (id) => {
    return await apiClient.get(`orders/${id}`).json();
  },

  // Create new order
  create: async (data) => {
    return await apiClient.post("orders", { json: data }).json();
  },

  // Update order
  update: async (id, data) => {
    return await apiClient.put(`orders/${id}`, { json: data }).json();
  },

  // Delete order
  delete: async (id) => {
    return await apiClient.delete(`orders/${id}`).json();
  },

  // Update order status
  updateStatus: async (id, status) => {
    return await apiClient
      .patch(`orders/${id}/status`, {
        json: { status },
      })
      .json();
  },
};
