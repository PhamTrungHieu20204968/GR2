import React from "react";
import { Button, Col, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";

import { useGetAllProductsByCategoryQuery } from "app/api/productService";

function ListCard({ category, quantity = 8, id = 0 }) {
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
            {data
              ?.filter((item) => item.id !== id)
              .map(
                (item, i) =>
                  i < quantity && (
                    <Col span={6} key={item.id}>
                      <ProductCard product={item} key={item.id}></ProductCard>
                    </Col>
                  )
              )}
          </Row>
          <div className='mx-auto my-8 w-full flex justify-center'>
            {quantity === 8 && (
              <Button
                className='uppercase font-bold fly-in hover:drop-shadow-2xl'
                size='large'
                type='primary'
                onClick={handleOnclick}
              >
                Xem thêm
              </Button>
            )}
          </div>
        </div>
      ) : (
        <h2>Chưa có sản phẩm nào</h2>
      )}
    </div>
  );
}

export default ListCard;
