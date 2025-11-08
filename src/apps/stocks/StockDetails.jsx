import React, { useState } from "react";
import { Button, Table, Tooltip, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFetchApiStore } from "@Hooks/fetchApiStore";

const StockDetails = () => {
  const { stockDataSource, setStockDataSource, setEditingKey } =
    useFetchApiStore((state) => ({
      setStockDataSource: state.setStockDataSource,
      stockDataSource: state.stockDataSource,
      setEditingKey: state.setEditingKey,
    }));

  const confirm = (key) => {
    setStockDataSource(stockDataSource.filter((item) => item.key !== key));
    message.success("Click on Yes");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const columns = [
    {
      title: "รูปสินค้า",
      dataIndex: "itemImage",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => (
        <div>
          <img
            style={{ width: "120px", height: "100px" }}
            src={text}
            alt="Item Image"
          />
        </div>
      ),
    },
    {
      title: "รหัสสินค้า",
      dataIndex: "itemCode",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "ชื่อสินค้า",
      dataIndex: "itemName",
      width: 200,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "ประเภทสินค้า",
      dataIndex: "category",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "จำนวนสินค้า",
      dataIndex: "quantity",
      width: 100,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "ราคาสินค้า",
      dataIndex: "price",
      width: 100,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "ซัพพลายเออร์",
      dataIndex: "supplier",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "วันที่แก้ไข",
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
            <Popconfirm
              title="แจ้งเตือน"
              description="ต้องการที่จะลบสินค้าใช่หรือไหม?"
              onConfirm={() => confirm(text)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
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
