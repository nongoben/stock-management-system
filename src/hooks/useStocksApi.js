import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { stocksApi } from "@Api";

/**
 * Custom hooks for stock API operations using React Query
 */

// Get all stocks
export const useStocks = (params = {}) => {
  return useQuery({
    queryKey: ["stocks", params],
    queryFn: () => stocksApi.getAll(params),
  });
};

// Get stock by ID
export const useStock = (id) => {
  return useQuery({
    queryKey: ["stocks", id],
    queryFn: () => stocksApi.getById(id),
    enabled: !!id,
  });
};

// Create stock mutation
export const useCreateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => stocksApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch stocks
      queryClient.invalidateQueries({
        queryKey: ["stocks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dropdownProducts"],
      });
    },
  });
};

// Update stock mutation
export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => stocksApi.update(id, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["stocks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dropdownProducts"],
      });
    },
  });
};

// Delete stock mutation
export const useDeleteStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => stocksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
    },
  });
};

// Search stocks
export const useSearchStocks = (query) => {
  return useQuery({
    queryKey: ["stocks", "search", query],
    queryFn: () => stocksApi.search(query),
    enabled: !!query && query.length > 0,
  });
};
