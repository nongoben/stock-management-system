import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dropdownApi } from "@Api";

export const useDropdownProducts = (params = {}) => {
  return useQuery({
    queryKey: ["dropdownProducts", params],
    queryFn: () => dropdownApi.getAllProducts(params),
  });
};
