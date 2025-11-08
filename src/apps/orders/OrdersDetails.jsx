import React, { useMemo } from "react";
import { Table, message, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
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

  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`ค้นหา ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            ค้นหา
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            ล้าง
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : "white" }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  const columns = useMemo(
    () => [
      {
        title: "วันที่สั่งซื้อ",
        dataIndex: "orderDate",
        width: 150,
        onHeaderCell: () => ({
          style: { backgroundColor: "#001529", color: "white" },
        }),
        ...getColumnSearchProps("orderDate", "วันที่สั่งซื้อ"),
        render: (text) => <div>{text}</div>,
      },
      {
        title: "ชื่อลูกค้า",
        dataIndex: "customerName",
        width: 150,
        onHeaderCell: () => ({
          style: { backgroundColor: "#001529", color: "white" },
        }),
        ...getColumnSearchProps("customerName", "ชื่อลูกค้า"),
        render: (text) => <div>{text}</div>,
      },
      {
        title: "รหัสสินค้า",
        dataIndex: "productCode",
        width: 150,
        onHeaderCell: () => ({
          style: { backgroundColor: "#001529", color: "white" },
        }),
        ...getColumnSearchProps("productCode", "รหัสสินค้า"),
        render: (text) => <div>{text}</div>,
      },
      {
        title: "ชื่อสินค้า",
        dataIndex: "productName",
        width: 200,
        onHeaderCell: () => ({
          style: { backgroundColor: "#001529", color: "white" },
        }),
        ...getColumnSearchProps("productName", "ชื่อสินค้า"),
        render: (text) => <div>{text}</div>,
      },
      {
        title: "จำนวนที่สั่งซื้อ",
        dataIndex: "quantity",
        width: 100,
        onHeaderCell: () => ({
          style: { backgroundColor: "#001529", color: "white" },
        }),
        ...getColumnSearchProps("quantity", "จำนวนที่สั่งซื้อ"),
        render: (text) => <div>{text}</div>,
      },
      {
        title: "จำนวนเงิน",
        dataIndex: "totalAmount",
        width: 100,
        onHeaderCell: () => ({
          style: { backgroundColor: "#001529", color: "white" },
        }),
        ...getColumnSearchProps("totalAmount", "จำนวนเงิน"),
        render: (text) => <div>{text}</div>,
      },
    ],
    [orderDataSource]
  );

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={orderDataSource}
      pagination={false}
      scroll={{ y: "calc(100vh - 350px)" }}
      className="custom-filter-table"
    />
  );
};
export default OrdersDetails;
