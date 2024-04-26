import React from "react";
import { Avatar, Menu, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useGetUserQuery } from "app/api/userService";
import { logout } from "app/slices/authSlice";

const UserItems = [
  {
    label: "Thông tin",
    key: "info",
    icon: <UserOutlined />,
  },
  {
    label: "Đổi điểm",
    key: "exchange",
    icon: <SwapOutlined />,
  },
  {
    type: "divider",
  },
  {
    label: "Đăng xuất",
    key: "logout",
    icon: <LogoutOutlined />,
  },
];

const GuestItems = [
  {
    label: "Đăng nhập",
    key: "login",
    icon: <LoginOutlined />,
  },
  {
    label: "Đăng ký",
    key: "signup",
    icon: <UserAddOutlined />,
  },
];

function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, accessToken } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserQuery({
    accessToken: accessToken,
  });
  if (isLoading) {
    return <Spin />;
  }
  const onClick = (e) => {
    switch (e.key) {
      case "login":
        navigate("/login");
        break;
      case "signup":
        navigate("/signup");
        break;
      case "logout":
        dispatch(logout());
        navigate("/");
        break;
      case "info":
        navigate("/user");
        break;
      case "exchange":
        navigate("/user/exchange");
        break;
      default:
        message.info("Tính năng chưa khả dụng!");
        break;
    }
  };
  return (
    <div className=''>
      {isLoggedIn ? (
        <div className=''>
          <div className='flex w-full gap-2 pb-2 border-b-2 items-center'>
            {data?.avatar ? (
              <Avatar
                className='text-center'
                size='default'
                style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                src={data?.avatar}
              ></Avatar>
            ) : (
              <Avatar
                className='text-center'
                size='default'
                style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              >
                {data?.name[0]}
              </Avatar>
            )}
            <div className='flex flex-col'>
              <span className='text-lg font-bold'>{data?.name}</span>
              <span className='flex items-center'>
                {data?.title + " - " + data?.point + " điểm"}
              </span>
            </div>
          </div>
          <Menu
            onClick={onClick}
            mode='vertical'
            items={UserItems}
            selectedKeys={[]}
          />
        </div>
      ) : (
        <Menu
          onClick={onClick}
          mode='vertical'
          items={GuestItems}
          selectedKeys={[]}
        />
      )}
    </div>
  );
}

export default UserMenu;
