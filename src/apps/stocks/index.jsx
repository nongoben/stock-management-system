import ModalEditItem from "./features/ModalEditItem.jsx";
import StockDetails from "./StockDetails.jsx";
import StockFilters from "./StockFilter.jsx";
import { BoxContent } from "@Components/Layout";
import { FetchApiProvider } from "@Contexts/FetchApi.jsx";

const Stocks = () => {
  return (
    <FetchApiProvider>
      <BoxContent style={{ marginBottom: 16 }}>
        <StockFilters />
      </BoxContent>
      <BoxContent>
        <StockDetails />
      </BoxContent>
      <ModalEditItem />
    </FetchApiProvider>
  );
};
export default Stocks;
