import React, { useState } from "react";
import { Col, Button, Select, DatePicker } from "antd";
import { RowContent } from "@Components/Layout";
import ModalAddItem from "./features/ModalAddItem.jsx";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDropdownProducts } from "@Hooks/useDropdownApi";
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
        <Button
          type="primary"
          size="large"
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ["stocks"] });
          }}
        >
          ค้นหา
        </Button>
      </Col>
      <Col md={8} style={{ textAlign: "right" }}>
        <Button
          type="primary"
          className="bg-yellow-600 border-yellow-600 hover:bg-yellow-500 hover:border-yellow-500"
          size="large"
          onClick={() => setModalAddOrderOpen(true)}
        >
          เพิ่มคำสั่งซื้อ
        </Button>
        <ModalAddOrder open={modalAddOrderOpen} handleOk={handleOk} />
        <Button
          type="primary"
          className="bg-green-600 border-green-600 hover:bg-green-500 hover:border-green-500 ml-2"
          size="large"
          onClick={() => setModalOpen(true)}
        >
          เพิ่มสินค้า
        </Button>
        <ModalAddItem open={modalOpen} handleOk={handleOk} />
      </Col>
    </RowContent>
  );
}
