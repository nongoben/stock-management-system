import React, { useState } from "react";
import { Col, Button, Select, DatePicker } from "antd";
import { RowContent } from "@Components/Layout";
import ModalAddItem from "./features/ModalAddItem.jsx";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDropdownProducts } from "@Hooks/useDropDownApi";
import ModalAddOrder from "./features/ModalAddOrder.jsx";

dayjs.extend(customParseFormat);

export default function StockFilters() {
  const { data: products } = useDropdownProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAddOrderOpen, setModalAddOrderOpen] = useState(false);
  const queryClient = useQueryClient();
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";

  console.log(products);

  const handleOk = () => {
    setModalOpen(false);
    setModalAddOrderOpen(false);
  };
  return (
    <RowContent alignBottom>
      <Col md={6}>
        <Select
          size="large"
          showSearch
          style={{ width: "100%" }}
          placeholder="เลือกสินค้า"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={products?.data.map((product) => ({
            value: product.code,
            label: product.description,
          }))}
        />
      </Col>
      <Col md={6}>
        <RangePicker size="large" format={dateFormat} />
      </Col>
      <Col md={4} style={{ textAlign: "left" }}>
        <button
          type="button"
          className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2"
          size="large"
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ["stocks"] });
          }}
        >
          ค้นหา
        </button>
      </Col>
      <Col md={8} style={{ textAlign: "right" }}>
        <button
          type="button"
          className={
            "text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2"
          }
          size="large"
          onClick={() => setModalAddOrderOpen(true)}
        >
          เพิ่มคำสั่งซื้อ
        </button>
        <ModalAddOrder open={modalAddOrderOpen} handleOk={handleOk} />
        <button
          type="button"
          className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50"
          size="large"
          onClick={() => setModalOpen(true)}
        >
          เพิ่มสินค้า
        </button>
        <ModalAddItem open={modalOpen} handleOk={handleOk} />
      </Col>
    </RowContent>
  );
}
