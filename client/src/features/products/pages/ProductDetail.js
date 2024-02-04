import React from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Rate, Input, Button, Tabs } from "antd";

import Layout from "components/Layout";
import ProductDescription from "../components/ProductDescription";
import ProductRates from "../components/ProductRates";
import ProductCard from "components/ProductCard";

function ProductDetail() {
  const params = useParams();
  console.log(params.name);
  return (
    <Layout>
      <div className='container mx-auto pt-3 h-full'>
        <div className='uppercase text-xl'>
          <Link to='/' className='text-gray-400 hover:text-black font-bold'>
            Trang chủ
          </Link>
          <span className='mx-2 text-gray-400'>/</span>
          {params.category === "pets" && (
            <Link
              to='/products/pets'
              className=' text-gray-400 hover:text-black font-bold'
            >
              Thú cưng
            </Link>
          )}
          {params.category === "foods" && (
            <Link
              to='/products/foods'
              className=' text-gray-400 hover:text-black font-bold'
            >
              Đồ ăn
            </Link>
          )}
          {params.category === "accessories" && (
            <Link
              to='/products/accessories'
              className=' text-gray-400 hover:text-black font-bold'
            >
              Phụ kiện
            </Link>
          )}
          <span className='mx-2 text-gray-400'>/</span>
          <span className=' font-bold'>{params.name}</span>
        </div>
        <Row className='mt-4' gutter={16}>
          <Col span={8}>
            <img
              className='product-img rounded-lg shadow-lg'
              src='https://mauweb.monamedia.net/dogcatshop/wp-content/uploads/2018/04/8-300x300.jpg'
              alt='img'
            />

            <div className='w-full flex mt-4'>
              <img
                className='w-16 duration-300 last:mr-0 mr-4 h-auto rounded-sm contrast-50 hover:contrast-100 cursor-pointer'
                src='https://mauweb.monamedia.net/dogcatshop/wp-content/uploads/2018/04/8-300x300.jpg'
                alt='img'
              />
              <img
                className='w-16 duration-300 last:mr-0 mr-4 h-auto rounded-sm contrast-50 hover:contrast-100 cursor-pointer'
                src='https://mauweb.monamedia.net/dogcatshop/wp-content/uploads/2018/04/8-300x300.jpg'
                alt='img'
              />
            </div>
          </Col>
          <Col span={16}>
            <h1 className='text-3xl font-bold'>{params.name}</h1>
            <div className='w-full flex justify-between text-lg mt-2'>
              <div>
                <span className='mr-2'>Giá:</span>
                <b>23456đ</b>
              </div>
              <div>
                <span className='mr-2'>Đánh giá:</span>
                <Rate disabled defaultValue={2} />
              </div>
            </div>
            <div className='description-text text-lg mt-2 border-2 p-2'>
              75.360 lượt xem 29 thg 11, 2023 #nhaclofi #nhacchill #lofichill ☘️
              TOP 20 Bản Nhạc Lofi Chill 2023 Nhạc Lofi Chill Buồn Nhẹ Nhàng -
              Nhạc Lofi Hot TikTok 2023 • Hashtag: nhạc lofi, nhạc lofi chill,
              lofi chill, nhạc chill, chill, lofi, chill lofi nhac, nhạc, nhac
              chill, nhạc chill tiktok, nhạc hay, nhac hay, nhạc chill tiktok,
              nhạc suy, nhạc ballad, nhạc tiktok, nhac tiktok ► Theo dõi fanpage
              Facebook: https://dini.to/orinnfacebook ✉ Hợp tác, quảng cáo,
              khiếu nại các vấn đề về bản quyền liên hệ chúng tôi qua mail:
              contact@orinn.net ✪ More about Mùa Đi Ngang Phố • Facebook:
              https://fb.com/Muadingangphoofficial ✪ Photo By Le Tin Nghia hill,
              nhạc chill tiktok, nhạc hay, nhac hay, nhạc chill tiktok, nhạc
              suy, nhạc ballad, nhạc tiktok, nhac tiktok ► Theo dõi fanpage
              Facebook: https://dini.to/orinnfacebook ✉ Hợp tác, quảng cáo,
              khiếu nại các vấn đề về bản quyền liên hệ chúng tôi qua mail:
            </div>
            <div className='mt-4 text-lg'>
              <Button size='large' type='default'>
                -
              </Button>
              <Input defaultValue={1} value={10} className='w-10 h-10 mx-4' />
              <Button size='large' type='default'>
                +
              </Button>

              <Button className='ml-4' size='large' type='primary'>
                Thêm sản phẩm
              </Button>
            </div>
          </Col>
        </Row>

        <Row className='mt-4' gutter={16}>
          <Tabs
            className='w-full'
            defaultActiveKey='1'
            type='card'
            items={new Array(2).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: i === 0 ? "Mô tả" : "Đánh giá",
                key: id,
                children: i === 0 ? <ProductDescription /> : <ProductRates />,
              };
            })}
          />
        </Row>

        <Row gutter={[16, 24]}>
        <div className='my-4 w-full text-3xl font-bold'>
            Sản phẩm tương tự
          </div>
          <Col span={6}>
            <ProductCard></ProductCard>
          </Col>
          <Col span={6}>
            <ProductCard></ProductCard>
          </Col>
          <Col span={6}>
            <ProductCard></ProductCard>
          </Col>
          <Col span={6}>
            <ProductCard></ProductCard>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default ProductDetail;
