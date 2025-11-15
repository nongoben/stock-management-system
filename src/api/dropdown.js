import apiClient from "./client";

/**
 * Dropdown API endpoints
 */
export const dropdownApi = {
  getAllProduct: async (params = {}) => {
    return await apiClient
      .get("DropDown/GetDropdownProduct", { searchParams: params })
      .json();
  },
  getAllSalesPersons: async (params = {}) => {
    return await apiClient
      .get("DropDown/GetSalesPerson", { searchParams: params })
      .json();
  },
  getAllCustomer: async (params = {}) => {
    return await apiClient
      .get("DropDown/GetCustomer", { searchParams: params })
      .json();
  },
};
