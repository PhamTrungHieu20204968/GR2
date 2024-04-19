import React from "react";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";

import ProductCard from "components/ProductCard";
import { useGetSimilarProductsQuery } from "app/api/productService";

function ReCommentProducts() {
  const { accessToken } = useSelector((state) => state.auth);
  const { data } = useGetSimilarProductsQuery({
    headers: {
      accessToken,
    },
  });

  console.log(data);
  return (
    <div>
      {!data || data.error ? (
        <></>
      ) : (
        <section className='container mx-auto mt-8 overflow-hidden'>
          <div className='home__title fly-in'>Sản phẩm gợi ý</div>
          <Row gutter={[16, 16]}>
            {data.map((item, i) => (
              <Col span={6} key={item.id}>
                <ProductCard product={item} key={item.id}></ProductCard>
              </Col>
            ))}
          </Row>
        </section>
      )}
    </div>
  );
}

export default ReCommentProducts;
