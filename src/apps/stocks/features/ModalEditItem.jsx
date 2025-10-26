import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useFetchApiStore } from "@Hooks/fetchApiStore";

export default function ModalEditItem() {
  const { stockDataSource, setStockDataSource, editingKey, setEditingKey } =
    useFetchApiStore((state) => ({
      editingKey: state.editingKey,
      setEditingKey: state.setEditingKey,
      setStockDataSource: state.setStockDataSource,
      stockDataSource: state.stockDataSource,
    }));

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const itemToEdit = stockDataSource.find((item) => item.key === editingKey);

  useEffect(() => {
    if (editingKey == null) return;
    setOpen(true);
  }, [editingKey]);

  useEffect(() => {
    if (itemToEdit) {
      form.setFieldsValue(itemToEdit);
    }
  }, [itemToEdit, form]);

  const handleOk = () => {
    setOpen(false);
    setEditingKey(null);
  };

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
        itemToEdit?.image ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxK9b7kY5pO2orZ3dvb8DF9Flz6zInmbDRSA&s",
      itemCode: itemToEdit?.itemCode,
      itemName: values.itemName,
      category: "General",
      quantity: values.quantity,
    };
    const updatedData = stockDataSource.map((item) =>
      item.key === editingKey ? { ...item, ...newItem } : item
    );
    setStockDataSource(updatedData);
    handleOk();
  };

  return (
    <Modal
      title="Edit Item"
      ok
      open={open}
      onOk={handleOk}
      onCancel={handleOk}
      footer={[]}
    >
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Item Code"
          name={["itemCode"]}
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={["itemName"]}
          label="Item Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["quantity"]}
          label="Quantity"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["price"]} label="Price" rules={[{ required: true }]}>
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
