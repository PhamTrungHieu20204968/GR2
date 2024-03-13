import React from "react";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Popover } from "antd";
import { useSelector } from "react-redux";

import logo from "assets/imgs/logo.png";
import { Link } from "react-router-dom";
import SearchProduct from "./SearchProduct";
import Cart from "./Cart";
import UserMenu from "./UserMenu";
function Header({ page }) {
  const cart = useSelector((state) => state.cart);
  return (
    <div className='w-screen fixed top-0 left-0 right-0 z-50 text-white bg-[#333]'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/'>
          <img
            src={logo}
            alt='logo'
            className='w-full h-auto max-h-[70px] py-2'
          />
        </Link>
        <ul className='flex justify-between h-[70px] items-center uppercase font-bold'>
          <Link
            to='/'
            className='h-full px-4 hover:bg-primary flex items-center'
          >
            Giới thiệu
          </Link>
          <Link
            to='/products/pets'
            className={
              page[0] === "products" && page[1] === "pets"
                ? "h-full px-4 bg-primary flex items-center"
                : "h-full px-4 hover:bg-primary flex items-center"
            }
          >
            Thú cưng
          </Link>
          <Link
            to='/products/foods'
            className={
              page[0] === "products" && page[1] === "foods"
                ? "h-full px-4 bg-primary flex items-center"
                : "h-full px-4 hover:bg-primary flex items-center"
            }
          >
            Đồ ăn
          </Link>
          <Link
            to='/products/accessories'
            className={
              page[0] === "products" && page[1] === "accessories"
                ? "h-full px-4 bg-primary flex items-center"
                : "h-full px-4 hover:bg-primary flex items-center"
            }
          >
            Phụ kiện
          </Link>
          <Link
            to='/'
            className='h-full px-4 hover:bg-primary flex items-center'
          >
            Tin tức
          </Link>
          <Link
            to='/'
            className='h-full px-4 hover:bg-primary flex items-center'
          >
            Liên hệ
          </Link>
        </ul>
        <div>
          <Popover trigger="click" content={<SearchProduct />}>
            <SearchOutlined className='text-2xl font-bold cursor-pointer hover:text-primary' />
          </Popover>
          <Popover trigger="click" content={<UserMenu />}>
            <UserOutlined className='text-2xl mx-7 font-bold cursor-pointer hover:text-primary' />
          </Popover>
          <Popover trigger="click" content={<Cart cart={cart} />} placement='bottomRight'>
            <Badge count={cart.length}>
              <ShoppingCartOutlined className='text-2xl text-white font-bold cursor-pointer hover:text-primary' />
            </Badge>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Header;
