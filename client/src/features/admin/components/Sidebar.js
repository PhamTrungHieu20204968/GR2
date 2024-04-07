import React from "react";

import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Người dùng", "sub1", null, [getItem("Danh sách người dùng", "1")]),
  getItem("Sản phẩm", "sub2", null, [
    getItem("Danh sách sản phẩm", "2"),
    getItem("Thêm sản phẩm", "3"),
  ]),
  getItem("Bài viết", "sub3", null, [getItem("Danh sách bài viết", "4")]),
  getItem("Đơn hàng", "sub4", null, [getItem("Danh sách đơn hàng", "5")]),
];
function Sidebar({ SelectedKey = "1", OpenKeys = ["sub1"] }) {
  const navigate = useNavigate();
  const handlerClickMenu = ({ key }) => {
    if (key === SelectedKey) {
      return;
    }
    switch (key) {
      case "1":
        navigate("/admin");
        break;
      case "2":
        navigate("/admin/list-products");
        break;
      case "3":
        navigate("/admin/create-product");
        break;
      case "4":
        navigate("/admin/list-blogs");
        break;
      case "5":
        navigate("/admin/list-orders");
        break;
      default:
        break;
    }
  };
  return (
    <div className='h-screen w-full max-w-xs fixed top-0 left-0'>
      <Menu
        className='h-full text-lg p-1'
        defaultSelectedKeys={SelectedKey}
        defaultOpenKeys={OpenKeys}
        mode='inline'
        theme='dark'
        items={items}
        onClick={handlerClickMenu}
      />
    </div>
  );
}

export default Sidebar;
