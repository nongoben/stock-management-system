import React, { useState } from "react";
import { Col, Input, Button, Select, DatePicker } from "antd";
import { RowContent } from "@Components/Layout";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";

export default function OrdersFilter() {
  const queryClient = useQueryClient();
  const dateFormat = "YYYY/MM/DD";

  return (
    <RowContent alignBottom>
      <Col md={6}>
        <label>สินค้า</label>
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
          options={[
            {
              value: "1",
              label: "Not Identified",
            },
            {
              value: "2",
              label: "Closed",
            },
            {
              value: "3",
              label: "Communicated",
            },
            {
              value: "4",
              label: "Identified",
            },
            {
              value: "5",
              label: "Resolved",
            },
            {
              value: "6",
              label: "Cancelled",
            },
          ]}
        />
      </Col>
      <Col md={6}>
        <label>ลูกค้า</label>
        <Select
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
          options={[
            {
              value: "1",
              label: "Not Identified",
            },
            {
              value: "2",
              label: "Closed",
            },
            {
              value: "3",
              label: "Communicated",
            },
            {
              value: "4",
              label: "Identified",
            },
            {
              value: "5",
              label: "Resolved",
            },
            {
              value: "6",
              label: "Cancelled",
            },
          ]}
        />
      </Col>
      <Col md={4}>
        <label>วันที่สั่งซื้อ</label>
        <DatePicker
          style={{ width: "100%" }}
          size="large"
          defaultValue={dayjs("2015/01/01", dateFormat)}
          format={dateFormat}
        />
      </Col>
      <Col md={4} style={{ textAlign: "left" }}>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            queryClient.refetchQueries({ queryKey: ["orders"] });
          }}
        >
          ค้นหา
        </Button>
      </Col>
    </RowContent>
  );
}
