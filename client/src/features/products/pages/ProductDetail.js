import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Button, Tabs, Spin, InputNumber, Image } from "antd";
import { StarFilled, FacebookOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import Layout from "components/Layout";
import ProductDescription from "../components/ProductDescription";
import ProductRates from "../components/ProductRates";
import ListCard from "components/ListCard";
import { useGetProductByNameQuery } from "app/api/productService";
import { addToCart } from "app/slices/cartSlice";
import { useGetProductRatesQuery } from "app/api/rateService";
import { FacebookShareButton } from "react-share";

function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading } = useGetProductByNameQuery({
    name: params.name,
  });
  const { data: rates } = useGetProductRatesQuery(data?.id);
  const [preview, setPreview] = useState(data?.images[0].url);
  if (isLoading) {
    <Spin />;
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...data,
        orderQuantity: quantity,
      })
    );
  };
  return (
    <Layout>
      <div className='container mx-auto pt-3 h-full'>
        <div className='uppercase text-xl'>
          <Link to='/' className='text-gray-400 hover:text-black font-bold'>
            {language === "vi" ? "Trang chủ" : "ホーム"}
          </Link>
          <span className='mx-2 text-gray-400'>/</span>
          {params.category === "pets" && (
            <Link
              to='/products/pets'
              className=' text-gray-400 hover:text-black font-bold'
            >
              {language === "vi" ? "Thú cưng" : "ペット"}
            </Link>
          )}
          {params.category === "foods" && (
            <Link
              to='/products/foods'
              className=' text-gray-400 hover:text-black font-bold'
            >
              {language === "vi" ? "Đồ ăn" : "料理"}
            </Link>
          )}
          {params.category === "accessories" && (
            <Link
              to='/products/accessories'
              className=' text-gray-400 hover:text-black font-bold'
            >
              {language === "vi" ? "Phụ kiện" : "アクセサリー"}
            </Link>
          )}
          <span className='mx-2 text-gray-400'>/</span>
          <span className=' font-bold'>{params.name}</span>
        </div>
        <Row className='mt-4' gutter={16}>
          <Col span={8}>
            <div className='w-full flex justify-center'>
              <Image
                className='product-img rounded-lg shadow-lg'
                src={preview?.url || data?.images[0].url}
                fallback='data:image/png;base64,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'
              />
            </div>
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
                <span className='mr-2'>
                  {language === "vi" ? "Giá:" : "値段："}
                </span>
                <b>
                  {parseFloat(data?.price).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </b>
              </div>
              <div>
                <span className='mr-2 '>
                  {language === "vi"
                    ? `Đánh giá(${rates?.length}):`
                    : `評価(${rates?.length}):`}
                </span>
                {rates?.length > 0 ? (
                  <span className='text-xl'>
                    {rates?.reduce((total, item) => {
                      return total + item.rate;
                    }, 0) / rates?.length}
                    <StarFilled className=' text-yellow-300 ml-1' />
                  </span>
                ) : language === "vi" ? (
                  "Chưa có đánh giá"
                ) : (
                  "評価がない"
                )}
              </div>
            </div>
            <div className='description-text text-lg mt-2 border-2 p-2'>
              {data?.descriptions[0].description}
            </div>
            <div className='mt-4 text-lg flex items-center'>
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
                    message:
                      language === "vi"
                        ? "Vui lòng nhập số lượng"
                        : "数量を入力してください",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message:
                      language === "vi"
                        ? "Vui lòng nhập đúng số lượng"
                        : "数字だけ入力してください",
                  },
                ]}
                onChange={(value) => setQuantity(value)}
                className={
                  quantity < 10 ? "w-10 h-10 mx-4 p-1" : "w-12 h-10 mx-4 p-1"
                }
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

              <Button
                className='ml-4'
                size='large'
                type='primary'
                onClick={handleAddToCart}
              >
                {language === "vi" ? "Thêm sản phẩm" : "カートに追加"}
              </Button>
            </div>
            <div className='mt-4'>
              <FacebookShareButton url={`${window.location.href}`}>
                <button
                  className='bg-blue-500 p-2 rounded-md text-white custom-btn hover:bg-[#4096ff] w-full'
                  type='button'
                >
                  <FacebookOutlined className='mr-1' />
                  {language === "vi" ? "Chia sẻ" : "シェア"}
                </button>
              </FacebookShareButton>
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
              let label;
              if (i === 0) {
                if (language === "vi") label = "Mô tả";
                else label = "説明";
              } else {
                if (language === "vi") label = "Đánh giá";
                else label = "レート";
              }
              return {
                label,
                key: id,
                children:
                  i === 0 ? (
                    <ProductDescription descriptions={data?.descriptions} />
                  ) : (
                    <ProductRates productId={data?.id} rates={rates} />
                  ),
              };
            })}
          />
        </Row>

        <Row gutter={[16, 24]}>
          <div className='my-4 w-full text-3xl font-bold'>
            {language === "vi" ? " Sản phẩm tương tự" : "同様の製品"}
          </div>
          <ListCard
            category={params.category}
            quantity={4}
            id={data?.id}
          ></ListCard>
        </Row>
      </div>
    </Layout>
  );
}

export default ProductDetail;
