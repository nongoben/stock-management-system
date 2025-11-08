import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@Api";

/**
 * Custom hooks for order API operations using React Query
 */

// Get all orders
export const useOrders = (params = {}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => ordersApi.getAll(params),
  });
};

// Get order by ID
export const useOrder = (id) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => ordersApi.getById(id),
    enabled: !!id,
  });
};

// Create order mutation
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => ordersApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch orders
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["stocks"],
      });
    },
  });
};

// Update order mutation
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => ordersApi.update(id, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

// Delete order mutation
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => ordersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Search orders
export const useSearchOrders = (query) => {
  return useQuery({
    queryKey: ["orders", "search", query],
    queryFn: () => ordersApi.search(query),
    enabled: !!query && query.length > 0,
  });
};
