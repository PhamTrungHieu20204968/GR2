import React from "react";

import { Menu } from "antd";
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
function Sidebar({ SelectedKey = ["1"], OpenKeys = ["sub1"] }) {
  return (
    <div className='h-screen w-full'>
      <Menu
        className='h-full text-lg p-1'
        defaultSelectedKeys={SelectedKey}
        defaultOpenKeys={OpenKeys}
        mode='inline'
        theme='dark'
        items={items}
      />
    </div>
  );
}

export default Sidebar;
