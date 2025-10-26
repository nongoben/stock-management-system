import React, { useState } from "react";
import { Button, Table, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFetchApiStore } from "@Hooks/fetchApiStore";

const StockDetails = () => {
  const { stockDataSource, setStockDataSource, setEditingKey } =
    useFetchApiStore((state) => ({
      setStockDataSource: state.setStockDataSource,
      stockDataSource: state.stockDataSource,
      setEditingKey: state.setEditingKey,
    }));

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => (
        <div>
          <img
            style={{ width: "64px", height: "64px" }}
            src={text}
            alt="Item Image"
          />
        </div>
      ),
    },
    {
      title: "Item Code",
      dataIndex: "itemCode",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      width: 200,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: 100,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 100,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Actions",
      dataIndex: "key",
      width: 80,
      fixed: "right",
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {" "}
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setEditingKey(text)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="primary"
              onClick={() => {
                setStockDataSource(
                  stockDataSource.filter((item) => item.key !== text)
                );
              }}
              danger
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={stockDataSource}
      pagination={false}
      scroll={{ y: "calc(100vh - 350px)" }}
    />
  );
};
export default StockDetails;
