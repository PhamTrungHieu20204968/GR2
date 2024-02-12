import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Rate, Button, Tabs, Spin, InputNumber } from "antd";

import Layout from "components/Layout";
import ProductDescription from "../components/ProductDescription";
import ProductRates from "../components/ProductRates";
import ProductCard from "components/ProductCard";
import { useGetProductByNameQuery } from "app/api/productService";

function ProductDetail() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data, isError, isLoading } = useGetProductByNameQuery({
    name: params.name,
  });
  const [preview, setPreview] = useState(data?.images[0].url);
  if (isLoading) {
    <Spin />;
  }
  console.log(data);
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
              src={preview?.url || data?.images[0].url}
              alt='img'
            />

            <div className='w-full flex mt-4'>
              {data?.images.map((item, index) => {
                if (!preview && index === 0) return <></>;
                return (
                  item.url !== preview?.url && (
                    <img
                      key={item.id}
                      className='w-16 duration-300 last:mr-0 mr-4 h-auto rounded-sm contrast-50 hover:contrast-100 cursor-pointer'
                      src={item.url}
                      alt='img'
                      onClick={() => setPreview(item)}
                    />
                  )
                );
              })}
            </div>
          </Col>
          <Col span={16}>
            <h1 className='text-3xl font-bold'>{params.name}</h1>
            <div className='w-full flex justify-between text-lg mt-2'>
              <div>
                <span className='mr-2'>Giá:</span>
                <b>
                  {parseFloat(data?.price).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </b>
              </div>
              <div>
                <span className='mr-2'>Đánh giá:</span>
                <Rate disabled defaultValue={2} />
              </div>
            </div>
            <div className='description-text text-lg mt-2 border-2 p-2'>
              {data?.descriptions[0].description}
            </div>
            <div className='mt-4 text-lg'>
              <Button
                size='large'
                type='default'
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </Button>
              <InputNumber
                min={1}
                max={99}
                value={quantity}
                controls={false}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số số lượng!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Vui lòng nhập đúng số lượng!",
                  },
                ]}
                onChange={(value) => setQuantity(value)}
                className='w-10 h-10 mx-4'
              />
              <Button
                size='large'
                type='default'
                onClick={() =>
                  setQuantity((prev) => (prev === 99 ? 99 : prev + 1))
                }
              >
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
                children:
                  i === 0 ? (
                    <ProductDescription descriptions={data?.descriptions} />
                  ) : (
                    <ProductRates />
                  ),
              };
            })}
          />
        </Row>

        {/* <Row gutter={[16, 24]}>
          <div className='my-4 w-full text-3xl font-bold'>
            Sản phẩm tương tự
          </div>
          <Col span={6}>
            <ProductCard></ProductCard>
          </Col>
        </Row> */}
      </div>
    </Layout>
  );
}

export default ProductDetail;
