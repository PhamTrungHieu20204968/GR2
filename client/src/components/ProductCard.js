import React from "react";
import { ShoppingOutlined, ShoppingFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const handleOnclickProduct = () => {
    navigate(`/products/pets/${product?.name}`);
  };
  return (
    <div
      className='product-card w-full bg-[#eee] text-center rounded-lg border-2 border-dashed shadow-sm'
      onClick={handleOnclickProduct}
    >
      <div className='w-full overflow-hidden relative'>
        <img
          className='product-img h-[285px]'
          src={product?.images[0]?.url}
          alt='img'
        />
        <div className='product-card__card-icon absolute bottom-5 left-5 text-3xl text-primary hover:cursor-pointer'>
          <ShoppingOutlined className='icon-outline fly-in' />
          <ShoppingFilled className='icon-filled' />
        </div>
      </div>
      <p className='product-category text-xs text-[#353535] opacity-70 mt-2'>
        {product?.category?.name}
      </p>
      <p className='product-name hover:text-pink-500 cursor-pointer'>
        {product?.name}
      </p>
      <p className='product-price py-4'>
        <b>
          {" "}
          {parseInt(product?.price).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </b>
      </p>
    </div>
  );
}

export default ProductCard;
