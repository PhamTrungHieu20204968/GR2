import { Button, InputNumber, message, Modal, Form, Input, Select } from "antd";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useUserCreateOrderMutation } from "app/api/orderService";
import { useCreateSaleMutation } from "app/api/saleService";

function ExchangeItem({ item, ExchangeItem, user }) {
  const [form] = Form.useForm();
  const [userCreateOrder] = useUserCreateOrderMutation();
  const [userCreateSale] = useCreateSaleMutation();
  const { accessToken } = useSelector((state) => state.auth);
  const type = ["Danh hiệu", "Vật phẩm", "Phiếu giảm giá"];
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
    <div className='p-4 text-center font-semibold'>
      <div className='text-2xl'>{item.name}</div>
      <div className='my-2'>{type[item.type]}</div>
      <div className='mb-1'>
        {item.price === 0 ? "Miễn phí" : `${item.price} điểm`}
      </div>
      {item.type === 0 && user.title === item.name ? (
        <div className='text-pink-500'>Đang sử dụng</div>
      ) : (
        <Button type='primary' onClick={handleExchangeItem}>
          Đổi
        </Button>
      )}
      <Modal
        title={`Đổi vật phẩm - ${item.name}`}
        open={isItemModalOpen}
        onOk={handleOk}
        okText='Đặt hàng'
        cancelText='Hủy'
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
              label='Số lượng'
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng!",
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
          </Form>
        </div>
      </Modal>
      <Modal
        title={`Đổi vật phẩm - ${item.name}`}
        open={isVoucherModalOpen}
        onOk={handleChangeVoucher}
        okText='Đổi'
        cancelText='Hủy'
        onCancel={handleCancel}
      >
        <div className='flex items-center gap-2'>
          <div className=''>Số lượng:</div>
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
