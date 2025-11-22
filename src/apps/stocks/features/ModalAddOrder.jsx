import { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Image,
  Alert,
  AutoComplete,
} from "antd";
import { useStocks } from "@Hooks/useStocksApi";
import {
  useDropdownProducts,
  useDropdownSalesPersons,
} from "@Hooks/useDropDownApi";
import { useCreateOrder } from "@Hooks/useOrdersApi";
import { useFetchApiStore } from "@Hooks/fetchApiStore";

export default function ModalAddOrder({ open, handleOk }) {
  const { data: stocksData } = useStocks();
  const { data: products } = useDropdownProducts();
  const { data: salesPersons } = useDropdownSalesPersons();
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState(null);
  const { setShowDialogSuccess } = useFetchApiStore((state) => ({
    setShowDialogSuccess: state.setShowDialogSuccess,
  }));

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
      salesPerson: salesPerson.current,
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
      const result = await createOrder.mutateAsync(newItem);
      if (result.success === true) {
        form.resetFields();
        setPreviewImage("");
        handleOk();
        setShowDialogSuccess(true);
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const [options, setOptions] = useState(
    salesPersons?.data.map((person) => ({
      value: person.description,
    }))
  );

  const salesPerson = useRef("");

  const onSalesPersonChange = (data) => {
    salesPerson.current = data;
  };

  const onSalesPersonSearch = (data) => {
    const optionsOriginal = salesPersons?.data.map((person) => ({
      value: person.description,
    }));
    let filteredOptions = [];
    if (data) {
      filteredOptions = optionsOriginal.filter((option) =>
        option.value.toLowerCase().includes(data.toLowerCase())
      );
    } else {
      filteredOptions = optionsOriginal;
    }
    setOptions(filteredOptions);
  };

  const renderFormField = (label, name, component, rules = []) => (
    <Form.Item label={label} name={name} rules={rules}>
      {component}
    </Form.Item>
  );

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const price = form.getFieldValue("price");
    const totalPrice = value * price;
    form.setFieldsValue({ totalPrice: totalPrice });
  };

  const renderFooterButtons = () => (
    <div className="flex justify-end mt-4">
      <Button key="back" onClick={handleOk}>
        ย้อนกลับ
      </Button>
      <Button className="ml-3" key="submit" type="primary" htmlType="submit">
        บันทึก
      </Button>
    </div>
  );

  return (
    <Modal
      title="เพิ่มคำสั่งซื้อ"
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
        {renderFormField(
          "สินค้า",
          ["productId"],
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
        )}

        {renderFormField(
          "รูปสินค้า",
          ["image"],
          <Image width={"250px"} height={"150px"} src={previewImage} />
        )}

        {renderFormField("ราคา", ["price"], <Input disabled />)}

        {renderFormField(
          "จำนวนสินค้าคงเหลือ",
          ["remainingQuantity"],
          <Input disabled />
        )}

        {renderFormField(
          "ชื่อพนักงานขาย",
          ["salesPerson"],
          <AutoComplete
            options={options}
            onSearch={onSalesPersonSearch}
            onChange={onSalesPersonChange}
          />,
          [{ required: true }]
        )}

        {renderFormField("ชื่อลูกค้า", ["customerName"], <Input />, [
          { required: true },
        ])}

        {renderFormField(
          "จำนวนสั่งซื้อ",
          ["quantity"],
          <Input onChange={handleQuantityChange} />,
          [{ required: true }]
        )}

        {renderFormField("รวมเป็นเงิน", ["totalPrice"], <Input disabled />, [
          { required: true },
        ])}

        {error && (
          <Alert
            message="เกิดข้อผิดพลาด"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {renderFooterButtons()}
      </Form>
    </Modal>
  );
}
