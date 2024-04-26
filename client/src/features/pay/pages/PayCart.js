import React from "react";
import { Row, Col, Steps, message, Button, Spin } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "components/Layout";
import Cart from "../components/Cart";
import { useGetUserSaleQuery } from "app/api/saleService";
function PayCart() {
  const cart = useSelector((state) => state.cart);
  const { accessToken } = useSelector((state) => state.auth);
  const { data } = useGetUserSaleQuery({
    accessToken,
  });
  const navigate = useNavigate();
  if (!data) {
    return <Spin />;
  }
  const onChangeStep = (value) => {
    if (value === 1) navigate("/pay");
    else if (value === 2) {
      message.info("Bạn cần hoàn thành bước 2 trước");
      return;
    }
  };
  return (
    <Layout>
      {cart.length > 0 ? (
        <div className='container mx-auto mt-8 overflow-hidden'>
          <Row className='mb-8'>
            <Col span={24}>
              <Steps
                current={0}
                onChange={onChangeStep}
                className='w-full'
                items={[
                  {
                    title: "Xem giỏ hàng",
                  },
                  {
                    title: "Thanh toán",
                  },
                  {
                    title: "Hoàn tất đặt hàng",
                  },
                ]}
              />
            </Col>
          </Row>
          <Cart
            cart={cart}
            voucherList={data && !data.error ? data : []}
          ></Cart>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <div className='w-fit'>Chưa có sản phẩm nào trong giỏ hàng.</div>
          <Button
            type='primary'
            size='large'
            className='rounded-none w-fit mt-4 font-bold'
            onClick={() => navigate("/")}
          >
            QUAY TRỞ LẠI CỬA HÀNG
          </Button>
        </div>
      )}
    </Layout>
  );
}

export default PayCart;
