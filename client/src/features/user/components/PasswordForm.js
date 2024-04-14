import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useSelector } from "react-redux";

import { useUpdateUserPasswordMutation } from "app/api/userService";
function PasswordForm() {
  const [form] = Form.useForm();
  const [update] = useUpdateUserPasswordMutation();
  const [loading, setLoading] = useState(false);
  const { accessToken, userId } = useSelector((state) => state.auth);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const onFinish = (values) => {
    setLoading(true);
    update({
      data: { ...values },
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
        }
        form.resetFields();
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
      <div className='text-2xl font-bold mb-4'>Thay đổi mật khẩu</div>
      <Form
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        layout='horizontal'
        {...formItemLayout}
      >
        <Form.Item
          name='password'
          label='Mật khẩu'
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Nhập lại mật khẩu'
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không trùng khớp!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit' loading={loading}>
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PasswordForm;
