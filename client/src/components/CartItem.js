import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteItem } from "app/slices/cartSlice";

function CartItem({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnclickProduct = () => {
    navigate(`/products/pets/${product?.name}`);
  };
  const handleDeleteItem = (e) => {
    e.stopPropagation();
    dispatch(deleteItem(product.id));
  };
  return (
    <div
      className='flex w-50 p-2 gap-2 border-b-2'
      onClick={handleOnclickProduct}
    >
      <img className='w-12 shadow-md' src={product?.images[0].url} alt='img' />
      <div className='flex-1 w-full'>
        <div>
          <p className='product-name w-full mb-1 text-black hover:text-pink-500 cursor-pointer'>
            {product.name}
          </p>
          <p className='text-xs font-bold text-gray-400'>
            <span className='mr-1'>{product?.quantity}</span>
            <span className=''>
              {"x " +
                parseInt(product?.price).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
            </span>
          </p>
        </div>
      </div>
      <CloseCircleOutlined
        className='text-lg self-start ml-1 text-gray-400 hover:text-black'
        onClick={handleDeleteItem}
      />
    </div>
  );
}

export default CartItem;
