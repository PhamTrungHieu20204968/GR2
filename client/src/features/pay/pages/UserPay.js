import { Col, Form, Input, Radio, Row, Select, Spin, message } from "antd";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetOneOrderQuery,
  useUpdateOrderMutation,
} from "app/api/orderService";
import Paypal from "../components/Paypal";
import Layout from "components/Layout";
import { socketContext } from "components/SocketProvider";

function UserPay() {
  const params = useParams();
  const [form] = Form.useForm();
  const [update] = useUpdateOrderMutation();
  const { accessToken, userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const voucher = useSelector((state) => state.voucher);
  const socket = useContext(socketContext);
  const payType = Form.useWatch("payType", form) || 1;
  const [flag, setFlag] = useState(0);
  const { data } = useGetOneOrderQuery({
    id: params.id,
    headers: {
      accessToken,
    },
  });
  if (!data) {
    return <Spin />;
  }
  const onFinish = (values, status = 0) => {
    if (payType < 3) {
      setFlag(1);
      return;
    } else if (accessToken) {
      update({
        id: params.id,
        headers: {
          accessToken,
        },
        data: {
          ...values,
          fullName: values.name,
          totalMoney: data?.totalMoney,
          userId: data?.userId,
          cart: data?.orderItems,
          status: 0,
        },
      })
        .then((res) => {
          if (res.data?.error) {
            message.error(res.data?.error);
          } else {
            message.success("Thành công!");
            socket?.emit("delete-notification", {
              id: data?.notifications[0]?.id,
              receiverId: userId,
            });
            navigate("/");
          }
        })
        .catch((err) => {
          message.error("Sửa thất bại!");
          console.log(err);
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    setFlag(0);
  };
  const handleUpdateOrder = (values, status) => {
    update({
      id: params.id,
      headers: {
        accessToken,
      },
      data: {
        address: values.address,
        fullName: values.name,
        city: values.city,
        telephone: values.telephone,
        email: values.email,
        totalMoney: values.totalMoney,
        type: payType,
        status,
        userId: values.userId,
        cart: values.orderItems,
        point: data?.user.point + Math.floor(values.totalMoney / 100000),
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data?.error);
        } else {
          message.success("Thành công!");
          socket?.emit("delete-notification", {
            id: data?.notifications[0]?.id,
            receiverId: userId,
          });
          navigate("/");
        }
      })
      .catch((err) => {
        message.error("Sửa thất bại!");
        console.log(err);
      });
  };
  return (
    <Layout>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onChange={onFinishFailed}
          layout='vertical'
          initialValues={{ ...data, name: data?.user.name }}
        >
          <Row gutter={16}>
            <Col span={14}>
              <div className='text-xl mb-4 font-bold'>Thông tin thanh toán</div>
              <Form.Item
                name='name'
                label='Họ và tên'
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên!",
                  },
                ]}
                validateTrigger='onBlur'
              >
                <Input placeholder='Họ và tên' size='large' />
              </Form.Item>

              <Form.Item
                name='email'
                label='Địa chỉ mail'
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ mail!",
                  },
                  {
                    type: "email",
                    message: "Vui lòng đúng địa chỉ mail!",
                  },
                ]}
                validateTrigger='onBlur'
              >
                <Input placeholder='A@gmail.com' size='large' />
              </Form.Item>

              <Form.Item
                name='telephone'
                label='Số điện thoại'
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                  {
                    len: 10,
                    whitespace: false,
                    message: "Vui lòng nhập đủ số điện thoại!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Vui lòng nhập đúng số điện thoại!",
                  },
                ]}
                validateTrigger='onBlur'
              >
                <Input placeholder='Số điện thoại' size='large' />
              </Form.Item>
              <Form.Item
                name='city'
                label='Thành phố'
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thành phố!",
                  },
                ]}
                initialValue={"Tp.Hà Nội"}
              >
                <Select
                  size='large'
                  showSearch
                  options={[
                    { value: "An Giang", label: "An Giang" },
                    {
                      value: "Bà Rịa - Vũng Tàu",
                      label: "Bà Rịa - Vũng Tàu",
                    },
                    { value: "Bắc Giang", label: "Bắc Giang" },
                    { value: "Bắc Kạn", label: "Bắc Kạn" },
                    { value: "Bạc Liêu", label: "Bạc Liêu" },
                    { value: "Bắc Ninh", label: "Bắc Ninh" },
                    { value: "Bến Tre", label: "Bến Tre" },
                    { value: "Bình Định", label: "Bình Định" },
                    { value: "Bình Dương", label: "Bình Dương" },
                    { value: "Bình Phước", label: "Bình Phước" },
                    { value: "Bình Thuận", label: "Bình Thuận" },
                    { value: "Cà Mau", label: "Cà Mau" },
                    { value: "Cao Bằng", label: "Cao Bằng" },
                    { value: "Đắk Lắk", label: "Đắk Lắk" },
                    { value: "Đắk Nông", label: "Đắk Nông" },
                    { value: "Điện Biên", label: "Điện Biên" },
                    { value: "Đồng Nai", label: "Đồng Nai" },
                    { value: "Đồng Tháp", label: "Đồng Tháp" },
                    { value: "Gia Lai", label: "Gia Lai" },
                    { value: "Hà Giang", label: "Hà Giang" },
                    { value: "Hà Nam", label: "Hà Nam" },
                    { value: "Hà Tĩnh", label: "Hà Tĩnh" },
                    { value: "Hải Dương", label: "Hải Dương" },
                    { value: "Hậu Giang", label: "Hậu Giang" },
                    { value: "Hòa Bình", label: "Hòa Bình" },
                    { value: "Hưng Yên", label: "Hưng Yên" },
                    { value: "Khánh Hòa", label: "Khánh Hòa" },
                    { value: "Kiên Giang", label: "Kiên Giang" },
                    { value: "Kon Tum", label: "Kon Tum" },
                    { value: "Lai Châu", label: "Lai Châu" },
                    { value: "Lâm Đồng", label: "Lâm Đồng" },
                    { value: "Lạng Sơn", label: "Lạng Sơn" },
                    { value: "Lào Cai", label: "Lào Cai" },
                    { value: "Long An", label: "Long An" },
                    { value: "Nam Định", label: "Nam Định" },
                    { value: "Nghệ An", label: "Nghệ An" },
                    { value: "Ninh Bình", label: "Ninh Bình" },
                    { value: "Ninh Thuận", label: "Ninh Thuận" },
                    { value: "Phú Thọ", label: "Phú Thọ" },
                    { value: "Quảng Bình", label: "Quảng Bình" },
                    { value: "Quảng Ngãi", label: "Quảng Ngãi" },
                    { value: "Quảng Ninh", label: "Quảng Ninh" },
                    { value: "Quảng Trị", label: "Quảng Trị" },
                    { value: "Sóc Trăng", label: "Sóc Trăng" },
                    { value: "Sơn La", label: "Sơn La" },
                    { value: "Tây Ninh", label: "Tây Ninh" },
                    { value: "Thái Bình", label: "Thái Bình" },
                    { value: "Thái Nguyên", label: "Thái Nguyên" },
                    { value: "Thanh Hóa", label: "Thanh Hóa" },
                    { value: "Thừa Thiên Huế", label: "Thừa Thiên Huế" },
                    { value: "Tiền Giang", label: "Tiền Giang" },
                    { value: "Trà Vinh", label: "Trà Vinh" },
                    { value: "Tuyên Quang", label: "Tuyên Quang" },
                    { value: "Vĩnh Phúc", label: "Vĩnh Phúc" },
                    { value: "Yên Bái", label: "Yên Bái" },
                    { value: "Phú Yên", label: "Phú Yên" },
                    { value: "Tp.Cần Thơ'", label: "Tp.Cần Thơ'" },
                    { value: "Tp.Đà Nẵng", label: "Tp.Đà Nẵng" },
                    { value: "Tp.Hải Phòng", label: "Tp.Hải Phòng" },
                    { value: "Tp.Hà Nội", label: "Tp.Hà Nội" },
                    { value: "TP  HCM", label: "TP  HCM" },
                  ]}
                ></Select>
              </Form.Item>

              <Form.Item
                name='address'
                label='Địa chỉ'
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ!",
                  },
                ]}
                validateTrigger='onBlur'
              >
                <Input placeholder='Địa chỉ' size='large' />
              </Form.Item>

              <Form.Item label='Ghi chú đơn hàng' name='note'>
                <Input.TextArea
                  allowClear
                  rows={4}
                  size='large'
                  placeholder='Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn.'
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <div className='border-2 p-4 border-primary '>
                <div className='text-xl mb-4 font-bold'>Đơn hàng của bạn</div>
                <div className='flex pb-2 border-b-2 justify-between text-base'>
                  <div className=''>Sản phẩm</div>
                  <div className=''>Tạm tính</div>
                </div>
                {data?.orderItems.map((item) => (
                  <div key={item.id} className='flex mt-2 gap-4 text-sm'>
                    <div className='flex-1'>
                      {item.product.name} <b>x {item.quantity}</b>
                    </div>
                    <b className=''>
                      {parseInt(
                        item?.product.salePrice
                          ? item?.product.salePrice
                          : item?.product.price
                      ).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </b>
                  </div>
                ))}
                <div className='flex mt-4 justify-between text-base'>
                  <div className='font-bold'>Mã ưu đãi</div>
                  {voucher === 0 ? (
                    <span>Không</span>
                  ) : (
                    <span>Mã giảm giá {voucher}%</span>
                  )}
                </div>
                <div className='flex my-4 pt-2 border-t-2 justify-between text-base'>
                  <div className=''>Tổng:</div>
                  <b className=''>
                    {Math.ceil(
                      data?.orderItems.reduce((total, item) => {
                        return (
                          total +
                          parseInt(
                            item?.product.salePrice
                              ? item?.product.salePrice
                              : item?.product.price
                          ) *
                            item.quantity
                        );
                      }, 0) *
                        ((100 - voucher) / 100)
                    ).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </b>
                </div>

                <Form.Item name='payType' initialValue={1}>
                  <Radio.Group>
                    <Radio value={1} className='mb-2'>
                      Thanh toán toàn bộ đơn hàng
                    </Radio>
                    <Radio value={2} className='mb-2'>
                      Thanh toán 50% đơn hàng
                    </Radio>
                    <Radio value={3}>Thanh toán khi nhận hàng</Radio>
                  </Radio.Group>
                </Form.Item>

                <div
                  className={
                    payType < 3 && flag === 1 ? "w-full" : "w-full hidden"
                  }
                >
                  <Paypal
                    payload={{
                      form,
                      totalMoney: data?.totalMoney,
                      accessToken,
                      payType,
                    }}
                    amount={data?.totalMoney}
                    accessToken={accessToken}
                    updateOrder={handleUpdateOrder}
                  ></Paypal>
                </div>

                {(flag === 0 || payType === 3) && (
                  <div>
                    <button
                      type='submit'
                      className='text-white bg-pink-500 w-full h-10 mb-4 text-lg font-semibold hover:text-white hover:bg-pink-600'
                    >
                      ĐẶT HÀNG
                    </button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
}

export default UserPay;
