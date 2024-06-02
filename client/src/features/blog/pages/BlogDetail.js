import React from "react";
import { Col, Row, Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "components/Layout";
import { useGetBlogQuery } from "app/api/blogService";
import Blog from "../components/Blog";
function BlogDetail() {
  const params = useParams();const { language} = useSelector((state) => state.auth);
  const { data } = useGetBlogQuery({ id: params.id });
  return (
    <Layout page={["blogs"]}>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Row>
          <div className='uppercase text-xl'>
            <Link to='/' className='text-gray-400 font-bold hover:text-black'>
            {language === "vi" ? "Trang chủ" : "ホーム"}
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            <Link
              to='/blogs'
              className='text-gray-400 font-bold hover:text-black'
            >
              Bài viết
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            <span className=' font-bold'>
              {data ? data.title : "Tên bài viết"}
            </span>
          </div>
        </Row>
        {!data || data.error ? (
          <Spin />
        ) : (
          <Row className='mt-4' gutter={16} justify='center'>
            <Col span={19}>
              <Blog blog={data} />
            </Col>
          </Row>
        )}
      </div>
    </Layout>
  );
}

export default BlogDetail;
