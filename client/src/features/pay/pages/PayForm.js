import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Steps,
  message,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "components/Layout";
import {
  useGuestCreateOrderMutation,
  useUserCreateOrderMutation,
} from "app/api/orderService";
import { deleteCart } from "app/slices/cartSlice";
import Paypal from "../components/Paypal";

function PayForm() {
  const [form] = Form.useForm();
  const cart = useSelector((state) => state.cart);
  const { accessToken } = useSelector((state) => state.auth);
  const [guestCreate] = useGuestCreateOrderMutation();
  const [userCreate] = useUserCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [order, setOrder] = useState();
  const [flag, setFlag] = useState(0);
  const payType = Form.useWatch("payType", form);

  const [totalCost, setTotalCost] = useState(
    cart.reduce((total, item) => {
      return total + parseInt(item.price) * item.orderQuantity;
    }, 0)
  );

  const userCreateOrder = (values, status) => {
    userCreate({
      data: {
        ...values,
        type: values.payType,
        fullName: values.name,
        totalMoney: totalCost,
        status,
      },
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data.error);
        } else {
          setCurrentStep(2);
          setOrder(cart);
          setFlag(0);
          dispatch(deleteCart());
          message.success("Đặt hàng thành công!");
        }
      })
      .catch((err) => {
        message.error("Đặt hàng thất bại!");
        console.log(err);
      });
  };

  const guestCreateOrder = (values, status) => {
    guestCreate({
      data: {
        ...values,
        type: values.payType,
        fullName: values.name,
        totalMoney: totalCost,
        status,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data.error);
        } else {
          setCurrentStep(2);
          setOrder(cart);
          setFlag(0);
          dispatch(deleteCart());
          message.success("Đặt hàng thành công!");
        }
      })
      .catch((err) => {
        message.error("Đặt hàng thất bại!");
        console.log(err);
      });
  };

  const onFinish = (values, status = 0) => {
    if (payType < 3) {
      setFlag(1);
      return;
    }

    if (accessToken) {
      userCreateOrder(values, status);
    } else {
      guestCreateOrder(values, status);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setFlag(0);
  };

  const onChangeStep = (value) => {
    if (value === 0) navigate("/cart");
    else if (value === 2) {
      message.info("Bạn cần hoàn thành bước 2 trước");
      return;
    }
    setCurrentStep(value);
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  return (
    <Layout>
      {cart.length > 0 || currentStep === 2 ? (
        <div className='container mx-auto mt-8 overflow-hidden'>
          <Row className='mb-8'>
            <Col span={24}>
              <Steps
                current={currentStep}
                onChange={onChangeStep}
                className='w-full'
                items={[
                  {
                    title: "Xem giỏ hàng",
                  },
                  {
                    title: "Thanh toán",
                  },
                  {
                    title: "Hoàn tất đặt hàng",
                  },
                ]}
              />
            </Col>
          </Row>
          {currentStep === 2 ? (
            <Row gutter={16}>
              <Col span={14}>
                <div className='p-4'>
                  <div className='text-3xl font-bold mb-4'>
                    Cảm ơn đã đặt hàng!
                  </div>
                  <div className=''>
                    Chúng tôi sẽ liên hệ với bạn để xác nhận về đơn hàng.
                  </div>

                  <Button
                    type='primary'
                    size='large'
                    className='mt-32'
                    onClick={() => navigate("/")}
                  >
                    Quay về trang chủ
                  </Button>
                </div>
              </Col>
              <Col span={8}>
                <div className='border-2 p-4 border-primary '>
                  <div className='text-xl mb-4 font-bold'>Đơn hàng của bạn</div>
                  <div className='flex pb-2 border-b-2 justify-between text-base'>
                    <div className=''>Sản phẩm</div>
                    <div className=''>Tổng cộng</div>
                  </div>
                  {order?.map((item) => (
                    <div
                      key={item.id}
                      className='flex mt-2 justify-between text-sm'
                    >
                      <div className=''>
                        {item.name} <b>x {item.orderQuantity}</b>
                      </div>
                      <b className=''>
                        {parseInt(item?.price).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </b>
                    </div>
                  ))}
                  <div className='flex my-4 pt-2 border-t-2 justify-between text-sm'>
                    <div className=''>Phương thức thanh toán</div>
                    <b className=''>
                      {payType === 1 && "Thanh toán toàn bộ đơn hàng"}
                      {payType === 2 && "Thanh toán 50% đơn hàng"}
                      {payType === 3 && "Thanh toán khi nhận hàng"}
                    </b>
                  </div>
                  <div className='flex mt-2 justify-between text-sm'>
                    <div className=''>Ngày:</div>
                    <b className=''>{getDate()}</b>
                  </div>
                  <div className='flex mt-2 justify-between text-base'>
                    <div className=''>Tổng:</div>
                    <b className=''>
                      {totalCost.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </b>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Form
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              onChange={onFinishFailed}
              layout='vertical'
            >
              <Row gutter={16}>
                <Col span={14}>
                  <div className='text-xl mb-4 font-bold'>
                    Thông tin thanh toán
                  </div>
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
                    <div className='text-xl mb-4 font-bold'>
                      Đơn hàng của bạn
                    </div>
                    <div className='flex pb-2 border-b-2 justify-between text-base'>
                      <div className=''>Sản phẩm</div>
                      <div className=''>Tạm tính</div>
                    </div>
                    {cart?.map((item) => (
                      <div
                        key={item.id}
                        className='flex mt-2 justify-between text-sm'
                      >
                        <div className=''>
                          {item.name} <b>x {item.orderQuantity}</b>
                        </div>
                        <b className=''>
                          {parseInt(item?.price).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </b>
                      </div>
                    ))}
                    <div className='flex my-4 pt-2 border-t-2 justify-between text-base'>
                      <div className=''>Tổng:</div>
                      <b className=''>
                        {cart
                          .reduce((total, item) => {
                            return (
                              total + parseInt(item.price) * item.orderQuantity
                            );
                          }, 0)
                          .toLocaleString("vi", {
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
                        payload={{ form, totalMoney: totalCost, accessToken }}
                        amount={payType === 1 ? totalCost : totalCost / 2}
                        accessToken={accessToken}
                        guestCreateOrder={guestCreateOrder}
                        userCreateOrder={userCreateOrder}
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
                        <button
                          type='button'
                          className='text-black bg-gray-100 w-full h-10 text-base hover:text-black hover:bg-gray-300'
                        >
                          Quay lại giỏ hàng
                        </button>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <div className='w-fit'>Chưa có sản phẩm nào trong giỏ hàng.</div>
          <Button
            type='primary'
            size='large'
            className='rounded-none w-fit mt-4 font-bold'
            onClick={() => navigate("/")}
          >
            QUAY TRỞ LẠI CỬA HÀNG
          </Button>
        </div>
      )}
    </Layout>
  );
}

export default PayForm;
