import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spin, message } from "antd";

import { setUser } from "app/slices/authSlice";
import { useGoogleLoginSuccessQuery } from "app/api/authService";
function GoogleLoginSuccess() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { data, isLoading, isError } = useGoogleLoginSuccessQuery();

  useEffect(() => {
    if (isError) {
      message.error("Đăng nhập thất bại!");
    } else if (data) {
      message.success("Đăng nhập thành công!");
      dispatch(setUser({ ...data, isLoggedIn: true }));
    }
  }, [data, isError, dispatch]);

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div>
      {isLoggedIn ? (
        <Navigate to={"/"} replace={true} />
      ) : (
        <h3>Yêu cầu bạn hãy đăng nhập</h3>
      )}
    </div>
  );
}

export default GoogleLoginSuccess;
