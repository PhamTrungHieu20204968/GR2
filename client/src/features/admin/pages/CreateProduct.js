import React from "react";
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Card,
  Select,
  Spin,
  Result,
  message,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

import Sidebar from "../components/Sidebar";
import {
  useGetAllCategoriesQuery,
  useCreateProductMutation,
} from "app/api/productService";
const { Option } = Select;

function CreateProduct() {
  const [form] = Form.useForm();
  const categoryValue = Form.useWatch("category", form);
  const [create] = useCreateProductMutation();
  const { data, isError, isLoading } = useGetAllCategoriesQuery();

  if (isLoading) {
    <Spin />;
  }

  const onFinish = (values) => {
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
        accessToken: JSON.parse(localStorage.getItem("token")),
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
  const onFinishFailed = () => {
    message.error("Tạo thất bại!");
  };
  return (
    <div className='w-full h-screen overflow-y-auto overflow-x-hidden'>
      <Row gutter={16} className='pr-4'>
        <Col span={6}>
          <Sidebar SelectedKey='3' OpenKeys={["sub2"]}></Sidebar>
        </Col>
        <Col span={18}>
          {isError ? (
            <Result
              status='500'
              title='500'
              subTitle='Không thể kết nối đến Server.'
            />
          ) : (
            <div className='form w-full h-full flex flex-col mt-10'>
              <h1 className='w-[600px] max-w-2xl mx-auto text-3xl font-bold'>
                Thêm sản phẩm
              </h1>
              <Form
                form={form}
                size='middle'
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className='w-[600px] max-w-2xl mx-auto'
              >
                <Form.Item
                  name='name'
                  label='Tên sản phẩm'
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhâp số lượng sản phẩm!",
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
                  initialValue={[
                    {
                      description: "",
                      image: "",
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
                  initialValue={[
                    {
                      image: "",
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
                    Tạo
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default CreateProduct;
