import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CartItem from "./CartItem";

function Cart({ cart }) {
  const navigate = useNavigate();
  const { language } = useSelector((state) => state.auth);

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
            {language === "vi" ? "Xem giỏ hàng" : "カートを見る"}
          </Button>
          <Button
            className='w-full '
            type='primary'
            onClick={() => navigate("/pay")}
          >
            {language === "vi" ? "Thanh toán" : "支払う"}
          </Button>
        </div>
      ) : (
        <div className='p-2 text-gray-400'>
          {language === "vi" ? "Chưa có sản phẩm nào" : "何もない"}
        </div>
      )}
    </div>
  );
}

export default Cart;
