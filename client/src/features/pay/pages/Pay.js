import React, { useState } from "react";
import { Row, Col, Steps, message, Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "components/Layout";
import Cart from "../components/Cart";
function Pay() {
  const [currentStep, setCurrentStep] = useState(0);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const onChangeStep = (value) => {
    if (value === 2) {
      message.info("Bạn cần hoàn thành bước 2 trước");
      return;
    }
    setCurrentStep(value);
  };
  return (
    <Layout>
      {cart.length > 0 ? (
        <div className='container mx-auto mt-8 overflow-hidden'>
          <Row className='mb-8'>
            <Col span={24}>
              <Steps
                current={currentStep}
                onChange={onChangeStep}
                className='w-full'
                items={[
                  {
                    title: "Xem giỏ hàng",
                  },
                  {
                    title: "Đặt hàng",
                  },
                  {
                    title: "Hoàn tất đặt hàng",
                  },
                ]}
              />
            </Col>
          </Row>
          {currentStep === 0 && <Cart cart={cart}></Cart>}
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

export default Pay;
