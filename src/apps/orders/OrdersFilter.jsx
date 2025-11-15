import React, { useContext, useRef } from "react";
import { Col, Button, Select, DatePicker } from "antd";
import { RowContent } from "@Components/Layout";
import { OrderContext } from "../orders/index.jsx";
import {
  useDropdownProducts,
  useDropdownSalesPersons,
  useDropdownCustomers,
} from "@Hooks/useDropDownApi";

export default function OrdersFilter() {
  const dateFormat = "YYYY/MM/DD";
  const { RangePicker } = DatePicker;
  const { data: products } = useDropdownProducts();
  const { data: salesPersons } = useDropdownSalesPersons();
  const { data: customers } = useDropdownCustomers();
  const { filters, setFilters } = useContext(OrderContext);

  const productSelectOptiuons = useRef("");
  const salesPersonSelectOptiuons = useRef("");
  const customerSelectOptiuons = useRef("");
  const dateFromSelect = useRef("");
  const dateToSelect = useRef("");

  const onProductSelect = (value) => {
    productSelectOptiuons.current = value;
  };

  const onCustomerSelect = (value) => {
    customerSelectOptiuons.current = value;
  };

  const onSalesPersonSelect = (value) => {
    salesPersonSelectOptiuons.current = value;
  };

  const onDateRangeChange = (dates) => {
    if (dates) {
      dateFromSelect.current = dates[0].format(dateFormat);
      dateToSelect.current = dates[1].format(dateFormat);
    } else {
      dateFromSelect.current = "";
      dateToSelect.current = "";
    }
  };

  const handleSearch = () => {
    setFilters({
      product: productSelectOptiuons.current,
      customer: customerSelectOptiuons.current,
      salesPerson: salesPersonSelectOptiuons.current,
      fromDate: dateFromSelect.current,
      toDate: dateToSelect.current,
    });
  };

  return (
    <RowContent alignBottom>
      <Col md={4}>
        <label>สินค้า</label>
        <Select
          allowClear
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
          onChange={onProductSelect}
        />
      </Col>
      <Col md={4}>
        <label>พนักงานขาย</label>
        <Select
          allowClear
          size="large"
          showSearch
          style={{ width: "100%" }}
          placeholder="เลือกพนักงานขาย"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={salesPersons?.data.map((person) => ({
            value: person.code,
            label: person.description,
          }))}
          onChange={onSalesPersonSelect}
        />
      </Col>
      <Col md={4}>
        <label>ลูกค้า</label>
        <Select
          allowClear
          size="large"
          showSearch
          style={{ width: "100%" }}
          placeholder="เลือกลูกค้า"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={customers?.data.map((customer) => ({
            value: customer.code,
            label: customer.description,
          }))}
          onChange={onCustomerSelect}
        />
      </Col>
      <Col md={6}>
        <label>วันที่สั่งซื้อ</label>
        <br />
        <RangePicker
          size="large"
          format={dateFormat}
          onChange={onDateRangeChange}
        />
      </Col>
      <Col md={4} style={{ textAlign: "left" }}>
        <Button type="primary" size="large" onClick={handleSearch}>
          ค้นหา
        </Button>
      </Col>
    </RowContent>
  );
}
