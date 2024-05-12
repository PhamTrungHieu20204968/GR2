import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "components/Layout";
import CreateBlog from "../components/CreateBlog";
import { useGetBlogQuery } from "app/api/blogService";
function UpdateBlog() {
  const params = useParams();
  const { accessToken } = useSelector((state) => state.auth);
  const { data } = useGetBlogQuery({ id: params.id });
  if (!data || data.error) {
    return <Spin />;
  }
  return (
    <Layout page={["blogs"]}>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Row>
          <div className='uppercase text-xl'>
            <Link to='/' className='text-gray-400 font-bold hover:text-black'>
              Trang chủ
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            <Link
              to='/blogs'
              className='text-gray-400 font-bold hover:text-black'
            >
              Bài viết
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            <span className=' font-bold'>Sửa bài viết</span>
          </div>
        </Row>
        <Row className='mt-4' gutter={16} justify='center'>
          <Col span={19}>
            <CreateBlog accessToken={accessToken}  blog={data} edit/>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default UpdateBlog;
