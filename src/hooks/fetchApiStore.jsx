import { useContext } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

import { FetchApiContext } from "@Contexts/FetchApi";

export function useFetchApiStore(selector) {
  const store = useContext(FetchApiContext);

  return useStore(store, useShallow(selector));
}
