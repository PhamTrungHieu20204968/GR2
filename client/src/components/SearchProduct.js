import React, { useState } from "react";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import ProductItem from "./ProductItem";

import { useGetAllProductsQuery } from "app/api/productService";

function SearchProduct() {
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetAllProductsQuery({
    accessToken: JSON.parse(localStorage.getItem("token")),
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
              item.name.toUpperCase().includes(searchInput.trim().toUpperCase())
            )
              return <ProductItem product={item} key={item.id}></ProductItem>;
          })}
      </div>
    </div>
  );
}

export default SearchProduct;
