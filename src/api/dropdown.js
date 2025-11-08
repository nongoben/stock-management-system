import apiClient from "./client";

/**
 * Dropdown API endpoints
 */
export const dropdownApi = {
  getAllProducts: async (params = {}) => {
    return await apiClient
      .get("DropDown/GetDropdownProducts", { searchParams: params })
      .json();
  },
};
