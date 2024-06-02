import React from "react";
import { Avatar, Menu, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  SwapOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useGetUserQuery } from "app/api/userService";
import { logout, setUser } from "app/slices/authSlice";
import languageIcon from "assets/imgs/language.svg";

function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserQuery({
    accessToken: auth.accessToken,
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
      case "user-vi":
        dispatch(setUser({ ...auth, language: "vi" }));
        break;
      case "user-jap":
        dispatch(setUser({ ...auth, language: "jap" }));
        break;
      default:
        message.info(
          auth.language === "vi"
            ? "Tính năng chưa khả dụng"
            : "機能が利用できません"
        );
        break;
    }
  };
  const UserItems = [
    {
      label: (
        <div className='inline'>
          {auth.language === "vi" ? "Thông tin" : "自己情報"}
        </div>
      ),
      key: "info",
      icon: <UserOutlined />,
    },
    {
      label: (
        <div className='inline'>
          {auth.language === "vi" ? "Đổi điểm" : "ポイント交換"}
        </div>
      ),
      key: "exchange",
      icon: <SwapOutlined />,
    },
    {
      key: "sub1",
      icon: <img src={languageIcon} alt='languageIcon' className='w-4 h-4' />,
      label: (
        <div className='inline'>
          {auth.language === "vi" ? "Ngôn ngữ" : "言語"}
        </div>
      ),
      children: [
        {
          key: "user-vi",
          label: (
            <div>
              {" "}
              <CheckOutlined
                className={auth.language === "vi" ? "" : "opacity-0"}
              />{" "}
              Tiếng Việt
            </div>
          ),
        },
        {
          key: "user-jap",
          label: (
            <div>
              {" "}
              <CheckOutlined
                className={auth.language === "jap" ? "" : "opacity-0"}
              />{" "}
              日本語
            </div>
          ),
        },
      ],
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className='inline'>
          {auth.language === "vi" ? "Đăng xuất" : "ログアウト"}
        </div>
      ),
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  const GuestItems = [
    {
      label: (
        <div className='inline'>
          {auth.language === "vi" ? "Đăng nhập" : "ログイン"}
        </div>
      ),
      key: "login",
      icon: <LoginOutlined />,
    },
    {
      label: (
        <div className='inline'>
          {auth.language === "vi" ? "Đăng ký" : "登録"}
        </div>
      ),
      key: "signup",
      icon: <UserAddOutlined />,
    },
    {
      key: "sub1",
      icon: <img src={languageIcon} alt='languageIcon' className='w-4 h-4' />,
      label: (
        <div className='inline'>
          {auth.language === "vi" ? "Ngôn ngữ" : "言語"}
        </div>
      ),
      children: [
        {
          key: "user-vi",
          label: (
            <div>
              {" "}
              <CheckOutlined
                className={auth.language === "vi" ? "" : "opacity-0"}
              />{" "}
              Tiếng Việt
            </div>
          ),
        },
        {
          key: "user-jap",
          label: (
            <div>
              {" "}
              <CheckOutlined
                className={auth.language === "jap" ? "" : "opacity-0"}
              />{" "}
              日本語
            </div>
          ),
        },
      ],
    },
  ];
  return (
    <div className=''>
      {auth.isLoggedIn ? (
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
                {data?.title +
                  " - " +
                  data?.point +
                  (auth.language === "vi" ? " điểm" : " ポイント")}
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
