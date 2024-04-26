import React, { useState } from "react";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import ProductItem from "./ProductItem";

import { useGetAllProductsQuery } from "app/api/productService";

function SearchProduct() {
  const [searchInput, setSearchInput] = useState("");
  const { accessToken } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAllProductsQuery({
    accessToken,
  });

  if (isLoading) {
    return <Spin />;
  }
  return (
    <div className='w-80 max-h-[500px] overflow-y-auto'>
      <Input
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder='Nhập tên sản phẩm...'
        suffix={<SearchOutlined />}
      />
      <div className='mt-4 '>
        {searchInput.trim() &&
          data?.map((item) => {
            if (
              item.name
                .toUpperCase()
                .includes(searchInput.trim().toUpperCase()) &&
              item.category.name !== "QUÀ TẶNG"
            )
              return <ProductItem product={item} key={item.id}></ProductItem>;
            return <></>;
          })}
      </div>
    </div>
  );
}

export default SearchProduct;
