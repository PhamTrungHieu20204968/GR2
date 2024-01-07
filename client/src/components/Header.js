import React from "react";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import logo from "assets/imgs/logo.png";
import { Link } from "react-router-dom";
function Header() {
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
            to='/'
            className='h-full px-4 hover:bg-primary flex items-center'
          >
            Thú cưng
          </Link>
          <Link
            to='/'
            className='h-full px-4 hover:bg-primary flex items-center'
          >
            Đồ ăn
          </Link>
          <Link
            to='/'
            className='h-full px-4 hover:bg-primary flex items-center'
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
          <SearchOutlined className='text-2xl mr-5 font-bold cursor-pointer hover:text-primary' />
          <UserOutlined className='text-2xl mr-5 font-bold cursor-pointer hover:text-primary' />
          <ShoppingCartOutlined className='text-2xl font-bold cursor-pointer hover:text-primary' />
        </div>
      </div>
    </div>
  );
}

export default Header;
