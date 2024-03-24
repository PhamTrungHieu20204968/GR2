import React from "react";
import { Button, Col, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";

import { useGetAllProductsByCategoryQuery } from "app/api/productService";

function ListCard({ category }) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllProductsByCategoryQuery({
    name: category,
  });
  if (isLoading) {
    <Spin />;
  }
  const handleOnclick = () => {
    if (data?.[0].category.name === "PHỤ KIỆN") {
      navigate("products/accessories");
    } else if (data?.[0].category.name === "ĐỒ ĂN") {
      navigate("products/foods");
    } else navigate("products/pets");
    window.scrollTo(0, 0);
  };
  return (
    <div className='list-card w-full'>
      {data?.length > 0 ? (
        <div>
          <Row gutter={[16, 16]}>
            {data?.map(
              (item, i) =>
                i < 8 && (
                  <Col span={6} key={item.id}>
                    <ProductCard product={item}></ProductCard>
                  </Col>
                )
            )}
          </Row>
          <div className='mx-auto my-8 w-full flex justify-center'>
            <Button
              className='uppercase font-bold fly-in hover:drop-shadow-2xl'
              size='large'
              type='primary'
              onClick={handleOnclick}
            >
              Xem thêm
            </Button>
          </div>
        </div>
      ) : (
        <h2>Chưa có sản phẩm nào</h2>
      )}
    </div>
  );
}

export default ListCard;
