import { createContext, useState } from "react";
import { createStore } from "zustand";
import { stockDataSource, orderDataSource } from "@Constants/dataSource";
export const FetchApiContext = createContext();

export function FetchApiProvider({ children }) {
  const [store] = useState(() =>
    createStore((set, get) => ({
      editingKey: null,
      setEditingKey: (key) => set({ editingKey: key }),
      stockDataSource: [],
      setStockDataSource: (newData) => set({ stockDataSource: [...newData] }),
      orderDataSource: [],
      setOrderDataSource: (newData) => set({ orderDataSource: [...newData] }),
      showDialogSuccess: false,
      setShowDialogSuccess: (value) => set({ showDialogSuccess: value }),
    }))
  );

  return (
    <FetchApiContext.Provider value={store}>
      {children}
    </FetchApiContext.Provider>
  );
}
