import { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Image, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useFetchApiStore } from "@Hooks/fetchApiStore";
import { useUpdateStock } from "@Hooks/useStocksApi";

export default function ModalEditItem() {
  const { stockDataSource, editingKey, setEditingKey, setShowDialogSuccess } =
    useFetchApiStore((state) => ({
      editingKey: state.editingKey,
      setEditingKey: state.setEditingKey,
      stockDataSource: state.stockDataSource,
      setShowDialogSuccess: state.setShowDialogSuccess,
    }));

  const updateStock = useUpdateStock();

  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

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

  const onFinish = async (values) => {
    const newItem = {
      id: itemToEdit?.key,
      productCode: values?.itemCode,
      name: values?.itemName,
      image: values?.itemImage,
      category: "General",
      quantity: values?.quantity,
      stockQuantity: values?.stockQuantity,
      soldQuantity: values?.soldQuantity,
      price: values?.price,
      createdAt: itemToEdit?.createdAt && new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const result = await updateStock.mutateAsync({
        id: itemToEdit?.key,
        data: newItem,
      });
      if (result.success === true) {
        setFileList([]);
        handleOk();
        setShowDialogSuccess(true);
      }
    } catch (error) {
      console.error("Failed to update stock:", error);
    }
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
          label="รูปสินค้า"
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
          label="รหัสสินค้า"
          name={["itemCode"]}
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={["itemName"]}
          label="ชื่อสินค้า"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["stockQuantity"]}
          label="จำนวนในสต็อก"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["soldQuantity"]} label="จำนวนที่ขาย">
          <Input />
        </Form.Item>
        <Form.Item name={["quantity"]} label="จำนวนคงเหลือ">
          <Input />
        </Form.Item>
        <Form.Item
          name={["price"]}
          label="ราคาสินค้า"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <div className="flex justify-end">
          <Button key="back" onClick={handleOk}>
            ยกเลิก
          </Button>
          <Button
            className="ml-3"
            key="submit"
            type="primary"
            htmlType="submit"
          >
            บันทึก
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
