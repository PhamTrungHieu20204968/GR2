import React from "react";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";

function ListCard({ list }) {
  const navigate = useNavigate();
  const handleOnclick = () => {
    if (list?.[0].category.name === "PHỤ KIỆN") {
      navigate("products/accessories");
    } else if (list?.[0].category.name === "ĐỒ ĂN") {
      navigate("products/foods");
    } else navigate("products/pets");
    window.scrollTo(0, 0);
  };

  return (
    <div className='list-card w-full'>
      <Row gutter={16}>
        {list?.reverse().map(
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
  );
}

export default ListCard;
