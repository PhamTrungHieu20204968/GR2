import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Select, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import Layout from 'components/Layout';
import SideBar from '../components/SideBar';
import ProductCard from 'components/ProductCard';
import { useGetAllProductsByCategoryQuery } from 'app/api/productService';
import { setOrder, setMaxPrice, clearFilter } from 'app/slices/filterSlice';

function Products() {
  const params = useParams();
  const filter = useSelector((state) => state.filter);
  const { language } = useSelector((state) => state.auth);
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
      }, '0');
      dispatch(setMaxPrice(parseFloat(_maxPrice)));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (params.category !== 'pets') {
      dispatch(
        clearFilter({
          category: '',
          price: [0, 100],
          order: 0,
          maxPrice: 100,
        })
      );
    }
  }, [dispatch, params]);
  return (
    <Layout page={['products', params.category]}>
      <div className="container mx-auto pt-3 h-full">
        <div className="flex justify-between">
          <div className="uppercase text-xl">
            <Link to="/" className="text-gray-400 font-bold hover:text-black">
              {language === 'vi' ? 'Trang chủ' : 'ホーム'}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            {params.category === 'pets' && (
              <span className=" font-bold">
                {language === 'vi' ? 'Thú cưng' : 'ペット'}
              </span>
            )}
            {params.category === 'foods' && (
              <span className=" font-bold">
                {language === 'vi' ? 'Đồ ăn' : '料理'}
              </span>
            )}
            {params.category === 'accessories' && (
              <span className=" font-bold">
                {language === 'vi' ? 'Phụ kiện' : 'アクセサリー'}
              </span>
            )}
          </div>
          <div className="options">
            <Select
              value={filter.order}
              style={{
                width: 240,
              }}
              onChange={handleChangeOrder}
              options={[
                {
                  value: 0,
                  label: (
                    <span>
                      {language === 'vi' ? 'Thứ tự mặc định' : 'デフォルト'}
                    </span>
                  ),
                },
                {
                  value: 1,
                  label: (
                    <span>
                      {language === 'vi' ? 'Thứ tự theo giá: Giảm dần' : '降順'}
                    </span>
                  ),
                },
                {
                  value: 2,
                  label: (
                    <span>
                      {language === 'vi' ? 'Thứ tự theo giá: Tăng dần' : '昇順'}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <Row className="mt-4" gutter={16}>
          <Col span={6} className="sidebar">
            <SideBar filter={filter} data={data}></SideBar>
          </Col>
          <Col span={18} className="content">
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
                        (parseFloat(item.salePrice || item.price) * 100) /
                          filter.maxPrice <
                          filter.price[0] ||
                        (parseFloat(item.salePrice || item.price) * 100) /
                          filter.maxPrice >
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
                          ? parseFloat(a.salePrice || a.price) -
                            parseFloat(b.salePrice || b.price)
                          : parseFloat(b.salePrice || b.price) -
                            parseFloat(a.salePrice || a.price)
                      )
                      .map((item) => {
                        if (
                          filter.category &&
                          item.category.name !== filter.category.toUpperCase()
                        ) {
                          return <></>;
                        }
                        if (
                          (parseFloat(item.salePrice || item.price) * 100) /
                            filter.maxPrice <
                            filter.price[0] ||
                          (parseFloat(item.salePrice || item.price) * 100) /
                            filter.maxPrice >
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
                <span>
                  {language === 'vi'
                    ? 'Không tìm thấy sản phẩm nào'
                    : '何もない'}
                </span>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Products;
