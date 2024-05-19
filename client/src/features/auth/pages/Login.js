import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { useLoginMutation } from "app/api/authService";
import { setUser } from "app/slices/authSlice";
import GoogleLogin from "../component/GoogleLogin";
import FacebookLogin from "../component/FacebookLogin";
function Login() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    login(values)
      .then((res) => {
        if (res.data.error) {
          message.error(res.data.error);
        } else {
          dispatch(setUser({ ...res.data, isLoggedIn: true }));
          message.success("Đăng nhập thành công");
          if (res.data.role === 2) {
            navigate("/admin");
          } else navigate("/");
        }
      })
      .catch((err) => {
        message.error("Đăng nhập thất bại");
        console.log(err);
      });
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  return (
    <div className='flex min-h-screen overflow-hidden'>
      <div className='flex-1 mim-h-full'>
        <Form
          name='normal_login'
          className='login-form flex flex-col h-full items-center justify-center'
          size='large'
          onFinish={onFinish}
        >
          <h1 className='text-left w-3/5 text-3xl mb-4 font-bold '>
            Đăng nhập
          </h1>
          <Form.Item
            name='account'
            className='w-3/5'
            rules={[
              {
                required: true,
                message: "Vui lòng nhâp tài khoản!",
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
                message: "Vui lòng nhâp mật khẩu!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Mật khẩu'
            />
          </Form.Item>
          <Form.Item className='w-3/5'>
            <a className='text-blue-600' href='/login'>
              Quên mật khẩu?
            </a>
          </Form.Item>

          <Form.Item className='w-3/5'>
            <Button
              type='primary'
              htmlType='submit'
              className='bg-primary w-full'
            >
              Đăng nhập
            </Button>
            Bạn chưa có tài khoản?{" "}
            <Link to='/signup' className='text-blue-600'>
              Đăng ký tại đây!
            </Link>
          </Form.Item>

          <Form.Item className='w-3/5'>
            <Divider>Hoặc đăng nhập với</Divider>
            <div className='w-full flex gap-2'>
              <GoogleLogin />
              <FacebookLogin />
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className='hidden md:block flex-1 mim-h-full overflow-hidden bg-center bg-cover bg-[url("https://nupet.vn/wp-content/uploads/2023/10/ngo-nghinh-anh-meo-cute-nupet-2.jpg")]'></div>
    </div>
  );
}

export default Login;
