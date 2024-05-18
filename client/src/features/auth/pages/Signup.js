import React from "react";
import {
  LockOutlined,
  UserOutlined,
  GoogleOutlined,
  FacebookOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Divider, message } from "antd";

import { useSignUpMutation } from "app/api/authService";
import GoogleLogin from "../component/GoogleLogin";
function Signup() {
  const navigate = useNavigate();
  const [signup] = useSignUpMutation();
  const onFinish = (values) => {
    signup(values)
      .then((res) => {
        if (res.data.error) {
          message.error(res.data.error);
        } else {
          message.success("Đăng ký thành công");
          navigate("/login");
        }
      })
      .catch((err) => {
        message.error("Đăng ký thất bại");
        console.log(err);
      });
  };

  const loginWithGoogleHandler = () => {
    window.open("http://localhost:3001/users/google", "_self");
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
          <h1 className='text-left w-3/5 text-3xl mb-4 font-bold '>Đăng ký</h1>

          <Form.Item
            name='name'
            className='w-3/5'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Họ và tên'
            />
          </Form.Item>
          <Form.Item
            name='account'
            className='w-3/5'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Tài khoản'
            />
          </Form.Item>
          <Form.Item
            className='w-3/5'
            name='password'
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Mật khẩu'
            />
          </Form.Item>
          <Form.Item
            className='w-3/5'
            name='confirm'
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhập lại mật khẩu!",
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
              placeholder='Nhập lại mật khẩu'
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
              Đăng ký
            </Button>
            Bạn đã có tài khoản?{" "}
            <Link to='/login' className='text-blue-600'>
              Đăng nhập tại đây!
            </Link>
          </Form.Item>

          <Form.Item className='w-3/5'>
            <Divider>Hoặc đăng ký với</Divider>
            <div className='w-full flex gap-2'>
              <GoogleLogin />
              <button
                className='bg-blue-500 h-10 rounded-lg text-white custom-btn hover:bg-[#4096ff] w-full'
                type='button'
              >
                <FacebookOutlined className='mr-1' />
                Facebook
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
