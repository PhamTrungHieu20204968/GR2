import React from "react";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Popover, Tooltip } from "antd";
import { useSelector } from "react-redux";

import logo from "assets/imgs/logo.png";
import { Link } from "react-router-dom";
import SearchProduct from "./SearchProduct";
import Cart from "./Cart";
import UserMenu from "./UserMenu";
import Notifications from "./Notifications";
function Header({ page }) {
  const cart = useSelector((state) => state.cart);
  const { isLoggedIn, language } = useSelector((state) => state.auth);

  return (
    <div className='w-screen fixed top-0 left-0 right-0 z-50 text-white bg-[#333] '>
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
            to='/about-us'
            className={
              page[0] === "about-us"
                ? "h-full px-4 bg-primary flex items-center"
                : "h-full px-4 hover:bg-primary flex items-center"
            }
          >
            {language === "vi" ? "Giới thiệu" : "アバウト・アス"}
          </Link>
          <Link
            to='/products/pets'
            className={
              page[0] === "products" && page[1] === "pets"
                ? "h-full px-4 bg-primary flex items-center"
                : "h-full px-4 hover:bg-primary flex items-center"
            }
          >
            {language === "vi" ? "Thú cưng" : "ペット"}
          </Link>
          <Link
            to='/products/foods'
            className={
              page[0] === "products" && page[1] === "foods"
                ? "h-full px-4 bg-primary flex items-center"
                : "h-full px-4 hover:bg-primary flex items-center"
            }
          >
            {language === "vi" ? "Đồ ăn" : "料理"}
          </Link>
          <Link
            to='/products/accessories'
            className={
              page[0] === "products" && page[1] === "accessories"
                ? "h-full px-4 bg-primary flex items-center"
                : "h-full px-4 hover:bg-primary flex items-center"
            }
          >
            {language === "vi" ? "Phụ kiện" : "アクセサリー"}
          </Link>
          <Link
            to='/blogs'
            className={
              page[0] === "blogs"
                ? "h-full px-4 bg-primary flex items-center"
                : "h-full px-4 hover:bg-primary flex items-center"
            }
          >
            {language === "vi" ? "Bài viết" : "ブログ"}
          </Link>
          <Link
            to='/contact'
            className={
              page[0] === "contact"
                ? "h-full px-4 bg-primary flex items-center"
                : "h-full px-4 hover:bg-primary flex items-center"
            }
          >
            {language === "vi" ? "Liên hệ" : "コンタクト"}
          </Link>
        </ul>
        <div className='flex items-center gap-4'>
          <Popover trigger='click' className='test' content={<SearchProduct />}>
            <Tooltip
              title={language === "vi" ? "Tìm kiếm" : "検索"}
              placement='bottom'
              color='#666'
              zIndex={60}
            >
              <SearchOutlined className='text-2xl font-bold cursor-pointer hover:text-primary' />
            </Tooltip>
          </Popover>
          <Popover trigger='click' content={<UserMenu />}>
            <UserOutlined className='text-2xl font-bold cursor-pointer hover:text-primary' />
          </Popover>
          {isLoggedIn && <Notifications />}
          <Popover trigger='click' content={<Cart cart={cart} />}>
            <Badge count={cart.length}>
              <Tooltip
                title={language === "vi" ? "Giỏ hàng" : "カート"}
                placement='bottom'
                color='#666'
                zIndex={60}
              >
                <ShoppingCartOutlined className='text-2xl text-white font-bold cursor-pointer hover:text-primary' />
              </Tooltip>
            </Badge>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Header;
