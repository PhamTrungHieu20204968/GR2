import React from "react";
import { ShoppingOutlined, ShoppingFilled } from "@ant-design/icons";

function ProductCard() {
  return (
    <div className='product-card bg-[#eee] text-center rounded-lg'>
      <div className='w-full overflow-hidden relative'>
        <img
          className='product-img'
          src='https://mauweb.monamedia.net/dogcatshop/wp-content/uploads/2018/04/8-300x300.jpg'
          alt='img'
        />
        <div className='product-card__card-icon absolute bottom-5 left-5 text-3xl text-primary hover:cursor-pointer'>
          <ShoppingOutlined className='icon-outline fly-in' />
          <ShoppingFilled className='icon-filled' />
        </div>
      </div>
      <p className='product-category text-xs text-[#353535] opacity-70 mt-2'>
        CHÓ CẢNH
      </p>
      <p className='product-name hover:text-pink-500'>chó Doberman Pinscher</p>
      <p className='product-price py-4'>
        <b>8,875,000 ₫</b>
      </p>
    </div>
  );
}

export default ProductCard;
