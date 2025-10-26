import { Modal, Button, Form, Input } from "antd";
import { useFetchApiStore } from "@Hooks/fetchApiStore";

export default function ModalAddItem({ open, handleOk }) {
  const { stockDataSource, setStockDataSource } = useFetchApiStore((state) => ({
    setStockDataSource: state.setStockDataSource,
    stockDataSource: state.stockDataSource,
  }));

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const onFinish = (values) => {
    const newItem = {
      key: Date.now(),
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxK9b7kY5pO2orZ3dvb8DF9Flz6zInmbDRSA&s",
      itemCode: values.item.code,
      itemName: values.item.name,
      category: "General",
      quantity: values.item.quantity,
    };
    setStockDataSource([...stockDataSource, newItem]);
    handleOk();
  };

  return (
    <Modal
      title="Add Item"
      ok
      open={open}
      onOk={handleOk}
      onCancel={handleOk}
      footer={[]}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Item Code"
          name={["item", "code"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["item", "name"]}
          label="Item Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["item", "quantity"]}
          label="Quantity"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["item", "price"]}
          label="Price"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["item", "details"]} label="Details">
          <Input.TextArea />
        </Form.Item>
        <div className="flex justify-end">
          <Button key="back" onClick={handleOk}>
            Return
          </Button>
          <Button
            className="ml-3"
            key="submit"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
