import { Table, message } from "antd";
import { useFetchApiStore } from "@Hooks/fetchApiStore";

const OrdersDetails = () => {
  const { orderDataSource, setOrderDataSource } = useFetchApiStore((state) => ({
    setOrderDataSource: state.setOrderDataSource,
    orderDataSource: state.orderDataSource,
  }));

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
      dataIndex: "cvDesc",
      width: 150,
      onHeaderCell: () => ({
        style: { backgroundColor: "#001529", color: "white" },
      }),
      render: (text) => <div>{text}</div>,
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
      columns={columns}
      dataSource={orderDataSource}
      pagination={false}
      scroll={{ y: "calc(100vh - 350px)" }}
    />
  );
};
export default OrdersDetails;
