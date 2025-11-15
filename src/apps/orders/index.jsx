import { useState, createContext } from "react";
import OrdersDetails from "./OrdersDetails.jsx";
import OrderFilters from "./OrdersFilter.jsx";
import { BoxContent } from "@Components/Layout";
import { FetchApiProvider } from "@Contexts/FetchApi.jsx";

const initialFilter = {
  product: "",
  customer: "",
  salePerson: "",
  fromDate: "",
  toDate: "",
};

export const OrderContext = createContext({
  filters: initialFilter,
  setFilters: () => {},
});

const Orders = () => {
  const [filters, setFilters] = useState(initialFilter);

  return (
    <OrderContext.Provider value={{ filters, setFilters }}>
      <FetchApiProvider>
        <BoxContent style={{ marginBottom: 16 }}>
          <OrderFilters />
        </BoxContent>
        <BoxContent>
          <OrdersDetails />
        </BoxContent>
      </FetchApiProvider>
    </OrderContext.Provider>
  );
};
export default Orders;
