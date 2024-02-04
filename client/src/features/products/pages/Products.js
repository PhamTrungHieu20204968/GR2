import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Select, Pagination } from "antd";

import Layout from "components/Layout";
import SideBar from "../components/SideBar";
import ProductCard from "components/ProductCard";
function Products() {
  const params = useParams();
  const [priceValue, setPriceValue] = useState([20, 50]);

  return (
    <Layout>
      <div className='container mx-auto pt-3 h-full'>
        <div className='flex justify-between'>
          <div className='uppercase text-xl'>
            <Link to='/' className='text-gray-400 font-bold hover:text-black'>
              Trang chủ
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            {params.category === "pets" && (
              <span className=' font-bold'>Thú cưng</span>
            )}
            {params.category === "foods" && (
              <span className=' font-bold'>Đồ ăn</span>
            )}
            {params.category === "accessories" && (
              <span className=' font-bold'>Phụ kiện</span>
            )}
          </div>
          <div className='options'>
            <span className='mr-4'>Xem tất cả 9 kết quả</span>
            <Select
              defaultValue='Thứ tự mặc định'
              style={{
                width: 240,
              }}
              //   onChange={handleChange}
              options={[
                {
                  value: 0,
                  label: "Thứ tự mặc định",
                },
                {
                  value: 1,
                  label: "Thứ tự theo giá: từ cao đến thấp",
                },
                {
                  value: 2,
                  label: "Thứ tự theo giá: từ thấp đến cao",
                },
              ]}
            />
          </div>
        </div>
        <Row className='mt-4' gutter={16}>
          <Col span={6} className='sidebar'>
            <SideBar
              priceValue={priceValue}
              setPriceValue={setPriceValue}
            ></SideBar>
          </Col>
          <Col span={18} className='content'>
            <Row gutter={[16, 24]}>
              <Col span={8}>
                <ProductCard></ProductCard>
              </Col>
              <Col span={8}>
                <ProductCard></ProductCard>
              </Col>
              <Col span={8}>
                <ProductCard></ProductCard>
              </Col>
              <Col span={24} className='w-full flex justify-end'>
                <Pagination defaultCurrent={1} total={50} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Products;
