import React from "react";
import { Col, Result, Row, Spin } from "antd";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import CreateForm from "../components/CreateProductForm";
import { useGetProductQuery } from "app/api/productService";

function UpdateProduct() {
  const params = useParams();
  const { data, isError, isLoading } = useGetProductQuery(params.id);

  if (isLoading) {
    <Spin />;
  }

  return (
    <div className='w-full h-screen overflow-y-auto overflow-x-hidden'>
      <Row gutter={16} className='pr-4'>
        <Col span={6}>
          <Sidebar SelectedKey='99' OpenKeys={["sub2"]}></Sidebar>
        </Col>
        <Col span={18}>
          {isError ? (
            <Result
              status='500'
              title='500'
              subTitle='Không thể kết nối đến Server.'
            />
          ) : (
            <CreateForm key={data?.id} product={data} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default UpdateProduct;
