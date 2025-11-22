import { useState, createContext } from "react";
import ModalEditItem from "./features/ModalEditItem.jsx";
import StockDetails from "./StockDetails.jsx";
import StockFilters from "./StockFilter.jsx";
import { BoxContent } from "@Components/Layout";
import { FetchApiProvider } from "@Contexts/FetchApi.jsx";

const initialFilter = {
  product: "",
  fromDate: "",
  toDate: "",
};

export const StockContext = createContext({
  filters: initialFilter,
  setFilters: () => {},
});

const Stocks = () => {
  const [filters, setFilters] = useState(initialFilter);

  return (
    <StockContext.Provider value={{ filters, setFilters }}>
      <BoxContent style={{ marginBottom: 16 }}>
        <StockFilters />
      </BoxContent>
      <BoxContent>
        <StockDetails />
      </BoxContent>
      <ModalEditItem />
    </StockContext.Provider>
  );
};
export default Stocks;
