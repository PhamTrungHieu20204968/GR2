import React from "react";
import { Row, Col } from "antd";

import Sidebar from "../components/Sidebar";
import SalesChart from "../components/SalesChart";
import TopTable from "../components/TopTable";

function HomeAdmin() {
  return (
    <div className='w-full h-screen overflow-y-auto overflow-x-hidden'>
        <Row gutter={16} className='pr-4'>
          <Col span={6}>
            <Sidebar SelectedKey='6' OpenKeys={[]}></Sidebar>
          </Col>
          <Col span={18}>
            <Row className='my-8' gutter={16}>
              <Col span={12}>
                <SalesChart />
              </Col>
              <Col span={12}>
                <TopTable />
              </Col>
            </Row>
          </Col>
        </Row>
      <div className='container mx-auto mt-8 overflow-hidden'>
      </div>
    </div>
  );
}

export default HomeAdmin;
