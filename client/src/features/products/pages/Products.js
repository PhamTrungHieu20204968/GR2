import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Select, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";

import Layout from "components/Layout";
import SideBar from "../components/SideBar";
import ProductCard from "components/ProductCard";
import { useGetAllProductsByCategoryQuery } from "app/api/productService";
import { setOrder, setMaxPrice } from "app/slices/filterSlice";

function Products() {
  const params = useParams();
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllProductsByCategoryQuery({
    name: params.category,
  });
  if (isLoading) {
    <Spin />;
  }

  const handleChangeOrder = (value) => {
    switch (value) {
      case 1:
        dispatch(setOrder(1));
        break;
      case 2:
        dispatch(setOrder(2));
        break;
      default:
        dispatch(setOrder(0));
        break;
    }
  };

  useEffect(() => {
    if (data) {
      const _maxPrice = data.reduce((max, item) => {
        return parseFloat(item.price) > parseFloat(max) ? item.price : max;
      }, "0");
      dispatch(setMaxPrice(parseFloat(_maxPrice)));
    }
  }, [data, dispatch]);
  return (
    <Layout page={["products", params.category]}>
      <div className='container mx-auto pt-3 h-full'>
        <div className='flex justify-between'>
          <div className='uppercase text-xl'>
            <Link to='/' className='text-gray-400 font-bold hover:text-black'>
              Trang chủ
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            {params.category === "pets" && (
              <span className=' font-bold'>Thú cưng</span>
            )}
            {params.category === "foods" && (
              <span className=' font-bold'>Đồ ăn</span>
            )}
            {params.category === "accessories" && (
              <span className=' font-bold'>Phụ kiện</span>
            )}
          </div>
          <div className='options'>
            <Select
              value={filter.order}
              style={{
                width: 240,
              }}
              onChange={handleChangeOrder}
              options={[
                {
                  value: 0,
                  label: "Thứ tự mặc định",
                },
                {
                  value: 1,
                  label: "Thứ tự theo giá: Giảm dần",
                },
                {
                  value: 2,
                  label: "Thứ tự theo giá: Tăng dần",
                },
              ]}
            />
          </div>
        </div>
        <Row className='mt-4' gutter={16}>
          <Col span={6} className='sidebar'>
            <SideBar filter={filter}></SideBar>
          </Col>
          <Col span={18} className='content'>
            {data?.length > 0 ? (
              <Row gutter={[16, 24]}>
                {filter.order === 0
                  ? data?.map((item) => {
                      if (
                        filter.category &&
                        item.category.name !== filter.category.toUpperCase()
                      ) {
                        return <></>;
                      }
                      if (
                        (parseFloat(item.price) * 100) / filter.maxPrice <
                          filter.price[0] ||
                        (parseFloat(item.price) * 100) / filter.maxPrice >
                          filter.price[1]
                      ) {
                        return <></>;
                      }
                      return (
                        <Col span={8} key={item.id}>
                          <ProductCard product={item}></ProductCard>
                        </Col>
                      );
                    })
                  : data
                      ?.slice()
                      .sort((a, b) =>
                        filter.order === 2
                          ? parseFloat(a.price) - parseFloat(b.price)
                          : parseFloat(b.price) - parseFloat(a.price)
                      )
                      .map((item) => {
                        if (
                          filter.category &&
                          item.category.name !== filter.category.toUpperCase()
                        ) {
                          return <></>;
                        }
                        if (
                          (parseFloat(item.price) * 100) / filter.maxPrice <
                            filter.price[0] ||
                          (parseFloat(item.price) * 100) / filter.maxPrice >
                            filter.price[1]
                        ) {
                          return <></>;
                        }
                        return (
                          <Col span={8} key={item.id}>
                            <ProductCard product={item}></ProductCard>
                          </Col>
                        );
                      })}
              </Row>
            ) : (
              <Row>
                <span>Không tìm thấy sản phẩm nào</span>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Products;
