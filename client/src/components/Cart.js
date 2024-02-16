import React from "react";
import { Button } from "antd";

import CartItem from "./CartItem";

function Cart({ cart }) {
  return (
    <div>
      {cart.length > 0 ? (
        <div className=''>
          {cart?.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
          <Button className='w-full my-2' type='dashed'>
            Xem giỏ hàng
          </Button>
          <Button className='w-full ' type='primary'>
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
