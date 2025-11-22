import { useState, createContext } from "react";
import OrdersDetails from "./OrdersDetails.jsx";
import OrderFilters from "./OrdersFilter.jsx";
import OrdersSalesTarget from "./OrdersSalesTarget.jsx";
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
      <BoxContent style={{ marginBottom: 16 }}>
        <OrderFilters />
      </BoxContent>
      <BoxContent>
        <OrdersDetails />
      </BoxContent>
      <BoxContent margin="50px 0 0 0">
        <h1 class="mb-4 text-3xl font-bold tracking-tight text-heading md:text-3xl lg:text-3xl">
          อันดับยอดขาย
        </h1>
        <OrdersSalesTarget />
      </BoxContent>
    </OrderContext.Provider>
  );
};
export default Orders;
