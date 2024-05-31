import { Button, Col, Row } from "antd";
import Layout from "components/Layout";
import React from "react";
import { useNavigate } from "react-router-dom";

import banner from "assets/imgs/aboutUs-banner-1.jpg";
import icon1 from "assets/imgs/dog-icon.svg";
import icon2 from "assets/imgs/icon2.svg";
import icon3 from "assets/imgs/icon3.svg";

function AboutUs() {
  const navigate = useNavigate();
  return (
    <Layout page={["about-us"]}>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Row className='mt-4' gutter={16} justify='center'>
          <Col>
            <div className='home__title font-semibold '>MONA SHOP</div>
            <img src={banner} alt='banner' className='w-full' />
            <div className='flex mt-4 gap-4'>
              <div className='flex-1 text-center text-base'>
                <img
                  className='mb-2 w-16 p-2 border-2 rounded-full cursor-pointer border-green-300 mx-auto'
                  src={icon1}
                  alt='icon1'
                />
                <div className=''>
                  Bạn là người yêu quý động vật,hãy đến Mona shop nơi cung cấp
                  các loại thú nuôi.Với đa dạng vật nuôi rất mong các bạn ghé
                  thăm và tìm kiếm được con vật bạn yêu thích,rất mong được phục
                  vụ quý khách.
                </div>
                <Button
                  type='primary'
                  className='rounded-2xl mt-2'
                  onClick={() => navigate("/products/pets")}
                >
                  Click me
                </Button>
              </div>
              <div className='flex-1 text-center text-base'>
                <img
                  className='mb-2 w-16 p-2 border-2 rounded-full cursor-pointer border-blue-300 mx-auto'
                  src={icon2}
                  alt='icon2'
                />
                <div className=''>
                  Chuyên cung cấp phụ kiện phong phú cho vật nuôi. Đa dạng các
                  loại đồ chơi an toàn và thú vị. Phụ kiện phù hợp cho từng loài
                  vật nuôi cụ thể. Mang đến sự tiện lợi và thoải mái cho thú
                  cưng của bạn.
                </div>
                <Button
                  type='primary'
                  className='rounded-2xl mt-2'
                  onClick={() => navigate("/products/accessories")}
                >
                  Click me
                </Button>
              </div>
              <div className='flex-1 text-center text-base'>
                <img
                  className='mb-2 w-16 p-2 border-2 rounded-full cursor-pointer border-orange-300 mx-auto'
                  src={icon3}
                  alt='icon3'
                />
                <div className=''>
                  Chuyên cung cấp các loại thức ăn cho vật nuôi đa dang phong
                  phú.
                </div>
                <div className=''>
                  Cung cấp phụ kiện,đồ chơi cho từng loài vật nuôi khác nhau.
                </div>
                <Button
                  type='primary'
                  className='rounded-2xl mt-2'
                  onClick={() => navigate("/products/foods")}
                >
                  Click me
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default AboutUs;
