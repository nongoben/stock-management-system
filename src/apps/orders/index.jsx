import OrdersDetails from "./OrdersDetails.jsx";
import StockFilters from "./OrdersFilter.jsx";
import { BoxContent } from "@Components/Layout";
import { FetchApiProvider } from "@Contexts/FetchApi.jsx";

const Stocks = () => {
  return (
    <FetchApiProvider>
      <BoxContent style={{ marginBottom: 16 }}>
        <StockFilters />
      </BoxContent>
      <BoxContent>
        <OrdersDetails />
      </BoxContent>
    </FetchApiProvider>
  );
};
export default Stocks;
