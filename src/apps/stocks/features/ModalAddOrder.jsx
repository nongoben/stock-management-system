import { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select, Image, Alert } from "antd";
import { useStocks } from "@Hooks/useStocksApi";
import { useDropdownProducts } from "@Hooks/useDropdownApi";
import { useCreateOrder } from "@Hooks/useOrdersApi";

export default function ModalAddOrder({ open, handleOk }) {
  const { data: stocksData } = useStocks();
  const { data: products } = useDropdownProducts();
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState(null);

  const createOrder = useCreateOrder();

  const [form] = Form.useForm();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      form.resetFields();
      setPreviewImage("");
      setError(null);
    }
  }, [open, form]);

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

  const onSelectProduct = (value) => {
    if (value == null) {
      form.setFieldsValue({
        price: null,
        remainingQuantity: null,
        image: null,
      });
      setPreviewImage("");
      return;
    }

    const selectedProduct = stocksData?.data.find(
      (product) => Number(product.id) === Number(value)
    );

    if (selectedProduct) {
      form.setFieldsValue({
        price: selectedProduct.price,
        remainingQuantity: selectedProduct.quantity,
        image: selectedProduct.image,
      });

      setPreviewImage(selectedProduct.image);
    }
  };

  const onFinish = async (values) => {
    const newItem = {
      productId: values?.productId,
      customerName: values?.customerName,
      quantity: values?.quantity,
      price: values?.price,
      totalPrice: values?.totalPrice,
      orderDate: new Date().toISOString(),
    };

    if (values?.quantity > values?.remainingQuantity) {
      setError(
        "ไม่สามารถสั่งซื้อได้ เนื่องจากจำนวนสินค้าที่สั่งซื้อเกินจำนวนสินค้าคงเหลือ"
      );
      return;
    }

    if (values?.quantity <= 0) {
      setError(
        "ไม่สามารถสั่งซื้อได้ เนื่องจากจำนวนสินค้าที่สั่งซื้อไม่ถูกต้อง"
      );
      return;
    }

    try {
      await createOrder.mutateAsync(newItem);
      form.resetFields();
      setPreviewImage("");
      handleOk();
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <Modal
      title="เพิ่มคำสั่งซื้อ"
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
          label="สินค้า"
          name={["productId"]}
          rules={[{ required: false }]}
        >
          <Select
            size="large"
            showSearch
            style={{ width: "100%" }}
            placeholder="เลือกสินค้า"
            optionFilterProp="label"
            allowClear
            onChange={onSelectProduct}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={products?.data.map((product) => ({
              value: product.code,
              label: product.description,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="รูปสินค้า"
          name={["image"]}
          rules={[{ required: false }]}
        >
          <Image src={previewImage} />
        </Form.Item>
        <Form.Item name={["price"]} label="ราคา">
          <Input disabled />
        </Form.Item>
        <Form.Item label="จำนวนสินค้าคงเหลือ" name={["remainingQuantity"]}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="ชื่อลูกค้า"
          name={["customerName"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["quantity"]}
          label="จำนวนสั่งซื้อ"
          rules={[{ required: true }]}
        >
          <Input
            onChange={(e) => {
              const value = e.target.value;
              const price = form.getFieldValue("price");
              const totalPrice = value * price;
              form.setFieldsValue({ totalPrice: totalPrice });
            }}
          />
        </Form.Item>
        <Form.Item
          name={["totalPrice"]}
          label="รวมเป็นเงิน"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <div>
          <Alert
            style={{ display: error !== null ? "" : "none" }}
            message="เกิดข้อผิดพลาด"
            description={error}
            type="error"
            showIcon
          />
        </div>
        <div className="flex justify-end mt-4">
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
