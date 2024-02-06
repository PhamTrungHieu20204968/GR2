import React from "react";
import { Button, Col, Row } from "antd";

import ProductCard from "./ProductCard";

function ListCard({ list }) {
  return (
    <div className='list-card w-full'>
      <Row gutter={16}>
        {list?.map((item) => (
          <Col span={6} key={item.id}>
            <ProductCard product={item}></ProductCard>
          </Col>
        ))}
      </Row>
      <div className='mx-auto my-8 w-full flex justify-center'>
        <Button
          className='uppercase font-bold fly-in hover:drop-shadow-2xl'
          size='large'
          type='primary'
        >
          Xem thêm
        </Button>
      </div>
    </div>
  );
}

export default ListCard;
