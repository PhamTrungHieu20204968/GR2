import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGoogleLoginMutation } from "app/api/authService";
import { setUser } from "app/slices/authSlice";
function GoogleLogin() {
  const [info, setInfo] = useState();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [googleLogin] = useGoogleLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => setInfo(credentialResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (info && !isLoggedIn) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${info.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${info.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          googleLogin({
            data: {
              name: res?.data.name,
              email: res?.data.email,
              avatar: res?.data.picture,
              id: res?.data.id,
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
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, info, googleLogin, dispatch, navigate]);
  return (
    <div className='w-full'>
      <button
        className='bg-[#ea4235] h-10 text-white rounded-lg custom-btn hover:bg-[#ea4235cc] w-full'
        onClick={login}
        type='button'
      >
        <GoogleOutlined className='mr-1' />
        Gmail
      </button>
    </div>
  );
}

export default GoogleLogin;
