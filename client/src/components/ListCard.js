import React from "react";
import { Button, Col, Row } from "antd";

import ProductCard from "./ProductCard";

function ListCard() {
  return (
    <div className='list-card w-full'>
      <Row gutter={16}>
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
