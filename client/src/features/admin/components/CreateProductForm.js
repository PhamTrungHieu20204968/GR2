import React from "react";
import { Form, Input, Button, Card, Select, Spin, Result, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useGetAllCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} from "app/api/productService";

const { Option } = Select;

function CreateProductForm({ product }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);
  const categoryValue = Form.useWatch("category", form);
  const [create] = useCreateProductMutation();
  const [update] = useUpdateProductMutation();
  const { data, isError, isLoading } = useGetAllCategoriesQuery();
  if (isLoading) {
    <Spin />;
  }
  const onCreateFinish = (values) => {
    create({
      data: {
        name: values.name,
        category:
          values.category === "Khác" ? values.newCategory : values.category,
        price: values.price,
        quantity: values.quantity,
        descriptions: values.descriptions,
        images: values.images,
      },
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data.error) {
          message.error(res.data.error);
        } else {
          form.resetFields();
          message.success("Tạo thành công!");
        }
      })
      .catch((err) => {
        message.error("Tạo thất bại!");
        console.log(err);
      });
  };

  const onUpdateFinish = (values) => {
    update({
      id: product.id,
      headers: {
        accessToken,
      },
      data: {
        name: values.name,
        category:
          values.category === "Khác" ? values.newCategory : values.category,
        price: values.price,
        quantity: values.quantity,
        descriptions: values.descriptions,
        images: values.images,
      },
    })
      .then((res) => {
        if (res.data.error) {
          message.error(res.data.error);
        } else {
          message.success("Sửa thành công!");
          navigate("/admin/list-products");
        }
      })
      .catch((err) => {
        message.error("Sửa thất bại!");
        console.log(err);
      });
  };

  const onFinishFailed = (e) => {
    console.log(e);
    message.error(e.errorFields[0].errors[0]);
  };

  return (
    <div className=''>
      {isError ? (
        <Result
          status='500'
          title='500'
          subTitle='Không thể kết nối đến Server.'
        />
      ) : (
        <div className='form w-full h-full flex flex-col mt-10'>
          <h1 className='w-[600px] max-w-2xl mx-auto text-3xl font-bold'>
            {!product ? "Thêm sản phẩm" : "Sửa sản phẩm"}
          </h1>
          <Form
            form={form}
            size='middle'
            layout='vertical'
            onFinish={product ? onUpdateFinish : onCreateFinish}
            onFinishFailed={onFinishFailed}
            className='w-[600px] max-w-2xl mx-auto'
          >
            <Form.Item
              name='name'
              label='Tên sản phẩm'
              initialValue={product?.name}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhâp tên sản phẩm!",
                },
              ]}
            >
              <Input placeholder='Tên sản phẩm' />
            </Form.Item>

            <Form.Item
              label='Loại sản phẩm'
              name='category'
              initialValue={product?.category.name}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhâp loại sản phẩm!",
                },
              ]}
            >
              <Select placeholder='Loại sản phẩm' allowClear>
                {data?.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
                <Option value='Khác'>Khác</Option>
              </Select>
            </Form.Item>

            {categoryValue === "Khác" && (
              <Form.Item
                name='newCategory'
                label='Loại sản phẩm khác'
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhâp loại sản phẩm!",
                  },
                ]}
              >
                <Input placeholder='Loại sản phẩm' />
              </Form.Item>
            )}

            <Form.Item
              name='price'
              label='Giá sản phẩm'
              initialValue={product?.price}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhâp giá sản phẩm!",
                },
                {
                  pattern: /^[0-9.]+$/,
                  message: "Vui lòng nhập lại giá sản phẩm!",
                },
              ]}
            >
              <Input placeholder='Giá sản phẩm' />
            </Form.Item>

            <Form.Item
              name='quantity'
              label='Số lượng sản phẩm'
              initialValue={product?.quantity}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng sản phẩm!",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Vui lòng nhập lại số lượng sản phẩm!",
                },
              ]}
            >
              <Input placeholder='Số lượng sản phẩm' />
            </Form.Item>

            <Form.List
              name='descriptions'
              initialValue={
                product
                  ? product?.descriptions.map((item) => ({
                      description: item.description,
                      image: item.images[0]?.url,
                    }))
                  : [
                      {
                        description: "",
                        image: "",
                      },
                    ]
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả sản phẩm!",
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                  }}
                >
                  {fields.map((field) => (
                    <Card
                      size='small'
                      title={`Mô tả ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        label={`Mô tả`}
                        name={[field.name, "description"]}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mô tả",
                          },
                        ]}
                      >
                        <Input.TextArea allowClear />
                      </Form.Item>

                      <Form.Item
                        label='Hình ảnh'
                        name={[field.name, "image"]}
                        rules={[
                          {
                            type: "url",
                            message: "Đường dẫn không hợp lệ",
                            warningOnly: true,
                          },
                          {
                            type: "string",
                            message: "Đường dẫn phải lớn hơn 6 ký tự",
                            min: 6,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Card>
                  ))}

                  <Button type='dashed' onClick={() => add()} block>
                    + Thêm mô tả
                  </Button>
                </div>
              )}
            </Form.List>

            <Form.List
              name='images'
              initialValue={
                product
                  ? product?.images.map((item) => ({ image: item.url }))
                  : [
                      {
                        image: "",
                      },
                    ]
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhâp hình ảnh sản phẩm!",
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                  }}
                  className='mt-5'
                >
                  {fields.map((field) => (
                    <Card
                      size='small'
                      title={`Hình ảnh ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        label='Đường dẫn'
                        name={[field.name, "image"]}
                        rules={[
                          {
                            type: "url",
                            message: "Đường dẫn không hợp lệ",
                            warningOnly: true,
                          },
                          {
                            type: "string",
                            message: "Đường dẫn phải lớn hơn 6 ký tự",
                            min: 6,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Card>
                  ))}

                  <Button type='dashed' onClick={() => add()} block>
                    + Thêm hình ảnh
                  </Button>
                </div>
              )}
            </Form.List>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='mt-4'>
                {product ? "Sửa" : "Tạo"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}

export default CreateProductForm;
