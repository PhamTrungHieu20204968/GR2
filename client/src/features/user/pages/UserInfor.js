import React, { useState } from "react";
import { Row, Col } from "antd";

import Layout from "components/Layout";
import SideBar from "../components/Sidebar";
import InforForm from "../components/InforForm";
import PasswordForm from "../components/PasswordForm";
import { useSelector } from "react-redux";
import { Spin } from "antd";

import { useGetUserQuery } from "app/api/userService";
import ListOrder from "../components/ListOrder";
function UserInfor() {
  const [tab, setTab] = useState(1);
  const { accessToken } = useSelector((state) => state.auth);
  const { data } = useGetUserQuery({
    accessToken: accessToken,
  });
  if (!data || data.error) {
    return <Spin />;
  }
  return (
    <Layout>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Row className='mt-4' gutter={16}>
          <Col span={5}>
            <SideBar setTab={setTab} tab={tab} />
          </Col>
          <Col span={19}>
            {tab === 1 && <InforForm data={data} />}
            {tab === 2 && <PasswordForm />}
            {tab === 3 && <ListOrder />}
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default UserInfor;
