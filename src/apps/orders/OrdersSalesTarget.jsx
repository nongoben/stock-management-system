import { useMemo, useContext } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useOrdersSalesTarget } from "@Hooks/useOrdersApi";
import { OrderContext } from "./index.jsx";

const OrdersSalesTarget = () => {
  const filterContext = useContext(OrderContext);
  const { data: ordersData, isFetching } = useOrdersSalesTarget(
    filterContext.filters
  );

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
        title: "อันดับ",
        dataIndex: "rank",
        width: 150,
        onHeaderCell: () => ({
          style: { backgroundColor: "#001529", color: "white" },
        }),
        ...getColumnSearchProps("rank", "อันดับ"),
        render: (text) => <div>{text}</div>,
      },
      {
        title: "พนักงานขาย",
        dataIndex: "salesPerson",
        width: 150,
        onHeaderCell: () => ({
          style: { backgroundColor: "#001529", color: "white" },
        }),
        ...getColumnSearchProps("salesPerson", "พนักงานขาย"),
        render: (text) => <div>{text}</div>,
      },
      {
        title: "จำนวน order",
        dataIndex: "totalOrders",
        width: 100,
        onHeaderCell: () => ({
          style: { backgroundColor: "#001529", color: "white" },
        }),
        ...getColumnSearchProps("totalOrders", "จำนวน order"),
        render: (text) => <div>{Number(text).toLocaleString()}</div>,
      },
      {
        title: "จำนวนเงิน",
        dataIndex: "totalSales",
        width: 100,
        onHeaderCell: () => ({
          style: { backgroundColor: "#001529", color: "white" },
        }),
        ...getColumnSearchProps("totalSales", "จำนวนเงิน"),
        render: (text) => <div>{Number(text).toLocaleString()}</div>,
      },
    ],
    []
  );

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={ordersData?.data}
      pagination={false}
      scroll={{ y: "calc(100vh - 350px)" }}
      className="custom-filter-table"
    />
  );
};
export default OrdersSalesTarget;
