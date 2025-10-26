import { createContext, useState } from "react";
import { createStore } from "zustand";
import { dataSource } from "@Constants/dataSource";
export const FetchApiContext = createContext();

export function FetchApiProvider({ children }) {
  const [store] = useState(() =>
    createStore((set, get) => ({
      editingKey: null,
      setEditingKey: (key) => set({ editingKey: key }),
      stockDataSource: [...dataSource],
      setStockDataSource: (newData) => set({ stockDataSource: [...newData] }),
    }))
  );

  return (
    <FetchApiContext.Provider value={store}>
      {children}
    </FetchApiContext.Provider>
  );
}
