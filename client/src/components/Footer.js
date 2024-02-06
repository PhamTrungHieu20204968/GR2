import React from "react";
import { PhoneOutlined, MailOutlined, GlobalOutlined } from "@ant-design/icons";

import logo from "assets/imgs/footer-logo.png";
import { Link } from "react-router-dom";

function Footer({ page = ["home"] }) {
  return (
    <div className='footer w-screen text-white mt-8'>
      <div className='flex container mx-auto w-full justify-between py-10'>
        <div className='nav flex-1'>
          <h2 className='text-xl font-bold'>ĐIỀU HƯỚNG</h2>
          <ul className='text-[#ccc]'>
            <li
              className={
                page[0] === "home"
                  ? "my-2 text-cyan-300 hover:text-yellow-300 cursor-pointer list-pink-dot"
                  : "my-2 hover:text-yellow-300 cursor-pointer list-pink-dot"
              }
            >
              <Link to='/'>Trang chủ</Link>
            </li>
            <li className='my-2 hover:text-yellow-300 cursor-pointer list-pink-dot'>
              Về chúng tôi
            </li>
            <li
              className={
                page[0] === "products"
                  ? "my-2 text-cyan-300 hover:text-yellow-300 cursor-pointer list-pink-dot"
                  : "my-2 hover:text-yellow-300 cursor-pointer list-pink-dot"
              }
            >
              <Link to='/products/pets'>Sản phẩm</Link>
            </li>
            <li className='my-2 hover:text-yellow-300 cursor-pointer list-pink-dot'>
              Điểm tin hữu ích
            </li>
            <li className='my-2 hover:text-yellow-300 cursor-pointer list-pink-dot'>
              Liên hệ
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
            Một trang web đáng tin dùng về thú cưng và các sản phẩm liên quan
            đến thú cưng
          </p>
        </div>
        <div className='information flex-1 pl-2 text-[#ccc]'>
          <h2 className='text-xl font-bold text-white'>THÔNG TIN LIÊN HỆ</h2>
          <p className='flex items-center text-lg my-4'>
            <GlobalOutlined className='text-cyan-300 mr-3 text-2xl hover:text-yellow-300' />
            <span>số 16 ngõ 37 Lê Thanh Nghị Hai Bà Trưng Hà Nội</span>
          </p>
          <p className='flex items-center text-lg my-4'>
            <PhoneOutlined className='text-cyan-300 mr-3 text-2xl hover:text-yellow-300' />
            <span>0965504095</span>
          </p>
          <p className='flex items-center text-lg my-4'>
            <MailOutlined className='text-cyan-300 mr-3 text-2xl hover:text-yellow-300' />
            <span>phamhieu15082002@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
