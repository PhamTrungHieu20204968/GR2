import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useSelector } from "react-redux";

import { useUpdateUserPasswordMutation } from "app/api/userService";
function PasswordForm() {
  const [form] = Form.useForm();
  const [update] = useUpdateUserPasswordMutation();
  const [loading, setLoading] = useState(false);
  const { accessToken, userId, language } = useSelector((state) => state.auth);

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
          if (language === "vi") {
            message.error(res.data.error);
          } else message.error("失敗しました");
        } else {
          message.success(
            language === "vi" ? "Cập nhật thành công" : "修正に成功しました"
          );
        }
        form.resetFields();
        setLoading(false);
      })
      .catch((err) => {
        message.error(
          language === "vi" ? "Cập nhật thất bại" : "修正に失敗しました"
        );
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      <div className='text-2xl font-bold mb-4'>
        {language === "vi" ? "Thay đổi mật khẩu" : "パスワードを変更する"}
      </div>
      <Form
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        layout='horizontal'
        {...formItemLayout}
      >
        <Form.Item
          name='password'
          label={language === "vi" ? "Mật khẩu" : "パスワード"}
          rules={[
            {
              required: true,
              message:
                language === "vi"
                  ? "Vui lòng nhập mật khẩu!"
                  : "パスワードを入力しなければならない",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label={language === "vi" ? "Nhập lại mật khẩu" : "パスワードの再入力"}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message:
                language === "vi"
                  ? "Vui lòng nhập lại mật khẩu!"
                  : "パスワードを再入力しなければならない",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    language === "vi"
                      ? "Mật khẩu không trùng khớp!"
                      : "再入力が正しくない"
                  )
                );
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
            {language === "vi" ? "Đổi mật khẩu" : "変更する"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PasswordForm;
