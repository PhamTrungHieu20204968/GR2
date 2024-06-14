import { Button, Col, Row } from "antd";
import Layout from "components/Layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import banner from "assets/imgs/aboutUs-banner-1.jpg";
import icon1 from "assets/imgs/dog-icon.svg";
import icon2 from "assets/imgs/icon2.svg";
import icon3 from "assets/imgs/icon3.svg";

function AboutUs() {
  const { language } = useSelector((state) => state.auth);
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
                  {language === "vi"
                    ? " Bạn là người yêu quý động vật,hãy đến Mona shop nơi cung cấp　các loại thú nuôi.Với đa dạng vật nuôi rất mong các bạn ghé　thăm và tìm kiếm được con vật bạn yêu thích,rất mong được phục　vụ quý khách."
                    : "動物が大好きな方は、ぜひMona Shopにお越しください。ここでは様々な種類のペットを提供しています。多種多様なペットが揃っていますので、お気に入りの動物がきっと見つかることでしょう。皆様のご来店を心よりお待ちしております。"}
                </div>
                <Button
                  type='primary'
                  className='rounded-2xl mt-2'
                  onClick={() => navigate("/products/pets")}
                >
                  {language === "vi" ? "Click me" : "ここをクリック"}
                </Button>
              </div>
              <div className='flex-1 text-center text-base'>
                <img
                  className='mb-2 w-16 p-2 border-2 rounded-full cursor-pointer border-blue-300 mx-auto'
                  src={icon2}
                  alt='icon2'
                />
                <div className=''>
                  {language === "vi"
                    ? "Chuyên cung cấp phụ kiện phong phú cho vật nuôi. Đa dạng các　loại đồ chơi an toàn và thú vị. Phụ kiện phù hợp cho từng loài　vật nuôi cụ thể. Mang đến sự tiện lợi và thoải mái cho thú　cưng của bạn."
                    : "ペット用の豊富なアクセサリーを専門に取り扱っています。安全で楽しい様々な種類の玩具をご用意しています。各種ペットに適したアクセサリーを取り揃えています。あなたのペットに便利さと快適さをお届けします。"}
                </div>
                <Button
                  type='primary'
                  className='rounded-2xl mt-2'
                  onClick={() => navigate("/products/accessories")}
                >
                  {language === "vi" ? "Click me" : "ここをクリック"}
                </Button>
              </div>
              <div className='flex-1 text-center text-base'>
                <img
                  className='mb-2 w-16 p-2 border-2 rounded-full cursor-pointer border-orange-300 mx-auto'
                  src={icon3}
                  alt='icon3'
                />
                <div className=''>
                  {language === "vi"
                    ? "Chuyên cung cấp các loại thức ăn cho vật nuôi đa dang phong　phú."
                    : "ペット用の多種多様な食品を専門に提供しています。"}
                </div>
                <div className={language === "vi" ? "" : "my-6"}>
                  {language === "vi"
                    ? "Cung cấp phụ kiện,đồ chơi cho từng loài vật nuôi khác nhau."
                    : "各種ペットに適したアクセサリーやおもちゃを提供しています。"}
                </div>
                <Button
                  type='primary'
                  className='rounded-2xl mt-2'
                  onClick={() => navigate("/products/foods")}
                >
                  {language === "vi" ? "Click me" : "ここをクリック"}
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
