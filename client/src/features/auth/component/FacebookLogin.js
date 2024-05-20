import React from "react";
import { FacebookOutlined } from "@ant-design/icons";
import { LoginSocialFacebook } from "reactjs-social-login";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useFacebookLoginMutation } from "app/api/authService";
import { setUser } from "app/slices/authSlice";

function FacebookLogin() {
  const [facebookLogin] = useFacebookLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSuccess = (data) => {
    if (data) {
      facebookLogin({
        data: {
          name: data?.name,
          email: data?.email || "",
          avatar: data?.picture.data.url || "",
          id: data?.userID,
        },
      })
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
    }
  };
  return (
    <div className='w-full'>
      <LoginSocialFacebook
        appId='1015418813346177'
        onResolve={(res) => loginSuccess(res?.data)}
        onReject={(err) => console.log(err)}
      >
        <button
          className='bg-blue-500 h-10 rounded-lg text-white custom-btn hover:bg-[#4096ff] w-full'
          type='button'
        >
          <FacebookOutlined className='mr-1' />
          Facebook
        </button>
      </LoginSocialFacebook>
    </div>
  );
}

export default FacebookLogin;
