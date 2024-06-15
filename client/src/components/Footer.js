import React from "react";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "assets/imgs/footer-logo.png";

function Footer({ page = ["home"] }) {
  const { language } = useSelector((state) => state.auth);

  return (
    <div className='footer w-screen text-white mt-8'>
      <div className='flex container mx-auto w-full justify-between py-10'>
        <div className='nav flex-1'>
          <h2 className='text-xl font-bold'>
            {language === "vi" ? "ĐIỀU HƯỚNG" : "ナビゲーション"}
          </h2>
          <ul className='text-[#ccc]'>
            <li
              className={
                page[0] === "home"
                  ? "my-2 text-cyan-300 hover:text-yellow-300 cursor-pointer list-pink-dot"
                  : "my-2 hover:text-yellow-300 cursor-pointer list-pink-dot"
              }
            >
              <Link to='/'>{language === "vi" ? "Trang chủ" : "ホーム"}</Link>
            </li>
            <li
              className={
                page[0] === "about-us"
                  ? "my-2 text-cyan-300 hover:text-yellow-300 cursor-pointer list-pink-dot"
                  : "my-2 hover:text-yellow-300 cursor-pointer list-pink-dot"
              }
            >
              <Link to='/about-us'>
                {language === "vi" ? "Giới thiệu" : "アバウト・アス"}
              </Link>
            </li>
            <li
              className={
                page[0] === "products"
                  ? "my-2 text-cyan-300 hover:text-yellow-300 cursor-pointer list-pink-dot"
                  : "my-2 hover:text-yellow-300 cursor-pointer list-pink-dot"
              }
            >
              <Link to='/products/pets'>
                {language === "vi" ? "Sản phẩm" : "商品"}
              </Link>
            </li>
            <li
              className={
                page[0] === "blogs"
                  ? "my-2 text-cyan-300 hover:text-yellow-300 cursor-pointer list-pink-dot"
                  : "my-2 hover:text-yellow-300 cursor-pointer list-pink-dot"
              }
            >
              <Link to='/blogs'>
                {language === "vi" ? "Bài viết" : "ブログ"}
              </Link>
            </li>
            <li
              className={
                page[0] === "contact"
                  ? "my-2 text-cyan-300 hover:text-yellow-300 cursor-pointer list-pink-dot"
                  : "my-2 hover:text-yellow-300 cursor-pointer list-pink-dot"
              }
            >
              <Link to='/contact'>
                {language === "vi" ? "Liên hệ" : "コンタクト"}
              </Link>
            </li>
          </ul>
        </div>
        <div className='logo flex-2 flex flex-col items-center px-4 border-x-gray-50 border-x-[1px] mx-2'>
          <img
            src={logo}
            alt='logo'
            className='w-auto h-auto max-h-[70px] py-2'
          />
          <p className='text-[#ccc]'>
            {language === "vi"
              ? "Một trang web đáng tin dùng về thú cưng và các sản phẩm liên quan đến thú cưng"
              : "ペットやペット用品に関する信頼できるウェブサイト"}
          </p>
        </div>
        <div className='information flex-1 pl-2 text-[#ccc]'>
          <h2 className='text-xl font-bold text-white'>
            {language === "vi" ? "THÔNG TIN LIÊN HỆ" : "連絡先"}
          </h2>
          <p className='flex items-center text-lg my-4 cursor-pointer text-cyan-300 hover:text-yellow-300'>
            <EnvironmentOutlined className='mr-3 text-2xl' />
            <span>
              {language === "vi"
                ? "Số 16 ngõ 37 Lê Thanh Nghị Hai Bà Trưng Hà Nội"
                : "ハノイ市ハイバーチュン区、レタインギー通り37番路地16番"}
            </span>
          </p>
          <p className='flex items-center text-lg my-4 cursor-pointer text-cyan-300 hover:text-yellow-300'>
            <PhoneOutlined className='mr-3 text-2xl' />
            <span>0965504095</span>
          </p>
          <p className='flex items-center text-lg my-4 cursor-pointer text-cyan-300 hover:text-yellow-300'>
            <MailOutlined className='mr-3 text-2xl' />
            <span>phamhieu15082002@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
