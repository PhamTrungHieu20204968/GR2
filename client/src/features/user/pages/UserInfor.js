import React, { useState } from "react";
import { Row, Col } from "antd";
import { Spin } from "antd";
import { useSelector } from "react-redux";

import Layout from "components/Layout";
import SideBar from "../components/Sidebar";
import InforForm from "../components/InforForm";
import PasswordForm from "../components/PasswordForm";
import ListOrder from "../components/ListOrder";
import Remind from "../components/Remind";

import { useGetUserQuery } from "app/api/userService";
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
            {tab === 4 && <Remind />}
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default UserInfor;
