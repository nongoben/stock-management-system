import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Image, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  console.log("fileList:", fileList);

  const itemToEdit = stockDataSource.find((item) => item.key === editingKey);

  useEffect(() => {
    if (editingKey == null) return;
    setOpen(true);
  }, [editingKey]);

  useEffect(() => {
    if (!itemToEdit) return;
    form.setFieldsValue(itemToEdit);
    if (itemToEdit.itemImage) {
      setFileList([
        {
          uid: itemToEdit.key,
          name: "image.png",
          status: "done",
          url: itemToEdit.itemImage,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [itemToEdit, form]);

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

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleOk = () => {
    setOpen(false);
    setEditingKey(null);
  };

  const onFinish = (values) => {
    const newItem = {
      key: Date.now(),
      itemImage: values?.itemImage,
      itemCode: itemToEdit?.itemCode,
      itemName: values.itemName,
      category: "General",
      quantity: values.quantity,
      price: values.price,
    };
    const updatedData = stockDataSource.map((item) =>
      item.key === editingKey ? { ...item, ...newItem } : item
    );
    setStockDataSource(updatedData);
    setFileList([]);
    handleOk();
  };

  const handlePreview = async (file) => {
    try {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    } catch (ex) {
      console.error("Error previewing image:", ex);
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
          label="Item Image"
          name={["itemImage"]}
          rules={[{ required: false }]}
        >
          <Upload
            action={async (value) => {
              const base64 = await getBase64(value);
              form.setFieldsValue({ itemImage: base64 });
              return "";
            }}
            fileList={fileList}
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>
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
