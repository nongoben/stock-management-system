import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dropdownApi } from "@Api";

export const useDropdownProducts = (params = {}) => {
  return useQuery({
    queryKey: ["dropdownProducts", params],
    queryFn: () => dropdownApi.getAllProduct(params),
  });
};

export const useDropdownSalesPersons = (params = {}) => {
  return useQuery({
    queryKey: ["dropdownSalesPersons", params],
    queryFn: () => dropdownApi.getAllSalesPersons(params),
  });
};

export const useDropdownCustomers = (params = {}) => {
  return useQuery({
    queryKey: ["dropdownCustomers", params],
    queryFn: () => dropdownApi.getAllCustomer(params),
  });
};
