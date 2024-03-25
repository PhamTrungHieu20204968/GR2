import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

function Cart({ cart }) {
  const navigate = useNavigate();
  return (
    <div className='max-w-xs'>
      {cart.length > 0 ? (
        <div className=''>
          {cart?.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
          <Button
            className='w-full my-2'
            type='dashed'
            onClick={() => navigate("/cart")}
          >
            Xem giỏ hàng
          </Button>
          <Button
            className='w-full '
            type='primary'
            onClick={() => navigate("/pay")}
          >
            Thanh toán
          </Button>
        </div>
      ) : (
        <div className='p-2 text-gray-400'>Chưa có sản phẩm nào</div>
      )}
    </div>
  );
}

export default Cart;
