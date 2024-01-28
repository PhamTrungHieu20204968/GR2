import React from "react";
import Search from "antd/es/input/Search";
import { Button, Slider } from "antd";

function SideBar({ setPriceValue, priceValue }) {
  const onChangePrice = (newValue) => {
    setPriceValue(newValue);
  };

  return (
    <div className='w-full p-4 border-2'>
      <Search
        placeholder='Tên sản phẩm'
        allowClear
        // onSearch={onSearch}
        className='w-full'
      />

      <div className='font-bold relative uppercase py-4 before:bottom-0 before:absolute before:content-[""] before:w-1/6 before:h-1 before:bg-gray-200'>
        DANH MỤC SẢN PHẨM
      </div>
      <div className='w-full mt-4 p-4 border-2'>
        <ul>
          <li className='hover:text-pink-500 cursor-pointer py-2'>Chó cảnh</li>
          <li className='hover:text-pink-500 cursor-pointer py-2 border-t-2'>
            Mèo cảnh
          </li>
        </ul>
      </div>

      <div className='font-bold relative uppercase py-4 before:bottom-0 before:absolute before:content-[""] before:w-1/6 before:h-1 before:bg-gray-200'>
        LỌC THEO GIÁ
      </div>
      <div className='w-full mt-4'>
        <Slider
          range
          defaultValue={[20, 50]}
          onChange={onChangePrice}
          tooltip={{
            formatter: null,
          }}
        />
        <div className='flex justify-between items-center'>
          <Button type='primary'>Lọc</Button>

          <div>
            Giá: <b>{priceValue[0] + " - " + priceValue[1]}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
