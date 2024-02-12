import React from "react";
import { useNavigate } from "react-router-dom";

function ProductItem({ product }) {
  const navigate = useNavigate();
  const handleOnclickProduct = () => {
    navigate(`/products/pets/${product?.name}`);
  };
  return (
    <div
      className='group flex w-full py-2 border-b-2 cursor-pointer first:pt-0 last:pb-0 last:border-b-0'
      onClick={handleOnclickProduct}
    >
      <img
        className='w-16 h-1w-16 mr-1'
        src={product?.images[0].url}
        alt={product?.name}
      />

      <div className='w-full'>
        <div className='product-name font-bold group-hover:text-pink-400 '>
          {product?.name}
        </div>
        <div className=''>
          {parseInt(product?.price).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
