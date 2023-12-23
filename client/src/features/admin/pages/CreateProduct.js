import React from "react";
import { Col, Row } from "antd";

import Sidebar from "../components/Sidebar";
import CreateForm from "../components/CreateProductForm";

function CreateProduct() {
  return (
    <div className='w-full h-screen overflow-y-auto overflow-x-hidden'>
      <Row gutter={16} className='pr-4'>
        <Col span={6}>
          <Sidebar SelectedKey='3' OpenKeys={["sub2"]}></Sidebar>
        </Col>
        <Col span={18}>
          <CreateForm />
        </Col>
      </Row>
    </div>
  );
}

export default CreateProduct;
