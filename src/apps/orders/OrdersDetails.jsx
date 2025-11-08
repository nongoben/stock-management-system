import React from "react";
import { Table, message } from "antd";
import { useFetchApiStore } from "@Hooks/fetchApiStore";
import { useOrders } from "@Hooks/useOrdersApi";

const OrdersDetails = () => {
  const { data: ordersData, isFetching } = useOrders();

  const { orderDataSource, setOrderDataSource } = useFetchApiStore((state) => ({
    setOrderDataSource: state.setOrderDataSource,
    orderDataSource: state.orderDataSource,
  }));

  React.useEffect(() => {
    if (ordersData) {
      const formattedData = ordersData?.data.map((item) => ({
        key: item.id,
        orderDate: item.orderDate,
        customerName: item.customerName,
        productCode: item.productCode,
        productName: item.productName,
        category: item.category,
        quantity: item.quantity,
        totalAmount: item.totalPrice,
      }));
      setOrderDataSource(formattedData);
    }
  }, [ordersData]);

  const columns = [
    {
      title: "วันที่สั่งซื้อ",
      dataIndex: "orderDate",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "ชื่อลูกค้า",
      dataIndex: "customerName",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "รหัสสินค้า",
      dataIndex: "productCode",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "ชื่อสินค้า",
      dataIndex: "productName",
      width: 200,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "จำนวนที่สั่งซื้อ",
      dataIndex: "quantity",
      width: 100,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
    {
      title: "จำนวนเงิน",
      dataIndex: "totalAmount",
      width: 100,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={orderDataSource}
      pagination={false}
      scroll={{ y: "calc(100vh - 350px)" }}
    />
  );
};
export default OrdersDetails;
