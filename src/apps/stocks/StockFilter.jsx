import React, { useState } from "react";
import { Col, Input, Button } from "antd";
import { RowContent } from "@Components/Layout";
import ModalAddItem from "./features/ModalAddItem.jsx";

export default function StockFilters() {
  const { Search } = Input;
  const [modalOpen, setModalOpen] = useState(false);

  const handleOk = () => {
    setModalOpen(false);
  };

  return (
    <RowContent alignBottom>
      <Col md={12}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
        />
      </Col>
      <Col md={12} style={{ textAlign: "right" }}>
        <Button type="primary" size="large" onClick={() => setModalOpen(true)}>
          Add Stock
        </Button>
        <ModalAddItem open={modalOpen} handleOk={handleOk} />
      </Col>
    </RowContent>
  );
}
