import React from "react";
import { Col, Row } from "antd";

import Sidebar from "../components/Sidebar";

const HomeAdmin = () => {
  return (
    <div className='w-full'>
      <Row>
        <Col span={6}>
          <Sidebar></Sidebar>
        </Col>
        <Col span={18}>Content</Col>
      </Row>
    </div>
  );
};

export default HomeAdmin;
