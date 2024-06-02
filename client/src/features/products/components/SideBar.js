import React from "react";
import { Button, Slider } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setCategory, setPrice, clearFilter } from "app/slices/filterSlice";

function SideBar({ filter, data }) {
  const params = useParams();
  const { language } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onChangePrice = (newValue) => {
    dispatch(setPrice(newValue));
  };

  const handleSelectCategory = (c) => {
    if (c === filter.category) {
      dispatch(setCategory(""));
    } else {
      dispatch(setCategory(c));
    }
  };
  const handleClearFilter = () => {
    dispatch(
      clearFilter({
        category: "",
        price: [0, 100],
        order: 0,
        maxPrice: 100,
      })
    );
  };
  return (
    <div className='w-full p-4 border-2'>
      {params.category === "pets" ? (
        <div>
          <div className='font-bold relative uppercase py-4 before:bottom-0 before:absolute before:content-[""] before:w-1/6 before:h-1 before:bg-gray-200'>
            {language === "vi" ? "DANH MỤC SẢN PHẨM" : "製品カテゴリー"}
          </div>
          <div className='w-full mt-4 p-4 border-2'>
            <ul>
              <li
                onClick={() => handleSelectCategory("Chó cảnh")}
                className='flex justify-between items-center border-b-2 last:border-b-0'
              >
                <span
                  className={
                    filter.category === "Chó cảnh"
                      ? "text-pink-500 cursor-pointer py-2"
                      : "hover:text-pink-500 cursor-pointer py-2"
                  }
                >
                  {language === "vi" ? "Chó cảnh" : "ワンちゃん"}{" "}
                </span>
                <div className='bg-pink-500 text-white p-1 text-xs rounded-2xl'>
                  {
                    data?.filter((item) => item.category.name === "CHÓ CẢNH")
                      .length
                  }
                </div>
              </li>
              <li
                onClick={() => handleSelectCategory("Mèo cảnh")}
                className='flex justify-between items-center border-b-2 last:border-b-0'
              >
                <span
                  className={
                    filter.category === "Mèo cảnh"
                      ? "text-pink-500 cursor-pointer py-2"
                      : "hover:text-pink-500 cursor-pointer py-2"
                  }
                >
                  {language === "vi" ? "Mèo cảnh" : "ネコちゃん"}
                </span>
                <div className='bg-pink-500 text-white p-1 text-xs rounded-2xl'>
                  {
                    data?.filter((item) => item.category.name === "MÈO CẢNH")
                      .length
                  }
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className='font-bold relative uppercase py-4 before:bottom-0 before:absolute before:content-[""] before:w-1/6 before:h-1 before:bg-gray-200'>
        {language === "vi" ? "LỌC THEO GIÁ" : "価格でフィルター"}
      </div>
      <div className='w-full mt-4'>
        <Slider
          range
          value={filter.price}
          onChange={onChangePrice}
          tooltip={{
            formatter: null,
          }}
        />
        <div className='flex flex-col gap-3'>
          <div>
            Giá:{" "}
            {filter.price[0] > 0 ? (
              <b>
                {((filter.price[0] * filter.maxPrice) / 100).toLocaleString(
                  "vi",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
              </b>
            ) : (
              <b>0đ</b>
            )}
            <b> - </b>
            {filter.price[1] > 0 ? (
              <b>
                {((filter.price[1] * filter.maxPrice) / 100).toLocaleString(
                  "vi",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
              </b>
            ) : (
              <b>0đ</b>
            )}
          </div>
          <div>
            <Button className='mr-4' type='primary'>
              {language === "vi" ? "Lọc" : "フィルター"}
            </Button>
            <Button onClick={handleClearFilter} type='default'>
              {language === "vi" ? "Xóa" : "リセット"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
