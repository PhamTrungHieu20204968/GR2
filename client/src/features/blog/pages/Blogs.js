import React, { useState } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "components/Layout";
import SideBar from "../components/SideBar";
import CreateBlog from "../components/CreateBlog";
import ListBlog from "../components/ListBlog";
import { useGetAllBlogsQuery } from "app/api/blogService";
function Blogs() {
  const [tab, setTab] = useState(1);
  const { accessToken, userId } = useSelector((state) => state.auth);
  const { data } = useGetAllBlogsQuery();
  return (
    <Layout page={["blogs"]}>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Row>
          <div className='uppercase text-xl'>
            <Link to='/' className='text-gray-400 font-bold hover:text-black'>
              Trang chủ
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            <span className=' font-bold'>Bài viết</span>
          </div>
        </Row>
        <Row className='mt-4' gutter={16}>
          <Col span={accessToken ? 5 : 0}>
            <SideBar tab={tab} setTab={setTab} />
          </Col>
          <Col span={accessToken ? 19 : 24}>
            {tab === 1 && <ListBlog key={1} data={data} />}
            {tab === 2 && (
              <ListBlog
                key={2}
                data={data.filter((item) => item.userId === userId)}
              />
            )}
            {tab === 3 && (
              <ListBlog
                key={3}
                data={data.filter(
                  (blog) =>
                    blog.likes.filter(
                      (item) =>
                        item.blogId === blog.id && item.userId === userId
                    ).length > 0
                )}
              />
            )}
            {tab === 4 && <CreateBlog accessToken={accessToken} />}
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Blogs;
