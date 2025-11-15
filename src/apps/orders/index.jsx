import OrdersDetails from "./OrdersDetails.jsx";
import StockFilters from "./OrdersFilter.jsx";
import { BoxContent } from "@Components/Layout";

const Stocks = () => {
  return (
    <>
      <BoxContent style={{ marginBottom: 16 }}>
        <StockFilters />
      </BoxContent>
      <BoxContent>
        <OrdersDetails />
      </BoxContent>
    </>
  );
};
export default Stocks;
