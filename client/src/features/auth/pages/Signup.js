import React from "react";
import {
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Divider, message } from "antd";
import { useSelector } from "react-redux";

import { useSignUpMutation } from "app/api/authService";
import GoogleLogin from "../component/GoogleLogin";
import FacebookLogin from "../component/FacebookLogin";
function Signup() {
  const navigate = useNavigate();
  const [signup] = useSignUpMutation();
  const { language } = useSelector((state) => state.auth);
  const onFinish = (values) => {
    signup(values)
      .then((res) => {
        if (res.data.error) {
          if (language === "vi") {
            message.error(res.data.error);
          } else message.error("登録に失敗しました");
        } else {
          message.success(
            language === "vi" ? "Đăng ký thành công" : "登録に成功しました"
          );
          navigate("/login");
        }
      })
      .catch((err) => {
        message.error(
          language === "vi" ? "Đăng ký thất bại" : "登録に失敗しました"
        );
        console.log(err);
      });
  };
  return (
    <div className='flex min-h-screen overflow-hidden'>
      <div className='hidden md:block flex-1 mim-h-full overflow-hidden bg-center bg-cover bg-[url("https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'></div>

      <div className='flex-1 mim-h-full'>
        <Form
          name='normal_login'
          className='login-form flex flex-col h-full items-center justify-center'
          size='large'
          onFinish={onFinish}
        >
          <h1 className='text-left w-3/5 text-3xl mb-4 font-bold '>
            {language === "vi" ? "Đăng ký" : "登録！"}
          </h1>

          <Form.Item
            name='name'
            className='w-3/5'
            rules={[
              {
                required: true,
                message:
                  language === "vi"
                    ? "Vui lòng nhập họ và tên!"
                    : "名前を入力しなければならない",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder={language === "vi" ? "Họ và tên" : "名前"}
            />
          </Form.Item>
          <Form.Item
            name='account'
            className='w-3/5'
            rules={[
              {
                required: true,
                message:
                  language === "vi"
                    ? "Vui lòng nhập tài khoản!"
                    : "アカウントを入力しなければならない",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder={language === "vi" ? "Tài khoản" : "アカウント"}
            />
          </Form.Item>
          <Form.Item
            className='w-3/5'
            name='password'
            rules={[
              {
                required: true,
                message:
                  language === "vi"
                    ? "Vui lòng nhập mật khẩu"
                    : "パスワードを入力してください",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder={language === "vi" ? "Mật khẩu" : "パスワード"}
            />
          </Form.Item>
          <Form.Item
            className='w-3/5'
            name='confirm'
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message:
                  language === "vi"
                    ? "Vui lòng xác nhập lại mật khẩu!"
                    : "パスワードを再入力してください!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder={
                language === "vi"
                  ? "Nhập lại mật khẩu"
                  : "パスワードを再入力する"
              }
            />
          </Form.Item>

          <Form.Item
            name='telephone'
            className='w-3/5'
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
          >
            <Input
              placeholder='Số điện thoại'
              prefix={<PhoneOutlined className='site-form-item-icon' />}
            />
          </Form.Item>
          <Form.Item className='w-3/5'>
            <Button
              type='primary'
              htmlType='submit'
              className='bg-primary w-full'
            >
              {language === "vi" ? "Đăng ký" : "登録！"}
            </Button>
            {language === "vi"
              ? "Bạn chưa có tài khoản?"
              : "アカウントをお持ちましたか？"}
            <Link to='/login' className='text-blue-600'>
              {language === "vi" ? "Đăng nhập tại đây!" : "こちらでログイン！"}
            </Link>
          </Form.Item>

          <Form.Item className='w-3/5'>
            <Divider>
              i{language === "vi" ? "Hoặc đăng ký vớ" : "または登録"}
            </Divider>
            <div className='w-full flex gap-2'>
              <GoogleLogin />
              <FacebookLogin />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
