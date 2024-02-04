import React from "react";
import { Rate, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

import UserRate from "./UserRate";
function ProductRates() {
  return (
    <div className='text-lg p-4'>
      <div>
        <UserRate></UserRate>
      </div>

      <div className='mt-4 text-lg'>
        <span className='mr-4'>Đánh giá của bạn :</span>
        <Rate defaultValue={2} />
        <TextArea
          className='mt-4 p-2'
          rows={4}
          placeholder='Nội dung đánh giá'
        />
        <Button className='mt-4' type='primary'>
          Gửi
        </Button>
      </div>
    </div>
  );
}

export default ProductRates;
