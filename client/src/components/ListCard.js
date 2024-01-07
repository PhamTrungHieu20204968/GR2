import React from "react";
import { Button } from "antd";

import ProductCard from "./ProductCard";

function ListCard() {
  return (
    <div className='list-card w-full'>
      <div className='flex justify-between w-full'>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
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
