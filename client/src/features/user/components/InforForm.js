import React, { useState } from "react";
import { Button, Form, Input, Select, Upload, Avatar, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { useUpdateUserMutation } from "app/api/userService";

function InforForm({ data }) {
  const [form] = Form.useForm();
  const [update] = useUpdateUserMutation();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const { accessToken, userId } = useSelector((state) => state.auth);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  const onFinish = (values) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("telephone", values.telephone);
    formData.append("email", values.email || "");
    formData.append("avatar", values.avatar);
    formData.append("city", values.city);
    formData.append("address", values.address || "");

    update({
      data: formData,
      id: userId,
      headers: {
        accessToken,
      },
    })
      .then((res) => {
        if (res.data?.error) {
          message.error(res.data.error);
        } else {
          message.success("Cập nhật thành công!");
          setEdit(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        message.error("Cập nhật thất bại!");
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className='text-2xl font-bold mb-4'>Thông tin người dùng</div>
      <Form
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        layout='horizontal'
        initialValues={{ ...data }}
        {...formItemLayout}
      >
        <Form.Item name='avatar' label='Ảnh đại diện' className='text-center'>
          {edit ? (
            <Upload
              onChange={({ file }) => {
                form.setFieldValue("avatar", file);
              }}
              accept='image/png, image/jpeg'
              listType='picture-circle'
              beforeUpload={() => false}
              maxCount={1}
            >
              <button style={{ border: 0, background: "none" }} type='button'>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Đăng hình ảnh</div>
              </button>
            </Upload>
          ) : data?.avatar ? (
            <Avatar
              className='mr-2'
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              src={data?.avatar}
            ></Avatar>
          ) : (
            <Avatar
              className='mr-2'
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              style={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
              }}
            >
              {data?.name[0]}
            </Avatar>
          )}
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
          {edit ? (
            <Input placeholder='Họ và tên' size='large' />
          ) : (
            <span>{data?.name}</span>
          )}
        </Form.Item>

        <Form.Item
          name='email'
          label='Địa chỉ mail'
          rules={[
            {
              type: "email",
              message: "Vui lòng đúng địa chỉ mail!",
            },
          ]}
          validateTrigger='onBlur'
        >
          {edit ? (
            <Input placeholder='A@gmail.com' size='large' />
          ) : (
            <span>{data?.email || "Chưa rõ"}</span>
          )}
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
          {edit ? (
            <Input placeholder='Số điện thoại' size='large' />
          ) : (
            <span>{data?.telephone || "Chưa rõ"}</span>
          )}
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
        >
          {edit ? (
            <Select
              size='large'
              showSearch
              placeholder='Thành phố'
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
          ) : (
            <span>{data?.city || "Chưa rõ"}</span>
          )}
        </Form.Item>

        <Form.Item name='address' label='Địa chỉ'>
          {edit ? (
            <Input placeholder='Địa chỉ' size='large' />
          ) : (
            <span>{data?.address || "Chưa rõ"}</span>
          )}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          {edit ? (
            <div>
              <Button
                type='primary'
                htmlType='submit'
                className='mr-4'
                loading={loading}
              >
                Lưu
              </Button>
              <Button
                htmlType='button'
                onClick={() => {
                  form.resetFields();
                  setEdit(false);
                }}
              >
                Hủy
              </Button>
            </div>
          ) : (
            <Button
              type='primary'
              htmlType='button'
              onClick={() => setEdit(true)}
            >
              Chỉnh sửa
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}

export default InforForm;
