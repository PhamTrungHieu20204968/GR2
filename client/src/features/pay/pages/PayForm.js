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
  Spin,
  Checkbox,
  Space,
} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Layout from 'components/Layout';
import {
  useGuestCreateOrderMutation,
  useUserCreateOrderMutation,
} from 'app/api/orderService';
import { deleteCart } from 'app/slices/cartSlice';
import { useGetUserQuery } from 'app/api/userService';
import Paypal from '../components/Paypal';
import { updateVoucher } from 'app/slices/voucherSlice';

function PayForm() {
  const [form] = Form.useForm();
  const cart = useSelector((state) => state.cart);
  const { accessToken, language } = useSelector((state) => state.auth);
  const [guestCreate] = useGuestCreateOrderMutation();
  const [userCreate] = useUserCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const voucher = useSelector((state) => state.voucher);
  const [order, setOrder] = useState();
  const [flag, setFlag] = useState(0);
  const payType = Form.useWatch('payType', form) || 1;
  const { data } = useGetUserQuery({
    accessToken,
  });
  const [totalCost, setTotalCost] = useState(
    Math.ceil(
      cart.reduce((total, item) => {
        return (
          total +
          parseInt(item.salePrice ? item.salePrice : item.price) *
            item.orderQuantity
        );
      }, 0)
    ) *
      ((100 - voucher) / 100)
  );

  if (!data) {
    return <Spin />;
  }
  const userCreateOrder = (values, status) => {
    userCreate({
      data: {
        ...values,
        type: values.payType,
        fullName: values.name,
        totalMoney: totalCost,
        status,
        cart,
        voucher,
        point: data.point + Math.floor(totalCost / 100000),
      },
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          if (language === 'vi') {
            message.error(res.data.error);
          } else message.error('失敗しました');
        } else {
          setCurrentStep(2);
          setOrder(cart);
          setFlag(0);
          dispatch(deleteCart());
          dispatch(updateVoucher(0));
          message.success(
            language === 'vi' ? 'Đặt hàng thành công!' : '注文に成功しました!'
          );
        }
      })
      .catch((err) => {
        message.error('失敗しました');
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
          if (language === 'vi') {
            message.error(res.data.error);
          } else message.error('失敗しました');
        } else {
          setCurrentStep(2);
          setOrder(cart);
          setFlag(0);
          dispatch(deleteCart());
          message.success(
            language === 'vi' ? 'Đặt hàng thành công!' : '注文に成功しました!'
          );
        }
      })
      .catch((err) => {
        message.error('失敗しました');
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
    if (value === 0) navigate('/cart');
    else if (value === 2) {
      message.info(
        language === 'vi'
          ? 'Bạn cần hoàn thành bước 2 trước'
          : 'ステップ2を完了する必要があります'
      );
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
        <div className="container mx-auto mt-8 overflow-hidden">
          <Row className="mb-8">
            <Col span={24}>
              <Steps
                current={currentStep}
                onChange={onChangeStep}
                className="w-full"
                items={[
                  {
                    title: language === 'vi' ? 'Xem giỏ hàng' : 'カートを見る',
                  },
                  {
                    title: language === 'vi' ? 'Thanh toán' : '支払い',
                  },
                  {
                    title: language === 'vi' ? 'Hoàn tất đặt hàng' : '完了',
                  },
                ]}
              />
            </Col>
          </Row>
          {currentStep === 2 ? (
            <Row gutter={16}>
              <Col span={14}>
                <div className="p-4">
                  <div className="text-3xl font-bold mb-4">
                    {language === 'vi'
                      ? 'Cảm ơn đã đặt hàng!'
                      : 'ありがとうございました！'}
                  </div>
                  <div className="">
                    {language === 'vi'
                      ? 'Chúng tôi sẽ liên hệ với bạn để xác nhận về đơn hàng.'
                      : 'こちらからすぐに連絡いたします。'}
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    className="mt-32"
                    onClick={() => navigate('/')}
                  >
                    {language === 'vi'
                      ? 'Quay về trang chủ'
                      : 'ホームページに戻る'}
                  </Button>
                </div>
              </Col>
              <Col span={8}>
                <div className="border-2 p-4 border-primary ">
                  <div className="text-xl mb-4 font-bold">
                    {language === 'vi' ? 'Đơn hàng của bạn' : 'お客様の注文'}
                  </div>
                  <div className="flex pb-2 border-b-2 justify-between text-base">
                    <div className="">
                      {language === 'vi' ? 'Sản phẩm' : '商品'}
                    </div>
                    <div className="">
                      {language === 'vi' ? 'Tổng cộng' : '合計'}
                    </div>
                  </div>
                  {order?.map((item) => (
                    <div key={item.id} className="flex mt-2 text-sm gap-4">
                      <div className="flex-1">
                        {item.name} <b>x {item.orderQuantity}</b>
                      </div>
                      <b>
                        {parseInt(
                          item?.salePrice ? item?.salePrice : item?.price
                        ).toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </b>
                    </div>
                  ))}
                  <div className="flex my-4 pt-2 border-t-2 justify-between text-sm">
                    <div className="">
                      {language === 'vi'
                        ? 'Phương thức thanh toán'
                        : '支払い方法'}
                    </div>
                    {payType === 1 && (
                      <b className="">
                        {language === 'vi'
                          ? 'Thanh toán toàn bộ đơn hàng'
                          : '全部支払う'}
                      </b>
                    )}
                    {payType === 2 && (
                      <b className="">
                        {language === 'vi'
                          ? 'Thanh toán 50% đơn hàng'
                          : '半分支払う'}
                      </b>
                    )}
                    {payType === 3 && (
                      <b className="">
                        {language === 'vi'
                          ? 'Thanh toán khi nhận hàng'
                          : '受けてから支払う'}
                      </b>
                    )}
                  </div>
                  <div className="flex mt-2 justify-between text-sm">
                    <div className="">
                      {language === 'vi' ? 'Ngày:' : '日時'}
                    </div>
                    <b className="">{getDate()}</b>
                  </div>
                  <div className="flex mt-2 justify-between text-base">
                    <div className="">
                      {language === 'vi' ? 'Tổng:' : '合計：'}
                    </div>
                    <b className="">
                      {totalCost.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
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
              layout="vertical"
              initialValues={{ ...data }}
            >
              <Row gutter={16}>
                <Col span={14}>
                  <div className="text-xl mb-4 font-bold">
                    {language === 'vi' ? 'Thông tin thanh toán' : '支払い情報'}
                  </div>
                  <Form.Item
                    name="name"
                    label={language === 'vi' ? 'Họ và tên' : '名前'}
                    rules={[
                      {
                        required: true,
                        message:
                          language === 'vi'
                            ? 'Vui lòng nhập họ và tên!'
                            : '名前を入力しなければならない',
                      },
                    ]}
                    validateTrigger="onBlur"
                  >
                    <Input
                      placeholder={language === 'vi' ? 'Họ và tên' : '名前'}
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={language === 'vi' ? 'Địa chỉ mail' : 'メール'}
                    rules={[
                      {
                        required: true,
                        message:
                          language === 'vi'
                            ? 'Vui lòng nhập địa chỉ mail!'
                            : 'メールを入力しなければならない',
                      },
                      {
                        type: 'email',
                        message:
                          language === 'vi'
                            ? 'Vui lòng đúng địa chỉ mail!'
                            : 'メールが正しくない',
                      },
                    ]}
                    validateTrigger="onBlur"
                  >
                    <Input placeholder="A@gmail.com" size="large" />
                  </Form.Item>

                  <Form.Item
                    name="telephone"
                    label={language === 'vi' ? 'Số điện thoại' : '電話番号'}
                    rules={[
                      {
                        required: true,
                        message:
                          language === 'vi'
                            ? 'Vui lòng nhập số điện thoại!'
                            : '電話番号を入力しなければならない',
                      },
                      {
                        len: 10,
                        whitespace: false,
                        message:
                          language === 'vi'
                            ? 'Vui lòng nhập đủ số điện thoại!'
                            : '数字が足りない',
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message:
                          language === 'vi'
                            ? 'Vui lòng nhập đúng số điện thoại!'
                            : '数字だけ入力してください',
                      },
                    ]}
                    validateTrigger="onBlur"
                  >
                    <Input
                      placeholder={
                        language === 'vi' ? 'Số điện thoại' : '電話番号'
                      }
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="city"
                    label={language === 'vi' ? 'Thành phố' : '町'}
                    rules={[
                      {
                        required: true,
                        message:
                          language === 'vi'
                            ? '"Vui lòng chọn thành phố!"'
                            : '町を選ばなければならない',
                      },
                    ]}
                    initialValue={'Tp.Hà Nội'}
                  >
                    <Select
                      size="large"
                      showSearch
                      options={[
                        { value: 'An Giang', label: 'An Giang' },
                        {
                          value: 'Bà Rịa - Vũng Tàu',
                          label: 'Bà Rịa - Vũng Tàu',
                        },
                        { value: 'Bắc Giang', label: 'Bắc Giang' },
                        { value: 'Bắc Kạn', label: 'Bắc Kạn' },
                        { value: 'Bạc Liêu', label: 'Bạc Liêu' },
                        { value: 'Bắc Ninh', label: 'Bắc Ninh' },
                        { value: 'Bến Tre', label: 'Bến Tre' },
                        { value: 'Bình Định', label: 'Bình Định' },
                        { value: 'Bình Dương', label: 'Bình Dương' },
                        { value: 'Bình Phước', label: 'Bình Phước' },
                        { value: 'Bình Thuận', label: 'Bình Thuận' },
                        { value: 'Cà Mau', label: 'Cà Mau' },
                        { value: 'Cao Bằng', label: 'Cao Bằng' },
                        { value: 'Đắk Lắk', label: 'Đắk Lắk' },
                        { value: 'Đắk Nông', label: 'Đắk Nông' },
                        { value: 'Điện Biên', label: 'Điện Biên' },
                        { value: 'Đồng Nai', label: 'Đồng Nai' },
                        { value: 'Đồng Tháp', label: 'Đồng Tháp' },
                        { value: 'Gia Lai', label: 'Gia Lai' },
                        { value: 'Hà Giang', label: 'Hà Giang' },
                        { value: 'Hà Nam', label: 'Hà Nam' },
                        { value: 'Hà Tĩnh', label: 'Hà Tĩnh' },
                        { value: 'Hải Dương', label: 'Hải Dương' },
                        { value: 'Hậu Giang', label: 'Hậu Giang' },
                        { value: 'Hòa Bình', label: 'Hòa Bình' },
                        { value: 'Hưng Yên', label: 'Hưng Yên' },
                        { value: 'Khánh Hòa', label: 'Khánh Hòa' },
                        { value: 'Kiên Giang', label: 'Kiên Giang' },
                        { value: 'Kon Tum', label: 'Kon Tum' },
                        { value: 'Lai Châu', label: 'Lai Châu' },
                        { value: 'Lâm Đồng', label: 'Lâm Đồng' },
                        { value: 'Lạng Sơn', label: 'Lạng Sơn' },
                        { value: 'Lào Cai', label: 'Lào Cai' },
                        { value: 'Long An', label: 'Long An' },
                        { value: 'Nam Định', label: 'Nam Định' },
                        { value: 'Nghệ An', label: 'Nghệ An' },
                        { value: 'Ninh Bình', label: 'Ninh Bình' },
                        { value: 'Ninh Thuận', label: 'Ninh Thuận' },
                        { value: 'Phú Thọ', label: 'Phú Thọ' },
                        { value: 'Quảng Bình', label: 'Quảng Bình' },
                        { value: 'Quảng Ngãi', label: 'Quảng Ngãi' },
                        { value: 'Quảng Ninh', label: 'Quảng Ninh' },
                        { value: 'Quảng Trị', label: 'Quảng Trị' },
                        { value: 'Sóc Trăng', label: 'Sóc Trăng' },
                        { value: 'Sơn La', label: 'Sơn La' },
                        { value: 'Tây Ninh', label: 'Tây Ninh' },
                        { value: 'Thái Bình', label: 'Thái Bình' },
                        { value: 'Thái Nguyên', label: 'Thái Nguyên' },
                        { value: 'Thanh Hóa', label: 'Thanh Hóa' },
                        { value: 'Thừa Thiên Huế', label: 'Thừa Thiên Huế' },
                        { value: 'Tiền Giang', label: 'Tiền Giang' },
                        { value: 'Trà Vinh', label: 'Trà Vinh' },
                        { value: 'Tuyên Quang', label: 'Tuyên Quang' },
                        { value: 'Vĩnh Phúc', label: 'Vĩnh Phúc' },
                        { value: 'Yên Bái', label: 'Yên Bái' },
                        { value: 'Phú Yên', label: 'Phú Yên' },
                        { value: "Tp.Cần Thơ'", label: "Tp.Cần Thơ'" },
                        { value: 'Tp.Đà Nẵng', label: 'Tp.Đà Nẵng' },
                        { value: 'Tp.Hải Phòng', label: 'Tp.Hải Phòng' },
                        { value: 'Tp.Hà Nội', label: 'Tp.Hà Nội' },
                        { value: 'TP  HCM', label: 'TP  HCM' },
                      ]}
                    ></Select>
                  </Form.Item>

                  <Form.Item
                    name="address"
                    label={language === 'vi' ? 'Địa chỉ' : 'アドレス'}
                    rules={[
                      {
                        required: true,
                        message:
                          language === 'vi'
                            ? 'Vui lòng nhập địa chỉ!'
                            : 'アドレスを入力しなければならない',
                      },
                    ]}
                    validateTrigger="onBlur"
                  >
                    <Input
                      placeholder={language === 'vi' ? 'Địa chỉ' : 'アドレス'}
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    label={language === 'vi' ? 'Ghi chú đơn hàng' : 'メモ'}
                    name="note"
                  >
                    <Input.TextArea
                      allowClear
                      rows={4}
                      size="large"
                      placeholder={
                        language === 'vi'
                          ? 'Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn.'
                          : '注文に関するメモ、例えば: 配送時間や詳細な配送場所の指示など。'
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <div className="border-2 p-4 border-primary ">
                    <div className="text-xl mb-4 font-bold">
                      {language === 'vi' ? 'Đơn hàng của bạn' : 'お客様の注文'}
                    </div>
                    <div className="flex pb-2 border-b-2 justify-between text-base">
                      <div className="">
                        {language === 'vi' ? 'Sản phẩm' : '商品'}
                      </div>
                      <div className="">
                        {language === 'vi' ? 'Tạm tính' : '合計：'}
                      </div>
                    </div>
                    {cart?.map((item) => (
                      <div key={item.id} className="flex mt-2 gap-4 text-sm">
                        <div className="flex-1">
                          {item.name} <b>x {item.orderQuantity}</b>
                        </div>
                        <b className="">
                          {parseInt(
                            item?.salePrice ? item?.salePrice : item?.price
                          ).toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </b>
                      </div>
                    ))}
                    <div className="flex mt-4 justify-between text-base">
                      <div className="font-bold">
                        {language === 'vi' ? 'Mã ưu đãi' : 'クーポン券'}
                      </div>
                      {voucher === 0 ? (
                        <span>{language === 'vi' ? 'Không' : 'ない'}</span>
                      ) : (
                        <span>
                          {language === 'vi' ? 'Mã giảm giá' : 'クーポン券'}{' '}
                          {voucher}%
                        </span>
                      )}
                    </div>
                    <div className="flex my-4 pt-2 border-t-2 justify-between text-base">
                      <div className="">
                        {language === 'vi' ? 'Tổng:' : '合計：'}
                      </div>
                      <b className="">
                        {Math.ceil(
                          cart.reduce((total, item) => {
                            return (
                              total +
                              parseInt(
                                item?.salePrice ? item?.salePrice : item?.price
                              ) *
                                item.orderQuantity
                            );
                          }, 0) *
                            ((100 - voucher) / 100)
                        ).toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </b>
                    </div>

                    <Form.Item name="payType" initialValue={1}>
                      <Radio.Group>
                        <Space direction="vertical">
                          <Radio value={1} className="mb-2">
                            {language === 'vi'
                              ? 'Thanh toán toàn bộ đơn hàng'
                              : '全部支払う'}
                          </Radio>
                          <Radio value={2} className="mb-2">
                            {language === 'vi'
                              ? 'Thanh toán 50% đơn hàng'
                              : '半分支払う'}
                          </Radio>
                          <Radio value={3}>
                            {' '}
                            {language === 'vi'
                              ? 'Thanh toán khi nhận hàng'
                              : '受けてから支払う'}
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      name="policy"
                      rules={[
                        {
                          required: true,
                          message:
                            language === 'vi'
                              ? 'Vui lòng đồng ý với chính sách của cửa hàng!'
                              : '店舗の方針に同意してください',
                        },
                      ]}
                      valuePropName="checked"
                    >
                      <Checkbox>
                        {language === 'vi' ? 'Tôi đồng ý với' : 'この'}
                        <a
                          href="/policy"
                          target="_blank"
                          className="underline text-blue-400 hover:text-blue-500 hover:underline"
                        >
                          {language === 'vi' ? 'chính sách' : '方針'}
                        </a>
                        {language === 'vi' ? 'của cửa hàng' : 'に同意します。'}
                      </Checkbox>
                    </Form.Item>

                    <div
                      className={
                        payType < 3 && flag === 1 ? 'w-full' : 'w-full hidden'
                      }
                    >
                      <Paypal
                        payload={{
                          form,
                          totalMoney: totalCost,
                          accessToken,
                          payType,
                        }}
                        amount={totalCost}
                        accessToken={accessToken}
                        guestCreateOrder={guestCreateOrder}
                        userCreateOrder={userCreateOrder}
                      ></Paypal>
                    </div>

                    {(flag === 0 || payType === 3) && (
                      <div>
                        <button
                          type="submit"
                          className="text-white bg-pink-500 w-full h-10 mb-4 text-lg font-semibold hover:text-white hover:bg-pink-600"
                        >
                          {language === 'vi' ? 'ĐẶT HÀNG' : '注文'}
                        </button>
                        <button
                          type="button"
                          className="text-black bg-gray-100 w-full h-10 text-base hover:text-black hover:bg-gray-300"
                          onClick={() => navigate('/cart')}
                        >
                          {language === 'vi'
                            ? 'Quay lại giỏ hàng'
                            : 'カートに戻る'}
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
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="w-fit">
            {language === 'vi'
              ? 'Chưa có sản phẩm nào trong giỏ hàng.'
              : '何もない'}
          </div>
          <Button
            type="primary"
            size="large"
            className="rounded-none w-fit mt-4 font-bold"
            onClick={() => navigate('/')}
          >
            {language === 'vi' ? 'QUAY TRỞ LẠI CỬA HÀNG' : 'ホームページに戻る'}
          </Button>
        </div>
      )}
    </Layout>
  );
}

export default PayForm;
