import { Button, InputNumber, message, Modal, Form, Input, Select } from "antd";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useUserCreateOrderMutation } from "app/api/orderService";
import { useCreateSaleMutation } from "app/api/saleService";

function ExchangeItem({ item, ExchangeItem, user }) {
  const [form] = Form.useForm();
  const [userCreateOrder] = useUserCreateOrderMutation();
  const [userCreateSale] = useCreateSaleMutation();
  const { accessToken, language } = useSelector((state) => state.auth);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const voucherQuantity = useRef();
  const showModal = () => {
    if (item.type === 1) {
      setIsItemModalOpen(true);
    } else if (item.type === 2) setIsVoucherModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    if (item.type === 1) {
      setIsItemModalOpen(false);
    } else if (item.type === 2) setIsVoucherModalOpen(false);
  };

  const onFinish = (values, status = 1) => {
    userCreateOrder({
      data: {
        ...values,
        type: 3,
        fullName: values.name,
        totalMoney: 0,
        status,
        point: user.point - item.price * values.quantity,
        cart: [
          {
            id: item.id,
            orderQuantity: values.quantity,
          },
        ],
      },
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data.error);
        } else {
          message.success("Đặt hàng thành công!");
          form.resetFields();
          setIsItemModalOpen(false);
        }
      })
      .catch((err) => {
        message.error("Đặt hàng thất bại!");
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {};
  const handleExchangeItem = () => {
    if (user.point < item.price) {
      message.error("Bạn không đủ điểm");
      return;
    }
    switch (item.type) {
      case 0:
        ExchangeItem(item.price, { title: item.name });
        break;
      case 1:
        showModal();
        break;
      case 2:
        showModal();
        break;
      default:
        message.error("Sản phẩm không thể quy đổi!");
        break;
    }
  };

  const handleChangeVoucher = () => {
    userCreateSale({
      data: {
        percent: item.percent,
        quantity: voucherQuantity.current.value,
        point: user.point - item.price * voucherQuantity.current.value,
      },
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data.error);
        } else {
          message.success("Đổi thành công!");
          setIsVoucherModalOpen(false);
        }
      })
      .catch((err) => {
        message.error("Đổi thất bại!");
        console.log(err);
      });
  };
  return (
    <div className='flex-1'>
      <div className='font-bold'>{item.name}</div>
      <div className='mb-2 mt-4 text-[#D8780A]'>
        {item.price === 0 ? "Miễn phí" : `${item.price} điểm`}
      </div>
      {item.type === 0 && user.title === item.name ? (
        <div className='text-pink-500'>
          {language === "vi" ? "Đang sử dụng" : "使用中"}
        </div>
      ) : (
        <Button type='primary' onClick={handleExchangeItem}>
          {language === "vi" ? "Đổi" : "交換"}
        </Button>
      )}
      <Modal
        title={
          language === "vi"
            ? `Đổi vật phẩm - ${item.name}`
            : `アイテムの交換 - ${item.name}`
        }
        open={isItemModalOpen}
        onOk={handleOk}
        okText={language === "vi" ? "Đặt hàng" : "注文"}
        cancelText={language === "vi" ? "Hủy" : "キャンセル"}
        onCancel={handleCancel}
      >
        <div className='flex items-center gap-2'>
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onChange={onFinishFailed}
            layout='vertical'
            className='w-full'
            initialValues={{ ...user }}
          >
            <Form.Item
              name='quantity'
              label={language === "vi" ? "Số lượng" : "量"}
              rules={[
                {
                  required: true,
                  message:
                    language === "vi"
                      ? "Vui lòng nhập số lượng"
                      : "数量を入力してください",
                },
              ]}
              initialValue={1}
            >
              <div className='flex items-center gap-2'>
                <InputNumber
                  min={1}
                  max={Math.floor(user.point / item.price)}
                  defaultValue={1}
                  onChange={(value) => form.setFieldValue("quantity", value)}
                  changeOnWheel
                  keyboard={false}
                  controls
                />
                <div className=''>{`/${Math.floor(
                  user.point / item.price
                )}`}</div>
              </div>
            </Form.Item>

            <Form.Item
              name='name'
              label={language === "vi" ? "Họ và tên" : "名前"}
              rules={[
                {
                  required: true,
                  message:
                    language === "vi"
                      ? "Vui lòng nhập họ và tên!"
                      : "名前を入力しなければならない",
                },
              ]}
              validateTrigger='onBlur'
            >
              <Input
                placeholder={language === "vi" ? "Họ và tên" : "名前"}
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='email'
              label={language === "vi" ? "Địa chỉ mail" : "メール"}
              rules={[
                {
                  required: true,
                  message:
                    language === "vi"
                      ? "Vui lòng nhập địa chỉ mail!"
                      : "メールを入力しなければならない",
                },
                {
                  type: "email",
                  message:
                    language === "vi"
                      ? "Vui lòng đúng địa chỉ mail!"
                      : "メールが正しくない",
                },
              ]}
              validateTrigger='onBlur'
            >
              <Input placeholder='A@gmail.com' size='large' />
            </Form.Item>

            <Form.Item
              name='telephone'
              label={language === "vi" ? "Số điện thoại" : "電話番号"}
              rules={[
                {
                  required: true,
                  message:
                    language === "vi"
                      ? "Vui lòng nhập số điện thoại!"
                      : "電話番号を入力しなければならない",
                },
                {
                  len: 10,
                  whitespace: false,
                  message:
                    language === "vi"
                      ? "Vui lòng nhập đủ số điện thoại!"
                      : "数字が足りない",
                },
                {
                  pattern: /^[0-9]+$/,
                  message:
                    language === "vi"
                      ? "Vui lòng nhập đúng số điện thoại!"
                      : "数字だけ入力してください",
                },
              ]}
              validateTrigger='onBlur'
            >
              <Input
                placeholder={language === "vi" ? "Số điện thoại" : "電話番号"}
                size='large'
              />
            </Form.Item>
            <Form.Item
              name='city'
              label={language === "vi" ? "Thành phố" : "町"}
              rules={[
                {
                  required: true,
                  message:
                    language === "vi"
                      ? '"Vui lòng chọn thành phố!"'
                      : "町を選ばなければならない",
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
              label={language === "vi" ? "Địa chỉ" : "アドレス"}
              rules={[
                {
                  required: true,
                  message:
                    language === "vi"
                      ? "Vui lòng nhập địa chỉ!"
                      : "アドレスを入力しなければならない",
                },
              ]}
              validateTrigger='onBlur'
            >
              <Input placeholder='Địa chỉ' size='large' />
            </Form.Item>

            <Form.Item
              label={language === "vi" ? "Ghi chú đơn hàng" : "メモ"}
              size='large'
              name='note'
            >
              <Input.TextArea
                allowClear
                rows={4}
                size='large'
                placeholder={
                  language === "vi"
                    ? "Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                    : "注文に関するメモ、例えば: 配送時間や詳細な配送場所の指示など。"
                }
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title={
          language === "vi"
            ? `Đổi vật phẩm - ${item.name}`
            : `アイテムの交換 - ${item.name}`
        }
        open={isVoucherModalOpen}
        onOk={handleChangeVoucher}
        okText={language === "vi" ? "Đặt hàng" : "注文"}
        cancelText={language === "vi" ? "Hủy" : "キャンセル"}
        onCancel={handleCancel}
      >
        <div className='flex items-center gap-2'>
          <div className=''>{language === "vi" ? "Số lượng:" : "量:"}</div>
          <InputNumber
            min={1}
            ref={voucherQuantity}
            max={Math.floor(user.point / item.price)}
            defaultValue={1}
            changeOnWheel
            keyboard={false}
            controls
          />
          <div className=''>{`/${Math.floor(user.point / item.price)}`}</div>
        </div>
      </Modal>
    </div>
  );
}

export default ExchangeItem;
